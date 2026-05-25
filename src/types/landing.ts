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

/** Shape returned by a future landing-page API endpoint. */
export interface LandingPageData {
  navLinks: NavLink[]
  hero: HeroContent
  stats: Stat[]
  eventsSection: SectionCopy
  programsSection: SectionCopy
  programs: Program[]
}
