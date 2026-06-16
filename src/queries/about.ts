import { useQuery } from '@tanstack/react-query'
import { fetchAboutPageData, mapAboutPageError } from '#/api/about'
import { aboutKeys } from '#/queries/about-keys'

export function useAboutPageQuery() {
  return useQuery({
    queryKey: aboutKeys.page(),
    queryFn: fetchAboutPageData,
    staleTime: 60 * 1000,
  })
}

export function getAboutPageQueryError(error: unknown) {
  return mapAboutPageError(error)
}
