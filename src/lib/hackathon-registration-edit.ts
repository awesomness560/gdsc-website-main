import type { HackdscRegistrationStepId } from '#/types/hackdsc-registration'
import type { SubmissionStatus } from '#/types/hackathon-submission'

export function parseRegisterStepParam(
  value: unknown,
): HackdscRegistrationStepId | undefined {
  const step = Number(value)
  if (step >= 1 && step <= 6) return step as HackdscRegistrationStepId
  return undefined
}

export function canAccessHackathonRegistration(
  isRegistrationOpen: boolean,
  submissionStatus: SubmissionStatus | null,
): boolean {
  return isRegistrationOpen || submissionStatus !== null
}

export function canEditHackathonStep(
  stepId: HackdscRegistrationStepId,
  options: {
    isRegistrationOpen: boolean
    submissionStatus: SubmissionStatus | null
  },
): boolean {
  if (options.isRegistrationOpen) return true
  return options.submissionStatus === 'submitted' && stepId === 3
}
