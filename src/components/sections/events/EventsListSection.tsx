import type { ClubEventDetail, EventsSearch } from '#/types/events'
import { groupPastByMonth } from '#/lib/events'
import { EventListCard } from '#/components/sections/events/EventListCard'
import { EventMonthHeader } from '#/components/sections/events/EventMonthHeader'

type EventsListSectionProps = {
  upcoming: ClubEventDetail[]
  past: ClubEventDetail[]
  search: EventsSearch
}

export function EventsListSection({ upcoming, past, search }: EventsListSectionProps) {
  const pastGroups = groupPastByMonth(past)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {upcoming.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 min-[1400px]:grid-cols-3">
          {upcoming.map((event) => (
            <EventListCard key={event.id} event={event} search={search} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border-default bg-surface/50 px-4 py-10 text-center text-sm text-fg-secondary">
          No upcoming events match your filters.
        </p>
      )}

      {past.length > 0 ? (
        <section className="mt-16 sm:mt-20">
          <h2 className="mb-6 text-2xl font-medium text-fg-muted">Past</h2>
          <div className="space-y-8">
            {pastGroups.map((group) => (
              <div key={group.key} className="space-y-4">
                <EventMonthHeader label={group.label} />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 min-[1400px]:grid-cols-3">
                  {group.events.map((event) => (
                    <EventListCard
                      key={event.id}
                      event={event}
                      search={search}
                      isPast
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
