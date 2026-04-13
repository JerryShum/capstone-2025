import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from 'sonner';

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
               <Toaster position="top-center" richColors />
            </TooltipProvider>
         </QueryClientProvider>
      </React.Fragment>
   );
}
