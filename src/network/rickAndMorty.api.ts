import axios from "./axiosInstance"
import type { RickAndMorty, RickAndMortyPage } from "@/models/types"


export async function getCharacterById(id: number) {
  const response = await axios.get<RickAndMorty>(`/character/${id}`)
  console.log(response.data)
  return response.data
}

export async function getCharactersPage(page: number) {
  const response = await axios.get<RickAndMortyPage>(`/character/?page=${page}`)
  return response.data
}

