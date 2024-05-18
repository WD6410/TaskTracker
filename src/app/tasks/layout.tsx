import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'TASKTRAKER - TASKS',
}

export default function TasksDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex gap-5 pt-14 px-5 overflow-x-hidden">
      {children}
    </main>
  )
}