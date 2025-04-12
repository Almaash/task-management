"use client";

import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Settings,
  LogOut,
  PlusCircle,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateTaskDialog } from "@/components/create-task-dialog";
import Link from "next/link";

interface AppHeaderProps {
  activeView: "dashboard" | "board" | "calendar";
  setActiveView: (view: "dashboard" | "board" | "calendar") => void;
}

export function AppSidebar({ activeView, setActiveView }: AppHeaderProps) {
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex flex-col gap-4 px-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <CheckSquare className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">TaskFlow</span>
            <SidebarTrigger className="ml-auto" />
          </div>
          <Button
            className="w-full justify-start gap-2"
            onClick={() => setCreateTaskOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            Create Task
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveView("dashboard")}
                    className={
                      activeView === "dashboard"
                        ? "bg-gray-700 text-white"
                        : "hover:bg-muted"
                    }
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveView("board")}
                    className={
                      activeView === "board"
                        ? "bg-gray-700 text-white"
                        : "hover:bg-muted"
                    }
                  >
                    <CheckSquare className="h-4 w-4" />
                    <span>Tasks</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveView("calendar")}
                    className={
                      activeView === "calendar"
                        ? "bg-gray-700 text-white"
                        : "hover:bg-muted"
                    }
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Tags</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="flex justify-start items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 cursor-default" />
                    <span>Important</span>
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div className="flex justify-start items-center space-x-2 mt-1">
                    {" "}
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span>Personal</span>
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div className="flex justify-start items-center space-x-2 mt-1">
                    {" "}
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Work</span>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <CreateTaskDialog
        open={createTaskOpen}
        onOpenChange={setCreateTaskOpen}
      />
    </>
  );
}
