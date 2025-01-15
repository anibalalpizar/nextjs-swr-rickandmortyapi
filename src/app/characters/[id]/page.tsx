"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { type FormEvent } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import useRickMorty from "@/hooks/useRickMorty"
import * as RickMortyApi from "@/network/rickAndMorty.api"

function Page() {
  const params = useParams()

  const characterId = parseInt(params.id as string)

  const { data: character, isLoading, mutate } = useRickMorty(characterId)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const name = formData.get("name")?.toString().trim()

    if (!name || !character) {
      return
    }

    const updatedCharacter = await RickMortyApi.setCharacterName(
      character,
      name
    )

    mutate(updatedCharacter, { revalidate: false })
  }

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
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group controlId="character-name-input" className="mb-3">
              <Form.Label>
                <strong>Change character name</strong>
              </Form.Label>
              <Form.Control name="name" placeholder="E.g. Morty"></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Save name
            </Button>
          </Form>
        </>
      )}
    </div>
  )
}

export default Page
