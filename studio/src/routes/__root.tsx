import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const Route = createRootRoute({
   component: RootComponent,
});

export const queryClient = new QueryClient();

function RootComponent() {
   return (
      <React.Fragment>
         <QueryClientProvider client={queryClient}>
            <TooltipProvider>
               <Outlet />
            </TooltipProvider>
         </QueryClientProvider>
      </React.Fragment>
   );
}
