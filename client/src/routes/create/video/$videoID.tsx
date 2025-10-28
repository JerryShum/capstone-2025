import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create/video/$videoID")({
  component: RouteComponent,
});

function RouteComponent() {
  const { videoID } = Route.useParams();

  return (
    <div className="flex flex-col items-center justify-center px-40 py-10">
      video id! {videoID}
    </div>
  );
}
