import Link from "next/link"

export default function Home() {
  return (
    <main className="flex justify-center items-center h-[70vh]">
      <div className="bg-[#0a0a0a] rounded-xl p-10">
        <h2 className="text-2xl text-center mb-4">TASKTRAKER</h2>
        <p>
          with TASKTRACKER create, review, update and delete your tasks
          <br />
          <Link className="font-semibold text-blue-500 text-lg hover:underline" href="/sign-up">Create an account </Link>
          or <Link className="font-semibold text-blue-500 text-lg hover:underline" href="/sign-in">Sing in</Link> to get started.
        </p>
      </div>
    </main>
  )
}


