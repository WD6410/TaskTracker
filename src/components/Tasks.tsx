import TaskModel, { ITask } from "@/models/Task";
import { connectionDB } from "@/lib/database";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

const loadTasks = async () => {
  connectionDB();

  const { userId } = auth();

  const tasks: ITask[] = await TaskModel.find({ uid: userId }).lean();
  return tasks;
}

export default async function Tasks() {
  const tasks = await loadTasks();

  return (
    <div className="grid grid-cols-3 gap-10 justify-center w-3/5 p-10">
      {tasks.map((task, index) => (
        <Link
          key={index}
          className="flex flex-col justify-between gap-3 h-[350px] w-full p-5 rounded-xl bg-black bg-opacity-40 hover:bg-opacity-70 backdrop-blur-xl duration-300 ease-in-out"
          href={`/tasks/${task._id}`}
        >
          <h3 className="text-3xl font-bold">{task.title.toUpperCase()}</h3>
          <p>{task.description}</p>
          <p>
            Date to complete: <b>{new Date(task.dtc).toLocaleDateString()}</b>
          </p>
          <p>
            Created At: <b>{new Date(task.createdAt).toLocaleDateString()}</b>
          </p>
          <p className={task.done ? "text-green-500" : "text-red-500"}>
            <b>{task.done ? "done" : "not done"}</b>
          </p>
        </Link>
      ))}
    </div>
  )
}