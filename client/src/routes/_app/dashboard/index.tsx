import { ProjectCard } from "@/components/custom/dashboard/ProjectCard";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
});
interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

const testProjects: Project[] = [
  {
    id: "1",
    name: "Project 1",
    description:
      "Developing a stop-motion animation featuring clay figures exploring a whimsical forest. Emphasizing intricate set design and character articulation.",
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-11-20T14:30:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Motion Graphics Explainer",
    description:
      "Producing a hand-drawn 2D animation series about a detective solving mysteries in a futuristic city. Focusing on expressive character design and fluid action sequences.",
    createdAt: "2023-03-01T11:00:00Z",
    updatedAt: "2023-11-22T09:15:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    name: "Interactive Video Experience",
    description:
      "Crafting a CGI animation for a commercial showcasing a new car model. Highlighting realistic rendering, dynamic camera movements, and special effects for environmental interaction.",
    createdAt: "2023-05-10T09:00:00Z",
    updatedAt: "2023-11-24T16:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function RouteComponent() {
  return (
    <div className="bg-sidebar border-sidebar-border h-full w-full grow rounded-lg border-1 shadow-md">
      <div className="flex h-20 items-center justify-between border-b p-4">
        {/* <SidebarTrigger className="scale-[120%]" /> */}
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">Projects</h2>
          <h3 className="text-sm">3 Projects | Last Updated 11/24/2025</h3>
        </div>
        <Button className="font-semibold">
          <Plus /> New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {testProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
