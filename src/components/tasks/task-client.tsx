"use client"

import { useState } from 'react'
import { Task } from '@prisma/client'
import Link from 'next/link';
import {
  ArrowLeft,
  Edit,
  Trash
} from 'lucide-react';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import EditTask from './edit-task';
import DeleteAlert from "./delete-task";

export default function TaskClient({ task }: { task: Task }) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const details = [
    { key: 'Created At', value: task.createdAt.toLocaleTimeString() },
    { key: 'Start Date', value: task.startDate?.toLocaleTimeString() },
    { key: 'End Date', value: task.endDate?.toLocaleTimeString() },
    { key: 'Priority', value: task.priority },
    { key: 'Status', value: task.status },
  ]

  return (
    <>
      <div className='mx-auto lg:w-3/4 space-y-4'>
        <Link
          href="/tasks"
          className='inline-flex gap-2 border px-3 py-2 rounded-md font-semibold bg-white text-black'
        >
          <ArrowLeft className="h-6 w-6" />
          Tasks
        </Link>
        <div className="flex gap-8 rounded-xl p-10 animate-fade-left bg-black bg-opacity-5 backdrop-blur-sm">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-10 border-b pb-8 pr-8">
              <h1 className="text-5xl font-bold">{task.title}</h1>
              <span
                className='hover:opacity-50 transition-opacity duration-200 ease-in-out cursor-pointer'
                onClick={() => setOpenEdit(true)}
              >
                <Edit className="h-6 w-6" />
              </span>
              <span
                className='hover:opacity-50 transition-opacity duration-200 ease-in-out cursor-pointer'
                onClick={() => setOpenDelete(true)}
              >
                <Trash className="h-6 w-6" />
              </span>
            </div>
            <Markdown
              className="w-full prose dark:prose-invert"
              remarkPlugins={[remarkGfm]}
            >
              {task?.description || "Task without description"}
            </Markdown>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-semibold">Details:</h2>
            <ul className="space-y-5">
              {details.map((detail) => (
                <li key={detail.key}>
                  <p>
                    <b>{detail.key}:</b> {detail.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <EditTask
        task={task}
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
      />

      <DeleteAlert
        taskId={task.id}
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
      />
    </>
  )
}
