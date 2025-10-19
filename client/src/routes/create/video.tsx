import { createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/create/video")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();

  const state = location.state;
  const script = state.script;
  const imageBase64 = state.imageBase64;

  return <div>Hello "/create/video"!</div>;
}
