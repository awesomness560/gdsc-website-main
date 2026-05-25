import { supabase } from '#/lib/supabase'
import {
  mapUsersRowToAdminMember,
  normalizeUserRoles,
  rolesForPrimaryRole,
} from '#/lib/admin-member-mapper'
import { getHackdscHackathonId } from '#/lib/hackathon-config'
import type { AdminMember, AdminMembersSummary } from '#/types/admin-member'
import type { UserRole } from '#/types/auth'
import {
  USER_PROFILE_COLUMNS,
  type UpdateUserProfileInput,
  type UsersRow,
} from '#/types/users'

type HackathonSubmissionUserRow = {
  user_id: string
  status: string
}

export function computeAdminMembersSummary(
  members: AdminMember[],
): AdminMembersSummary {
  const fullMembers = members.filter((m) => m.isMember).length
  return {
    total: members.length,
    fullMembers,
    nonMembers: members.length - fullMembers,
    lastSyncedAt: null,
  }
}

async function fetchHackathonSubmissionByUser(
  hackathonId: string,
): Promise<Map<string, HackathonSubmissionUserRow>> {
  const { data, error } = await supabase
    .from('hackathon_submissions')
    .select('user_id, status')
    .eq('hackathon_id', hackathonId)

  if (error) throw error

  const map = new Map<string, HackathonSubmissionUserRow>()
  for (const row of data ?? []) {
    map.set(row.user_id as string, row as HackathonSubmissionUserRow)
  }
  return map
}

function hackdscApplicationForStatus(
  status: string,
): AdminMember['hackdscApplication'] {
  const label =
    status === 'submitted'
      ? 'HackDSC — submitted'
      : status === 'draft'
        ? 'HackDSC 2026 — draft'
        : `HackDSC — ${status}`
  return { label, href: '/admin/applications' }
}

export async function fetchAdminMembers(): Promise<AdminMember[]> {
  const { data, error } = await supabase
    .from('users')
    .select(USER_PROFILE_COLUMNS)
    .order('created_at', { ascending: false })

  if (error) throw error

  const rows = (data ?? []) as UsersRow[]
  let submissionByUser = new Map<string, HackathonSubmissionUserRow>()

  try {
    submissionByUser = await fetchHackathonSubmissionByUser(
      getHackdscHackathonId(),
    )
  } catch {
    // Hackathon enrichment is optional when RLS blocks the join query.
  }

  return rows.map((row) => {
    const submission = submissionByUser.get(row.id)
    return mapUsersRowToAdminMember(row, {
      hackdscApplication: submission
        ? hackdscApplicationForStatus(submission.status)
        : undefined,
    })
  })
}

export async function updateAdminMember(
  userId: string,
  input: UpdateUserProfileInput,
): Promise<AdminMember> {
  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (input.is_verified !== undefined) {
    payload.is_verified = input.is_verified
  }
  if (input.roles !== undefined) {
    payload.roles = normalizeUserRoles(input.roles)
  }
  if (input.full_name !== undefined) {
    payload.full_name = input.full_name
  }
  if (input.avatar_url !== undefined) {
    payload.avatar_url = input.avatar_url
  }

  const { data, error } = await supabase
    .from('users')
    .update(payload)
    .eq('id', userId)
    .select(USER_PROFILE_COLUMNS)
    .single()

  if (error) throw error

  return mapUsersRowToAdminMember(data as UsersRow)
}

export async function setAdminMemberVerified(
  userId: string,
  isVerified: boolean,
): Promise<AdminMember> {
  return updateAdminMember(userId, { is_verified: isVerified })
}

export async function setAdminMemberPrimaryRole(
  userId: string,
  role: UserRole,
): Promise<AdminMember> {
  return updateAdminMember(userId, { roles: rolesForPrimaryRole(role) })
}

export async function setAdminMembersVerified(
  userIds: string[],
  isVerified: boolean,
): Promise<AdminMember[]> {
  return Promise.all(
    userIds.map((id) => setAdminMemberVerified(id, isVerified)),
  )
}

export async function setAdminMembersPrimaryRole(
  userIds: string[],
  role: UserRole,
): Promise<AdminMember[]> {
  return Promise.all(
    userIds.map((id) => setAdminMemberPrimaryRole(id, role)),
  )
}

export function mapAdminUsersError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Something went wrong. Please try again.'
  }

  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message
      : ''

  if (message.includes('row-level security') || message.includes('RLS')) {
    return 'You do not have permission to manage members.'
  }

  return message || 'Something went wrong. Please try again.'
}
