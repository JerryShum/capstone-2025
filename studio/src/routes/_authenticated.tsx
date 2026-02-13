import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
   component: RouteComponent,
});

//! This is technically a LAYOUT route that acts as a layout for the _authenticated folder
// We are going to use this as a form of pre-authentication and routing
// - Check if the user is authenticated
// - If yes, then we display the pages in the _authenticated route
// - If no, then we take them to the login / signup pages and reroute them forcefully

function RouteComponent() {
   return <Outlet />;
}
