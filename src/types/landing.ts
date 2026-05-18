/** Shared accent tokens used across stats, programs, and UI mapping. */
export type GoogleAccent = 'blue' | 'red' | 'yellow' | 'green'

export type ProgramAccent = 'blue' | 'green'

export interface NavLink {
  label: string
  href: string
}

export interface CtaLink {
  label: string
  href: string
}

export type HeroMetaIcon = 'map-pin' | 'sparkles'

export interface HeroMetaItem {
  icon: HeroMetaIcon
  text: string
}

export interface HeroContent {
  statusLabel: string
  titleLines: string[]
  titleGradient: string
  subtitle: string
  primaryCta: CtaLink
  secondaryCta: CtaLink
  meta: HeroMetaItem[]
}

export interface Stat {
  value: string
  label: string
  accent: GoogleAccent
}

export type EventStatus = 'Upcoming' | 'Ongoing' | 'Past'

export type EventType = 'Workshop' | 'Technical Project'

/** Calendar event — named to avoid clashing with the DOM `Event` type. */
export interface ClubEvent {
  id: string
  title: string
  type: EventType
  status: EventStatus
  date: string
  time: string
  location: string
  description: string
}

export type EventStatusFilter = EventStatus | 'All'

export interface SectionCopy {
  kicker: string
  title: string
  titleGradient: string
  subtitle: string
}

export interface Program {
  id: string
  kicker: string
  title: string
  description: string
  accent: ProgramAccent
}

export interface EventSummary {
  total: number
  upcoming: number
  ongoing: number
}

/** Shape returned by a future landing-page API endpoint. */
export interface LandingPageData {
  navLinks: NavLink[]
  hero: HeroContent
  stats: Stat[]
  eventsSection: SectionCopy
  events: ClubEvent[]
  programsSection: SectionCopy
  programs: Program[]
}
