export interface RickAndMorty {
  species: string
  status: string
  name: string
  episode: string[]
  image: string
}

export interface RickAndMortyPage {
  results: { id: number }[]
  next: string | null
  previous: string | null
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
}
