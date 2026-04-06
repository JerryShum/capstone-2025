import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute } from '@tanstack/react-router';
import PageVideos from '@/components/PageVideos';

export const Route = createFileRoute('/_authenticated/videos')({
   component: RouteComponent,
});

function RouteComponent() {
   return (
      <div className="flex min-h-screen">
         <SidebarProvider>
            <AppSidebar />
            <div className="flex grow p-2">
               <PageVideos />
            </div>
         </SidebarProvider>
      </div>
   );
}
