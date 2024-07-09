import prisma from "@/lib/database";

import { auth } from "@clerk/nextjs";

import TaskClient from "@/components/tasks/task-client";

const loadTask = async (id: string) => {
  try {
    const { userId } = auth();

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) return null;
    if (!userId || userId !== task.uid) return null;

    return task;
  } catch (error) {
    return null;
  }
}

export default async function Task({ params }: { params: { id: string } }) {
  const task = await loadTask(params.id);

  if (!task) {
    return <div>Task not found</div>
  }

  return <TaskClient task={task} />
}
