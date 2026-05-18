import type { LandingPageData } from '#/types/landing'

export const dummyLandingData = {
  navLinks: [
    { label: 'About Us', href: '#about' },
    { label: 'HACKDSC', href: '#hackdsc' },
    { label: 'Schedule', href: '#schedule' },
  ],
  hero: {
    statusLabel: 'Google Developer Student Club · UTD',
    titleLines: ['Build with', 'community,'],
    titleGradient: 'projects and events.',
    subtitle:
      'Workshops, project nights, and community events for students who want to ship real software at UT Dallas.',
    primaryCta: { label: 'Explore events', href: '#events' },
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
    subtitle:
      'Workshops and project nights on campus — filter by status or search by topic.',
  },
  events: [
    {
      id: 'intro-web-dev',
      title: 'Intro to Web Dev',
      type: 'Workshop',
      status: 'Past',
      date: 'Sep 18, 2025',
      time: '7:00 PM',
      location: 'ECSS 2.415',
      description: 'HTML, CSS, and JavaScript fundamentals for beginners.',
    },
    {
      id: 'cloud-study-jam',
      title: 'Cloud Study Jam',
      type: 'Workshop',
      status: 'Ongoing',
      date: 'Oct 5, 2025',
      time: '6:30 PM',
      location: 'SCI 1.220',
      description: 'Cloud basics, deployment workflows, and team builds.',
    },
    {
      id: 'ai-project-sprint',
      title: 'AI Project Sprint',
      type: 'Technical Project',
      status: 'Upcoming',
      date: 'Nov 1, 2025',
      time: '6:00 PM',
      location: 'Founders Lab',
      description: 'Team sprint focused on practical AI demos.',
    },
    {
      id: 'mobile-build-night',
      title: 'Mobile App Build Night',
      type: 'Technical Project',
      status: 'Past',
      date: 'Apr 15, 2025',
      time: '7:00 PM',
      location: 'ECSS 2.415',
      description: 'Prototype mobile apps with peers in one evening.',
    },
  ],
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
