import { Folder, Calendar, MoreVertical } from "lucide-react";
import { ImageWithFallback } from "./ProjectCardImage";
import fallbackimage from "/backup.jpg";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-100/50">
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <ImageWithFallback src={project.imageUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-3 right-3 rounded-lg bg-white/90 p-2 opacity-0 shadow-md backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:scale-110 hover:bg-white"
        >
          <MoreVertical className="h-4 w-4 text-gray-700" />
        </button>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 rounded-lg bg-emerald-500/90 px-2.5 py-1 shadow-md backdrop-blur-sm">
          <span className="text-xs font-medium text-white">Active</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-1.5 truncate font-medium text-gray-900 transition-colors group-hover:text-indigo-600">
          {project.name}
        </h3>
        <p className="mb-4 line-clamp-2 h-[40px] text-[13px] leading-relaxed text-gray-600">
          {project.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(project.updatedAt)}</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-[10px] font-semibold text-indigo-700">
              {project.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
