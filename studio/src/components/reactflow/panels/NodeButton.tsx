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
   disabled?: boolean;
}

export default function NodeButton({
   tooltiptext,
   Icon,
   onClickFunction,
   disabled = false,
}: NodeButtonProps) {
   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <Button
               variant={'ghost'}
               size={'icon'}
               className="hover:cursor-pointer p-0 [&_svg]:size-6 disabled:opacity-30 disabled:cursor-not-allowed"
               onClick={onClickFunction}
               disabled={disabled}
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
