import { supabase } from '#/lib/supabase'
import { mapUsersRowToProfile } from '#/lib/admin-member-mapper'
import type { UserProfile } from '#/types/auth'
import { USER_PROFILE_COLUMNS, type UsersRow } from '#/types/users'

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('users')
    .select(USER_PROFILE_COLUMNS)
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  return mapUsersRowToProfile(data as UsersRow)
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
