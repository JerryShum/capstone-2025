import { useStoryStore } from "@/stores/storyStore";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create/video")({
  component: RouteComponent,
});

function RouteComponent() {
  const { script, imageBase64 } = useStoryStore();

  return (
    <div>
      <p>{script}</p>
      <img
        src={`data:image/png;base64,${imageBase64}`}
        alt="Generated storybook art"
        className="h-[1/2] w-[1/2] rounded-lg object-contain"
      />
    </div>
  );
}
