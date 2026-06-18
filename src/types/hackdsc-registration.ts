export type HackdscExperienceLevel = 'first' | 'few' | 'regular'

export type HackdscTeamSize = 2 | 3 | 4

/** Full application payload — ready to POST when backend is wired. */
export type HackdscRegistrationData = {
  fullName: string
  preferredName: string
  email: string
  phone: string
  university: string
  major: string
  experienceLevel: HackdscExperienceLevel
  hasTeam: boolean
  teammateDetails: string
  lookingForTeammates: boolean
  preferredTeamSize: HackdscTeamSize | null
  skillsWanted: string[]
  skillsWantedOther: string
  dietaryRestrictions: string[]
  allergies: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
  resumeShareConsent: boolean
  resumeFileName: string | null
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
  whyInterested: string
  whatHopeToLearn: string
  mlhCodeOfConduct: boolean
}

export type HackdscRegistrationStepId = 1 | 2 | 3 | 4 | 5 | 6

export type HackdscRegistrationStep = {
  id: HackdscRegistrationStepId
  title: string
  subtitle: string
}

/** In-progress form state (tri-state toggles until answered). */
export type HackdscRegistrationFormState = Omit<
  HackdscRegistrationData,
  | 'hasTeam'
  | 'lookingForTeammates'
  | 'resumeShareConsent'
  | 'experienceLevel'
  | 'mlhCodeOfConduct'
> & {
  hasTeam: boolean | null
  lookingForTeammates: boolean | null
  resumeShareConsent: boolean | null
  experienceLevel: HackdscExperienceLevel | ''
  mlhCodeOfConduct: boolean
  /** Storage path in the resumes bucket (not a public URL). */
  resumeStoragePath: string | null
}

export type HackdscRegistrationErrors = Partial<
  Record<keyof HackdscRegistrationFormState | 'resumeFile', string>
>
