import type { OfficerRoleId } from '#/types/admin-team'

export interface AboutOfficer {
  id: string
  name: string
  roleLabel: string
  roleId: OfficerRoleId
  imageUrl?: string
  bio: string
  linkedInUrl?: string
  githubUrl?: string
  websiteUrl?: string
}

export interface AboutDivisionCluster {
  id: string
  title: string
  /** Single division lead (DB-backed path). */
  director?: AboutOfficer
  /** Co-leads, rendered on their own row above the officers. Overrides `director`. */
  directors?: AboutOfficer[]
  officers: AboutOfficer[]
}

export interface AboutHero {
  kicker: string
  title: string
  titleGradient?: string
  subtitle: string
}

export interface AboutPageData {
  hero: AboutHero
  president?: AboutOfficer
  vicePresident?: AboutOfficer
  divisions: AboutDivisionCluster[]
  pastOfficers: AboutOfficer[]
}

/** @deprecated Use AboutOfficer on the public page. */
export interface TeamMember {
  id: string
  name: string
  role: string
  imageUrl?: string
}

/** @deprecated Legacy dummy shape. */
export interface LeadershipTeam {
  president: TeamMember
  vicePresident: TeamMember
  admin: TeamMember
}

/** @deprecated Legacy dummy shape. */
export interface Division {
  id: string
  title: string
  director: TeamMember
  officers: TeamMember[]
}
