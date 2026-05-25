import type { ClubEventDetail, EventsPageData } from '#/types/events'
import { dummyEventTypes, getEventTypeById } from '#/data/event-types'
import { getDevLiveEventWindow } from '#/lib/live-event-window'

type EventDraft = Omit<ClubEventDetail, 'category'>

function withCategory(event: EventDraft): ClubEventDetail {
  return {
    ...event,
    category: getEventTypeById(event.categoryId),
  }
}

const liveWindow = getDevLiveEventWindow()

const eventDrafts: EventDraft[] = [
  {
    id: 'open-collab-hours',
    slug: 'open-collab-hours',
    title: 'Open Collab Hours',
    shortBlurb: 'Drop in anytime — work on club projects, homework, or meet other builders.',
    descriptionParagraphs: [
      'Our collaboration space stays open for the semester. Stop by for help with workshops, project teams, or just to cowork with other GDSC members.',
    ],
    categoryId: 'type-project-night',
    startsAt: liveWindow.startsAt,
    endsAt: liveWindow.endsAt,
    location: {
      room: 'MC 2.410',
      building: 'ECSW',
      buildingFullName: 'Engineering and Computer Science West',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+ECSW',
    },
    registration: { state: 'walk-in' },
    presenters: [],
    resources: [],
  },
  {
    id: 'intro-to-rag',
    slug: 'intro-to-rag',
    title: 'Intro to RAG',
    shortBlurb:
      'Build a retrieval-augmented pipeline from scratch with embeddings and vector search.',
    descriptionParagraphs: [
      'Retrieval-augmented generation (RAG) is one of the most practical ways to ship AI features without fine-tuning a model from scratch. In this workshop we walk through document ingestion, chunking, embedding, and querying with a vector store.',
      'Bring a laptop with Node 20+ installed. We will use a starter repo and deploy a small demo by the end of the session.',
    ],
    categoryId: 'type-workshop',
    startsAt: '2026-05-23T18:00:00-05:00',
    endsAt: '2026-05-23T19:30:00-05:00',
    location: {
      room: 'MC 2.410',
      building: 'ECSW',
      buildingFullName: 'Engineering and Computer Science West',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+ECSW',
    },
    statusPill: 'featured',
    registration: {
      state: 'open',
      registerUrl: 'https://lu.ma/example-rag',
      rsvpCount: 47,
    },
    presenters: [
      {
        id: 'p1',
        name: 'Alex Rivera',
        role: 'Software Engineer @ Google',
        bio: 'Works on search quality tooling and loves teaching practical ML.',
        linkedInUrl: 'https://linkedin.com',
      },
      {
        id: 'p2',
        name: 'Priya N.',
        role: 'Senior, CS @ UTD',
        bio: 'AI/ML lead for GDSC — built last semester’s study-jam curriculum.',
      },
    ],
    resources: [
      {
        id: 'r1',
        kind: 'github',
        title: 'Workshop starter repo',
        url: 'https://github.com',
        description: 'Clone before the session if you can.',
      },
      {
        id: 'r2',
        kind: 'reading',
        title: 'Embeddings primer',
        url: 'https://developers.google.com',
        description: 'Recommended pre-reading',
      },
    ],
  },
  {
    id: 'react-native-night',
    slug: 'react-native-night',
    title: 'React Native Project Night',
    shortBlurb: 'Ship a cross-platform screen with navigation and a mocked API.',
    descriptionParagraphs: [
      'Project nights are low-pressure build sessions — show up, pick a starter task, and leave with something demo-able.',
      'We will cover Expo setup, file-based routing, and styling patterns that scale to real apps.',
    ],
    categoryId: 'type-project-night',
    startsAt: '2026-05-28T19:00:00-05:00',
    endsAt: '2026-05-28T21:00:00-05:00',
    location: {
      room: 'ECSW 1.355',
      building: 'ECSW',
      buildingFullName: 'Engineering and Computer Science West',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+ECSW+1.355',
    },
    registration: { state: 'walk-in' },
    presenters: [
      {
        id: 'p3',
        name: 'Jordan Lee',
        role: 'Web Dev Officer @ GDSC',
      },
    ],
    resources: [],
  },
  {
    id: 'google-pm-panel',
    slug: 'google-pm-panel',
    title: 'Inside Google: PM × Engineering',
    shortBlurb: 'How product and engineering collaborate on user-facing launches.',
    descriptionParagraphs: [
      'Hear from a Google PM and engineer duo about roadmap planning, experimentation, and the day-to-day of shipping at scale.',
      'Q&A at the end — bring questions about internships, interviews, and team structure.',
    ],
    categoryId: 'type-industry-talk',
    startsAt: '2026-06-04T18:30:00-05:00',
    endsAt: '2026-06-04T20:00:00-05:00',
    location: {
      room: 'GR 2.302',
      building: 'GR',
      buildingFullName: 'Green Hall',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+Green+Hall',
    },
    registration: {
      state: 'open',
      registerUrl: 'https://lu.ma/example-panel',
      rsvpCount: 112,
    },
    presenters: [
      {
        id: 'p4',
        name: 'Morgan Chen',
        role: 'Product Manager @ Google',
        linkedInUrl: 'https://linkedin.com',
      },
    ],
    resources: [],
  },
  {
    id: 'end-of-sem-social',
    slug: 'end-of-sem-social',
    title: 'End-of-Semester Social',
    shortBlurb: 'Board games, snacks, and project show-and-tell.',
    descriptionParagraphs: [
      'Celebrate the semester with the club — no laptops required. Bring a project to show off or just hang out.',
    ],
    categoryId: 'type-social',
    startsAt: '2026-06-12T17:00:00-05:00',
    endsAt: '2026-06-12T19:00:00-05:00',
    location: {
      room: 'SU 2.902',
      building: 'SU',
      buildingFullName: 'Student Union',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+Student+Union',
    },
    registration: { state: 'walk-in' },
    presenters: [],
    resources: [],
  },
  {
    id: 'cloud-run-lab',
    slug: 'cloud-run-lab',
    title: 'Deploy on Cloud Run',
    shortBlurb: 'Containerize a small API and ship it with CI in one evening.',
    descriptionParagraphs: [
      'We will dockerize a Node service, push to Artifact Registry, and deploy on Cloud Run with environment secrets.',
    ],
    categoryId: 'type-workshop',
    startsAt: '2026-06-18T19:00:00-05:00',
    endsAt: '2026-06-18T20:30:00-05:00',
    location: {
      room: 'ECSW 1.355',
      building: 'ECSW',
      buildingFullName: 'Engineering and Computer Science West',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+ECSW',
    },
    registration: {
      state: 'open',
      registerUrl: 'https://lu.ma/example-cloud',
      rsvpCount: 40,
    },
    presenters: [
      {
        id: 'p5',
        name: 'Sam Okonkwo',
        role: 'Cloud Engineer @ GDSC',
      },
    ],
    resources: [
      {
        id: 'r3',
        kind: 'reading',
        title: 'Cloud Run quickstart',
        url: 'https://cloud.google.com/run/docs/quickstarts',
        description: 'Official setup guide',
      },
    ],
  },
  {
    id: 'typescript-deep-dive',
    slug: 'typescript-deep-dive',
    title: 'TypeScript Deep Dive',
    shortBlurb: 'Generics, utility types, and patterns for large React codebases.',
    descriptionParagraphs: [
      'A follow-up to our intro web series — we focus on type-level patterns that pay off in team projects.',
    ],
    categoryId: 'type-workshop',
    startsAt: '2025-11-13T19:00:00-06:00',
    endsAt: '2025-11-13T20:30:00-06:00',
    location: {
      room: 'ECSW 1.355',
      building: 'ECSW',
      buildingFullName: 'Engineering and Computer Science West',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+ECSW',
    },
    statusPill: 'past-event',
    registration: { state: 'past' },
    presenters: [
      {
        id: 'p6',
        name: 'Jordan Lee',
        role: 'Web Dev Officer @ GDSC',
      },
    ],
    resources: [
      {
        id: 'r4',
        kind: 'slides',
        title: 'Session slides',
        url: 'https://example.com/slides',
        description: 'Deck from the session',
      },
      {
        id: 'r5',
        kind: 'recording',
        title: 'Recording',
        url: 'https://example.com/recording',
        description: 'Full workshop replay',
      },
    ],
    pastLink: { label: 'Slides', url: 'https://example.com/slides' },
  },
  {
    id: 'firebase-auth-lab',
    slug: 'firebase-auth-lab',
    title: 'Firebase Auth Lab',
    shortBlurb: 'Email, Google sign-in, and protected routes in a Vite app.',
    descriptionParagraphs: [
      'Hands-on lab covering Firebase Auth setup, session persistence, and route guards.',
    ],
    categoryId: 'type-workshop',
    startsAt: '2025-11-06T19:00:00-06:00',
    endsAt: '2025-11-06T20:30:00-06:00',
    location: {
      room: 'ECSS 2.415',
      building: 'ECSS',
      buildingFullName: 'Engineering and Computer Science South',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+ECSS',
    },
    statusPill: 'past-event',
    registration: { state: 'past' },
    presenters: [],
    resources: [
      {
        id: 'r6',
        kind: 'github',
        title: 'Lab repo',
        url: 'https://github.com',
        description: 'Starter code and solutions',
      },
    ],
    pastLink: { label: 'Recap', url: 'https://github.com' },
  },
  {
    id: 'stripe-fireside',
    slug: 'stripe-fireside',
    title: 'Fireside with Stripe Engineering',
    shortBlurb: 'Payments infrastructure, reliability, and intern paths.',
    descriptionParagraphs: [
      'An engineer from Stripe walks through designing for correctness under load — with plenty of time for questions.',
    ],
    categoryId: 'type-industry-talk',
    startsAt: '2025-10-22T18:30:00-05:00',
    endsAt: '2025-10-22T20:00:00-05:00',
    location: {
      room: 'GR 2.302',
      building: 'GR',
      buildingFullName: 'Green Hall',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+Green+Hall',
    },
    statusPill: 'past-event',
    registration: { state: 'past' },
    presenters: [
      {
        id: 'p7',
        name: 'Taylor Brooks',
        role: 'Software Engineer @ Stripe',
      },
    ],
    resources: [],
  },
  {
    id: 'halloween-social',
    slug: 'halloween-social',
    title: 'Halloween Social & Demos',
    shortBlurb: 'Costumes optional, project demos encouraged.',
    descriptionParagraphs: [
      'Our annual fall social — snacks, music, and lightning demos from project teams.',
    ],
    categoryId: 'type-social',
    startsAt: '2025-10-30T18:00:00-05:00',
    endsAt: '2025-10-30T20:00:00-05:00',
    location: {
      room: 'SU 2.902',
      building: 'SU',
      buildingFullName: 'Student Union',
      mapUrl: 'https://maps.google.com/?q=UT+Dallas+Student+Union',
    },
    statusPill: 'past-event',
    registration: { state: 'past' },
    presenters: [],
    resources: [
      {
        id: 'r7',
        kind: 'photos',
        title: 'Event photos',
        url: 'https://example.com/photos',
        description: 'Recap album from the night',
      },
    ],
    pastLink: { label: 'Recap', url: 'https://example.com/photos' },
  },
]

export const dummyEventsData = {
  hero: {
    badge: '• EVENTS · FALL 2026',
    title: "What we're building this semester.",
    subtitle: 'Workshops, project nights, industry talks, and socials.',
  },
  eventTypes: dummyEventTypes,
  events: eventDrafts.map(withCategory),
} satisfies EventsPageData

export function getEventBySlug(slug: string) {
  return dummyEventsData.events.find((event) => event.slug === slug)
}
