import { Metadata } from "next"

import { BackgroundBeams } from "@/components/ui/background-beams"

export const metadata: Metadata = {
  title: 'TASKTRAKER - TASKS',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="z-10 relative">
        {children}
      </main>
      <BackgroundBeams />
    </>
  )
}