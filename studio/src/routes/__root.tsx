import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TooltipProvider } from '@/components/ui/tooltip';

export const Route = createRootRoute({
   component: RootComponent,
});

function RootComponent() {
   return (
      <React.Fragment>
         <TooltipProvider>
            <Outlet />
         </TooltipProvider>
      </React.Fragment>
   );
}
