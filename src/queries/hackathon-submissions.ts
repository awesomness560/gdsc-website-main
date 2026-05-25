import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchHackathonRegistrationStatus,
  fetchMyHackathonSubmission,
  mapHackathonSubmissionError,
  saveHackathonSubmissionDraft,
  submitHackathonApplication,
} from '#/api/hackathon-submissions'
import { getHackdscHackathonId } from '#/lib/hackathon-config'
import { hackathonSubmissionKeys } from '#/queries/hackathon-submission-keys'
import type { HackdscRegistrationFormState } from '#/types/hackdsc-registration'

export function useHackathonRegistrationQuery(hackathonId = getHackdscHackathonId()) {
  return useQuery({
    queryKey: hackathonSubmissionKeys.registration(hackathonId),
    queryFn: () => fetchHackathonRegistrationStatus(hackathonId),
    staleTime: 60 * 1000,
  })
}

export function useMyHackathonSubmissionQuery(
  userId: string | undefined,
  hackathonId = getHackdscHackathonId(),
) {
  return useQuery({
    queryKey: hackathonSubmissionKeys.mine(hackathonId, userId ?? ''),
    queryFn: () => fetchMyHackathonSubmission(hackathonId, userId!),
    enabled: Boolean(userId),
    staleTime: 30 * 1000,
  })
}

type SaveDraftInput = {
  userId: string
  submissionId: string | null
  form: HackdscRegistrationFormState
  hackathonId?: string
}

export function useSaveHackathonDraftMutation(
  hackathonId = getHackdscHackathonId(),
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: SaveDraftInput) =>
      saveHackathonSubmissionDraft({
        hackathonId: input.hackathonId ?? hackathonId,
        userId: input.userId,
        submissionId: input.submissionId,
        form: input.form,
      }),
    onSuccess: (submission) => {
      queryClient.setQueryData(
        hackathonSubmissionKeys.mine(hackathonId, submission.userId),
        submission,
      )
    },
  })
}

type SubmitInput = SaveDraftInput

export function useSubmitHackathonApplicationMutation(
  hackathonId = getHackdscHackathonId(),
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: SubmitInput) =>
      submitHackathonApplication({
        hackathonId: input.hackathonId ?? hackathonId,
        userId: input.userId,
        submissionId: input.submissionId,
        form: input.form,
      }),
    onSuccess: (submission) => {
      queryClient.setQueryData(
        hackathonSubmissionKeys.mine(hackathonId, submission.userId),
        submission,
      )
    },
  })
}

export function getHackathonMutationError(error: unknown) {
  return mapHackathonSubmissionError(error)
}
