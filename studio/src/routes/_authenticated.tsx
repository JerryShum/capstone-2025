import { createFileRoute, Outlet } from '@tanstack/react-router';
import { authClient } from '../lib/auth-client';

export const Route = createFileRoute('/_authenticated')({
   beforeLoad: async ({ location }) => {
      const { data: session } = await authClient.getSession();
      if (!session) {
         // Redirect to the main Client login page
         // In development it's typically localhost:5174
         window.location.href = `/login?redirect=${encodeURIComponent(location.href)}`;
      }
   },
   component: RouteComponent,
});

function RouteComponent() {
   return <Outlet />;
}
