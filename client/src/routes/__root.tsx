import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex min-h-screen flex-col">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
