import type { UserRole } from '#/types/auth'

/** Row shape for `public.users` (Postgres). */
export type UsersRow = {
  id: string
  full_name: string | null
  avatar_url: string | null
  is_verified: boolean
  roles: string[] | null
  created_at: string
  updated_at: string
}

export const USER_PROFILE_COLUMNS =
  'id, full_name, avatar_url, is_verified, roles, created_at, updated_at' as const

export type UpdateUserProfileInput = {
  is_verified?: boolean
  roles?: UserRole[]
  full_name?: string | null
  avatar_url?: string | null
}
