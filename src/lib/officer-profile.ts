import { getOfficerRoleLabel } from '#/data/officer-roles'
import type { AdminOfficer } from '#/types/admin-team'
import type { AboutOfficer } from '#/types/about'

export function mapAdminOfficerToAboutOfficer(
  officer: AdminOfficer,
  overrides?: Partial<Pick<AboutOfficer, 'name' | 'imageUrl' | 'bio'>>,
): AboutOfficer {
  return {
    id: officer.id,
    name: overrides?.name?.trim() || officer.name,
    roleLabel: getOfficerRoleLabel(officer.roleId),
    roleId: officer.roleId,
    imageUrl: overrides?.imageUrl ?? officer.officerImageUrl,
    bio: overrides?.bio ?? officer.bio,
  }
}
