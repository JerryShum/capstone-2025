import { SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-muted h-full w-full grow rounded-lg p-2">
      <SidebarTrigger />
      Hello "/dashboard/"!
    </div>
  );
}
