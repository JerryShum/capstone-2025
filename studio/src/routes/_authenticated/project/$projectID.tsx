import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/project/$projectID')({
   component: RouteComponent,
});

function RouteComponent() {
   const { projectID } = Route.useParams();

   return (
      <div>
         <h1>Hello "/_auth/project/$projectID"!</h1>
         <h2>PROJECTID: {projectID}</h2>
      </div>
   );
}
