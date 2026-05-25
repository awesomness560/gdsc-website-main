import type { LandingPageData } from '#/types/landing'

export const dummyLandingData = {
  navLinks: [
    { label: 'About Us', href: '#about' },
    { label: 'HACKDSC', href: '#hackdsc' },
    { label: 'Schedule', href: '#schedule' },
  ],
  hero: {
    statusLabel: 'Google Developer Groups · UTD',
    titleLines: ['Build with', 'community,'],
    titleGradient: 'projects and events.',
    subtitle:
      'Workshops, project nights, and community events for students who want to ship real software at UT Dallas.',
    primaryCta: { label: 'Explore events', href: '/events' },
    secondaryCta: { label: 'Meet the team', href: '/about' },
    meta: [
      { icon: 'map-pin' as const, text: 'UT Dallas' },
      { icon: 'sparkles' as const, text: 'Workshops · Projects · Community' },
    ],
  },
  stats: [
    { value: '2020', label: 'Founded', accent: 'blue' },
    { value: '4', label: 'Divisions', accent: 'red' },
    { value: '2', label: 'Core programs', accent: 'yellow' },
    { value: '1', label: 'Flagship hackathon', accent: 'green' },
  ],
  eventsSection: {
    kicker: 'Events',
    title: 'Learn, build, and',
    titleGradient: 'show up consistently.',
    subtitle: 'Upcoming workshops and project nights on campus — tap an event for details.',
  },
  programsSection: {
    kicker: 'Programs',
    title: 'Two ways to',
    titleGradient: 'grow with us.',
    subtitle:
      'Pick a track — show up, build, and leave with something you can demo.',
  },
  programs: [
    {
      id: 'workshops',
      kicker: 'Workshops',
      title: 'Technical workshops',
      description:
        'Structured sessions on frameworks, APIs, cloud, and dev workflows — beginner-friendly and hands-on.',
      accent: 'blue',
    },
    {
      id: 'projects',
      kicker: 'Technical projects',
      title: 'Project teams',
      description:
        'Scoped builds with teammates — practice collaboration and add real work to your portfolio.',
      accent: 'green',
    },
  ],
} satisfies LandingPageData
