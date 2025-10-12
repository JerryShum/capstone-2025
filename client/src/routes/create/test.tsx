import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { api } from "@/lib/api";
import { useState } from "react";

export const Route = createFileRoute("/create/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const [promptOutput, setPromptOutput] = useState<
    { id: number; subject: string; prompt: string }[] | null
  >(null);

  const formOpts = formOptions({
    defaultValues: {
      subject: "",
      prompt: "",
    },
  });

  const form = useForm({
    ...formOpts,

    onSubmit: async ({ value }) => {
      await new Promise((r) => setTimeout(r, 3000));

      const res = await api.videos.create.$post({ json: value });
      if (!res.ok) {
        throw new Error("something went wrong when submitting this form");
      }

      const data = await res.json();
      setPromptOutput(data.testVideoPrompts);

      console.log(data);
    },
  });

  return (
    <div className="mt-20 flex flex-col items-center justify-center px-40">
      <h1 className="text-xl font-semibold">
        Prompt our LLM AI -- GOOGLE GEMINI
      </h1>
      <form
        className="mt-10 flex w-full max-w-lg flex-col gap-4 rounded-lg border p-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="subject"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>Subject</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Subject"
                required
              />
              {!field.state.meta.isValid && (
                <em role="alert">{field.state.meta.errors.join(", ")}</em>
              )}
            </div>
          )}
        />

        <form.Field
          name="prompt"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <Label htmlFor={field.name}>prompt</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type="text"
                placeholder="Prompt goes here..."
                required
              />
              {!field.state.meta.isValid && (
                <em role="alert">{field.state.meta.errors.join(", ")}</em>
              )}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
      </form>

      <div>
        {promptOutput &&
          promptOutput.map((item) => (
            <div key={item.id} className="my-2 rounded border p-2">
              <div>
                <strong>Subject:</strong> {item.subject}
              </div>
              <div>
                <strong>Prompt:</strong> {item.prompt}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
