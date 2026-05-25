import { supabase } from '#/lib/supabase'
import type { UserProfile, UserRole } from '#/types/auth'

type UsersRow = {
  id: string
  full_name: string | null
  avatar_url: string | null
  is_verified: boolean
  roles: string[] | null
  created_at: string
  updated_at: string
}

function mapUserProfileRow(row: UsersRow): UserProfile {
  return {
    id: row.id,
    full_name: row.full_name,
    avatar_url: row.avatar_url,
    is_verified: row.is_verified,
    roles: (row.roles?.length ? row.roles : ['user']) as UserRole[],
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select(
      'id, full_name, avatar_url, is_verified, roles, created_at, updated_at',
    )
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return mapUserProfileRow(data as UsersRow)
}

/** Ensures a profile row exists after signup (no-op if a DB trigger already created it). */
export async function upsertUserProfile(input: {
  id: string
  full_name: string
  avatar_url?: string | null
}) {
  const { error } = await supabase.from('users').upsert(
    {
      id: input.id,
      full_name: input.full_name,
      avatar_url: input.avatar_url ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  )

  if (error) throw error
}
