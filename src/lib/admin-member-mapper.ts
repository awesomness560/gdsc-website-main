import type { AdminMember } from '#/types/admin-member'
import type { UserProfile, UserRole } from '#/types/auth'
import type { UsersRow } from '#/types/users'

export function normalizeUserRoles(roles: string[] | null | undefined): UserRole[] {
  const parsed = (roles?.length ? roles : ['user']) as UserRole[]
  if (!parsed.includes('user')) return [...parsed, 'user']
  return parsed
}

export function rolesForPrimaryRole(role: UserRole): UserRole[] {
  if (role === 'user') return ['user']
  return [role, 'user']
}

export function mapUsersRowToProfile(row: UsersRow): UserProfile {
  return {
    id: row.id,
    full_name: row.full_name,
    avatar_url: row.avatar_url,
    is_verified: row.is_verified,
    roles: normalizeUserRoles(row.roles),
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export function mapProfileToAdminMember(
  profile: UserProfile,
  options?: {
    email?: string | null
    avatarUrl?: string
    lastActivity?: string
    hackdscApplication?: AdminMember['hackdscApplication']
  },
): AdminMember {
  const name =
    profile.full_name?.trim() ||
    (options?.email ? options.email.split('@')[0] : 'Member')

  return {
    id: profile.id,
    name,
    email: options?.email ?? null,
    avatarUrl: options?.avatarUrl ?? profile.avatar_url ?? undefined,
    isMember: profile.is_verified,
    roles: profile.roles,
    joinedAt: profile.created_at,
    updatedAt: profile.updated_at,
    lastActivity: options?.lastActivity,
    activity: [],
    hackdscApplication: options?.hackdscApplication,
    notes: undefined,
  }
}

export function mapUsersRowToAdminMember(
  row: UsersRow,
  options?: Parameters<typeof mapProfileToAdminMember>[1],
): AdminMember {
  return mapProfileToAdminMember(mapUsersRowToProfile(row), options)
}
