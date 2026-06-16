import type { OfficerRoleId } from '#/types/admin-team'

/** Row shape for `public.officers` (Postgres). */
export type OfficersRow = {
  id: string
  user_id: string
  position: OfficerRoleId
  term_start: string
  term_end: string | null
  display_name: string
  photo_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export const OFFICER_COLUMNS =
  'id, user_id, position, term_start, term_end, display_name, photo_url, bio, created_at, updated_at' as const

export type CreateOfficerInput = {
  userId: string
  displayName: string
  position: OfficerRoleId
  bio: string
  photo?: Blob
}

export type UpdateOfficerInput = {
  position?: OfficerRoleId
  bio?: string
  photo?: Blob
  removePhoto?: boolean
}
