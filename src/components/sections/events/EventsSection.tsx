import { Calendar, Search } from 'lucide-react'
import type {
  ClubEvent,
  EventStatusFilter,
  EventSummary,
  SectionCopy,
} from '#/types/landing'
import { EventCard } from '#/components/sections/events/EventCard'
import { EventCompactRow } from '#/components/sections/events/EventCompactRow'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { cn } from '#/lib/cn'

type EventsSectionProps = SectionCopy & {
  events: ClubEvent[]
  search: string
  statusFilter: EventStatusFilter
  onSearchChange: (value: string) => void
  onStatusFilterChange: (value: EventStatusFilter) => void
  summary: EventSummary
}

const filters: EventStatusFilter[] = ['All', 'Upcoming', 'Ongoing', 'Past']

export function EventsSection({
  kicker,
  title,
  titleGradient,
  subtitle,
  events,
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  summary,
}: EventsSectionProps) {
  return (
    <section
      id="events"
      className="border-t border-border-subtle bg-bg-elevated/60 py-12 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker={kicker}
          title={title}
          titleGradient={titleGradient}
          subtitle={subtitle}
        />

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-fg-secondary sm:mt-8 sm:gap-3 sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-default bg-surface px-2.5 py-1 sm:gap-2 sm:px-3 sm:py-1.5">
            <Calendar className="h-3.5 w-3.5 text-fg-muted sm:h-4 sm:w-4" />
            {summary.total} events
          </span>
          <span className="rounded-full border border-border-default bg-surface px-2.5 py-1 sm:px-3 sm:py-1.5">
            {summary.upcoming} upcoming
          </span>
          <span className="rounded-full border border-border-default bg-surface px-2.5 py-1 sm:px-3 sm:py-1.5">
            {summary.ongoing} ongoing
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-border-default bg-surface p-3 sm:mt-6 sm:gap-4 sm:p-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search events..."
              className="h-10 w-full rounded-xl border border-border-default bg-bg-elevated/50 pr-3 pl-10 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-google-blue/40 sm:h-11"
            />
          </label>

          <div className="flex gap-1.5 overflow-x-auto pb-0.5 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => onStatusFilterChange(filter)}
                className={cn(
                  'h-9 shrink-0 rounded-full border px-3 text-xs font-medium transition-colors sm:h-10 sm:px-4 sm:text-sm',
                  statusFilter === filter
                    ? 'border-border-strong bg-white/10 text-fg'
                    : 'border-border-default text-fg-secondary hover:text-fg',
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2 sm:hidden">
          {events.map((event) => (
            <EventCompactRow key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-4 hidden gap-4 sm:grid sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {events.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-border-default bg-surface/50 px-4 py-8 text-center text-sm text-fg-secondary sm:mt-6 sm:px-6 sm:py-10">
            No events match your search yet.
          </p>
        ) : null}
      </div>
    </section>
  )
}
