import { useStoryStore } from "@/stores/storyStore";
import { api } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import type { postVideoSchemaType } from "@shared/schemas/sendVideoSchema";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_public/create/video/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { script, video_prompt, imageBase64 } = useStoryStore();
  const navigate = useNavigate();

  console.log(script, video_prompt, imageBase64);

  const fakeVideoPrompts = [
    "A young boy with a red backpack walks through a sun-drenched forest, birds chirping softly in the background. The sunlight filters through the leaves, creating dappled patterns on the forest floor. He hums a little tune, his steps light and carefree.",
    "The boy encounters a sparkling river, bending down to touch the cool water, a curious fox watching from behind a tree. The water gurgles gently over smooth stones, and tiny fish dart beneath the surface. The fox, with its bushy tail, peeks out with intelligent eyes, its nose twitching.",
    "He follows the fox through a field of tall, swaying sunflowers, their heads turning with the sun. The sunflowers tower over them, their bright yellow petals a vibrant contrast against the blue sky. The boy giggles as the fox playfully pounces through the field.",
    "They arrive at a hidden waterfall, rainbows forming in the mist, and the boy claps his hands in delight. The water cascades down moss-covered rocks, creating a soothing roar. The air is cool and fresh, and the rainbows shimmer with ethereal beauty.",
    "The boy and the fox sit together on a mossy rock, sharing a sandwich, as the sun begins to set, painting the sky in hues of orange and purple. The sky transforms into a masterpiece of colors, casting a warm glow over the landscape. They share a moment of quiet companionship, the boy offering the fox a piece of his sandwich, which it gently accepts.",
    "As twilight deepens, fireflies begin to emerge, their tiny lights blinking in the gathering gloom. The boy and the fox watch in wonder, mesmerized by the magical display. The forest, once bright, now holds a gentle, mysterious aura.",
    "The boy, feeling sleepy, leans against the fox, who has curled up beside him. The fox's fur is soft and warm, a comforting presence in the cool evening air. They drift off to sleep under the watchful eyes of the moon and stars.",
    "He wakes up to the sound of birdsong and the first rays of dawn. The fox is still beside him, stirring awake. They share a silent understanding, a bond forged in their shared adventure. The forest is alive with the promise of a new day.",
    "Together, they make their way back through the forest, the boy feeling a sense of accomplishment and joy. He carries the memories of",
  ];
  //! Using useMutation for when user pressed the button --> this gets triggered
  const createVideo = useMutation({
    mutationKey: ["video", "create"],
    mutationFn: async (data: postVideoSchemaType) => {
      const res = await api.create.video.$post({ json: data });

      if (!res.ok) {
        throw new Error("something went wrong when submitting this form");
      }

      return res.json();
    },
    onSuccess: (data) => {
      console.log("Message received from server:", data);
      const operationName = data.operationName;
      const videoID = operationName?.split("/").pop();

      navigate({ to: `/create/video/${videoID}` });

      //! Handle the response that was given by the server
    },
    onError: (error) => {
      // Handle the error
      console.error("Failed to create video:", error);
    },
  });

  if (!script || !imageBase64 || !video_prompt) {
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
            <div className="list-disc px-5">
              {video_prompt &&
                video_prompt.map((prompt, index) => (
                  <div
                    key={index}
                    className="text-muted-foreground mb-4 flex items-start gap-4 border-b pb-4"
                  >
                    <p className="text-secondary-foreground min-w-[100px] text-lg font-bold">
                      Scene {index + 1}:
                    </p>
                    {prompt}

                    <Button
                      className="text-md"
                      onClick={() =>
                        createVideo.mutateAsync({
                          script: script ?? "",
                          imageBase64: imageBase64 ?? "",
                          prompt: video_prompt[index] ?? " ",
                        })
                      }
                      variant={"secondary"}
                    >
                      <ArrowRight />
                    </Button>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    );
  }
}
