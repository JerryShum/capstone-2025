// UI
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
} from "@/components/ui/field";

// tanstack
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

//Other
import { api } from "@/lib/api";
import { postScriptSchema } from "@shared/schemas/sendScriptSchema";
import { Skeleton } from "@/components/ui/skeleton";

// story states
import { useStoryStore } from "@/stores/storyStore";

export const Route = createFileRoute("/_public/create/")({
  component: RouteComponent,
});

const createScriptMutation = {
  mutationKey: ["script", "create"],
  mutationFn: async (data: z.infer<typeof postScriptSchema>) => {
    const res = await api.create.script.$post({ json: data });

    if (!res.ok) {
      throw new Error("something went wrong when submitting this form");
    }

    return res.json();
  },
};

function RouteComponent() {
  const navigate = useNavigate();
  //@ get the setter function from the store
  const setStory = useStoryStore((state) => state.setStory);

  //@ get the script and image from the store aswell
  const { script, imageBase64 } = useStoryStore();

  //! Using useMutation for submitting the form --> what to do with the returned data
  const createScript = useMutation({
    mutationFn: createScriptMutation.mutationFn,
    onSuccess: (data) => {
      console.log("Prompt successfully sent:", data);

      //@ Use navigate to navigate to the generated script page...
      // Ensure data.script and data.imageBase64 are not null/undefined before setting the story
      if (data.script && data.imageBase64 && data.video_prompt) {
        setStory({
          script: data.script,
          video_prompt: data.video_prompt,
          imageBase64: data.imageBase64,
        });
      }
    },
    onError: (error) => {
      // Handle the error
      console.error("Failed to create video:", error);
    },
  });

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
    validators: {
      onChange: postScriptSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await new Promise((r) => setTimeout(r, 2000));
      await createScript.mutateAsync(value as z.infer<typeof postScriptSchema>);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center px-40 py-10">
      <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
        Let's Weave Your Story Together!
      </h1>
      <p className="text-muted-foreground text-lg">
        Fill out the form below to generate a captivating story for your video.
      </p>
      <Card className="bg-card mt-4 flex h-96 w-3/4 flex-row gap-4 rounded-lg p-4">
        <div className="bg-muted flex w-full flex-col items-center justify-center rounded-lg text-center">
          {/* Area for image */}

          {/* If success --> put in image, else put in the p */}
          {createScript.isSuccess && !createScript.isPending ? (
            <img
              src={`data:image/png;base64,${imageBase64}`}
              alt="Generated storybook art"
              className="h-full w-full rounded-lg object-contain"
            />
          ) : (
            !createScript.isPending && <p>Generated image goes here...</p>
          )}
          {createScript.isPending && <Skeleton className="h-[90%] w-[90%]" />}
        </div>

        {/* Scroll area for script */}
        {createScript.isSuccess &&
        createScript.data?.script &&
        !createScript.isPending ? (
          <ScrollArea className="w-full rounded-md px-4" data-lenis-prevent>
            <p className="whitespace-pre-wrap">{script}</p>
          </ScrollArea>
        ) : (
          //! Load skeleton while waiting for script
          <div className="text-muted-foreground flex w-full flex-col items-center justify-center">
            {createScript.isPending && (
              <div className="w-full space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            )}
          </div>
        )}
      </Card>
      {
        //! Only show the convert to video button if we succeed in creating script and image
        createScript.isSuccess &&
          createScript.data?.script &&
          !createScript.isPending && (
            <Button
              className="text-md mt-4"
              size={"lg"}
              onClick={() => {
                //@ navigate to /create/video
                navigate({
                  to: "/create/video",
                });
              }}
            >
              Convert to Video
            </Button>
          )
      }
      <form
        className="mt-4 w-3/4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Card className="rounded-lg border p-4">
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
                    <FieldError errors={field.state.meta.errors} />
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
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />
            <div className="flex items-end justify-end gap-4">
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
                          <SelectItem value="toddlers">
                            Toddlers (0-3)
                          </SelectItem>
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
                          <SelectItem value="3d-render">
                            3D Animation
                          </SelectItem>
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
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="min-w-[80px]"
                  >
                    {isSubmitting ? "..." : "Submit"}
                  </Button>
                )}
              />
            </div>
          </FieldGroup>
        </Card>
      </form>
    </div>
  );
}
