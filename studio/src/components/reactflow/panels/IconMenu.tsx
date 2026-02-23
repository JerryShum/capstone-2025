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
import { Link } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';

export default function IconMenu() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            {/* Button that triggers the dropdown: Storyweaver icon + chevron down */}
            <Button
               variant="outline"
               className="h-10 px-3 py-2 bg-background/80 backdrop-blur-md border border-border shadow-sm hover:bg-accent/50 transition-all rounded-xl gap-2 group flex items-center"
            >
               <div className="flex items-center gap-2">
                  <img
                     src="/story_weaver_logo_2.svg"
                     alt="Story Weaver Logo"
                     className="size-6 object-contain"
                  />
                  <span className="font-semibold text-sm tracking-tight text-foreground/90">
                     StoryWeaver
                  </span>
                  <ChevronDown />
               </div>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <Link to={'/'}>Dashboard</Link>
               </DropdownMenuItem>
               <DropdownMenuItem>Billing</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
               <DropdownMenuSeparator />
               <DropdownMenuItem>Team</DropdownMenuItem>
               <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
