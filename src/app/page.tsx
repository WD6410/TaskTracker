import Link from "next/link"

import { ArrowRight } from 'lucide-react';

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Vortex } from "@/components/ui/vortex";
import Footer from "@/components/footer";

const words = `A fullstack platform to manage your tasks and be more efficient`;

export default function Home() {
  return (
    <>
      <main className="h-[91vh] overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center w-full h-full"
        >
          <h2 className="text-7xl font-bold animate-fade animate-duration-[2000ms] animate-delay-[600ms]">TASKTRAKER</h2>
          <TextGenerateEffect words={words} />
          <div className="pt-5 animate-fade animate-delay-[2000ms]">
            <Link
              href="/tasks"
              className="flex items-center gap-1 p-3 rounded-md font-semibold text-[#8b5cf6] text-lg hover:underline bg-[#171717] hover:bg-[#262626] transition duration-200"
            >
              Create a Task
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </Vortex>
      </main>
      <Footer />
    </>
  )
}