import type { AdminOfficer } from '#/types/admin-team'
import type { OfficersRow } from '#/types/officers'

export function mapOfficersRowToAdminOfficer(
  row: OfficersRow,
  options?: { email?: string },
): AdminOfficer {
  return {
    id: row.id,
    memberId: row.user_id,
    name: row.display_name,
    email: options?.email ?? '',
    officerImageUrl: row.photo_url ?? undefined,
    roleId: row.position,
    bio: row.bio ?? '',
    active: row.term_end === null,
  }
}
