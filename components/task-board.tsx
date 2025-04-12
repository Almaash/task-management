"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTaskStore } from "@/lib/task-store"
import { TaskItem } from "@/components/task-item"
import { CreateTaskDialog } from "@/components/create-task-dialog"
import { TaskDetailsDialog } from "@/components/task-details-dialog"
import type { Task } from "@/lib/types"

export function TaskBoard() {
  const { tasks, moveTask, getTasksByStatus, searchTerm, filterTasks } = useTaskStore()
  const [createTaskOpen, setCreateTaskOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const filteredTasks = filterTasks(tasks, searchTerm)

  const todoTasks = getTasksByStatus("todo", filteredTasks)
  const inProgressTasks = getTasksByStatus("in-progress", filteredTasks)
  const completedTasks = getTasksByStatus("completed", filteredTasks)

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    moveTask(draggableId, source.droppableId, destination.droppableId)
  }

  const handleCreateTask = (status: string) => {
    setSelectedStatus(status)
    setCreateTaskOpen(true)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid gap-4 grid-cols-4">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="text-lg font-semibold">To Do</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleCreateTask("todo")}>
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only">Add task</span>
                </Button>
              </CardHeader>
              <CardContent className="px-2 pb-2">
                <Droppable droppableId="complete" isDropDisabled={false} isCombineEnabled ignoreContainerClipping  >
                  {(provided:any) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px] space-y-2 p-1">
                      {todoTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided:any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setSelectedTask(task)}
                            >
                              <TaskItem task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {todoTasks.length === 0 && (
                        <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                          <p className="text-sm text-muted-foreground">No tasks</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="text-lg font-semibold">In Progress</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleCreateTask("in-progress")}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only">Add task</span>
                </Button>
              </CardHeader>
              <CardContent className="px-2 pb-2">
                <Droppable droppableId="in-progress">
                  {(provided:any) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px] space-y-2 p-1">
                      {inProgressTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided:any) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setSelectedTask(task)}
                            >
                              <TaskItem task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {inProgressTasks.length === 0 && (
                        <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                          <p className="text-sm text-muted-foreground">No tasks</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="text-lg font-semibold">Completed</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleCreateTask("completed")}>
                  <PlusCircle className="h-4 w-4" />
                  <span className="sr-only">Add task</span>
                </Button>
              </CardHeader>
              <CardContent className="px-2 pb-2">
                <Droppable droppableId="">
                  {(provided:any) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[200px] space-y-2 p-1">
                      {completedTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setSelectedTask(task)}
                            >
                              <TaskItem task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {completedTasks.length === 0 && (
                        <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                          <p className="text-sm text-muted-foreground">No tasks</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
        </div>
      </DragDropContext>

      <CreateTaskDialog open={createTaskOpen} onOpenChange={setCreateTaskOpen} defaultStatus={selectedStatus} />

      {selectedTask && (
        <TaskDetailsDialog
          task={selectedTask}
          open={!!selectedTask}
          onOpenChange={(open) => {
            if (!open) setSelectedTask(null)
          }}
        />
      )}
    </>
  )
}

