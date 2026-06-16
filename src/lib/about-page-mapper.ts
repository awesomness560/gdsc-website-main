import type { OfficerRoleId } from '#/types/admin-team'
import type { AboutHero, AboutOfficer, AboutPageData } from '#/types/about'
import { ABOUT_DIVISIONS, ABOUT_HERO } from '#/data/about-divisions'
import { getOfficerRoleLabel } from '#/data/officer-roles'
import type { OfficersRow } from '#/types/officers'

function mapRowToAboutOfficer(row: OfficersRow): AboutOfficer {
  return {
    id: row.id,
    name: row.display_name,
    roleLabel: getOfficerRoleLabel(row.position),
    roleId: row.position,
    imageUrl: row.photo_url ?? undefined,
    bio: row.bio?.trim() ?? '',
  }
}

function officersByRole(
  rows: OfficersRow[],
): Map<OfficerRoleId, AboutOfficer[]> {
  const map = new Map<OfficerRoleId, AboutOfficer[]>()
  for (const row of rows) {
    const officer = mapRowToAboutOfficer(row)
    const list = map.get(row.position) ?? []
    list.push(officer)
    map.set(row.position, list)
  }
  for (const [roleId, list] of map) {
    map.set(
      roleId,
      [...list].sort((a, b) => a.name.localeCompare(b.name)),
    )
  }
  return map
}

function firstOfficer(
  byRole: Map<OfficerRoleId, AboutOfficer[]>,
  roleId: OfficerRoleId | null,
): AboutOfficer | undefined {
  if (!roleId) return undefined
  return byRole.get(roleId)?.[0]
}

function allOfficers(
  byRole: Map<OfficerRoleId, AboutOfficer[]>,
  roleId: OfficerRoleId | null,
): AboutOfficer[] {
  if (!roleId) return []
  return byRole.get(roleId) ?? []
}

export function buildAboutPageData(
  rows: OfficersRow[],
  hero: AboutHero = ABOUT_HERO,
): AboutPageData {
  const active = rows.filter((row) => row.term_end === null)
  const past = rows
    .filter((row) => row.term_end !== null)
    .map(mapRowToAboutOfficer)
    .sort((a, b) => a.name.localeCompare(b.name))

  const byRole = officersByRole(active)

  const divisions = ABOUT_DIVISIONS.map((def) => {
    const director = firstOfficer(byRole, def.directorRoleId)
    const officers = allOfficers(byRole, def.officerRoleId)
    return {
      id: def.id,
      title: def.title,
      director,
      officers,
    }
  }).filter((division) => division.director || division.officers.length > 0)

  return {
    hero,
    president: firstOfficer(byRole, 'president'),
    vicePresident: firstOfficer(byRole, 'vice_president'),
    divisions,
    pastOfficers: past,
  }
}
