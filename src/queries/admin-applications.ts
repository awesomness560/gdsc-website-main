import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addApplicationNote,
  fetchAdminApplications,
  flagApplication,
  mapAdminApplicationsError,
  markApplicationReviewed,
  setApplicationDecision,
  unflagApplication,
} from '#/api/admin-applications'
import { getHackdscHackathonId } from '#/lib/hackathon-config'
import { adminApplicationKeys } from '#/queries/admin-application-keys'
import type { AdminApplication, ApplicationDecisionStatus } from '#/types/admin-application'

export function useAdminApplicationsQuery(
  hackathonId = getHackdscHackathonId(),
) {
  return useQuery({
    queryKey: adminApplicationKeys.list(hackathonId),
    queryFn: () => fetchAdminApplications(hackathonId),
    staleTime: 30 * 1000,
  })
}

type ReviewMutationInput = {
  submissionId: string
  adminId: string
  adminName: string
}

export function useSetApplicationDecisionMutation(
  hackathonId = getHackdscHackathonId(),
) {
  const queryClient = useQueryClient()
  const queryKey = adminApplicationKeys.list(hackathonId)

  return useMutation({
    mutationFn: ({
      submissionId,
      decision,
      adminId,
      adminName,
    }: ReviewMutationInput & { decision: ApplicationDecisionStatus }) => {
      const currentApps =
        queryClient.getQueryData<AdminApplication[]>(queryKey) ?? []
      return setApplicationDecision({
        submissionId,
        decision,
        adminId,
        adminName,
        currentApps,
      })
    },
    onSuccess: (apps) => {
      queryClient.setQueryData(queryKey, apps)
    },
  })
}

export function useFlagApplicationMutation(
  hackathonId = getHackdscHackathonId(),
) {
  const queryClient = useQueryClient()
  const queryKey = adminApplicationKeys.list(hackathonId)

  return useMutation({
    mutationFn: ({
      submissionId,
      adminId,
      adminName,
      reason,
    }: ReviewMutationInput & { reason?: string }) => {
      const currentApps =
        queryClient.getQueryData<AdminApplication[]>(queryKey) ?? []
      return flagApplication({
        submissionId,
        adminId,
        adminName,
        reason,
        currentApps,
      })
    },
    onSuccess: (apps) => {
      queryClient.setQueryData(queryKey, apps)
    },
  })
}

export function useUnflagApplicationMutation(
  hackathonId = getHackdscHackathonId(),
) {
  const queryClient = useQueryClient()
  const queryKey = adminApplicationKeys.list(hackathonId)

  return useMutation({
    mutationFn: ({ submissionId }: { submissionId: string }) => {
      const currentApps =
        queryClient.getQueryData<AdminApplication[]>(queryKey) ?? []
      return unflagApplication({ submissionId, currentApps })
    },
    onSuccess: (apps) => {
      queryClient.setQueryData(queryKey, apps)
    },
  })
}

export function useMarkApplicationReviewedMutation(
  hackathonId = getHackdscHackathonId(),
) {
  const queryClient = useQueryClient()
  const queryKey = adminApplicationKeys.list(hackathonId)

  return useMutation({
    mutationFn: ({
      submissionId,
      adminId,
      adminName,
    }: ReviewMutationInput) => {
      const currentApps =
        queryClient.getQueryData<AdminApplication[]>(queryKey) ?? []
      return markApplicationReviewed({
        submissionId,
        adminId,
        adminName,
        currentApps,
      })
    },
    onSuccess: (apps) => {
      queryClient.setQueryData(queryKey, apps)
    },
  })
}

export function useAddApplicationNoteMutation(
  hackathonId = getHackdscHackathonId(),
) {
  const queryClient = useQueryClient()
  const queryKey = adminApplicationKeys.list(hackathonId)

  return useMutation({
    mutationFn: ({
      submissionId,
      adminId,
      adminName,
      body,
    }: ReviewMutationInput & { body: string }) => {
      const currentApps =
        queryClient.getQueryData<AdminApplication[]>(queryKey) ?? []
      return addApplicationNote({
        submissionId,
        adminId,
        adminName,
        body,
        currentApps,
      })
    },
    onSuccess: (apps) => {
      queryClient.setQueryData(queryKey, apps)
    },
  })
}

export function getAdminApplicationsMutationError(error: unknown) {
  return mapAdminApplicationsError(error)
}
