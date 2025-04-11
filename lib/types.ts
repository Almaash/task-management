export type Task = {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  createdAt: string
  dueDate?: string
  completedAt?: string
  subtasks: SubTask[]
}

export type SubTask = {
  id: string
  title: string
  completed: boolean
}

