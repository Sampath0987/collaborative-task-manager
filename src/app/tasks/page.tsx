"use client";
import TaskFilterBar from "@/components/task-filter-bar";
import TaskBoard from "./task-board";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import TaskForm from "./task-form";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [open, setOpen] = useState(false);

  console.log("status", status);
  return (
    <section className=" container mx-auto mt-24 pb-12 space-y-10 md:space-y-15 px-5">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>
      <TaskFilterBar
        // search={search}
        // status={status}
        // priority={priority}
        // setSearch={setSearch}
        // setStatus={setStatus}
        // setPriority={setPriority}
        onOpenAdd={() => setOpen(true)}
      />
      <TaskBoard
      //   search={search} status={status} priority={priority}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogTitle className="text-lg font-semibold mb-2">
            Create New Task
          </DialogTitle>
          <TaskForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
