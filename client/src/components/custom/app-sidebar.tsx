import * as React from "react";
import { ChevronUp, GalleryVerticalEnd, User2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "/story_weaver_logo_2.svg";

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
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Getting Started",
      url: "#",
    },
    {
      title: "Projects",
      url: "#",
    },
    {
      title: "Assets",
      url: "#",
    },
    {
      title: "Settings",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props} className="">
      <SidebarHeader className="h-20 border-b">
        <div className="flex items-center gap-2 p-2">
          <img className="h-10" src={logo} />
          <span className="text-2xl font-bold">StoryWeaver</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
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
                  {/* //! USER AVATAR */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgcdn.stablediffusionweb.com%2F2024%2F4%2F12%2F59c5bcbb-fde1-497f-bec0-386acbe8d655.jpg&f=1&nofb=1&ipt=67193b28ec4a88b128c1382aa8c6e697328fbd5e0c7cdad29ebadb27fed66295"
                        alt="tonystark"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>{" "}
                    <div className="flex flex-col">
                      <p className="text-[16px] font-bold">John Doe</p>
                      <p>john@example.com</p>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
