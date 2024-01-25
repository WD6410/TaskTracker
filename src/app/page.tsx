import TaskForm from "@/components/TaskForm";
import Tasks from "@/components/Tasks";
import Clock from "@/components/Clock";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex justify-center items-center w-2/5 h-screen">
        <div className="fixed flex flex-col items-center w-2/5 gap-10 p-10">
          <Clock />
          <TaskForm />
        </div>
      </div>
      <Tasks />
    </div>
  )
}


