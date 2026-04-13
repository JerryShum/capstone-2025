import { createFileRoute, Outlet } from '@tanstack/react-router';
import { authClient } from '../lib/auth-client';

export const Route = createFileRoute('/_authenticated')({
   beforeLoad: async ({ location }) => {
      const { data: session } = await authClient.getSession();
      if (!session) {
         // Redirect to the main Client login page on port 5174
         const loginUrl = import.meta.env.DEV 
            ? `http://localhost:5174/login` 
            : `/login`;
         window.location.href = `${loginUrl}?redirect=${encodeURIComponent(location.href)}`;
      }
   },
   component: RouteComponent,
});

function RouteComponent() {
   return <Outlet />;
}
