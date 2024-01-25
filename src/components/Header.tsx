import Link from "next/link"

export default function Header() {
  return (
    <header className="z-10 sticky top-0 bg-[#0a0a0a] p-2">
      <Link href="/">
        <h1 className="text-3xl text-center font-semibold hover:underline">
          TASKTRAKER
        </h1>
      </Link>
    </header>
  )
}