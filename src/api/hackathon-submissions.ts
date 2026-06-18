import {
  hackathonResumeStoragePath,
  uploadHackathonResume,
} from '#/api/resumes'
import { supabase } from '#/lib/supabase'
import {
  mapFormToSubmissionRow,
  mapSubmissionRowToForm,
} from '#/lib/hackathon-submission-mapper'
import type { HackdscRegistrationFormState } from '#/types/hackdsc-registration'
import type {
  HackathonRegistrationStatus,
  HackathonSubmission,
  HackathonSubmissionRow,
} from '#/types/hackathon-submission'

const SUBMISSION_COLUMNS = `
  id,
  hackathon_id,
  user_id,
  status,
  submitted_at,
  full_name,
  preferred_name,
  email,
  phone,
  school,
  major,
  experience_level,
  team_status,
  current_teammates,
  preferred_team_size,
  desired_skills,
  mlh_code_of_conduct_agreed,
  dietary_restrictions,
  allergies,
  share_resume_with_sponsors,
  resume_url,
  linkedin_url,
  github_url,
  portfolio_url,
  emergency_contact_name,
  emergency_contact_phone,
  emergency_contact_relationship,
  interest_reason,
  learning_goals,
  created_at,
  updated_at
`

function mapSubmission(row: HackathonSubmissionRow): HackathonSubmission {
  return {
    id: row.id,
    hackathonId: row.hackathon_id,
    userId: row.user_id,
    status: row.status,
    submittedAt: row.submitted_at,
    form: mapSubmissionRowToForm(row),
    updatedAt: row.updated_at,
  }
}

async function resolveResumeUrl(input: {
  userId: string
  hackathonId: string
  form: HackdscRegistrationFormState
  resumeFile?: File | null
}): Promise<string | null> {
  if (!input.form.resumeShareConsent) return null

  if (input.resumeFile) {
    const path = hackathonResumeStoragePath(input.userId, input.hackathonId)
    await uploadHackathonResume(path, input.resumeFile)
    return path
  }

  if (input.form.resumeStoragePath) return input.form.resumeStoragePath

  if (input.form.resumeFileName) {
    return hackathonResumeStoragePath(input.userId, input.hackathonId)
  }

  return null
}

export async function fetchHackathonRegistrationStatus(
  hackathonId: string,
): Promise<HackathonRegistrationStatus> {
  const { data: openData, error: openError } = await supabase.rpc(
    'hackathon_is_open',
    { hackathon: hackathonId },
  )

  if (openError) throw openError

  const { data, error } = await supabase
    .from('hackathons')
    .select('id, registration_deadline')
    .eq('id', hackathonId)
    .maybeSingle()

  if (error) throw error

  return {
    hackathonId,
    isOpen: Boolean(openData),
    registrationDeadline: data?.registration_deadline ?? null,
  }
}

export async function fetchMyHackathonSubmission(
  hackathonId: string,
  userId: string,
): Promise<HackathonSubmission | null> {
  const { data, error } = await supabase
    .from('hackathon_submissions')
    .select(SUBMISSION_COLUMNS)
    .eq('hackathon_id', hackathonId)
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return mapSubmission(data as HackathonSubmissionRow)
}

export async function saveHackathonSubmissionDraft(input: {
  hackathonId: string
  userId: string
  submissionId: string | null
  form: HackdscRegistrationFormState
  resumeFile?: File | null
  existingSubmission?: Pick<HackathonSubmission, 'status' | 'submittedAt'>
}): Promise<HackathonSubmission> {
  const resumeUrl = await resolveResumeUrl(input)
  const preserveSubmitted = input.existingSubmission?.status === 'submitted'
  const payload = mapFormToSubmissionRow(input.form, {
    status: preserveSubmitted ? 'submitted' : 'draft',
    submittedAt: preserveSubmitted
      ? (input.existingSubmission?.submittedAt ?? null)
      : null,
    resumeUrl,
  })

  if (input.submissionId) {
    const { data, error } = await supabase
      .from('hackathon_submissions')
      .update(payload)
      .eq('id', input.submissionId)
      .eq('user_id', input.userId)
      .select(SUBMISSION_COLUMNS)
      .single()

    if (error) throw error
    return mapSubmission(data as HackathonSubmissionRow)
  }

  const { data, error } = await supabase
    .from('hackathon_submissions')
    .insert({
      ...payload,
      hackathon_id: input.hackathonId,
      user_id: input.userId,
    })
    .select(SUBMISSION_COLUMNS)
    .single()

  if (error) throw error
  return mapSubmission(data as HackathonSubmissionRow)
}

export async function submitHackathonApplication(input: {
  hackathonId: string
  userId: string
  submissionId: string | null
  form: HackdscRegistrationFormState
  resumeFile?: File | null
  existingSubmission?: Pick<HackathonSubmission, 'status' | 'submittedAt'>
}): Promise<HackathonSubmission> {
  const preserveSubmitted = input.existingSubmission?.status === 'submitted'
  const submittedAt = preserveSubmitted
    ? (input.existingSubmission?.submittedAt ?? new Date().toISOString())
    : new Date().toISOString()
  const resumeUrl = await resolveResumeUrl(input)
  const payload = mapFormToSubmissionRow(input.form, {
    status: 'submitted',
    submittedAt,
    resumeUrl,
  })

  if (input.submissionId) {
    const { data, error } = await supabase
      .from('hackathon_submissions')
      .update(payload)
      .eq('id', input.submissionId)
      .eq('user_id', input.userId)
      .select(SUBMISSION_COLUMNS)
      .single()

    if (error) throw error
    return mapSubmission(data as HackathonSubmissionRow)
  }

  const { data, error } = await supabase
    .from('hackathon_submissions')
    .insert({
      ...payload,
      hackathon_id: input.hackathonId,
      user_id: input.userId,
    })
    .select(SUBMISSION_COLUMNS)
    .single()

  if (error) throw error
  return mapSubmission(data as HackathonSubmissionRow)
}

export function mapHackathonSubmissionError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Something went wrong. Please try again.'
  }

  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message
      : ''

  if (message.includes('hackathon_submissions_hackathon_id_user_id_key')) {
    return 'You already have an application for this hackathon.'
  }

  if (message.includes('row-level security') || message.includes('RLS')) {
    return 'Registration is closed or you do not have permission to save.'
  }

  return message || 'Something went wrong. Please try again.'
}
