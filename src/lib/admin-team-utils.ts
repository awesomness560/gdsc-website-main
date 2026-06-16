import { OFFICER_ROLES, getOfficerRole } from '#/data/officer-roles'
import type {
  AdminOfficer,
  OfficerDisplaySection,
  OfficerRoleId,
  OfficerSectionId,
} from '#/types/admin-team'

const SECTION_LABELS: Record<OfficerSectionId, string> = {
  leadership: 'Leadership',
  directors: 'Directors',
  officers: 'Officers',
}

const SECTION_ORDER: OfficerSectionId[] = [
  'leadership',
  'directors',
  'officers',
]

export function sortOfficersByRole(officers: AdminOfficer[]): AdminOfficer[] {
  return [...officers].sort((a, b) => {
    const roleDiff =
      getOfficerRole(a.roleId).sortIndex - getOfficerRole(b.roleId).sortIndex
    if (roleDiff !== 0) return roleDiff
    return a.name.localeCompare(b.name)
  })
}

export function organizeOfficerSections(
  officers: AdminOfficer[],
): OfficerDisplaySection[] {
  const active = sortOfficersByRole(officers.filter((officer) => officer.active))
  const deactivated = sortOfficersByRole(
    officers.filter((officer) => !officer.active),
  )

  const sections: OfficerDisplaySection[] = SECTION_ORDER.map((sectionId) => ({
    id: sectionId,
    label: SECTION_LABELS[sectionId],
    officers: active.filter(
      (officer) => getOfficerRole(officer.roleId).section === sectionId,
    ),
  })).filter((section) => section.officers.length > 0)

  if (deactivated.length > 0) {
    sections.push({
      id: 'deactivated',
      label: 'Deactivated',
      officers: deactivated,
    })
  }

  return sections
}

export function truncateBio(bio: string, maxLength = 120): string {
  const trimmed = bio.trim()
  if (trimmed.length <= maxLength) return trimmed
  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`
}

export { OFFICER_ROLES }
