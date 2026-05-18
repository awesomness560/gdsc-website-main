import type { HackdscPageData } from '#/types/hackdsc'

export const dummyHackdscData = {
  countdownTarget: '2026-09-12T18:00:00',
  hero: {
    status: {
      label: 'Applications open',
      highlight: 'Fall 2026',
    },
    titleLines: ['Build the'],
    titleAccent: 'impossible',
    titleSuffix: 'in 36 hours.',
    subtitle:
      'UT Dallas’ student hackathon — ship a project, join workshops, and compete for prizes over one weekend.',
    primaryCta: { label: 'Register', href: '#register' },
    secondaryCta: { label: 'View schedule', href: '/hackdsc/schedule' },
    meta: [
      { icon: 'calendar' as const, text: 'Sep 12–13, 2026' },
      { icon: 'map-pin' as const, text: 'Richardson, TX' },
    ],
  },
  stats: [
    { value: '500+', label: 'Hackers', accent: 'blue' },
    { value: '$50K', label: 'In prizes', accent: 'red' },
    { value: '36hrs', label: 'Of building', accent: 'yellow' },
    { value: '40+', label: 'Universities', accent: 'green' },
  ],
  tracksSection: {
    kicker: 'Tracks',
    title: 'Four tracks.',
    titleGradient: 'One weekend.',
    subtitle: 'Pick a lane — compete for track prizes and the grand prize.',
  },
  tracks: [
    {
      id: 'ai-ml',
      icon: 'brain',
      title: 'AI & ML',
      description: 'Models, agents, and intelligent tools — show what you can ship in a sprint.',
      accent: 'blue',
    },
    {
      id: 'founders',
      icon: 'rocket',
      title: 'Founders',
      description: 'MVP to demo day — validate an idea and pitch to judges.',
      accent: 'red',
    },
    {
      id: 'open-source',
      icon: 'code',
      title: 'Open source',
      description: 'Meaningful contributions, dev tools, and libraries others can use.',
      accent: 'yellow',
    },
    {
      id: 'social-impact',
      icon: 'target',
      title: 'Social impact',
      description: 'Products that help real people — campus, community, or beyond.',
      accent: 'green',
    },
  ],
  sponsorsSection: {
    kicker: 'Sponsors',
    title: 'Backed by partners who hire builders.',
  },
  sponsors: [
    { id: 'google', name: 'Google', initials: 'G' },
    { id: 'microsoft', name: 'Microsoft', initials: 'MS' },
    { id: 'github', name: 'GitHub', initials: 'GH' },
    { id: 'vercel', name: 'Vercel', initials: 'V' },
    { id: 'nvidia', name: 'NVIDIA', initials: 'NV' },
    { id: 'notion', name: 'Notion', initials: 'N' },
  ],
  faqSection: {
    kicker: 'FAQ',
    title: 'Quick answers',
  },
  faq: [
    {
      id: 'who',
      question: 'Who can attend?',
      answer:
        'CS, engineering, ATEC, and interdisciplinary students — solo or with a team.',
    },
    {
      id: 'team',
      question: 'Need a team first?',
      answer: 'No. You can apply solo or with friends.',
    },
    {
      id: 'cost',
      question: 'What does it cost?',
      answer: 'Free for accepted hackers.',
    },
    {
      id: 'bring',
      question: 'What should I bring?',
      answer: 'Laptop, charger, student ID, and anything you need to build.',
    },
  ],
} satisfies HackdscPageData
