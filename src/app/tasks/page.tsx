import prisma from "@/lib/database"

import { auth } from "@clerk/nextjs";
import { format } from 'date-fns';

import { columns } from "./components/columns"

import { DataTable } from "@/components/ui/data-table";

import Clock from "@/components/clock";
import CreateTask from "@/components/create-task";

const loadTasks = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User ID is not available");
  }

  const tasks = await prisma.task.findMany({
    where: { uid: userId }
  });

  return tasks.map(task => {
    return {
      ...task,
      id: task.id.toString(),
      startDate: task.startDate ? format(new Date(task.startDate), 'MMM d, yyyy') : null,
      endDate: task.endDate ? format(new Date(task.endDate), 'MMM d, yyyy') : null,
      createdAt: format(new Date(task.createdAt), 'MMM d, yyyy'),
    };
  });
}

export default async function TasksPage() {
  const tasks = await loadTasks();

  return (
    <div className="space-y-4 px-8">
      <div className="w-full flex items-center justify-between">
        <Clock />
        <CreateTask />
      </div>
      <div className="w-full bg-black bg-opacity-40 backdrop-blur-xl p-5 mb-4 rounded-xl animate-fade-left">
        <DataTable columns={columns} data={tasks} />
      </div>
    </div>
  )
}