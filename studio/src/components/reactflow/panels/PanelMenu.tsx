import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';
import { useProjectStore } from '@/hooks/useProjectStore';
import { Link } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ProjectSettings from './projectSettings/ProjectSettings';

export default function IconMenu() {
   const projectTitle = useProjectStore((state) => state.projectTitle);
   const updateProjectTitle = useProjectStore(
      (state) => state.updateProjectTitle,
   );
   const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);

   return (
      <div className="h-10 px-1 bg-background/80 backdrop-blur-md border border-border shadow-md hover:shadow-lg transition-all rounded-xl flex items-center gap-1">
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="ghost"
                  className="h-7 px-1.5 gap-1 hover:bg-accent/50 rounded-lg group"
               >
                  <img
                     src="/story_weaver_logo_2.svg"
                     alt="Story Weaver Logo"
                     className="size-5 object-contain"
                  />
                  <ChevronDown className="size-3.5 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start">
               <DropdownMenuGroup>
                  <DropdownMenuItem className="focus:bg-blue-200">
                     <Link to={'/'} className="w-full h-full">
                        Dashboard
                     </Link>
                  </DropdownMenuItem>
               </DropdownMenuGroup>
               <DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuLabel>Project Settings</DropdownMenuLabel> */}
                  <DropdownMenuItem
                     onSelect={() => setIsProjectSettingsOpen(true)}
                  >
                     Edit Project Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
               </DropdownMenuGroup>
            </DropdownMenuContent>
         </DropdownMenu>

         <div className="w-px h-4 bg-border/60 mx-0.5" />

         <Input
            value={projectTitle}
            onChange={(e) => updateProjectTitle(e.target.value)}
            className="border-none bg-transparent shadow-none focus-visible:ring-0 px-2 h-7 font-semibold !text-[16px] tracking-tight text-foreground/90 w-36 focus-visible:border-none selection:bg-blue-400"
         />

         <ProjectSettings
            openState={isProjectSettingsOpen}
            setProjectOpen={setIsProjectSettingsOpen}
         />
      </div>
   );
}
