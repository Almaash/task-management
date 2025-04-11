"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTaskStore } from "@/lib/task-store"
import type { Task, SubTask } from "@/lib/types"
import { toast } from "sonner"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

interface TaskDetailsDialogProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDetailsDialog({ task, open, onOpenChange }: TaskDetailsDialogProps) {
  const { updateTask, deleteTask } = useTaskStore()

  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || "")
  const [priority, setPriority] = useState<Task["priority"]>(task.priority)
  const [status, setStatus] = useState<Task["status"]>(task.status)
  const [dueDate, setDueDate] = useState<Date | undefined>(task.dueDate ? new Date(task.dueDate) : undefined)
  const [subtasks, setSubtasks] = useState<SubTask[]>(task.subtasks || [])
  const [newSubtask, setNewSubtask] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Please enter a task title")
      return
    }

    const updatedTask: Task = {
      ...task,
      title,
      description,
      priority,
      status,
      dueDate: dueDate ? dueDate.toISOString() : undefined,
      completedAt: status === "completed" ? new Date().toISOString() : task.completedAt,
      subtasks,
    }

    updateTask(updatedTask)
    toast.success("Task updated successfully")
    onOpenChange(false)
  }

  const handleDelete = () => {
    deleteTask(task.id)
    toast.success("Task deleted successfully")
    onOpenChange(false)
  }

  const addSubtask = () => {
    if (!newSubtask.trim()) return

    const newSubtaskItem: SubTask = {
      id: crypto.randomUUID(),
      title: newSubtask,
      completed: false,
    }

    setSubtasks([...subtasks, newSubtaskItem])
    setNewSubtask("")
  }

  const toggleSubtask = (id: string) => {
    setSubtasks(
      subtasks.map((subtask) => (subtask.id === id ? { ...subtask, completed: !subtask.completed } : subtask)),
    )
  }

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
            <DialogDescription>View and edit task details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={(value: Task["priority"]) => setPriority(value)}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: Task["status"]) => setStatus(value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label>Subtasks</Label>
              <div className="space-y-2">
                {subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2">
                    <Checkbox
                      id={subtask.id}
                      checked={subtask.completed}
                      onCheckedChange={() => toggleSubtask(subtask.id)}
                    />
                    <Label
                      htmlFor={subtask.id}
                      className={cn(
                        "flex-1 text-sm font-normal",
                        subtask.completed && "line-through text-muted-foreground",
                      )}
                    >
                      {subtask.title}
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeSubtask(subtask.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Add a subtask"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSubtask()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addSubtask}>
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex items-center justify-between">
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

