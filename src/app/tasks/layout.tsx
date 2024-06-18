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
    <>
      <div className="fixed -z-10 top-0 left-0 h-full w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]" />
      <div className="fixed -z-10 pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <main className="space-y-4 px-14 py-10">
        {children}
      </main>
    </>
  )
}