"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ListTodo, MoreHorizontal, PlayCircle } from "lucide-react"
import { useTaskStore } from "@/lib/task-store"
import { TaskItem } from "@/components/task-item"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function Dashboard() {
  const { tasks, getTasksByStatus } = useTaskStore()

  const todoTasks = getTasksByStatus("todo")
  const inProgressTasks = getTasksByStatus("in-progress")
  const completedTasks = getTasksByStatus("completed")

  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0

  return (
    <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Task Overview</CardTitle>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <ListTodo className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">To Do</p>
                <p className="text-2xl font-bold">{todoTasks.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500/10">
                <PlayCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressTasks.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Completion Rate</p>
              <p className="text-sm font-medium">{completionRate}%</p>
            </div>
            <Progress value={completionRate} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2 md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>Tasks due soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status !== "completed")
              .sort((a, b) => {
                if (!a.dueDate || !b.dueDate) return 0
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
              })
              .slice(0, 3)
              .map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            {tasks.filter((task) => task.status !== "completed").length === 0 && (
              <p className="text-sm text-muted-foreground">No upcoming tasks</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Recently Completed</CardTitle>
          <CardDescription>Tasks you've completed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedTasks
              .sort((a, b) => {
                if (!a.completedAt || !b.completedAt) return 0
                return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
              })
              .slice(0, 3)
              .map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            {completedTasks.length === 0 && <p className="text-sm text-muted-foreground">No completed tasks</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

