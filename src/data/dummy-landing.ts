import type { LandingPageData } from '#/types/landing'
import { GDG_CHAPTER_URL } from '#/lib/membership'

export const dummyLandingData = {
  navLinks: [{ label: 'About Us', href: '/about' }],
  hero: {
    statusLabel: 'Google Developer Group · UT Dallas',
    titleLines: ['A student club for', 'people who like'],
    titleGradient: 'building software.',
    subtitle:
      'GDG on Campus at UT Dallas runs workshops, project teams, and socials for students who want to get better at building things. Everyone is welcome — no experience required.',
    primaryCta: { label: 'Meet the team', href: '/about' },
    secondaryCta: { label: 'Join GDG', href: GDG_CHAPTER_URL },
    meta: [
      { icon: 'map-pin' as const, text: 'ECSW · UT Dallas' },
      { icon: 'sparkles' as const, text: 'Open to all majors' },
    ],
  },
  stats: [
    { value: '2020', label: 'Founded', accent: 'blue' },
    { value: '4', label: 'Divisions', accent: 'red' },
    { value: '2', label: 'Core programs', accent: 'yellow' },
    { value: 'Free', label: 'To join', accent: 'green' },
  ],
  eventsSection: {
    kicker: 'Events',
    title: 'Workshops and',
    titleGradient: 'project nights.',
    subtitle: 'Regular meetups on campus — tap an event for details.',
  },
  programsSection: {
    kicker: 'Programs',
    title: 'Two ways to',
    titleGradient: 'get involved.',
    subtitle:
      'Come to a workshop, join a project team, or do both. Show up when you can.',
  },
  programs: [
    {
      id: 'workshops',
      kicker: 'Workshops',
      title: 'Technical workshops',
      description:
        'Hands-on sessions on the tools, frameworks, and workflows developers actually use. Beginner-friendly — just bring a laptop.',
      accent: 'blue',
    },
    {
      id: 'projects',
      kicker: 'GDG Sprints',
      title: 'GDG Sprints',
      description:
        'Small teams building a real project together over the semester, with something to demo at the end.',
      accent: 'green',
    },
  ],
} satisfies LandingPageData
