import { SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-sidebar border-accent h-full w-full grow rounded-lg border-2 border-dashed p-2">
      <SidebarTrigger />
      Hello "/dashboard/"!
    </div>
  );
}
