import {
  Outlet,
  createFileRoute,
  useMatch,
  useNavigate,
} from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { dummyEventsData } from '#/data/dummy-events'
import { getEventTypeSlugs } from '#/data/event-types'
import {
  filterEvents,
  getLiveEvent,
  parseCategoryFilters,
  serializeCategoryFilters,
  splitEventsByTime,
  toggleCategoryFilter,
} from '#/lib/events'
import type { EventsSearch } from '#/types/events'
import { useIsMobileLayout } from '#/lib/use-media-query'
import { EventsPageHero } from '#/components/sections/events/EventsPageHero'
import { LiveNowStrip } from '#/components/sections/events/LiveNowStrip'
import { EventCategoryChips } from '#/components/sections/events/EventCategoryChips'
import { EventsListSection } from '#/components/sections/events/EventsListSection'
import { EventDetailPanel } from '#/components/sections/events/EventDetailPanel'

export const Route = createFileRoute('/events')({
  validateSearch: (search: Record<string, unknown>): EventsSearch => ({
    cat: typeof search.cat === 'string' ? search.cat : undefined,
  }),
  component: EventsLayout,
})

function EventsLayout() {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const isMobile = useIsMobileLayout()
  const detailMatch = useMatch({ from: '/events/$slug', shouldThrow: false })
  const activeSlug = detailMatch?.params.slug

  const { hero, eventTypes, events } = dummyEventsData
  const knownSlugs = useMemo(() => getEventTypeSlugs(), [])

  const activeCategories = useMemo(
    () => parseCategoryFilters(search.cat, knownSlugs),
    [search.cat, knownSlugs],
  )

  const filteredEvents = useMemo(
    () => filterEvents(events, activeCategories),
    [events, activeCategories],
  )

  const { upcoming, past } = useMemo(
    () => splitEventsByTime(filteredEvents),
    [filteredEvents],
  )

  const liveEvent = useMemo(() => getLiveEvent(filteredEvents), [filteredEvents])

  const updateCategories = useCallback(
    (category: Parameters<typeof toggleCategoryFilter>[1]) => {
      const next = toggleCategoryFilter(activeCategories, category)
      navigate({
        to: '/events',
        search: {
          ...search,
          cat: serializeCategoryFilters(next),
        },
        replace: true,
      })
    },
    [activeCategories, navigate, search],
  )

  const closePanel = useCallback(() => {
    navigate({ to: '/events', search })
  }, [navigate, search])

  if (isMobile && activeSlug) {
    return <Outlet />
  }

  return (
    <main>
      <EventsPageHero {...hero} />

      <div className="mx-auto max-w-6xl space-y-4 px-4 pb-6">
        {liveEvent ? (
          <div className="overflow-hidden rounded-2xl border border-border-default">
            <LiveNowStrip event={liveEvent} search={search} compact={isMobile} />
          </div>
        ) : null}
        <EventCategoryChips
          eventTypes={eventTypes}
          active={activeCategories}
          onToggle={updateCategories}
        />
      </div>

      <EventsListSection upcoming={upcoming} past={past} search={search} />

      {!isMobile && activeSlug ? (
        <EventDetailPanel open onClose={closePanel}>
          <Outlet />
        </EventDetailPanel>
      ) : null}
    </main>
  )
}
