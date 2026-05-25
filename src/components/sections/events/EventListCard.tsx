import { Link } from '@tanstack/react-router'
import { ChevronRight, Clock, MapPin } from 'lucide-react'
import type { ClubEventDetail, EventsSearch } from '#/types/events'
import {
  eventTypeCardChipClassName,
  eventTypeChipStyle,
  eventTypeLabel,
  eventTypeTextStyle,
} from '#/lib/event-types'
import {
  formatCompactMeta,
  formatDateRail,
  formatEventTimeRange,
} from '#/lib/events'
import { cn } from '#/lib/cn'

type EventListCardProps = {
  event: ClubEventDetail
  search: EventsSearch
  isPast?: boolean
}

export function EventListCard({ event, search, isPast }: EventListCardProps) {
  const rail = formatDateRail(event.startsAt)
  const timeRange = formatEventTimeRange(event.startsAt, event.endsAt)
  const locationLabel = `${event.location.building} ${event.location.room}`
  const { category: type } = event

  return (
    <Link
      to="/events/$slug"
      params={{ slug: event.slug }}
      search={search}
      className={cn(
        'group flex min-h-[148px] overflow-hidden rounded-2xl border border-border-default bg-surface transition-[border-color,opacity,box-shadow] hover:border-border-strong hover:shadow-[0_0_24px_rgba(66,133,244,0.08)]',
        isPast && 'opacity-65 hover:opacity-90 sm:opacity-65 max-sm:opacity-75',
      )}
    >
      <div
        className={cn(
          'flex w-[60px] shrink-0 flex-col items-center justify-center border-r border-border-subtle bg-bg-elevated/50 px-1 py-4 sm:w-16',
        )}
      >
        <span
          className="text-[10px] font-semibold tracking-[0.14em] uppercase sm:text-[11px]"
          style={eventTypeTextStyle(type)}
        >
          {rail.month}
        </span>
        <span className="text-[28px] leading-none font-medium text-fg sm:text-4xl">
          {rail.day}
        </span>
        <span className="mt-1 text-[10px] tracking-wide text-fg-muted uppercase">
          {rail.weekday}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-4 pr-3">
        <div className="min-w-0 space-y-1.5">
          <span
            className={eventTypeCardChipClassName()}
            style={eventTypeChipStyle(type, true)}
          >
            {eventTypeLabel(type)}
          </span>
          <h3 className="truncate text-[17px] font-medium text-fg sm:text-xl">
            {event.title}
          </h3>
          {event.shortBlurb ? (
            <p className="hidden truncate text-sm text-fg-secondary min-[380px]:block sm:max-[1100px]:block">
              {event.shortBlurb}
            </p>
          ) : null}
          <p className="text-xs text-fg-muted min-[380px]:hidden sm:hidden">
            {formatCompactMeta(
              event.startsAt,
              event.location.room,
              event.location.building,
            )}
          </p>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="hidden flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-fg-muted min-[380px]:flex">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {timeRange}
            </span>
            <span className="text-border-strong">·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {locationLabel}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {isPast && event.pastLink ? (
              <button
                type="button"
                className="text-xs font-medium text-google-blue hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const link = event.pastLink
                  if (link) window.open(link.url, '_blank', 'noopener,noreferrer')
                }}
              >
                {event.pastLink.label}
              </button>
            ) : null}
            <ChevronRight className="h-4 w-4 shrink-0 text-fg-muted/50 transition-colors group-hover:text-fg sm:opacity-40 sm:group-hover:opacity-100" />
          </div>
        </div>
      </div>
    </Link>
  )
}
