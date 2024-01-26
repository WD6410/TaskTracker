"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    }),
  dtc: z.date({
    required_error: "A date to complete is required.",
  }),
  done: z.boolean().default(false).optional(),
})

export default function TaskForm() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dtc: new Date(),
      done: false
    },
  });

  useEffect(() => {
    const loadDataTask = async () => {
      if (params.id) {
        const res = await fetch(`/api/tasks/${params.id}`)
        const data = await res.json()

        form.setValue("title", data.title);
        form.setValue("description", data.description);
        form.setValue("dtc", new Date(data.dtc));
        form.setValue("done", data.done);
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

        if (res.ok) {
          console.log(await res.json());
          router.refresh();
        }
      } else {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          }
        })

        if (res.ok) {
          router.push('/tasks');
          router.refresh()
          console.log(await res.json());
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (window.confirm("Seguro que quieres eliminar esa tarea?")) {
        const res = await fetch(`/api/tasks/${params.id}`, { method: "DELETE" })

        if (res.ok) {
          router.push('/tasks');
          router.refresh()
          console.log(await res.json());
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md w-full flex flex-col gap-4 p-10 rounded-xl bg-black bg-opacity-40 backdrop-blur-xl"
      >
        {!params.id ? (
          <h2 className="text-2xl font-semibold text-center">CREATE TASKS</h2>
        ) : (
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-center">EDIT TASK</h2>
            <Button
              className="rounded-xl"
              variant={"destructive"}
              onClick={handleDelete}
              disabled={isLoading}
            >
              {!isLoading ? "Delete" : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
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
                  className="resize-none rounded-xl"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dtc"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date to complete</FormLabel>
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
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {params.id && (
          <FormField
            control={form.control}
            name="done"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0 rounded-xl p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    done
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

        )}
        <Button
          type="submit"
          className="w-full rounded-xl"
          variant={"outline"}
          disabled={isLoading}
        >
          {!isLoading ? "Submit" : <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  )
}