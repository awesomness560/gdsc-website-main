import type {
  HackdscRegistrationErrors,
  HackdscRegistrationFormState,
  HackdscRegistrationStepId,
} from '#/types/hackdsc-registration'
import { RESUME_MAX_BYTES } from '#/data/hackdsc-registration'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_RE = /^https?:\/\/.+/i

function isValidUrl(value: string) {
  if (!value.trim()) return true
  return URL_RE.test(value.trim())
}

export function validateRegistrationStep(
  step: HackdscRegistrationStepId,
  data: HackdscRegistrationFormState,
  resumeFile: File | null,
): HackdscRegistrationErrors {
  const errors: HackdscRegistrationErrors = {}

  switch (step) {
    case 1: {
      if (!data.fullName.trim()) errors.fullName = 'Full name is required'
      if (!data.email.trim()) errors.email = 'Email is required'
      else if (!EMAIL_RE.test(data.email.trim()))
        errors.email = 'Enter a valid email address'
      if (!data.university.trim()) errors.university = 'School is required'
      if (!data.major.trim()) errors.major = 'Major is required'
      if (!data.experienceLevel)
        errors.experienceLevel = 'Select your experience level'
      break
    }
    case 2: {
      if (data.hasTeam === null) {
        errors.hasTeam = 'Select yes or no'
      }
      if (data.lookingForTeammates === null) {
        errors.lookingForTeammates = 'Select yes or no'
      }
      if (data.hasTeam && !data.teammateDetails.trim()) {
        errors.teammateDetails = 'List your teammates (names and emails)'
      }
      if (data.lookingForTeammates) {
        if (data.preferredTeamSize == null) {
          errors.preferredTeamSize = 'Choose a preferred team size'
        }
        const hasSkill =
          data.skillsWanted.length > 0 || data.skillsWantedOther.trim().length > 0
        if (!hasSkill) {
          errors.skillsWanted = 'Select at least one skill or describe in Other'
        }
      }
      break
    }
    case 3: {
      if (data.dietaryRestrictions.length === 0) {
        errors.dietaryRestrictions = 'Select at least one option (including None)'
      }
      if (!data.emergencyContactName.trim()) {
        errors.emergencyContactName = 'Emergency contact name is required'
      }
      if (!data.emergencyContactPhone.trim()) {
        errors.emergencyContactPhone = 'Emergency contact phone is required'
      }
      if (!data.emergencyContactRelationship.trim()) {
        errors.emergencyContactRelationship = 'Relationship is required'
      }
      break
    }
    case 4: {
      if (data.resumeShareConsent) {
        const hasResume = Boolean(resumeFile || data.resumeFileName)
        const hasLink =
          data.linkedinUrl.trim() ||
          data.githubUrl.trim() ||
          data.portfolioUrl.trim()
        if (!hasResume && !hasLink) {
          errors.resumeFile =
            'Upload a resume or add at least one profile link'
        }
        if (data.linkedinUrl.trim() && !isValidUrl(data.linkedinUrl)) {
          errors.linkedinUrl = 'Enter a valid URL (https://…)'
        }
        if (data.githubUrl.trim() && !isValidUrl(data.githubUrl)) {
          errors.githubUrl = 'Enter a valid URL (https://…)'
        }
        if (data.portfolioUrl.trim() && !isValidUrl(data.portfolioUrl)) {
          errors.portfolioUrl = 'Enter a valid URL (https://…)'
        }
      }
      break
    }
    case 5: {
      if (!data.whyInterested.trim()) {
        errors.whyInterested = 'Tell us why you want to attend'
      }
      if (!data.whatHopeToLearn.trim()) {
        errors.whatHopeToLearn = 'Tell us what you hope to learn'
      }
      break
    }
    case 6: {
      if (!data.mlhCodeOfConduct) {
        errors.mlhCodeOfConduct = 'You must agree to the MLH Code of Conduct'
      }
      break
    }
  }

  return errors
}

export function validateAllRegistrationSteps(
  data: HackdscRegistrationFormState,
  resumeFile: File | null,
): HackdscRegistrationErrors {
  const steps = [1, 2, 3, 4, 5, 6] as const
  return steps.reduce<HackdscRegistrationErrors>((acc, step) => {
    return { ...acc, ...validateRegistrationStep(step, data, resumeFile) }
  }, {})
}

export function validateResumeFile(file: File): string | null {
  if (file.type !== 'application/pdf') {
    return 'Resume must be a PDF'
  }
  if (file.size > RESUME_MAX_BYTES) {
    return 'Resume must be 5 MB or smaller'
  }
  return null
}
