import { uploadOfficerPhoto } from '#/api/admin-officers'
import { mapOfficersRowToAdminOfficer } from '#/lib/admin-officer-mapper'
import { supabase } from '#/lib/supabase'
import type { AdminOfficer } from '#/types/admin-team'
import {
  OFFICER_COLUMNS,
  type OfficersRow,
  type UpdateMyOfficerProfileInput,
} from '#/types/officers'

export async function fetchMyOfficer(
  userId: string,
): Promise<AdminOfficer | null> {
  const { data, error } = await supabase
    .from('officers')
    .select(OFFICER_COLUMNS)
    .eq('user_id', userId)
    .is('term_end', null)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return mapOfficersRowToAdminOfficer(data as OfficersRow)
}

export async function updateMyOfficerProfile(
  officerId: string,
  userId: string,
  input: UpdateMyOfficerProfileInput,
): Promise<AdminOfficer> {
  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (input.displayName !== undefined) {
    payload.display_name = input.displayName.trim()
  }
  if (input.bio !== undefined) {
    payload.bio = input.bio.trim() || null
  }
  if (input.removePhoto) {
    payload.photo_url = null
  } else if (input.photo) {
    payload.photo_url = await uploadOfficerPhoto(userId, input.photo)
  }

  const { data, error } = await supabase
    .from('officers')
    .update(payload)
    .eq('id', officerId)
    .eq('user_id', userId)
    .select(OFFICER_COLUMNS)
    .single()

  if (error) throw error

  return mapOfficersRowToAdminOfficer(data as OfficersRow)
}

export function mapMyOfficerError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Something went wrong. Please try again.'
  }

  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message
      : ''

  if (message.includes('row-level security') || message.includes('RLS')) {
    return 'You do not have permission to update your officer profile.'
  }

  return message || 'Something went wrong. Please try again.'
}
