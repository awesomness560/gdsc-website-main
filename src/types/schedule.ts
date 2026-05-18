import type { GoogleAccent } from '#/types/landing'

export type ScheduleEventIcon =
  | 'flag'
  | 'mic'
  | 'code'
  | 'utensils'
  | 'coffee'
  | 'users'
  | 'moon'

export interface ScheduleEvent {
  id: string
  time: string
  title: string
  description: string
  accent: GoogleAccent
  icon: ScheduleEventIcon
}

export interface ScheduleDay {
  id: string
  title: string
  date: string
  events: ScheduleEvent[]
}

export interface ScheduleHero {
  kicker: string
  title: string
  titleGradient: string
  titleGradientLine2?: string
  subtitle: string
}

/** Shape returned by a future schedule API endpoint. */
export interface SchedulePageData {
  hero: ScheduleHero
  days: ScheduleDay[]
}
