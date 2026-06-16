import { mapOfficersRowToAdminOfficer } from '#/lib/admin-officer-mapper'
import { supabase } from '#/lib/supabase'
import type { AdminOfficer } from '#/types/admin-team'
import {
  OFFICER_COLUMNS,
  type CreateOfficerInput,
  type OfficersRow,
  type UpdateOfficerInput,
} from '#/types/officers'

const OFFICER_PHOTOS_BUCKET = 'officer-photos'

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function uploadOfficerPhoto(
  userId: string,
  file: Blob,
): Promise<string> {
  const path = `${userId}/headshot.jpg`
  const { error } = await supabase.storage
    .from(OFFICER_PHOTOS_BUCKET)
    .upload(path, file, { upsert: true, contentType: 'image/jpeg' })

  if (error) throw error

  const { data } = supabase.storage.from(OFFICER_PHOTOS_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function fetchAdminOfficers(): Promise<AdminOfficer[]> {
  const { data, error } = await supabase
    .from('officers')
    .select(OFFICER_COLUMNS)
    .order('created_at', { ascending: true })

  if (error) throw error

  return ((data ?? []) as OfficersRow[]).map((row) =>
    mapOfficersRowToAdminOfficer(row),
  )
}

export async function createAdminOfficer(
  input: CreateOfficerInput,
): Promise<AdminOfficer> {
  let photoUrl: string | null = null
  if (input.photo) {
    photoUrl = await uploadOfficerPhoto(input.userId, input.photo)
  }

  const { data, error } = await supabase
    .from('officers')
    .insert({
      user_id: input.userId,
      position: input.position,
      term_start: todayIsoDate(),
      term_end: null,
      display_name: input.displayName,
      photo_url: photoUrl,
      bio: input.bio.trim() || null,
    })
    .select(OFFICER_COLUMNS)
    .single()

  if (error) throw error

  return mapOfficersRowToAdminOfficer(data as OfficersRow)
}

export async function updateAdminOfficer(
  officerId: string,
  userId: string,
  input: UpdateOfficerInput,
): Promise<AdminOfficer> {
  const payload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (input.position !== undefined) payload.position = input.position
  if (input.bio !== undefined) payload.bio = input.bio.trim() || null

  if (input.removePhoto) {
    payload.photo_url = null
  } else if (input.photo) {
    payload.photo_url = await uploadOfficerPhoto(userId, input.photo)
  }

  const { data, error } = await supabase
    .from('officers')
    .update(payload)
    .eq('id', officerId)
    .select(OFFICER_COLUMNS)
    .single()

  if (error) throw error

  return mapOfficersRowToAdminOfficer(data as OfficersRow)
}

export async function deactivateAdminOfficer(
  officerId: string,
): Promise<AdminOfficer> {
  const { data, error } = await supabase
    .from('officers')
    .update({
      term_end: todayIsoDate(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', officerId)
    .select(OFFICER_COLUMNS)
    .single()

  if (error) throw error

  return mapOfficersRowToAdminOfficer(data as OfficersRow)
}

export async function reactivateAdminOfficer(
  officerId: string,
): Promise<AdminOfficer> {
  const { data, error } = await supabase
    .from('officers')
    .update({
      term_end: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', officerId)
    .select(OFFICER_COLUMNS)
    .single()

  if (error) throw error

  return mapOfficersRowToAdminOfficer(data as OfficersRow)
}

export function mapAdminOfficersError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Something went wrong. Please try again.'
  }

  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message
      : ''

  if (message.includes('row-level security') || message.includes('RLS')) {
    return 'You do not have permission to manage officers.'
  }

  if (message.includes('duplicate key') || message.includes('unique')) {
    return 'This member already has an officer profile.'
  }

  return message || 'Something went wrong. Please try again.'
}
