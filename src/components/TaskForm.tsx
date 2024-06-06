"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import Link from "next/link"

import { format } from "date-fns"
import { ArrowLeft, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not be longer than 500 characters.",
    }),
  priority: z.string({
    required_error: "Select the task priority",
  }),
  status: z.string({
    required_error: "Select the task status",
  }),
  startDate: z.date().optional().nullable(),
  endDate: z.date().optional().nullable()
})

export default function TaskForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "todo",
    },
  });

  useEffect(() => {
    const loadDataTask = async () => {
      if (params.id) {
        const res = await fetch(`/api/tasks/${params.id}`)
        const data = await res.json()

        form.setValue("title", data.title);
        form.setValue("description", data.description);
        form.setValue("priority", data.priority);
        form.setValue("status", data.status);
        if (data.startDate) {
          form.setValue("startDate", new Date(data.startDate));
        }
        if (data.endDate) {
          form.setValue("endDate", new Date(data.endDate));
        }
      }
    };

    loadDataTask();
  }, [])

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (!params.id) {
        const res = await fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          }
        })

        const data = await res.json();

        if (res.ok) {
          toast.success(data.msg);
          router.refresh();
        } else {
          toast.error(data.msg);
        }
      } else {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          }
        })

        const data = await res.json();

        if (res.ok) {
          router.push('/tasks');
          toast.success(data.msg);
          router.refresh()
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`w-full ${params.id ? "max-w-3xl" : null} flex flex-col gap-4 p-10 rounded-xl bg-black bg-opacity-40 backdrop-blur-xl animate-fade`}
      >
        {!params.id ? (
          <h2 className="text-2xl font-semibold text-center">CREATE TASKS</h2>
        ) : (
          <h2 className="text-2xl font-semibold text-center">EDIT TASK</h2>
        )}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    type="text"
                    className="rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of the task"
                  className="max-h-56 rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the task priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {params.id && (
          <>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the task priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="todo">Todo</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="rounded-xl">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value !== null && field.value !== undefined ? field.value : undefined}
                        onSelect={(date) => field.onChange(date || null)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="rounded-xl">
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value !== null && field.value !== undefined ? field.value : undefined}
                        onSelect={(date) => field.onChange(date || null)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="flex items-center gap-5">
          {params.id && (
            <Link
              href="/tasks"
              className="flex items-center gap-1 py-2 px-3 rounded-md border hover:underline hover:bg-[#262626] transition duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          )}
          <Button
            type="submit"
            className="w-full rounded-xl"
            variant={"outline"}
            disabled={isLoading}
          >
            {!isLoading ? "Submit" : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  )
}