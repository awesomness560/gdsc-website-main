export interface TeamMember {
  id: string
  name: string
  role: string
  imageUrl?: string
}

export interface LeadershipTeam {
  president: TeamMember
  vicePresident: TeamMember
  admin: TeamMember
}

export interface Division {
  id: string
  title: string
  director: TeamMember
  officers: TeamMember[]
}

export interface AboutHero {
  kicker: string
  title: string
  titleGradient?: string
  subtitle: string
}

/** Shape returned by a future about-page API endpoint. */
export interface AboutPageData {
  hero: AboutHero
  leadership: LeadershipTeam
  divisions: Division[]
  pastOfficers: TeamMember[]
}
