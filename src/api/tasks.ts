import { Task } from "@/types/task";

export const getTasks = async (
  search: string,
  status: string,
  priority: string
): Promise<Task[]> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status) params.append("status", status);
  if (priority) params.append("priority", priority);

  const res = await fetch(`/api/tasks?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};
