import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create/video/$videoID")({
  component: RouteComponent,
});

function RouteComponent() {
  const { videoID } = Route.useParams();

  return <div>video id! {videoID}</div>;
}
