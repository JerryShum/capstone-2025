import { AppSidebar } from "@/components/custom/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar data-lenis-prevent />
        <div className="flex grow p-2">
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
}
