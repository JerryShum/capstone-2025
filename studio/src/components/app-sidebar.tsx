import * as React from 'react';
import {
   ChevronUp,
   Home,
   Video,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import logo from '/story_weaver_logo_2.svg';
import { authClient } from '@/lib/auth-client';

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarMenuSub,
   SidebarMenuSubButton,
   SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navMain: {
   title: string;
   url: string;
   icon: React.ElementType;
   items?: { title: string; url: string; isActive?: boolean }[];
}[] = [
      { title: 'Home', url: '/', icon: Home },
      { title: 'Videos', url: '/videos', icon: Video },
      // { title: 'Dashboard',       url: '/dashboard',  icon: LayoutDashboard },
      // { title: 'Getting Started', url: '#',           icon: BookOpen },
      // { title: 'Projects',        url: '#',           icon: FolderOpen },
      // { title: 'Assets',          url: '#',           icon: ImageIcon },
      // { title: 'Settings',        url: '#',           icon: Settings },
   ];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const { data: session } = authClient.useSession();
   const user = session?.user;

   // Derive initials from real name, fall back to 'U'
   const initials = user?.name
      ? user.name
         .split(' ')
         .map((n) => n[0])
         .join('')
         .toUpperCase()
         .slice(0, 2)
      : 'U';

   return (
      <Sidebar variant="floating" {...props} className="">
         <SidebarHeader className="h-20 border-b">
            <div className="flex h-full items-center gap-2.5 px-4">
               <img className="h-10 w-10" src={logo} alt="StoryWeaver Logo" />
               <span className="text-2xl font-bold">StoryWeaver</span>
            </div>
         </SidebarHeader>
         <SidebarContent>
            <SidebarGroup>
               <SidebarMenu className="gap-2">
                  {navMain.map((item) => (
                     <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                           <Link to={item.url} className="flex items-center gap-2 font-medium">
                              <item.icon className="h-4 w-4 shrink-0" />
                              {item.title}
                           </Link>
                        </SidebarMenuButton>
                        {item.items?.length ? (
                           <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                              {item.items.map((sub) => (
                                 <SidebarMenuSubItem key={sub.title}>
                                    <SidebarMenuSubButton
                                       asChild
                                       isActive={sub.isActive}
                                    >
                                       <a href={sub.url}>{sub.title}</a>
                                    </SidebarMenuSubButton>
                                 </SidebarMenuSubItem>
                              ))}
                           </SidebarMenuSub>
                        ) : null}
                     </SidebarMenuItem>
                  ))}
               </SidebarMenu>
            </SidebarGroup>
         </SidebarContent>
         <SidebarFooter className="border-t">
            <SidebarMenu>
               <SidebarMenuItem>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild className="py-8">
                        <SidebarMenuButton className="">
                           {/* USER AVATAR */}
                           <div className="flex min-w-0 items-center gap-2">
                              <Avatar className="h-10 w-10 shrink-0">
                                 <AvatarImage
                                    src={user?.image ?? undefined}
                                    alt={user?.name ?? 'User'}
                                 />
                                 <AvatarFallback className="text-sm font-semibold">
                                    {initials}
                                 </AvatarFallback>
                              </Avatar>
                              <div className="flex min-w-0 flex-col">
                                 <p className="truncate text-sm font-bold">
                                    {user?.name || 'User'}
                                 </p>
                                 <p className="truncate text-xs text-muted-foreground">
                                    {user?.email || 'No email'}
                                 </p>
                              </div>
                           </div>
                           <ChevronUp className="ml-auto shrink-0" />
                        </SidebarMenuButton>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent
                        side="top"
                        className="w-[--radix-popper-anchor-width]"
                     >
                        {/* <DropdownMenuItem>
                           <span>Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <span>Billing</span>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                           onClick={() =>
                              authClient.signOut({
                                 fetchOptions: {
                                    onSuccess: () => {
                                       window.location.href = '/';
                                    },
                                 },
                              })
                           }
                        >
                           <span>Sign out</span>
                        </DropdownMenuItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>
      </Sidebar>
   );
}
