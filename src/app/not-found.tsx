import Link from "next/link"

export default function notFound() {
  return (
    <main className="flex justify-center items-center h-[70vh]">
      <div className="flex flex-col items-center bg-[#0a0a0a] rounded-xl p-10">
        <h2 className="font-bold text-2xl mb-10">Page not found</h2>
        <Link className="font-bold underline" href="/">Back home</Link>
      </div>
    </main>
  )
}