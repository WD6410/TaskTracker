"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Task {
  id: string
  title: string;
  description: string;
  dtc: Date;
  createdAt: Date;
  done: boolean;
  uid: string;
}

export default function Tasks({ tasks }: { tasks: Task[] }) {
  const [order, setOrder] = useState('date to complete');

  const sortTasks = (orderBy: string) => {
    switch (orderBy) {
      case 'date to complete':
        return tasks.slice().sort((a, b) => new Date(a.dtc).getTime() - new Date(b.dtc).getTime());
      case 'done':
        return tasks.slice().sort((a, b) => a.done ? -1 : 1);
      default:
        return tasks;
    }
  };

  const sortedTasks = sortTasks(order);

  return (
    <div className="flex flex-col items-end gap-5 w-3/5 p-10">
      <div className="flex gap-2">
        <Select onValueChange={setOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="date to complete">Date to complete</SelectItem>
              <SelectItem value="createdAt">CreatedAt</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        {sortedTasks.map((task) => (
          <Link
            key={task.id}
            className="flex flex-col justify-between gap-3 p-5 rounded-xl bg-black bg-opacity-40 hover:bg-opacity-70 backdrop-blur-xl duration-300 ease-in-out"
            href={`/tasks/${task.id}`}
          >
            <h3 className="text-3xl font-bold">{task.title.toUpperCase()}</h3>
            <p>{task.description}</p>
            <p>
              Date to complete: <b className={new Date(task.dtc) < new Date() && !task.done ? 'text-yellow-500' : ''}>
                {new Date(task.dtc).toLocaleDateString()}
                {new Date(task.dtc) < new Date() && !task.done ? <small> expired</small> : null}
              </b>
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
    </div>
  )
}