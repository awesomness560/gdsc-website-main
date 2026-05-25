import {
  DIETARY_OPTIONS,
  TEAMMATE_SKILL_OPTIONS,
} from '#/data/hackdsc-registration'
import type { HackdscRegistrationFormState } from '#/types/hackdsc-registration'
import type {
  DbDietaryRestriction,
  DbExperienceLevel,
  DbTeamStatus,
  HackathonSubmissionRow,
  SubmissionStatus,
} from '#/types/hackathon-submission'

const EXPERIENCE_TO_DB: Record<
  NonNullable<HackdscRegistrationFormState['experienceLevel']>,
  DbExperienceLevel
> = {
  first: 'first_hackathon',
  few: 'one_to_three',
  regular: 'four_plus',
}

const EXPERIENCE_FROM_DB: Record<DbExperienceLevel, HackdscRegistrationFormState['experienceLevel']> =
  {
    first_hackathon: 'first',
    one_to_three: 'few',
    four_plus: 'regular',
  }

const DIETARY_LABEL_TO_DB: Record<string, DbDietaryRestriction | null> = {
  None: null,
  Vegetarian: 'vegetarian',
  Vegan: 'vegan',
  Halal: 'halal',
  Kosher: 'kosher',
  'Gluten-free': 'gluten_free',
  'Nut allergy': 'nut_allergy',
  Other: null,
}

const DIETARY_DB_TO_LABEL: Record<DbDietaryRestriction, (typeof DIETARY_OPTIONS)[number]> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  halal: 'Halal',
  kosher: 'Kosher',
  gluten_free: 'Gluten-free',
  dairy_free: 'Other',
  nut_allergy: 'Nut allergy',
}

const SKILL_OPTIONS = new Set<string>(TEAMMATE_SKILL_OPTIONS)

export function deriveTeamStatus(
  hasTeam: boolean | null,
  lookingForTeammates: boolean | null,
): DbTeamStatus | null {
  if (hasTeam === null && lookingForTeammates === null) return null
  if (hasTeam) return 'has_team'
  if (lookingForTeammates) return 'looking_for_team'
  return 'going_solo'
}

export function teamStatusToFormFlags(teamStatus: DbTeamStatus | null): {
  hasTeam: boolean | null
  lookingForTeammates: boolean | null
} {
  switch (teamStatus) {
    case 'has_team':
      return { hasTeam: true, lookingForTeammates: false }
    case 'looking_for_team':
      return { hasTeam: false, lookingForTeammates: true }
    case 'going_solo':
      return { hasTeam: false, lookingForTeammates: false }
    default:
      return { hasTeam: null, lookingForTeammates: null }
  }
}

function formatDesiredSkills(
  skillsWanted: string[],
  skillsWantedOther: string,
): string | null {
  const parts = [...skillsWanted, skillsWantedOther.trim()].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : null
}

function parseDesiredSkills(desiredSkills: string | null): {
  skillsWanted: string[]
  skillsWantedOther: string
} {
  if (!desiredSkills?.trim()) {
    return { skillsWanted: [], skillsWantedOther: '' }
  }

  const skillsWanted: string[] = []
  const otherParts: string[] = []

  for (const part of desiredSkills.split(',').map((s) => s.trim()).filter(Boolean)) {
    if (SKILL_OPTIONS.has(part)) skillsWanted.push(part)
    else otherParts.push(part)
  }

  return { skillsWanted, skillsWantedOther: otherParts.join(', ') }
}

function dietaryLabelsToDb(labels: string[]): {
  restrictions: DbDietaryRestriction[]
  extraAllergyNote: string | null
} {
  const restrictions: DbDietaryRestriction[] = []
  const otherNotes: string[] = []

  for (const label of labels) {
    if (label === 'None') continue
    const mapped = DIETARY_LABEL_TO_DB[label]
    if (mapped) restrictions.push(mapped)
    else if (label === 'Other') otherNotes.push('Other dietary restriction')
    else otherNotes.push(label)
  }

  return {
    restrictions,
    extraAllergyNote: otherNotes.length > 0 ? otherNotes.join('; ') : null,
  }
}

function dietaryDbToLabels(restrictions: DbDietaryRestriction[] | null): string[] {
  if (!restrictions?.length) return ['None']
  return restrictions.map((r) => DIETARY_DB_TO_LABEL[r] ?? 'Other')
}

