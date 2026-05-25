import type { GoogleAccent, SectionCopy } from '#/types/landing'

export interface HackHero {
  status: {
    label: string
    highlight: string
  }
  titleLines: string[]
  /** Single accent word/phrase (warm highlight — not full rainbow). */
  titleAccent: string
  titleSuffix: string
  subtitle: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  meta: Array<{ icon: 'calendar' | 'map-pin'; text: string }>
}

export interface HackStat {
  value: string
  label: string
  accent: GoogleAccent
}

export type HackTrackIcon = 'brain' | 'rocket' | 'code' | 'target'

export interface HackTrack {
  id: string
  icon: HackTrackIcon
  title: string
  description: string
  accent: GoogleAccent
}

export interface HackSponsor {
  id: string
  name: string
  initials: string
}

export interface HackFaqItem {
  id: string
  question: string
  answer: string
}

export interface CountdownTime {
  days: string
  hours: string
  minutes: string
  seconds: string
}

/** Shape returned by a future HACKDSC page API endpoint. */
export interface HackdscPageData {
  countdownTarget: string
  hero: HackHero
  stats: HackStat[]
  tracksSection: SectionCopy
  tracks: HackTrack[]
  sponsorsSection: { kicker: string; title: string; subtitle?: string }
  sponsors: HackSponsor[]
  faqSection: { kicker: string; title: string }
  faq: HackFaqItem[]
}
