import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createAdminOfficer,
  deactivateAdminOfficer,
  fetchAdminOfficers,
  mapAdminOfficersError,
  reactivateAdminOfficer,
  updateAdminOfficer,
} from '#/api/admin-officers'
import { adminOfficerKeys } from '#/queries/admin-officer-keys'
import type { AdminOfficer, AdminOfficerDraft } from '#/types/admin-team'

export function useAdminOfficersQuery() {
  return useQuery({
    queryKey: adminOfficerKeys.list(),
    queryFn: fetchAdminOfficers,
    staleTime: 30 * 1000,
  })
}

function patchOfficerInList(
  officers: AdminOfficer[] | undefined,
  updated: AdminOfficer,
): AdminOfficer[] | undefined {
  if (!officers) return officers
  const exists = officers.some((officer) => officer.id === updated.id)
  if (!exists) return [...officers, updated]
  return officers.map((officer) =>
    officer.id === updated.id ? { ...officer, ...updated } : officer,
  )
}

function draftToUpdateInput(draft: AdminOfficerDraft) {
  return {
    position: draft.roleId,
    bio: draft.bio,
    photo: draft.pendingPhoto,
    removePhoto: draft.removePhoto,
  }
}

export function useCreateAdminOfficerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      displayName,
      draft,
    }: {
      userId: string
      displayName: string
      draft: AdminOfficerDraft
    }) =>
      createAdminOfficer({
        userId,
        displayName,
        position: draft.roleId,
        bio: draft.bio,
        photo: draft.pendingPhoto,
      }),
    onSuccess: (created) => {
      queryClient.setQueryData(
        adminOfficerKeys.list(),
        (prev: AdminOfficer[] | undefined) => patchOfficerInList(prev, created),
      )
    },
  })
}

export function useUpdateAdminOfficerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      officerId,
      userId,
      draft,
    }: {
      officerId: string
      userId: string
      draft: AdminOfficerDraft
    }) => updateAdminOfficer(officerId, userId, draftToUpdateInput(draft)),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        adminOfficerKeys.list(),
        (prev: AdminOfficer[] | undefined) => patchOfficerInList(prev, updated),
      )
    },
  })
}

export function useDeactivateAdminOfficerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (officerId: string) => deactivateAdminOfficer(officerId),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        adminOfficerKeys.list(),
        (prev: AdminOfficer[] | undefined) => patchOfficerInList(prev, updated),
      )
    },
  })
}

export function useReactivateAdminOfficerMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (officerId: string) => reactivateAdminOfficer(officerId),
    onSuccess: (updated) => {
      queryClient.setQueryData(
        adminOfficerKeys.list(),
        (prev: AdminOfficer[] | undefined) => patchOfficerInList(prev, updated),
      )
    },
  })
}

export function getAdminOfficersMutationError(error: unknown) {
  return mapAdminOfficersError(error)
}
