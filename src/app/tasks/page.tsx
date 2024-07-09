import prisma from "@/lib/database"

import { auth } from "@clerk/nextjs";

import Clock from "@/components/clock";
import CreateTask from "@/components/tasks/create-task";
import { columns } from "@/components/tasks/columns"
import { DataTable } from "@/components/ui/data-table";

const loadTasks = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User ID is not available");
  }

  const tasks = await prisma.task.findMany({
    where: { uid: userId }
  });

  return tasks;
}

export default async function TasksPage() {
  const tasks = await loadTasks();

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Clock />
        <CreateTask />
      </div>
      <div className="w-full bg-black bg-opacity-40 backdrop-blur-xl p-5 mb-4 rounded-xl animate-fade-left">
        <DataTable columns={columns} data={tasks} />
      </div>
    </>
  )
}