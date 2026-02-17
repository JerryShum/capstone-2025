import { createFileRoute } from '@tanstack/react-router';

import Flow from '@/components/reactflow/Flow';

export const Route = createFileRoute('/_authenticated/project/$projectID')({
   component: RouteComponent,
});

//! THIS IS GOING TO BE THE PRIMARY PAGE FOR THE STUDIO
// Here, we will define the entire nodebased canvas and workflow using reactflow
// Steps:
// 1. Retrieve the project state from the DB by searching up the project ID
// 2. Load the project state and re-create it in the app
// 3. User can start work

//@ ---------------------------------------------------

function RouteComponent() {
   const { projectID } = Route.useParams();
   return (
      <>
         <Flow />
      </>
   );
}
