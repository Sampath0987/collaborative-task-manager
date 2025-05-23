"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "@/store/filterStore";

export default function TaskFilterBar({
  //   search,
  //   status,
  //   priority,
  //   setSearch,
  //   setStatus,
  //   setPriority,
  onOpenAdd,
}: {
  //   search: string;
  //   status: string;
  //   priority: string;
  //   setSearch: (v: string) => void;
  //   setStatus: (v: string) => void;
  //   setPriority: (v: string) => void;
  onOpenAdd: () => void;
}) {
  //   const clearFilters = () => {
  //     setSearch("");
  //     setStatus("");
  //     setPriority("");
  //   };

  const {
    search,
    status,
    priority,
    setSearch,
    setStatus,
    setPriority,
    clearFilters,
  } = useFilterStore();

  return (
    // <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      {/* Search */}
      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />

      {/* Filters */}
      {/* <div className="flex items-center gap-3"> */}
      <div className="flex flex-wrap gap-3 items-center justify-start w-full md:justify-end">
        <Select onValueChange={setStatus} value={status}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setPriority} value={priority}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>

        {/* Add Task Button */}
        <Button
          onClick={onOpenAdd}
          className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
        >
          + Add Task
        </Button>

        {/* Clear Filters Button */}
        {(search || status || priority) && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="border-gray-400 text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
