"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskInput } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type TaskFormProps = {
  defaultValues?: TaskInput & { id?: string };
  onSuccess?: () => void;
};

export default function TaskForm({ defaultValues, onSuccess }: TaskFormProps) {
  const queryClient = useQueryClient();
  const isEditMode = !!defaultValues?.id;

  console.log("defaultValues", defaultValues);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    // defaultValues: {
    //   ...defaultValues,
    //   status: "To Do",
    //   priority: "Medium",
    // },
    defaultValues: {
      ...defaultValues,
      status: defaultValues?.status ?? "To Do",
      priority: defaultValues?.priority ?? "Low",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: TaskInput) => {
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/api/tasks/${defaultValues!.id}`
        : "/api/tasks";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
      toast.success(
        isEditMode ? "Task updated successfully!" : "Task created successfully!"
      );
      onSuccess?.();
    },
  });

  const onSubmit = (data: TaskInput) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter task title"
        />
        {errors.title && (
          <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Optional description"
        />
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          onValueChange={(val: "To Do" | "In Progress" | "Done") =>
            setValue("status", val)
          }
          defaultValue={defaultValues?.status ?? "To Do"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Priority */}
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select
          onValueChange={(val: "Low" | "Medium" | "High") =>
            setValue("priority", val)
          }
          defaultValue={defaultValues?.priority ?? "Medium"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Due Date */}
      <div>
        <Label htmlFor="dueDate">Due Date</Label>
        <Input id="dueDate" type="date" {...register("dueDate")} />
      </div>

      {/* Assignee */}
      <div>
        <Label htmlFor="assignee">Assignee</Label>
        <Input
          id="assignee"
          {...register("assignee")}
          placeholder="e.g. John Doe"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
      >
        {isEditMode ? "Update Task" : "Add Task"}
      </Button>
    </form>
  );
}
