import type { OfficerRoleId, OfficerRoleOption } from '#/types/admin-team'

export const OFFICER_ROLES: OfficerRoleOption[] = [
  {
    id: 'president',
    label: 'President',
    section: 'leadership',
    sortIndex: 0,
    dotClass: 'bg-google-blue shadow-[0_0_10px_rgba(66,133,244,0.45)]',
    badgeClass:
      'border-google-blue/30 bg-google-blue/12 text-google-blue',
  },
  {
    id: 'vice_president',
    label: 'Vice President',
    section: 'leadership',
    sortIndex: 1,
    dotClass: 'bg-google-red shadow-[0_0_10px_rgba(234,67,53,0.45)]',
    badgeClass: 'border-google-red/30 bg-google-red/12 text-google-red',
  },
  {
    id: 'administrative_director',
    label: 'Administrative Director',
    section: 'directors',
    sortIndex: 2,
    dotClass: 'bg-google-green shadow-[0_0_10px_rgba(52,168,83,0.45)]',
    badgeClass: 'border-google-green/30 bg-google-green/12 text-google-green',
  },
  {
    id: 'tech_director',
    label: 'Tech Director',
    section: 'directors',
    sortIndex: 3,
    dotClass: 'bg-schedule-teal shadow-[0_0_10px_rgba(20,184,166,0.45)]',
    badgeClass: 'border-schedule-teal/30 bg-schedule-teal/12 text-schedule-teal',
  },
  {
    id: 'marketing_director',
    label: 'Marketing Director',
    section: 'directors',
    sortIndex: 4,
    dotClass: 'bg-schedule-purple shadow-[0_0_10px_rgba(147,51,234,0.45)]',
    badgeClass:
      'border-schedule-purple/30 bg-schedule-purple/12 text-schedule-purple',
  },
  {
    id: 'industry_director',
    label: 'Industry Director',
    section: 'directors',
    sortIndex: 5,
    dotClass: 'bg-schedule-pink shadow-[0_0_10px_rgba(236,72,153,0.45)]',
    badgeClass: 'border-schedule-pink/30 bg-schedule-pink/12 text-schedule-pink',
  },
  {
    id: 'finance_director',
    label: 'Finance Director',
    section: 'directors',
    sortIndex: 6,
    dotClass: 'bg-google-yellow shadow-[0_0_10px_rgba(251,188,5,0.45)]',
    badgeClass:
      'border-google-yellow/30 bg-google-yellow/12 text-google-yellow',
  },
  {
    id: 'sprint_director',
    label: 'Sprint Director',
    section: 'directors',
    sortIndex: 7,
    dotClass: 'bg-schedule-coral shadow-[0_0_10px_rgba(249,115,22,0.45)]',
    badgeClass:
      'border-schedule-coral/30 bg-schedule-coral/12 text-schedule-coral',
  },
  {
    id: 'tech_officer',
    label: 'Tech Officer',
    section: 'officers',
    sortIndex: 8,
    dotClass: 'bg-[#2dd4bf] shadow-[0_0_10px_rgba(45,212,191,0.4)]',
    badgeClass: 'border-[#2dd4bf]/35 bg-[#2dd4bf]/12 text-[#2dd4bf]',
  },
  {
    id: 'marketing_officer',
    label: 'Marketing Officer',
    section: 'officers',
    sortIndex: 9,
    dotClass: 'bg-[#a78bfa] shadow-[0_0_10px_rgba(167,139,250,0.4)]',
    badgeClass: 'border-[#a78bfa]/35 bg-[#a78bfa]/12 text-[#a78bfa]',
  },
  {
    id: 'industry_officer',
    label: 'Industry Officer',
    section: 'officers',
    sortIndex: 10,
    dotClass: 'bg-[#f472b6] shadow-[0_0_10px_rgba(244,114,182,0.4)]',
    badgeClass: 'border-[#f472b6]/35 bg-[#f472b6]/12 text-[#f472b6]',
  },
  {
    id: 'finance_officer',
    label: 'Finance Officer',
    section: 'officers',
    sortIndex: 11,
    dotClass: 'bg-[#fde047] shadow-[0_0_10px_rgba(253,224,71,0.35)]',
    badgeClass: 'border-[#fde047]/35 bg-[#fde047]/12 text-[#fde047]',
  },
  {
    id: 'sprint_officer',
    label: 'Sprint Officer',
    section: 'officers',
    sortIndex: 12,
    dotClass: 'bg-[#fb923c] shadow-[0_0_10px_rgba(251,146,60,0.4)]',
    badgeClass: 'border-[#fb923c]/35 bg-[#fb923c]/12 text-[#fb923c]',
  },
  {
    id: 'events_officer',
    label: 'Events Officer',
    section: 'officers',
    sortIndex: 13,
    dotClass: 'bg-[#60a5fa] shadow-[0_0_10px_rgba(96,165,250,0.4)]',
    badgeClass: 'border-[#60a5fa]/35 bg-[#60a5fa]/12 text-[#60a5fa]',
  },
]

const roleById = new Map<OfficerRoleId, OfficerRoleOption>(
  OFFICER_ROLES.map((role) => [role.id, role]),
)

export function getOfficerRole(roleId: OfficerRoleId): OfficerRoleOption {
  const role = roleById.get(roleId)
  if (!role) {
    throw new Error(`Unknown officer role: ${roleId}`)
  }
  return role
}

export function getOfficerRoleLabel(roleId: OfficerRoleId): string {
  return roleById.get(roleId)?.label ?? roleId
}

export function isLeadershipOrDirectorRole(roleId: OfficerRoleId): boolean {
  const role = roleById.get(roleId)
  return role?.section === 'leadership' || role?.section === 'directors'
}
