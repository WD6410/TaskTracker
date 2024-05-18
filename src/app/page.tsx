import Link from "next/link"

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Vortex } from "@/components/ui/vortex";

const words = `A fullstack platform to manage your tasks and be more efficient`;

export default function Home() {
  return (
    <main className="h-[90vh] overflow-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center w-full h-full"
      >
        <h2 className="text-7xl font-bold animate-fade animate-duration-[2000ms] animate-delay-[600ms]">TASKTRAKER</h2>
        <TextGenerateEffect words={words} />
        <div className="pt-5 animate-fade animate-delay-[2000ms]">
          <Link className="font-semibold text-blue-500 text-lg hover:underline" href="/sign-up">Create an account </Link>
          or <Link className="font-semibold text-blue-500 text-lg hover:underline" href="/sign-in">Sing in</Link> to get started.
        </div>
      </Vortex>
    </main>
  )
}


