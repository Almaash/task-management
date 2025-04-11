"use client"

import { Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-slate-500"
      case "in-progress":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <Card className="cursor-pointer transition-all hover:shadow-md">
      <CardHeader className="p-3 pb-0">
        <CardTitle className="line-clamp-1 text-sm font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        <p className="line-clamp-2 text-xs text-muted-foreground">{task.description || "No description"}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-3 pt-0">
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`} />
          <span className="text-xs text-muted-foreground">
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

