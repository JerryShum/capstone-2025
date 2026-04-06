import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from './ui/button';
import { Video, ExternalLink, Calendar, Folder } from 'lucide-react';

export default function PageVideos() {
   const fetchVideos = async function () {
      //@ts-ignore - list endpoint added recently
      const response = await api.studio.video.list.$get();

      if (!response.ok) {
         throw new Error('Videos: ERROR. Unable to retrieve list of videos.');
      }

      return response.json();
   };

   const { data, isLoading, error } = useQuery({
      queryKey: ['generated_videos'],
      queryFn: fetchVideos,
   });

   if (isLoading) {
      return (
         <div className="bg-sidebar border-sidebar-border flex h-full w-full grow flex-col items-center justify-center rounded-lg border shadow-md">
            <div className="flex flex-col items-center gap-4 text-center">
               <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
               <h2 className="text-2xl font-bold">Loading Videos...</h2>
               <p className="text-muted-foreground max-w-xs">
                  Please wait while we fetch your generated masterpieces.
               </p>
            </div>
         </div>
      );
   }

   if (error || !data) {
      return (
         <div className="bg-sidebar border-sidebar-border flex h-full w-full grow flex-col items-center justify-center rounded-lg border shadow-md">
            <div className="flex flex-col items-center gap-4 text-center">
               <h2 className="text-2xl font-bold">No Videos Found</h2>
               <p className="text-muted-foreground max-w-xs">
                  It looks like you haven't generated any videos yet, or we're having trouble reaching the server.
               </p>
               <Button
                  className="font-semibold"
                  onClick={() => window.location.reload()}
               >
                  Retry Connection
               </Button>
            </div>
         </div>
      );
   }

   return (
      <div className="bg-sidebar border-sidebar-border flex h-full w-full grow flex-col rounded-lg border shadow-md overflow-hidden">
         <div className="flex h-20 items-center justify-between border-b p-4 shrink-0">
            <div className="flex flex-col">
               <h2 className="text-lg font-bold">Generated Videos</h2>
               <h3 className="text-sm">{`${data.length} Videos Generated Across All Projects`}</h3>
            </div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-4">
            {data.length === 0 ? (
               <div className="flex h-full flex-col items-center justify-center text-center opacity-60">
                  <Video className="h-16 w-16 mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">No videos generated yet</p>
                  <p className="text-sm">Start a project and generate some clips to see them here!</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {data.map((video: any) => (
                     <div key={video.name} className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
                        {/* Video Preview */}
                        <div className="relative aspect-video w-full bg-black overflow-hidden">
                           {video.videosURL ? (
                              <video 
                                 src={video.videosURL} 
                                 className="h-full w-full object-cover"
                                 controls
                                 preload="metadata"
                              />
                           ) : (
                              <div className="flex h-full w-full items-center justify-center bg-muted/20">
                                 <div className="text-center p-4">
                                    <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                       <Video className="h-4 w-4" />
                                    </div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                       {video.status}
                                    </p>
                                 </div>
                              </div>
                           )}
                        </div>

                        {/* Video Info */}
                        <div className="flex flex-1 flex-col p-4">
                           <div className="mb-2 flex items-start justify-between gap-2">
                              {/* Using the last part of operation name as a shorter ID if needed, 
                                  but projectTitle is more useful */}
                              <h3 className="line-clamp-1 font-semibold text-sm" title={video.projectTitle}>
                                 {video.projectTitle}
                              </h3>
                           </div>
                           
                           <div className="mt-auto space-y-2">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                 <Calendar className="h-3 w-3" />
                                 <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                 <Folder className="h-3 w-3" />
                                 <span className="truncate">Project ID: {video.projectID}</span>
                              </div>
                           </div>

                           <div className="mt-4 pt-4 border-t flex items-center justify-between">
                              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${
                                 video.status === 'DONE' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                              }`}>
                                 {video.status}
                              </span>
                              
                              {video.videosURL && (
                                 <a 
                                    href={video.videosURL} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                                 >
                                    Source <ExternalLink className="h-3 w-3" />
                                 </a>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
}
