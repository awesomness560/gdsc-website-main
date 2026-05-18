import { Calendar, ChevronRight, MapPin } from 'lucide-react'
import type { ClubEvent } from '#/types/landing'
import { Badge } from '#/components/ui/Badge'
import { cn } from '#/lib/cn'

type EventCompactRowProps = {
  event: ClubEvent
}

const statusTone = {
  Upcoming: 'upcoming',
  Ongoing: 'ongoing',
  Past: 'past',
} as const

export function EventCompactRow({ event }: EventCompactRowProps) {
  return (
    <article
      className={cn(
        'flex items-center gap-3 rounded-xl border border-border-default bg-surface px-3 py-3',
        'transition-colors hover:border-google-blue/25 hover:bg-surface-raised',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge
            tone={event.type === 'Workshop' ? 'blue' : 'green'}
            className="!px-2 !py-0.5 !text-[10px]"
          >
            {event.type === 'Workshop' ? 'Workshop' : 'Project'}
          </Badge>
          <Badge tone={statusTone[event.status]} className="!px-2 !py-0.5 !text-[10px]">
            {event.status}
          </Badge>
        </div>
        <h3 className="mt-1 truncate text-sm font-semibold">{event.title}</h3>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {event.date} · {event.time}
          </span>
          <span className="inline-flex min-w-0 items-center gap-1 truncate">
            <MapPin className="h-3 w-3 shrink-0" />
            {event.location}
          </span>
        </p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
    </article>
  )
}
