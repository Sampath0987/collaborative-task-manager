"use client";

import { useQuery } from "@tanstack/react-query";
import { Task } from "@/types/task";

import { getTasks } from "@/api/tasks";
import TaskCard from "@/components/task-card";
import { useFilterStore } from "@/store/filterStore";

export default function TaskBoard({}: // search,
// status,
// priority,
{
  // search: string;
  // status: string;
  // priority: string;
}) {
  const { search, status, priority } = useFilterStore();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", search, status, priority],
    queryFn: () => getTasks(search, status, priority),
  });

  const statuses: Task["status"][] = ["To Do", "In Progress", "Done"];

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* {statuses.map((status) => (
        <div key={status} className="bg-gray-100 p-3 rounded">
          <h2 className="font-semibold mb-2">{status}</h2>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ))} */}

      {statuses.map((s) => (
        <div key={s} className="bg-gray-100 p-3 rounded">
          <h2 className="font-semibold mb-2">{s}</h2>
          {tasks
            .filter((task) => task.status === s)
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
}
