import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/dashboard/videos/$videoID')({
   component: RouteComponent,
});

function RouteComponent() {
   const { videoID } = Route.useParams();

   return (
      <div>
         <h1>Hello "/videos/$videoID"!</h1>
         <p>Video ID: {videoID}</p>
      </div>
   );
}
