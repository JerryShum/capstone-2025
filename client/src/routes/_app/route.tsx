import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>DASHBOARD/APP COMPONEONT GOES HERE</div>;
}
