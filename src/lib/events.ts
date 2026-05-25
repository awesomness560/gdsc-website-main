import type { ClubEventDetail } from '#/types/events'

export function parseCategoryFilters(
  raw: unknown,
  knownSlugs: readonly string[],
): string[] {
  if (typeof raw !== 'string' || raw.trim() === '') return []
  const known = new Set(knownSlugs)
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter((value) => known.has(value))
}

export function serializeCategoryFilters(categorySlugs: string[]) {
  return categorySlugs.length > 0 ? categorySlugs.join(',') : undefined
}

export function toggleCategoryFilter(active: string[], slug: string): string[] {
  return active.includes(slug)
    ? active.filter((item) => item !== slug)
    : [...active, slug]
}

export function filterEvents(events: ClubEventDetail[], categorySlugs: string[]) {
  return events.filter((event) => {
    return (
      categorySlugs.length === 0 || categorySlugs.includes(event.category.slug)
    )
  })
}

export function isEventPast(event: ClubEventDetail, now = new Date()) {
  return new Date(event.endsAt) < now
}

export function shouldShowRegistrationBlock(event: ClubEventDetail, now = new Date()) {
  if (isEventPast(event, now)) return false
  const { state } = event.registration
  if (state === 'past' || state === 'walk-in') return false
  return state === 'open'
}

export function splitEventsByTime(events: ClubEventDetail[], now = new Date()) {
  const upcoming: ClubEventDetail[] = []
  const past: ClubEventDetail[] = []

  for (const event of events) {
    if (new Date(event.endsAt) >= now) {
      upcoming.push(event)
    } else {
      past.push(event)
    }
  }

  upcoming.sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )
  past.sort(
    (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
  )

  return { upcoming, past }
}

export function getLiveEvent(events: ClubEventDetail[], now = new Date()) {
  return events.find((event) => {
    const start = new Date(event.startsAt)
    const end = new Date(event.endsAt)
    return start <= now && now <= end
  })
}

export function groupPastByMonth(events: ClubEventDetail[]) {
  const groups: Array<{ key: string; label: string; events: ClubEventDetail[] }> = []

  for (const event of events) {
    const date = new Date(event.startsAt)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    const label = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    const existing = groups.find((group) => group.key === key)
    if (existing) {
      existing.events.push(event)
    } else {
      groups.push({ key, label, events: [event] })
    }
  }

  return groups
}

export function formatEventTimeRange(startsAt: string, endsAt: string) {
  const start = new Date(startsAt)
  const end = new Date(endsAt)
  const sameMeridiem =
    start.getHours() < 12 === end.getHours() < 12 ||
    (start.getHours() >= 12 && end.getHours() >= 12)

  const time = (date: Date, omitMeridiem = false) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: date.getMinutes() === 0 ? undefined : '2-digit',
      hour12: true,
      ...(omitMeridiem ? { timeZoneName: undefined } : {}),
    })

  if (sameMeridiem) {
    const startStr = time(start, true).replace(/\s?(AM|PM)$/i, '')
    return `${startStr} – ${time(end)}`
  }

  return `${time(start)} – ${time(end)}`
}

export function formatEndTime(endsAt: string) {
  return new Date(endsAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDateRail(startsAt: string) {
  const date = new Date(startsAt)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.getDate(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
  }
}

export function formatFullDate(startsAt: string) {
  return new Date(startsAt).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function formatCompactMeta(startsAt: string, room: string, building: string) {
  const date = new Date(startsAt)
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: date.getMinutes() === 0 ? undefined : '2-digit',
    hour12: true,
  })
  return `${weekday} ${time.toLowerCase()} · ${building} ${room}`
}

export function getAdjacentEventSlugs(events: ClubEventDetail[], slug: string) {
  const ordered = [...events].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  )
  const index = ordered.findIndex((event) => event.slug === slug)
  if (index === -1) return { prev: undefined, next: undefined }
  return {
    prev: ordered[index - 1]?.slug,
    next: ordered[index + 1]?.slug,
  }
}

export function getRelatedEvents(
  event: ClubEventDetail,
  allEvents: ClubEventDetail[],
  limit = 3,
) {
  return allEvents
    .filter(
      (item) =>
        item.slug !== event.slug &&
        item.categoryId === event.categoryId &&
        new Date(item.endsAt) >= new Date(),
    )
    .slice(0, limit)
}

export function getStatusPillLabel(pill: ClubEventDetail['statusPill']) {
  switch (pill) {
    case 'featured':
      return 'Featured'
    case 'past-event':
      return 'Past event'
    default:
      return undefined
  }
}
