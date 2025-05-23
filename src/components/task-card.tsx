"use client";

import { Task } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TaskForm from "@/app/tasks/task-form";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskCard({ task }: { task: Task }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully!");
    },
  });

  return (
    <div className="bg-white p-3 rounded shadow mb-2 relative space-y-2">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.priority}</p>
      {task.assignee && (
        <p className="text-xs text-gray-400">Assigned to: {task.assignee}</p>
      )}

      <div className="flex justify-end gap-2">
        {/* Edit Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-600 hover:bg-green-50 cursor-pointer"
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Edit Task</DialogTitle>
            <TaskForm defaultValues={task} onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>

        {/* Delete Button */}
        <Button
          className="cursor-pointer"
          size="sm"
          variant="destructive"
          onClick={() => deleteMutation.mutate()}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
