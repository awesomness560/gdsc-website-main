import type { ClubEventDetail } from '#/types/events'

function formatIcsDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export function buildIcsContent(event: ClubEventDetail) {
  const location = `${event.location.room}, ${event.location.buildingFullName}`
  const description = event.descriptionParagraphs.join('\\n\\n')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GDG UTD//Events//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@gdg-utd`,
    `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
    `DTSTART:${formatIcsDate(event.startsAt)}`,
    `DTEND:${formatIcsDate(event.endsAt)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadEventIcs(event: ClubEventDetail) {
  const content = buildIcsContent(event)
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${event.slug}.ics`
  anchor.click()
  URL.revokeObjectURL(url)
}

export async function copyEventLink(slug: string) {
  const url = `${window.location.origin}/events/${slug}`
  await navigator.clipboard.writeText(url)
}

export async function shareEvent(event: ClubEventDetail) {
  const url = `${window.location.origin}/events/${event.slug}`
  if (typeof navigator.share === 'function') {
    await navigator.share({ title: event.title, url })
    return
  }
  await navigator.clipboard.writeText(url)
}
