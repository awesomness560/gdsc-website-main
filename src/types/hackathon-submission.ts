import type { HackdscRegistrationFormState } from '#/types/hackdsc-registration'

export type SubmissionStatus = 'draft' | 'submitted'

export type DbExperienceLevel =
  | 'first_hackathon'
  | 'one_to_three'
  | 'four_plus'

export type DbTeamStatus = 'has_team' | 'looking_for_team' | 'going_solo'

export type DbDietaryRestriction =
  | 'vegetarian'
  | 'vegan'
  | 'halal'
  | 'kosher'
  | 'gluten_free'
  | 'dairy_free'
  | 'nut_allergy'

/** Row shape from `public.hackathon_submissions`. */
export type HackathonSubmissionRow = {
  id: string
  hackathon_id: string
  user_id: string
  status: SubmissionStatus
  submitted_at: string | null
  full_name: string | null
  preferred_name: string | null
  email: string | null
  phone: string | null
  school: string | null
  major: string | null
  experience_level: DbExperienceLevel | null
  team_status: DbTeamStatus | null
  current_teammates: string | null
  preferred_team_size: number | null
  desired_skills: string | null
  mlh_code_of_conduct_agreed: boolean | null
  dietary_restrictions: DbDietaryRestriction[] | null
  allergies: string | null
  share_resume_with_sponsors: boolean | null
  resume_url: string | null
  linkedin_url: string | null
  github_url: string | null
  portfolio_url: string | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  emergency_contact_relationship: string | null
  interest_reason: string | null
  learning_goals: string | null
  created_at: string
  updated_at: string
}

/** Frontend-friendly submission loaded from the API layer. */
export type HackathonSubmission = {
  id: string
  hackathonId: string
  userId: string
  status: SubmissionStatus
  submittedAt: string | null
  form: HackdscRegistrationFormState
  updatedAt: string
}

export type HackathonRegistrationStatus = {
  hackathonId: string
  isOpen: boolean
  registrationDeadline: string | null
}
