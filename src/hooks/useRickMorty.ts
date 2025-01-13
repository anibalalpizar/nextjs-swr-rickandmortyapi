import useSWR from "swr"
import { AxiosError } from "axios"
import * as RickMortyApi from "@/network/rickAndMorty.api"

export default function useRickMorty(id: number) {
  const { data, isLoading } = useSWR(id.toString(), async () => {
    try {
      return await RickMortyApi.getCharacterById(id)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return null
      } else {
        throw error
      }
    }
  })
  return { data, isLoading }
}
