"use client"

import Image from "next/image"
import Link from "next/link"
import useRickMorty from "@/hooks/useRickMorty"
import styles from "@/styles/RickMortyEntry.module.css"
import { Spinner } from "react-bootstrap"

export default function RickMortyEntry({ id }: { id: number }) {
  const { data: character, isLoading } = useRickMorty(id)

  return (
    <Link href={`/characters/${id}`} className="link-dark">
      <div className={styles.entry}>
        {isLoading && <Spinner animation="grow" />}
        {character && (
          <div className={styles.card}>
            <h1 className="text-center text-capitalize">{character.name}</h1>
            <Image
              src={character.image}
              alt={character.name}
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </Link>
  )
}
