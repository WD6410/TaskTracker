import Link from "next/link"

import { ArrowRight, Home, ListTodo } from "lucide-react";

import { currentUser, UserButton } from '@clerk/nextjs';

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="flex justify-around items-center bg-[#0a0a0a] h-20 p-2">
      <Link href="/">
        <h1 className="text-3xl text-center font-semibold hover:underline">
          TASKTRAKER
        </h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-7">
          <li>
            <Link className="flex items-center gap-1 font-semibold rounded-lg hover:underline" href="/">
              <Home className="w-4 h-4" />
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  className="flex items-center gap-1 font-semibold rounded-lg hover:underline"
                  href="/tasks">
                  <ListTodo className="w-5 h-5" />
                  Tasks
                </Link>
              </li>
              <UserButton afterSignOutUrl='/' />
            </>
          ) : (
            <>
              <Link
                href="/tasks"
                className="flex items-center gap-1 p-3 rounded-md font-semibold text-[#8b5cf6] border hover:underline hover:bg-[#262626] transition duration-200"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}