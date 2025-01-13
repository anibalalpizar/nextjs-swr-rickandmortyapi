export interface RickAndMorty {
  species: string
  status: string
  name: string
  episode: string[]
  image: string
}

export interface RickAndMortyPage {
  results: { name: string }[]
  next: string | null
  previous: string | null
}
