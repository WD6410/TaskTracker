import Link from "next/link"
import { currentUser, UserButton } from '@clerk/nextjs';

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="z-10 sticky top-0 flex justify-around items-center bg-[#0a0a0a] h-20 p-2">
      <Link href="/">
        <h1 className="text-3xl text-center font-semibold hover:underline">
          TASKTRAKER
        </h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-7">
          <li>
            <Link className="font-semibold rounded-lg hover:underline" href="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link className="font-semibold rounded-lg hover:underline" href="/tasks">Tasks</Link>
              </li>
              <UserButton afterSignOutUrl='/' />
            </>
          ) : (
            <>
              <li>
                <Link className="font-semibold rounded-lg hover:underline" href="/sign-in">Sign In</Link>
              </li>
              <li>
                <Link className="font-semibold rounded-lg hover:underline" href="/sign-up">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}