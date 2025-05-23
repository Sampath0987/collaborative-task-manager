import { tasks } from "@/lib/task-data";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// export async function GET() {
//   return NextResponse.json(tasks);
// }

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const filtered = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search);
    const matchesStatus = status ? task.status === status : true;
    const matchesPriority = priority ? task.priority === priority : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newTask = { ...data, id: uuidv4() };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}
