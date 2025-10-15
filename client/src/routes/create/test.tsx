// UI
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
} from "@/components/ui/field";

// Router
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";

// React
import { useState } from "react";

//Custom
import { api } from "@/lib/api";

export const Route = createFileRoute("/create/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const [promptOutput, setPromptOutput] = useState<string>("");

  const formOpts = formOptions({
    defaultValues: {
      title: "",
      overview: "",
      agegroup: "",
      genre: "",
      artstyle: "",
    },
  });

  const form = useForm({
    ...formOpts,

    onSubmit: async ({ value }) => {
      // await new Promise((r) => setTimeout(r, 3000));

      // const res = await api.videos.create.$post({ json: value });
      // if (!res.ok) {
      //   throw new Error("something went wrong when submitting this form");
      // }

      // const data = await res.json();
      // setPromptOutput(data.response ?? "");

      console.log(value);
    },
  });

  return (
    <div className="mt-20 flex flex-col items-center justify-center px-40">
      <h1 className="text-3xl font-semibold">
        Let's Weave Your Story Together!
      </h1>
      <form
        className="mt-10 w-full max-w-lg rounded-lg border p-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="flex flex-col gap-2">
          <form.Field
            name="title"
            children={(field) => (
              <Field className="flex flex-col gap-2">
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Title of your story goes here..."
                  required
                />
                {!field.state.meta.isValid && (
                  <em role="alert">{field.state.meta.errors.join(", ")}</em>
                )}
              </Field>
            )}
          />

          <form.Field
            name="overview"
            children={(field) => (
              <Field className="flex flex-col gap-2">
                <Label htmlFor={field.name}>Overview / Script</Label>
                <Textarea
                  className="min-h-[100px]"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Describe the main idea for your scene..."
                  required
                />

                {!field.state.meta.isValid && (
                  <em role="alert">{field.state.meta.errors.join(", ")}</em>
                )}
              </Field>
            )}
          />
          <div className="flex gap-4">
            <form.Field
              name="agegroup"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field
                    orientation="vertical"
                    data-invalid={isInvalid}
                    className="flex flex-col gap-2"
                  >
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Age Group</FieldLabel>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      required
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="toddlers">Toddlers (0-3)</SelectItem>
                        <SelectItem value="preschool">
                          Pre-Schoolers (4-6)
                        </SelectItem>
                        <SelectItem value="young-children">
                          Young Children (7-12)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
            <form.Field
              name="genre"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field
                    orientation="vertical"
                    data-invalid={isInvalid}
                    className="flex flex-col gap-2"
                  >
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Genre</FieldLabel>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      required
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="comedy">Comedy</SelectItem>
                        <SelectItem value="fairy-tale">Fairy Tale</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
          </div>

          <form.Field
            name="artstyle"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field
                  orientation="vertical"
                  data-invalid={isInvalid}
                  className="flex flex-col gap-2"
                >
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Art Style</FieldLabel>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    required
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={isInvalid}
                      className="min-w-[120px]"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="cartoon">Cartoon</SelectItem>
                      <SelectItem value="watercolor">Watercolor</SelectItem>
                      <SelectItem value="pixel-art">Pixel Art</SelectItem>
                      <SelectItem value="3d-render">3D Animation</SelectItem>
                      <SelectItem value="line-art">Line Art</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              );
            }}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="mt-2">
                {isSubmitting ? "..." : "Submit"}
              </Button>
            )}
          />
        </FieldGroup>
      </form>

      {promptOutput && (
        <div className="bg-muted mt-4 w-full max-w-lg rounded-lg border p-4">
          <p className="whitespace-pre-wrap">{promptOutput}</p>
        </div>
      )}
    </div>
  );
}
