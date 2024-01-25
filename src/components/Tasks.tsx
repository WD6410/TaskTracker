import TaskModel, { ITask } from "@/models/Task";
import { connectionDB } from "@/lib/database";
import Link from "next/link";

const loadTasks = async () => {
  connectionDB();
  const tasks: ITask[] = await TaskModel.find().lean();
  return tasks;
}

export default async function Tasks() {
  const tasks = await loadTasks();

  return (
    <div className="flex flex-wrap justify-center md:w-3/5 gap-10 p-5 md:p-10">
      {tasks.map((task, index) => (
        <Link
          key={index}
          className="flex flex-col justify-between gap-3 w-full md:w-1/2 xl:w-1/3 p-5 rounded-xl bg-black bg-opacity-40 hover:bg-opacity-70 backdrop-blur-xl duration-300 ease-in-out"
          href={`/tasks/${task._id}`}
        >
          <h3 className="text-3xl font-bold">{task.title}</h3>
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