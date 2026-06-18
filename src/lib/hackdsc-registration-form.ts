import type { AuthUser } from '#/types/auth'
import type { HackdscRegistrationFormState } from '#/types/hackdsc-registration'

export function createInitialRegistrationForm(
  user: AuthUser | null,
): HackdscRegistrationFormState {
  const email = user?.auth.email?.trim() ?? ''
  const name =
    user?.name?.trim() ||
    user?.profile?.full_name?.trim() ||
    user?.auth.userMetadata.full_name?.trim() ||
    user?.auth.userMetadata.name?.trim() ||
    ''

  return {
    fullName: name,
    preferredName: '',
    email,
    phone: '',
    university: '',
    major: '',
    experienceLevel: '',
    hasTeam: null,
    teammateDetails: '',
    lookingForTeammates: null,
    preferredTeamSize: null,
    skillsWanted: [],
    skillsWantedOther: '',
    dietaryRestrictions: [],
    allergies: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    resumeShareConsent: null,
    resumeFileName: null,
    resumeStoragePath: null,
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    whyInterested: '',
    whatHopeToLearn: '',
    mlhCodeOfConduct: false,
  }
}
