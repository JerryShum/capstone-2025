import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import PageDashboard from '@/components/PageDashboard';

export const Route = createFileRoute('/_authenticated/')({
   component: RouteComponent,
});

function RouteComponent() {
   return (
      <div className="flex min-h-screen">
         <SidebarProvider>
            <AppSidebar />
            <div className="flex grow p-2">
               <PageDashboard />
            </div>
         </SidebarProvider>
      </div>
   );
}
