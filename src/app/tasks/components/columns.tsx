"use client"

import { format } from 'date-fns';

import Link from 'next/link';

import Markdown from 'react-markdown';

import { ColumnDef } from "@tanstack/react-table"

import { priorities, statuses } from "../data/data"

import CellAction from "./actions"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"

import { Task } from "@prisma/client"

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link
          href={`/tasks/${row.original.id}`}
          className="font-semibold hover:underline"
        >
          {row.getValue("title")}
        </Link>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <Markdown
          className="w-[300px] h-10 text-neutral-400 truncate"
        >
          {row.getValue("description")}
        </Markdown>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="createdAt" />
    ),
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), 'MMM d, yyyy')
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("startDate")) {
        return (
          <p className='text-muted'>not defined</p>
        );
      }

      return format(new Date(row.getValue("startDate")), 'MMM d, yyyy')
    }
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Date" />
    ),
    cell: ({ row }) => {
      if (!row.getValue("endDate")) {
        return (
          <p className='text-muted'>not defined</p>
        );
      }

      return format(new Date(row.getValue("endDate")), 'MMM d, yyyy')
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]