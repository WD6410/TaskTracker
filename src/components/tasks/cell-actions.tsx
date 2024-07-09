"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { Task } from "@prisma/client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import EditTask from "@/components/tasks/edit-task";
import DeleteAlert from "@/components/tasks/delete-task";

interface CellActionProps {
  data: Task
}

export default function CellAction({ data }: CellActionProps) {
  const router = useRouter();

  const [openAlert, setOpenAlert] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setOpenAlert(false)
  }

  const handleDelete = async () => {
    try {
      setLoading(true);
      await fetch(`/api/tasks/${data.id}`, { method: "DELETE" })
      router.refresh();
      toast.success('Task deleted successfully.');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenEdit(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenAlert(true)}>
            <Trash className="mr-2 h-4 w-4 " />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTask
        task={data}
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
      />

      <DeleteAlert
        isOpen={openAlert}
        loading={loading}
        onClose={onClose}
        onConfirm={handleDelete}
      />
    </>
  )
}
