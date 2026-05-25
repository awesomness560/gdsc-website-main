import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchAdminMembers,
  mapAdminUsersError,
  setAdminMemberPrimaryRole,
  setAdminMemberVerified,
  setAdminMembersPrimaryRole,
  setAdminMembersVerified,
} from '#/api/admin-users'
import { adminUserKeys } from '#/queries/admin-user-keys'
import type { AdminMember } from '#/types/admin-member'
import type { UserRole } from '#/types/auth'

export function useAdminMembersQuery() {
  return useQuery({
    queryKey: adminUserKeys.list(),
    queryFn: fetchAdminMembers,
    staleTime: 30 * 1000,
  })
}

function mergeMemberUpdate(
  previous: AdminMember,
  updated: AdminMember,
): AdminMember {
  return {
    ...updated,
    email: previous.email,
    hackdscApplication: previous.hackdscApplication,
    lastActivity: previous.lastActivity,
    activity: previous.activity,
    notes: previous.notes,
  }
}

function patchMemberInList(
  members: AdminMember[] | undefined,
  updated: AdminMember,
): AdminMember[] | undefined {
  if (!members) return members
  return members.map((m) =>
    m.id === updated.id ? mergeMemberUpdate(m, updated) : m,
  )
}

function patchMembersInList(
  members: AdminMember[] | undefined,
  updates: AdminMember[],
): AdminMember[] | undefined {
  if (!members) return members
  const byId = new Map(updates.map((m) => [m.id, m]))
  return members.map((m) => {
    const updated = byId.get(m.id)
    return updated ? mergeMemberUpdate(m, updated) : m
  })
}

export function useSetAdminMemberVerifiedMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      isVerified,
    }: {
      userId: string
      isVerified: boolean
    }) => setAdminMemberVerified(userId, isVerified),
    onSuccess: (updated) => {
      queryClient.setQueryData(adminUserKeys.list(), (prev: AdminMember[] | undefined) =>
        patchMemberInList(prev, updated),
      )
    },
  })
}

export function useSetAdminMemberRoleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
      setAdminMemberPrimaryRole(userId, role),
    onSuccess: (updated) => {
      queryClient.setQueryData(adminUserKeys.list(), (prev: AdminMember[] | undefined) =>
        patchMemberInList(prev, updated),
      )
    },
  })
}

export function useBulkSetAdminMembersVerifiedMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userIds,
      isVerified,
    }: {
      userIds: string[]
      isVerified: boolean
    }) => setAdminMembersVerified(userIds, isVerified),
    onSuccess: (updates) => {
      queryClient.setQueryData(adminUserKeys.list(), (prev: AdminMember[] | undefined) =>
        patchMembersInList(prev, updates),
      )
    },
  })
}

export function useBulkSetAdminMembersRoleMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userIds, role }: { userIds: string[]; role: UserRole }) =>
      setAdminMembersPrimaryRole(userIds, role),
    onSuccess: (updates) => {
      queryClient.setQueryData(adminUserKeys.list(), (prev: AdminMember[] | undefined) =>
        patchMembersInList(prev, updates),
      )
    },
  })
}

export function getAdminUsersMutationError(error: unknown) {
  return mapAdminUsersError(error)
}
