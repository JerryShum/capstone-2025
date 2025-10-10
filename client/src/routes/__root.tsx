import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/custom/navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
