"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Spinner } from "react-bootstrap"
import useRickMorty from "@/hooks/useRickMorty"

function Page() {
  const params = useParams()

  const characterId = parseInt(params.id as string)

  const { data: character, isLoading } = useRickMorty(characterId)

  return (
    <div className="d-flex flex-column align-items-center">
      <p>
        <Link href="/" className="link-dark">
          Back
        </Link>
      </p>
      {isLoading && <Spinner animation="grow" />}
      {character === null && <p>Character not found</p>}
      {character && (
        <>
          <h1 className="text-center text-capitalize">{character.name}</h1>
          <Image
            src={character.image}
            alt={character.name}
            width={400}
            height={400}
          />
          <div className="d-inline-block mt-2">
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Page
