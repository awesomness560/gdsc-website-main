import type { OfficerRoleId } from '#/types/admin-team'

export const ABOUT_HERO = {
  kicker: 'About us',
  title: 'Meet the',
  titleGradient: 'team.',
  subtitle:
    'The students who plan events, run workshops, and keep GDG at UT Dallas going.',
} as const

export type AboutDivisionDef = {
  id: string
  title: string
  directorRoleId: OfficerRoleId | null
  officerRoleId: OfficerRoleId | null
}

/** Division clusters in display order (Administrative Director is a normal division). */
export const ABOUT_DIVISIONS: AboutDivisionDef[] = [
  {
    id: 'administrative',
    title: 'Administrative',
    directorRoleId: 'administrative_director',
    officerRoleId: null,
  },
  {
    id: 'technical',
    title: 'Technical',
    directorRoleId: 'tech_director',
    officerRoleId: 'tech_officer',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    directorRoleId: 'marketing_director',
    officerRoleId: 'marketing_officer',
  },
  {
    id: 'industry',
    title: 'Industry',
    directorRoleId: 'industry_director',
    officerRoleId: 'industry_officer',
  },
  {
    id: 'finance',
    title: 'Finance',
    directorRoleId: 'finance_director',
    officerRoleId: 'finance_officer',
  },
  {
    id: 'sprint',
    title: 'Sprint',
    directorRoleId: 'sprint_director',
    officerRoleId: 'sprint_officer',
  },
  {
    id: 'events',
    title: 'Events',
    directorRoleId: null,
    officerRoleId: 'events_officer',
  },
]
