import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/videos/$videoID')({
   component: RouteComponent,
});

function RouteComponent() {
   const params = useParams({ from: '/dashboard/videos/$videoID' });
   const videoID = params.videoID;

   return (
      <div>
         <h1>Hello "/videos/$videoID"!</h1>
         <p>Video ID: {videoID}</p>
      </div>
   );
}
