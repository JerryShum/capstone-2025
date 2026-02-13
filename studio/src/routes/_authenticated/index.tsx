import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/')({
   component: DashboardPage,
});

//! This is the "MAIN PAGE (the /) route --> probably should be the "dashboard" that the user sees

function DashboardPage() {
   return <div>Hello! This is the dashbaord component -- "/"!</div>;
}