function mergeAllergyNotes(
  allergies: string,
  extra: string | null,
): string | null {
  const base = allergies.trim()
  const add = extra?.trim()
  if (!base && !add) return null
  if (!add) return base
  if (!base) return add
  return `${base}; ${add}`
}

function splitAllergyNotes(
  allergies: string | null,
  dietaryLabels: string[],
): string {
  const raw = allergies?.trim() ?? ''
  if (!dietaryLabels.includes('Other') || !raw) return raw
  return raw.replace(/^Other dietary restriction;?\s*/i, '').trim()
}

export function mapFormToSubmissionRow(
  form: HackdscRegistrationFormState,
  options: { status: SubmissionStatus; submittedAt?: string | null },
) {
  const dietary = dietaryLabelsToDb(form.dietaryRestrictions)

  return {
    status: options.status,
    submitted_at: options.submittedAt ?? null,
    full_name: form.fullName.trim() || null,
    preferred_name: form.preferredName.trim() || null,
    email: form.email.trim() || null,
    phone: form.phone.trim() || null,
    school: form.university.trim() || null,
    major: form.major.trim() || null,
    experience_level: form.experienceLevel
      ? EXPERIENCE_TO_DB[form.experienceLevel]
      : null,
    team_status: deriveTeamStatus(form.hasTeam, form.lookingForTeammates),
    current_teammates:
      form.hasTeam === true ? form.teammateDetails.trim() || null : null,
    preferred_team_size:
      form.lookingForTeammates === true ? form.preferredTeamSize : null,
    desired_skills:
      form.lookingForTeammates === true
        ? formatDesiredSkills(form.skillsWanted, form.skillsWantedOther)
        : null,
    mlh_code_of_conduct_agreed:
      options.status === 'submitted' ? form.mlhCodeOfConduct : null,
    dietary_restrictions: dietary.restrictions,
    allergies: mergeAllergyNotes(form.allergies, dietary.extraAllergyNote),
    share_resume_with_sponsors: form.resumeShareConsent,
    resume_url: null,
    linkedin_url: form.linkedinUrl.trim() || null,
    github_url: form.githubUrl.trim() || null,
    portfolio_url: form.portfolioUrl.trim() || null,
    emergency_contact_name: form.emergencyContactName.trim() || null,
    emergency_contact_phone: form.emergencyContactPhone.trim() || null,
    emergency_contact_relationship:
      form.emergencyContactRelationship.trim() || null,
    interest_reason: form.whyInterested.trim() || null,
    learning_goals: form.whatHopeToLearn.trim() || null,
  }
}

export function mapSubmissionRowToForm(
  row: HackathonSubmissionRow,
): HackdscRegistrationFormState {
  const team = teamStatusToFormFlags(row.team_status)
  const dietaryLabels = dietaryDbToLabels(row.dietary_restrictions)
  const skills = parseDesiredSkills(row.desired_skills)

  return {
    fullName: row.full_name ?? '',
    preferredName: row.preferred_name ?? '',
    email: row.email ?? '',
    phone: row.phone ?? '',
    university: row.school ?? '',
    major: row.major ?? '',
    experienceLevel: row.experience_level
      ? EXPERIENCE_FROM_DB[row.experience_level]
      : '',
    hasTeam: team.hasTeam,
    teammateDetails: row.current_teammates ?? '',
    lookingForTeammates: team.lookingForTeammates,
    preferredTeamSize:
      row.preferred_team_size === 2 ||
      row.preferred_team_size === 3 ||
      row.preferred_team_size === 4
        ? row.preferred_team_size
        : null,
    skillsWanted: skills.skillsWanted,
    skillsWantedOther: skills.skillsWantedOther,
    dietaryRestrictions: dietaryLabels,
    allergies: splitAllergyNotes(row.allergies, dietaryLabels),
    emergencyContactName: row.emergency_contact_name ?? '',
    emergencyContactPhone: row.emergency_contact_phone ?? '',
    emergencyContactRelationship: row.emergency_contact_relationship ?? '',
    resumeShareConsent: row.share_resume_with_sponsors,
    resumeFileName: row.resume_url
      ? row.resume_url.split('/').pop() ?? row.resume_url
      : null,
    linkedinUrl: row.linkedin_url ?? '',
    githubUrl: row.github_url ?? '',
    portfolioUrl: row.portfolio_url ?? '',
    whyInterested: row.interest_reason ?? '',
    whatHopeToLearn: row.learning_goals ?? '',
    mlhCodeOfConduct: row.mlh_code_of_conduct_agreed ?? false,
  }
}
