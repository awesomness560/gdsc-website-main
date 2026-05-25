import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { dummyEventsData, getEventBySlug } from '#/data/dummy-events'
import { getEventTypeSlugs } from '#/data/event-types'
import {
  filterEvents,
  getAdjacentEventSlugs,
  getRelatedEvents,
  parseCategoryFilters,
} from '#/lib/events'
import { copyEventLink } from '#/lib/ics'
import { useIsMobileLayout } from '#/lib/use-media-query'
import { EventDetailToolbar } from '#/components/sections/events/EventDetailToolbar'
import { EventDetailContent } from '#/components/sections/events/EventDetailContent'
import { EventMobileDetailPage } from '#/components/sections/events/EventMobileDetailPage'

export const Route = createFileRoute('/events/$slug')({
  loader: ({ params }) => {
    const event = getEventBySlug(params.slug)
    if (!event) {
      throw new Error('Event not found')
    }
    return { event }
  },
  component: EventSlugPage,
})

function EventSlugPage() {
  const { event } = Route.useLoaderData()
  const search = useSearch({ from: '/events' })
  const navigate = useNavigate()
  const isMobile = useIsMobileLayout()

  const knownSlugs = useMemo(() => getEventTypeSlugs(), [])

  const activeCategories = useMemo(
    () => parseCategoryFilters(search.cat, knownSlugs),
    [search.cat, knownSlugs],
  )

  const filteredEvents = useMemo(
    () => filterEvents(dummyEventsData.events, activeCategories),
    [activeCategories],
  )

  const related = useMemo(
    () => getRelatedEvents(event, filteredEvents),
    [event, filteredEvents],
  )

  const { prev, next } = useMemo(
    () => getAdjacentEventSlugs(filteredEvents, event.slug),
    [filteredEvents, event.slug],
  )

  const closePanel = useCallback(() => {
    navigate({ to: '/events', search })
  }, [navigate, search])

  const goToSlug = useCallback(
    (slug: string | undefined) => {
      if (!slug) return
      navigate({ to: '/events/$slug', params: { slug }, search })
    },
    [navigate, search],
  )

  if (isMobile) {
    return (
      <EventMobileDetailPage event={event} related={related} search={search} />
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <EventDetailToolbar
        onClose={closePanel}
        onCopyLink={() => copyEventLink(event.slug)}
        onPrev={() => goToSlug(prev)}
        onNext={() => goToSlug(next)}
        hasPrev={Boolean(prev)}
        hasNext={Boolean(next)}
      />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <EventDetailContent event={event} related={related} search={search} />
      </div>
    </div>
  )
}
