import Link from "next/link"

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `TASKTRAKER`;

export default function Home() {
  return (
    <main className="flex justify-center items-center h-[70vh]">
      <div className="flex flex-col items-center bg-[#0a0a0a] rounded-xl p-10">
        <TextGenerateEffect words={words} />
        <div className="p-5">
          <Link className="font-semibold text-blue-500 text-lg hover:underline" href="/sign-up">Create an account </Link>
          or <Link className="font-semibold text-blue-500 text-lg hover:underline" href="/sign-in">Sing in</Link> to get started.
        </div>
      </div>
    </main>
  )
}


