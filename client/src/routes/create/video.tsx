import { useStoryStore } from "@/stores/storyStore";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create/video")({
  component: RouteComponent,
});

function RouteComponent() {
  const { script, imageBase64 } = useStoryStore();
  const navigate = useNavigate();

  if (!script || !imageBase64) {
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
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold text-transparent">
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
        <Button className="mt-4" onClick={() => console.log("Generate Video")}>
          Generate Video
        </Button>
      </div>
    );
  }
}
