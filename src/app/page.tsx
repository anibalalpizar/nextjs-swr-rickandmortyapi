import Link from "next/link"

function page() {
  return (
    <div>
      <h1 className="text-center mb-4">Rick and Morty</h1>
      <Link href="/characters/1" className="link-dark">
        Go to first page
      </Link>
    </div>
  )
}

export default page
