import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { ClubEventDetail, EventsSearch } from '#/types/events'
import { formatEndTime } from '#/lib/events'

type LiveNowStripProps = {
  event: ClubEventDetail
  search: EventsSearch
  compact?: boolean
}

export function LiveNowStrip({ event, search, compact }: LiveNowStripProps) {
  const endLabel = formatEndTime(event.endsAt)

  return (
    <Link
      to="/events/$slug"
      params={{ slug: event.slug }}
      search={search}
      className="group flex items-center gap-3 bg-surface/60 px-4 py-3 transition-colors hover:bg-surface-raised sm:px-6"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-google-green opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-google-green" />
      </span>
      <p className="min-w-0 flex-1 text-sm font-medium text-fg">
        <span className="text-google-green">LIVE{compact ? '' : ' NOW'}</span>
        {' — '}
        {event.title}
        {!compact ? (
          <>
            {' · '}
            {event.location.room}
          </>
        ) : null}
        {' · ends '}
        {endLabel}
      </p>
      <ArrowRight className="h-4 w-4 shrink-0 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
    </Link>
  )
}
