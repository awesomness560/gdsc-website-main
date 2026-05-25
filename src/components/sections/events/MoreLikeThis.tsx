import { Link } from '@tanstack/react-router'
import type { ClubEventDetail, EventsSearch } from '#/types/events'
import {
  eventTypeCardChipClassName,
  eventTypeChipStyle,
  eventTypeLabel,
} from '#/lib/event-types'
import { cn } from '#/lib/cn'

type MoreLikeThisProps = {
  events: ClubEventDetail[]
  currentSlug: string
  search: EventsSearch
}

export function MoreLikeThis({ events, currentSlug, search }: MoreLikeThisProps) {
  const related = events.filter((event) => event.slug !== currentSlug).slice(0, 3)

  if (related.length === 0) return null

  return (
    <section>
      <h2 className="text-sm font-semibold text-fg">More like this</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {related.map((event) => {
          const type = event.category
          return (
            <Link
              key={event.id}
              to="/events/$slug"
              params={{ slug: event.slug }}
              search={search}
              className="rounded-xl border border-border-default bg-surface/60 p-3 transition-colors hover:border-border-strong"
            >
              <span
                className={eventTypeCardChipClassName()}
                style={eventTypeChipStyle(type, true)}
              >
                {eventTypeLabel(type)}
              </span>
              <p className="mt-2 text-sm font-medium text-fg">{event.title}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
