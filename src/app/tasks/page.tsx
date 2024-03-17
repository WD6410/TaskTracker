import prisma from "@/lib/database"
import { auth } from "@clerk/nextjs";

import TaskForm from "@/components/TaskForm";
import Tasks from "@/components/Tasks";
import Clock from "@/components/Clock";

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
      id: task.id.toString()
    };
  });
}

export default async function TasksPage() {
  const tasks = await loadTasks();

  return (
    <main className="flex items-start">
      <div className="flex justify-center items-center w-2/5 h-screen">
        <div className="fixed flex flex-col items-center w-2/5 gap-10 p-10">
          <Clock />
          <TaskForm />
        </div>
      </div>
      <Tasks tasks={tasks} />
    </main>
  )
}