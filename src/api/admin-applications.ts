import {
  appendApplicationFlag,
  appendApplicationNote,
  clearApplicationFlags,
  loadAllApplicationReviews,
  saveApplicationReview,
  type StoredApplicationReview,
} from '#/lib/admin-application-review-store'
import { mapSubmissionToAdminApplication } from '#/lib/admin-application-mapper'
import { mapUsersRowToProfile } from '#/lib/admin-member-mapper'
import { getHackdscHackathonId } from '#/lib/hackathon-config'
import { supabase } from '#/lib/supabase'
import type {
  AdminApplication,
  ApplicationDecisionStatus,
  ApplicationFlag,
  ApplicationNote,
} from '#/types/admin-application'
import type { HackathonSubmissionRow } from '#/types/hackathon-submission'
import { USER_PROFILE_COLUMNS, type UsersRow } from '#/types/users'

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

export async function fetchAdminApplications(
  hackathonId = getHackdscHackathonId(),
): Promise<AdminApplication[]> {
  const { data, error } = await supabase
    .from('hackathon_submissions')
    .select(SUBMISSION_COLUMNS)
    .eq('hackathon_id', hackathonId)
    .eq('status', 'submitted')
    .not('submitted_at', 'is', null)
    .order('submitted_at', { ascending: false })

  if (error) throw error

  const rows = (data ?? []) as HackathonSubmissionRow[]
  const userIds = [...new Set(rows.map((r) => r.user_id))]

  const profiles = new Map<string, ReturnType<typeof mapUsersRowToProfile>>()

  if (userIds.length > 0) {
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select(USER_PROFILE_COLUMNS)
      .in('id', userIds)

    if (!usersError && users) {
      for (const row of users as UsersRow[]) {
        profiles.set(row.id, mapUsersRowToProfile(row))
      }
    }
  }

  const reviews = loadAllApplicationReviews()

  return rows
    .map((row) =>
      mapSubmissionToAdminApplication(
        row,
        profiles.get(row.user_id) ?? null,
        reviews[row.id] ?? null,
      ),
    )
    .filter((app): app is AdminApplication => app !== null)
}

function remapApplication(
  apps: AdminApplication[],
  submissionId: string,
  review: StoredApplicationReview,
  row: HackathonSubmissionRow,
  profile: ReturnType<typeof mapUsersRowToProfile> | null,
): AdminApplication[] {
  const updated = mapSubmissionToAdminApplication(row, profile, review)
  if (!updated) return apps
  return apps.map((a) => (a.id === submissionId ? updated : a))
}

async function fetchSubmissionRow(
  submissionId: string,
): Promise<HackathonSubmissionRow | null> {
  const { data, error } = await supabase
    .from('hackathon_submissions')
    .select(SUBMISSION_COLUMNS)
    .eq('id', submissionId)
    .maybeSingle()

  if (error) throw error
  return (data as HackathonSubmissionRow | null) ?? null
}

async function fetchProfileForUser(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select(USER_PROFILE_COLUMNS)
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return mapUsersRowToProfile(data as UsersRow)
}

export async function setApplicationDecision(input: {
  submissionId: string
  decision: ApplicationDecisionStatus
  adminId: string
  adminName: string
  currentApps: AdminApplication[]
}): Promise<AdminApplication[]> {
  const review = saveApplicationReview(input.submissionId, {
    decision: input.decision,
    decidedAt: new Date().toISOString(),
    decidedById: input.adminId,
    decidedByName: input.adminName,
    ...(input.decision === 'accepted' || input.decision === 'rejected'
      ? { flags: [] }
      : {}),
  })

  const row = await fetchSubmissionRow(input.submissionId)
  if (!row) return input.currentApps
  const profile = await fetchProfileForUser(row.user_id)
  return remapApplication(input.currentApps, input.submissionId, review, row, profile)
}

export async function flagApplication(input: {
  submissionId: string
  adminId: string
  adminName: string
  reason?: string
  currentApps: AdminApplication[]
}): Promise<AdminApplication[]> {
  const flag: ApplicationFlag = {
    id: crypto.randomUUID(),
    adminId: input.adminId,
    adminName: input.adminName,
    reason: input.reason?.trim() || undefined,
    createdAt: new Date().toISOString(),
  }

  const review = appendApplicationFlag(input.submissionId, flag)
  const row = await fetchSubmissionRow(input.submissionId)
  if (!row) return input.currentApps
  const profile = await fetchProfileForUser(row.user_id)
  return remapApplication(input.currentApps, input.submissionId, review, row, profile)
}

export async function unflagApplication(input: {
  submissionId: string
  currentApps: AdminApplication[]
}): Promise<AdminApplication[]> {
  const review = clearApplicationFlags(input.submissionId)
  const row = await fetchSubmissionRow(input.submissionId)
  if (!row) return input.currentApps
  const profile = await fetchProfileForUser(row.user_id)
  return remapApplication(input.currentApps, input.submissionId, review, row, profile)
}

export async function markApplicationReviewed(input: {
  submissionId: string
  adminId: string
  adminName: string
  currentApps: AdminApplication[]
}): Promise<AdminApplication[]> {
  const review = saveApplicationReview(input.submissionId, {
    reviewed: true,
    reviewedAt: new Date().toISOString(),
    reviewedById: input.adminId,
    reviewedByName: input.adminName,
  })

  const row = await fetchSubmissionRow(input.submissionId)
  if (!row) return input.currentApps
  const profile = await fetchProfileForUser(row.user_id)
  return remapApplication(input.currentApps, input.submissionId, review, row, profile)
}

export async function addApplicationNote(input: {
  submissionId: string
  adminId: string
  adminName: string
  body: string
  currentApps: AdminApplication[]
}): Promise<AdminApplication[]> {
  const note: ApplicationNote = {
    id: crypto.randomUUID(),
    adminId: input.adminId,
    adminName: input.adminName,
    body: input.body.trim(),
    createdAt: new Date().toISOString(),
  }

  const review = appendApplicationNote(input.submissionId, note)
  const row = await fetchSubmissionRow(input.submissionId)
  if (!row) return input.currentApps
  const profile = await fetchProfileForUser(row.user_id)
  return remapApplication(input.currentApps, input.submissionId, review, row, profile)
}

export function mapAdminApplicationsError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Something went wrong. Please try again.'
  }

  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message
      : ''

  if (message.includes('row-level security') || message.includes('RLS')) {
    return 'You do not have permission to view applications.'
  }

  return message || 'Something went wrong. Please try again.'
}
