import { tasks } from "@/lib/task-data";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = tasks.findIndex((t) => t.id === params.id);
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const deleted = tasks.splice(index, 1);
  return NextResponse.json(deleted[0]);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const updated = await req.json();
  const index = tasks.findIndex((t) => t.id === params.id);
  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  tasks[index] = { ...tasks[index], ...updated };
  return NextResponse.json(tasks[index]);
}
