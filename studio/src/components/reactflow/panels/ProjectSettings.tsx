import { Button } from '@/components/ui/button';
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetFooter,
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
            className="w-full sm:max-w-[440px]  backdrop-blur-xl border-l border-white/10 shadow-2xl p-0 flex flex-col gap-0 overflow-hidden rounded-r-lg"
         >
            <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
               <SheetHeader className="mb-8 px-0">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2.5 py-1 bg-white/10 border border-foreground/10 rounded-full w-fit px-3">
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

            <div className="p-6 bg-white/5 backdrop-blur-md border-t border-white/10">
               <SheetFooter className="gap-3 sm:space-x-0">
                  {/* <SheetClose asChild>
                     <Button
                        variant="ghost"
                        className="flex-1 h-12 rounded-xl text-slate-400 hover:text-foreground hover:bg-white/5 font-semibold"
                     >
                        Discard
                     </Button>
                  </SheetClose> */}
                  <Button className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]">
                     Save Changes
                  </Button>
               </SheetFooter>
            </div>
         </SheetContent>
      </Sheet>
   );
}
