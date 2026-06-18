import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchMyOfficer,
  mapMyOfficerError,
  updateMyOfficerProfile,
} from '#/api/officers'
import { aboutKeys } from '#/queries/about-keys'
import { adminOfficerKeys } from '#/queries/admin-officer-keys'
import { officerKeys } from '#/queries/officer-keys'
import type { AdminOfficer } from '#/types/admin-team'
import type { UpdateMyOfficerProfileInput } from '#/types/officers'

export function useMyOfficerQuery(userId: string | undefined) {
  return useQuery({
    queryKey: officerKeys.my(userId ?? ''),
    queryFn: () => fetchMyOfficer(userId!),
    enabled: Boolean(userId),
    staleTime: 30 * 1000,
  })
}

export function useUpdateMyOfficerProfileMutation(userId: string | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      officerId,
      input,
    }: {
      officerId: string
      input: UpdateMyOfficerProfileInput
    }) => updateMyOfficerProfile(officerId, userId!, input),
    onSuccess: (updated) => {
      if (!userId) return
      queryClient.setQueryData(officerKeys.my(userId), updated)
      queryClient.setQueryData(
        adminOfficerKeys.list(),
        (prev: AdminOfficer[] | undefined) => {
          if (!prev) return prev
          return prev.map((officer) =>
            officer.id === updated.id ? { ...officer, ...updated } : officer,
          )
        },
      )
      void queryClient.invalidateQueries({ queryKey: aboutKeys.page() })
    },
  })
}

export function getMyOfficerMutationError(error: unknown) {
  return mapMyOfficerError(error)
}
