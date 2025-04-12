"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { Dashboard } from "@/components/dashboard"
import { TaskBoard } from "@/components/task-board"

export function DashboardShell() {
  const [activeView, setActiveView] = useState<"dashboard" | "board" | "calendar">("dashboard")

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar activeView={activeView} setActiveView={setActiveView}/>
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {activeView === "dashboard" ? <Dashboard /> : <TaskBoard />}
        </main>
      </div>
    </div>
  )
}

