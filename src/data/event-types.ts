import type { EventType } from '#/types/events'

/** Stand-in for Supabase `event_types` — swap for API data later. */
export const dummyEventTypes = [
  {
    id: 'type-workshop',
    slug: 'workshop',
    label: 'Workshop',
    sortOrder: 1,
    colors: {
      text: '#4285f4',
      background: 'rgba(66, 133, 244, 0.15)',
      border: 'rgba(66, 133, 244, 0.3)',
      muted: '#4285f4',
      glowFrom: 'rgba(66, 133, 244, 0.4)',
      glowVia: 'rgba(66, 133, 244, 0.1)',
    },
  },
  {
    id: 'type-industry-talk',
    slug: 'industry-talk',
    label: 'Industry talk',
    sortOrder: 2,
    colors: {
      text: '#f29900',
      background: 'rgba(251, 152, 5, 0.15)',
      border: 'rgba(251, 152, 5, 0.3)',
      muted: '#f29900',
      glowFrom: 'rgba(251, 152, 5, 0.4)',
      glowVia: 'rgba(251, 188, 5, 0.1)',
    },
  },
  {
    id: 'type-project-night',
    slug: 'project-night',
    label: 'Project night',
    sortOrder: 3,
    colors: {
      text: '#34a853',
      background: 'rgba(52, 168, 83, 0.15)',
      border: 'rgba(52, 168, 83, 0.3)',
      muted: '#34a853',
      glowFrom: 'rgba(52, 168, 83, 0.4)',
      glowVia: 'rgba(52, 168, 83, 0.1)',
    },
  },
  {
    id: 'type-social',
    slug: 'social',
    label: 'Social',
    sortOrder: 4,
    colors: {
      text: '#ec4899',
      background: 'rgba(236, 72, 153, 0.15)',
      border: 'rgba(236, 72, 153, 0.3)',
      muted: '#ec4899',
      glowFrom: 'rgba(236, 72, 153, 0.38)',
      glowVia: 'rgba(244, 114, 182, 0.12)',
    },
  },
] satisfies EventType[]

const typeById = new Map(dummyEventTypes.map((type) => [type.id, type]))
const typeBySlug = new Map(dummyEventTypes.map((type) => [type.slug, type]))

export function getEventTypeById(id: string): EventType {
  const type = typeById.get(id)
  if (!type) throw new Error(`Unknown event type id: ${id}`)
  return type
}

export function getEventTypeBySlug(slug: string): EventType {
  const type = typeBySlug.get(slug)
  if (!type) throw new Error(`Unknown event type slug: ${slug}`)
  return type
}

export function getEventTypeSlugs(): string[] {
  return dummyEventTypes.map((type) => type.slug)
}
