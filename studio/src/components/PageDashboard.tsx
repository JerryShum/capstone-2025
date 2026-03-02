import React from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { ProjectCard } from './dashboard/ProjectCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface Project {
   id: number;
   projectTitle: string;
   aspectRatio: '16:9' | '9:16';
   engine: string;
   globalNegativePrompt: string;
   executiveSummary: string;
   cinematicPreset: string;
   flowData: JSONValue;
   updatedAt: string | null;
}

const testProjects: Project[] = [
   {
      id: '1',
      name: 'Project 1',
      description:
         'Developing a stop-motion animation featuring clay figures exploring a whimsical forest. Emphasizing intricate set design and character articulation.',
      createdAt: '2023-01-15T10:00:00Z',
      updatedAt: '2023-11-20T14:30:00Z',
      imageUrl:
         'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
   },
   {
      id: '2',
      name: 'Motion Graphics Explainer',
      description:
         'Producing a hand-drawn 2D animation series about a detective solving mysteries in a futuristic city. Focusing on expressive character design and fluid action sequences.',
      createdAt: '2023-03-01T11:00:00Z',
      updatedAt: '2023-11-22T09:15:00Z',
      imageUrl:
         'https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
   },
   {
      id: '3',
      name: 'Interactive Video Experience',
      description:
         'Crafting a CGI animation for a commercial showcasing a new car model. Highlighting realistic rendering, dynamic camera movements, and special effects for environmental interaction.',
      createdAt: '2023-05-10T09:00:00Z',
      updatedAt: '2023-11-24T16:00:00Z',
      imageUrl:
         'https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
   },
];

export default function PageDashboard() {
   //@ Fetch function to get response --> projects from server
   const fetchProjects = async function () {
      const response = await api.studio.list.$get();

      if (!response.ok) {
         throw new Error(
            'Dashboard: ERROR. Unable to retrieve list of projects.',
         );
      }

      return response.json();
   };

   // tanstack query --> useQuery returns states & values that we can use.
   const { data, isLoading, error } = useQuery({
      queryKey: ['dashboard_projects'],
      queryFn: fetchProjects,
      select: (projects) =>
         projects.map((project: any) => ({
            ...project,
            aspectRatio: project.aspectRatio as '16:9' | '9:16',
         })),
   });

   if (isLoading) {
      return (
         <div className="bg-sidebar border-sidebar-border flex h-full w-full grow flex-col items-center justify-center rounded-lg border-1 shadow-md">
            <div className="flex flex-col items-center gap-4 text-center">
               <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
               <h2 className="text-2xl font-bold">Loading Projects...</h2>
               <p className="text-muted-foreground max-w-xs">
                  Please wait while we fetch your creative workspace.
               </p>
            </div>
         </div>
      );
   }

   if (error || !data) {
      return (
         <div className="bg-sidebar border-sidebar-border flex h-full w-full grow flex-col items-center justify-center rounded-lg border-1 shadow-md">
            <div className="flex flex-col items-center gap-4 text-center">
               <h2 className="text-2xl font-bold">No Projects Found</h2>
               <p className="text-muted-foreground max-w-xs">
                  Sorry. We couldn't retrieve your projects. Please try
                  refreshing the page.
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
      <div className="bg-sidebar border-sidebar-border h-full w-full grow rounded-lg border-1 shadow-md">
         <div className="flex h-20 items-center justify-between border-b p-4">
            {/* <SidebarTrigger className="scale-[120%]" /> */}
            <div className="flex flex-col">
               <h2 className="text-lg font-bold">Projects</h2>
               <h3 className="text-sm">{`${data.length} Projects | Last Updated: ${data[0]?.updatedAt ? new Date(data[0].updatedAt).toLocaleDateString() : 'N/A'}`}</h3>
            </div>
            <Button className="font-semibold">
               <Plus /> New Project
            </Button>
         </div>
         <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((project) => (
               <ProjectCard
                  key={project.id}
                  project={project}
                  updatedAt={project.updatedAt}
               />
            ))}
         </div>
      </div>
   );
}
