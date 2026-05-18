import type { AboutPageData } from '#/types/about'

export const dummyAboutData = {
  hero: {
    kicker: 'About us',
    title: 'Meet the',
    titleGradient: 'team.',
    subtitle: 'Leadership, divisions, and the people who run GDSC at UT Dallas.',
  },
  leadership: {
    president: {
      id: 'president',
      name: 'President Name',
      role: 'President',
    },
    vicePresident: {
      id: 'vice-president',
      name: 'Vice President Name',
      role: 'Vice President',
    },
    admin: {
      id: 'admin',
      name: 'Admin Name',
      role: 'Admin',
    },
  },
  divisions: [
    {
      id: 'technical',
      title: 'Technical',
      director: {
        id: 'technical-director',
        name: 'Technical Director',
        role: 'Director',
      },
      officers: [
        { id: 'tech-officer-1', name: 'Technical Officer 1', role: 'Officer' },
        { id: 'tech-officer-2', name: 'Technical Officer 2', role: 'Officer' },
        { id: 'tech-officer-3', name: 'Technical Officer 3', role: 'Officer' },
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing',
      director: {
        id: 'marketing-director',
        name: 'Marketing Director',
        role: 'Director',
      },
      officers: [
        { id: 'mkt-officer-1', name: 'Marketing Officer 1', role: 'Officer' },
        { id: 'mkt-officer-2', name: 'Marketing Officer 2', role: 'Officer' },
      ],
    },
    {
      id: 'sprints',
      title: 'Sprints',
      director: {
        id: 'sprints-director',
        name: 'Sprints Director',
        role: 'Director',
      },
      officers: [
        { id: 'sprints-officer-1', name: 'Sprints Officer 1', role: 'Officer' },
        { id: 'sprints-officer-2', name: 'Sprints Officer 2', role: 'Officer' },
        { id: 'sprints-officer-3', name: 'Sprints Officer 3', role: 'Officer' },
      ],
    },
    {
      id: 'industry',
      title: 'Industry',
      director: {
        id: 'industry-director',
        name: 'Industry Director',
        role: 'Director',
      },
      officers: [
        { id: 'industry-officer-1', name: 'Industry Officer 1', role: 'Officer' },
        { id: 'industry-officer-2', name: 'Industry Officer 2', role: 'Officer' },
      ],
    },
  ],
  pastOfficers: [
    { id: 'past-president', name: 'Past President', role: 'Past leadership' },
    { id: 'past-vp', name: 'Past Vice President', role: 'Past leadership' },
    {
      id: 'past-tech-director',
      name: 'Past Technical Director',
      role: 'Past leadership',
    },
    {
      id: 'past-mkt-director',
      name: 'Past Marketing Director',
      role: 'Past leadership',
    },
  ],
} satisfies AboutPageData
