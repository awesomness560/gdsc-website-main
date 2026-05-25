import type {
  HackdscExperienceLevel,
  HackdscRegistrationStep,
} from '#/types/hackdsc-registration'

export const MLH_CODE_OF_CONDUCT_URL =
  'https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md'

export const HACKDSC_REGISTER_EVENT = {
  name: 'HackDSC Fall 2026',
  tagline: 'Build the impossible',
} as const

export const HACKDSC_REGISTRATION_STEPS: HackdscRegistrationStep[] = [
  { id: 1, title: 'About you', subtitle: 'Tell us the basics' },
  { id: 2, title: 'Team', subtitle: "We'll help you find teammates if you need them" },
  { id: 3, title: 'Logistics', subtitle: 'Dietary needs and emergency contact' },
  { id: 4, title: 'Recruiting', subtitle: 'Optional — share your work with sponsors' },
  { id: 5, title: 'Tell us about you', subtitle: 'A few sentences go a long way' },
  { id: 6, title: 'Confirm', subtitle: 'Review and submit your application' },
]

export const EXPERIENCE_LEVEL_OPTIONS: Array<{
  value: HackdscExperienceLevel
  label: string
  description: string
}> = [
  {
    value: 'first',
    label: 'First hackathon',
    description: 'New to hackathons',
  },
  {
    value: 'few',
    label: 'Been to a few',
    description: 'You’ve shipped projects before',
  },
  {
    value: 'regular',
    label: 'Hackathon regular',
    description: 'You know the weekend drill',
  },
]

export const TEAM_SIZE_OPTIONS = [2, 3, 4] as const

export const TEAMMATE_SKILL_OPTIONS = [
  'Frontend',
  'Backend',
  'ML',
  'Design',
  'Mobile',
  'Hardware',
  'DevOps',
  'Product',
] as const

export const DIETARY_OPTIONS = [
  'None',
  'Vegetarian',
  'Vegan',
  'Halal',
  'Kosher',
  'Gluten-free',
  'Nut allergy',
  'Other',
] as const

export const COMMON_MAJORS = [
  'Computer Science',
  'Software Engineering',
  'Computer Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Data Science',
  'Information Technology',
  'Mathematics',
  'Physics',
  'Biology',
  'Business',
  'Arts, Technology, and Emerging Communication (ATEC)',
  'Other',
] as const

export const ESSAY_MAX_LENGTH = 500

export const RESUME_MAX_BYTES = 5 * 1024 * 1024
