/** CMS / Supabase-driven colors for an event type. */
export interface EventTypeColors {
  text: string
  background: string
  border: string
  /** Calendar month band, placeholder glow */
  muted?: string
  glowFrom?: string
  glowVia?: string
}

/**
 * Event type row — maps to a Supabase `event_types` table.
 * Events reference this via `categoryId` with `category` joined for display.
 */
export interface EventType {
  id: string
  slug: string
  label: string
  sortOrder?: number
  colors: EventTypeColors
}

export type EventRegistrationState = 'open' | 'walk-in' | 'past' | 'closed'

export type EventStatusPill = 'featured' | 'past-event'

export type EventResourceKind =
  | 'slides'
  | 'recording'
  | 'github'
  | 'reading'
  | 'form'
  | 'photos'
  | 'other'

export interface EventPresenter {
  id: string
  name: string
  role: string
  bio?: string
  avatarUrl?: string
  linkedInUrl?: string
  websiteUrl?: string
}

export interface EventResource {
  id: string
  kind: EventResourceKind
  title: string
  url: string
  description?: string
}

export interface EventLocation {
  room: string
  building: string
  buildingFullName: string
  mapUrl?: string
  mapImageUrl?: string
}

export interface EventRegistration {
  state: EventRegistrationState
  registerUrl?: string
  rsvpCount?: number
}

/** Full event record — intended to map 1:1 to a future API payload. */
export interface ClubEventDetail {
  id: string
  slug: string
  title: string
  shortBlurb?: string
  descriptionParagraphs: string[]
  /** FK to `event_types.id` */
  categoryId: string
  /** Joined type (Supabase select with relation). */
  category: EventType
  startsAt: string
  endsAt: string
  location: EventLocation
  coverImageUrl?: string
  statusPill?: EventStatusPill
  registration: EventRegistration
  presenters: EventPresenter[]
  resources: EventResource[]
  pastLink?: { label: 'Recap' | 'Slides'; url: string }
}

export interface EventsPageHero {
  badge: string
  title: string
  subtitle: string
}

/** Shape returned by a future events list API (types + events). */
export interface EventsPageData {
  hero: EventsPageHero
  eventTypes: EventType[]
  events: ClubEventDetail[]
}

/** URL search params for the events list (filters preserved on detail navigation). */
export type EventsSearch = {
  cat?: string
}
