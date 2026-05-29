import type { UserRole } from '#/types/auth'

export type AdminMemberActivity = {
  id: string
  label: string
  date: string
}

export type AdminMemberHackdsc = {
  label: string
  href: string
}

export type AdminMember = {
  id: string
  name: string
  /** Not stored on `public.users`; shown when available from other sources. */
  email: string | null
  avatarUrl?: string
  isMember: boolean
  roles: UserRole[]
  joinedAt: string
  updatedAt: string
  lastActivity?: string
  notes?: string
  activity: AdminMemberActivity[]
  hackdscApplication?: AdminMemberHackdsc
}

export type AdminMembersSummary = {
  total: number
  fullMembers: number
  nonMembers: number
  /** Set when roster sync is persisted; `null` until then. */
  lastSyncedAt: string | null
}

export type MemberFilter = 'all' | 'members' | 'non-members' | 'admins'

export type MemberSort = 'joined-desc' | 'joined-asc' | 'name-asc' | 'name-desc'

export type RosterSyncPreview = {
  fileName: string
  /** All emails extracted from the roster CSV. */
  emails: string[]
  emailCount: number
  added: { name: string; email: string }[]
  removed: { name: string; email: string }[]
  unchangedCount: number
  pendingSignups: { email: string }[]
}
