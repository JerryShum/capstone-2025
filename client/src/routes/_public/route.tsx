import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="dark bg-background text-foreground grid min-h-screen grid-rows-[auto_1fr] selection:bg-blue-500/30">
      <Navbar />

      <Outlet />
      <Footer />
    </div>
  );
}
