import Navbar from "@/components/custom/Navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Navbar />

      <Outlet />
    </div>
  );
}
