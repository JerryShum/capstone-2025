import { useStoryStore } from "@/stores/storyStore";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/create/video")({
  component: RouteComponent,
});

//! Mutation function to be used in useMutation
const createVideoMutation = {
  mutationKey: ["video", "create"],
  mutationFn: async () => {
    const res = await api.create.test.$get();

    if (!res.ok) {
      throw new Error("something went wrong when submitting this form");
    }

    return res.json();
  },
};

function RouteComponent() {
  const { script, video_prompt, imageBase64 } = useStoryStore();
  const navigate = useNavigate();

  //! Using useMutation for when user pressed the button --> this gets triggered
  const createVideo = useMutation({
    mutationFn: createVideoMutation.mutationFn,
    onSuccess: (data) => {
      console.log("Message received from server:", data);

      //! Handle the response that was given by the server
    },
    onError: (error) => {
      // Handle the error
      console.error("Failed to create video:", error);
    },
  });

  if (!!script || !!imageBase64) {
    return (
      <div className="flex flex-col items-center justify-center px-40 py-10">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
          No Story Found
        </h1>
        <p className="text-muted-foreground text-lg">
          Please go back to the create page to generate a story first.
        </p>
        <Button className="mt-4" onClick={() => navigate({ to: "/create" })}>
          Go to Create Story
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center px-40 py-10">
        <div className="bg-accent text-accent-foreground w-full rounded-md p-3 shadow-md">
          <p className="text-center text-sm font-medium">
            💥 Heads up! Video generation is currently in beta. We will only be
            able to generate the first scene of the story at the moment.
          </p>
        </div>
        <h1 className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
          Your Story Awaits!
        </h1>
        <p className="text-muted-foreground text-lg">
          Review your story and generate your video.
        </p>
        <Card className="bg-card mt-4 flex h-96 w-3/4 flex-row gap-4 rounded-lg p-4">
          <div className="bg-muted flex w-full flex-col items-center justify-center rounded-lg text-center">
            <img
              src={`data:image/png;base64,${imageBase64}`}
              alt="Generated storybook art"
              className="h-full w-full rounded-lg object-contain"
            />
          </div>

          <ScrollArea
            className="w-full rounded-md px-4 whitespace-pre-wrap"
            data-lenis-prevent
          >
            {script}
          </ScrollArea>
        </Card>

        <Card className="bg-card mt-4 h-[500px] w-3/4 rounded-lg p-4">
          <div className="flex flex-row justify-between">
            <h3 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-xl font-extrabold text-transparent">
              Detailed Prompts for Each Scene:
            </h3>
            <Button variant={"outline"} disabled>
              Edit Prompts
            </Button>
          </div>
          <ScrollArea
            className="min-h-0 w-full flex-1 rounded-lg pr-4 whitespace-pre-wrap"
            data-lenis-prevent
          >
            <ul className="list-disc pl-5">
              {video_prompt &&
                video_prompt.map((prompt, index) => (
                  <li key={index} className="text-muted-foreground mb-2">
                    <p className="text-secondary-foreground text-lg font-bold">
                      Scene {index + 1}:
                    </p>
                    {prompt}
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </Card>
        <Button
          className="text-md mt-4"
          onClick={() => createVideo.mutateAsync()}
          size={"lg"}
        >
          Generate Video
        </Button>
      </div>
    );
  }
}
