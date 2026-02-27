import { Button } from '@/components/ui/button';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import type { LucideIcon } from 'lucide-react';

interface NodeButtonProps {
   tooltiptext: string;
   Icon: LucideIcon;
   onClickFunction: () => void;
}

export default function NodeButton({
   tooltiptext,
   Icon,
   onClickFunction,
}: NodeButtonProps) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button
               variant={'ghost'}
               size={'icon'}
               className="hover:cursor-pointer p-0 [&_svg]:size-6"
               onClick={onClickFunction}
            >
               <Icon className="size-5" />
            </Button>
         </TooltipTrigger>
         <TooltipContent>
            <p>{tooltiptext}</p>
         </TooltipContent>
      </Tooltip>
   );
}
