import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
} from '@/components/ui/sheet';
import { Settings2 } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import ProjectSettingsForm from './ProjectSettingsForm';

interface ProjectSettingsProps {
   openState: boolean;
   setProjectOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ProjectSettings({
   openState,
   setProjectOpen,
}: ProjectSettingsProps) {
   return (
      <Sheet open={openState} onOpenChange={setProjectOpen}>
         <SheetContent
            side="left"
            className="w-full sm:max-w-[440px] backdrop-blur-xl border-l border-white/10 shadow-2xl p-0 flex flex-col gap-0 overflow-hidden rounded-r-lg"
         >
            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
               <SheetHeader className="mb-8 px-0">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2.5 py-1 bg-white/10  border-2 border-foreground/15 rounded-full w-fit px-3">
                        <Settings2 size={16} className="text-foreground/70" />
                        <span className="text-[11px] font-black uppercase tracking-[0.1em] text-foreground/70">
                           Global DNA
                        </span>
                     </div>
                  </div>
                  <SheetTitle className="text-3xl font-bold tracking-tight text-foreground">
                     Project Settings
                  </SheetTitle>
                  <SheetDescription className="text-foreground/70 text-sm leading-relaxed max-w-[90%]">
                     Configure the core creative parameters for this story.
                     These settings act as the global defaults for all generated
                     scenes.
                  </SheetDescription>
               </SheetHeader>

               <ProjectSettingsForm />
            </div>

           
         </SheetContent>
      </Sheet>
   );
}
