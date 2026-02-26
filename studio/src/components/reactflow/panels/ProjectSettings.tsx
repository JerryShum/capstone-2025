import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import type { Dispatch, SetStateAction } from 'react';

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
         <SheetContent>
            <SheetHeader>
               <SheetTitle>Are you absolutely sure?</SheetTitle>
               <SheetDescription>
                  This action cannot be undone.
               </SheetDescription>
            </SheetHeader>
         </SheetContent>
      </Sheet>
   );
}
