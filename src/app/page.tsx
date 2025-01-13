"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import useSWR from "swr"
import { Button, Col, Row, Spinner } from "react-bootstrap"
import * as RickMortyApi from "@/network/rickAndMorty.api"
import RickMortyEntry from "@/componets/RickMortyEntry"

function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleNavigation = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const page = parseInt(searchParams.get("page") || "1")

  const { data, isLoading } = useSWR(["getCharactersPage", page], () =>
    RickMortyApi.getCharactersPage(page)
  )

  if (isLoading) {
    return <Spinner animation="border" className="d-block mx-auto" />
  }

  return (
    <div>
      <h1 className="text-center mb-4">Rick and Morty</h1>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {data?.results.map((character) => (
          <Col key={character.id}>
            <RickMortyEntry id={character.id} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-4">
        {data?.info.prev && (
          <Button onClick={() => handleNavigation(page - 1)} variant="primary">
            Página anterior
          </Button>
        )}
        {data?.info.next && (
          <Button onClick={() => handleNavigation(page + 1)} variant="primary">
            Página siguiente
          </Button>
        )}
      </div>
    </div>
  )
}

export default Page
