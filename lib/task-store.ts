"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Task } from "@/lib/types"
import { toast } from "sonner"

interface TaskState {
  tasks: Task[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  addTask: (task: Task) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, sourceStatus: string, destinationStatus: string) => void
  getTasksByStatus: (status: string, taskList?: Task[]) => Task[]
  filterTasks: (tasks: Task[], searchTerm: string) => Task[]
}

// Sample tasks for demo
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Design new dashboard layout",
    description: "Create wireframes and mockups for the new dashboard layout",
    status: "completed",
    priority: "high",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    subtasks: [
      { id: "1-1", title: "Research dashboard layouts", completed: true },
      { id: "1-2", title: "Create wireframes", completed: true },
      { id: "1-3", title: "Get feedback", completed: true },
    ],
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Set up JWT authentication for the API",
    status: "in-progress",
    priority: "high",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    subtasks: [
      { id: "2-1", title: "Research JWT implementation", completed: true },
      { id: "2-2", title: "Set up authentication routes", completed: false },
      { id: "2-3", title: "Test authentication flow", completed: false },
    ],
  },
  {
    id: "3",
    title: "Write API documentation",
    description: "Document all API endpoints and their usage",
    status: "todo",
    priority: "medium",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    subtasks: [],
  },
  {
    id: "4",
    title: "Fix responsive layout issues",
    description: "Address layout issues on mobile devices",
    status: "todo",
    priority: "low",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    subtasks: [],
  },
  {
    id: "5",
    title: "Optimize database queries",
    description: "Improve performance of slow database queries",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    subtasks: [
      { id: "5-1", title: "Identify slow queries", completed: true },
      { id: "5-2", title: "Add indexes", completed: false },
    ],
  },
]

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: sampleTasks,
      searchTerm: "",

      setSearchTerm: (term) => set({ searchTerm: term }),

      addTask: (task) => {
        set((state) => ({
          tasks: [...state.tasks, task],
        }))
      },

      updateTask: (updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      moveTask: (taskId, sourceStatus, destinationStatus) => {
        const { tasks } = get()
        const task = tasks.find((t) => t.id === taskId)

        if (!task) return

        const updatedTask: Task = {
          ...task,
          status: destinationStatus as Task["status"],
          completedAt: destinationStatus === "completed" ? new Date().toISOString() : undefined,
        }

        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
        }))

        toast.success(`Task moved to ${destinationStatus.replace("-", " ")}`)
      },

      getTasksByStatus: (status, taskList) => {
        const tasks = taskList || get().tasks
        return tasks.filter((task) => task.status === status)
      },

      filterTasks: (tasks, searchTerm) => {
        if (!searchTerm) return tasks

        const lowerCaseSearchTerm = searchTerm.toLowerCase()

        return tasks.filter(
          (task) =>
            task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            (task.description && task.description.toLowerCase().includes(lowerCaseSearchTerm)),
        )
      },
    }),
    {
      name: "task-storage",
    },
  ),
)

