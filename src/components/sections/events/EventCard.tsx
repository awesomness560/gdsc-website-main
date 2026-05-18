import { Calendar, Clock, MapPin } from 'lucide-react'
import type { ClubEvent } from '#/types/landing'
import { Badge } from '#/components/ui/Badge'
import { Card } from '#/components/ui/Card'

type EventCardProps = {
  event: ClubEvent
}

const statusTone = {
  Upcoming: 'upcoming',
  Ongoing: 'ongoing',
  Past: 'past',
} as const

export function EventCard({ event }: EventCardProps) {
  return (
    <Card hover className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between gap-2">
        <Badge tone={event.type === 'Workshop' ? 'blue' : 'green'}>
          {event.type}
        </Badge>
        <Badge tone={statusTone[event.status]}>{event.status}</Badge>
      </div>

      <h3 className="text-xl font-bold tracking-tight">{event.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-secondary">
        {event.description}
      </p>

      <ul className="mt-5 space-y-2 border-t border-border-subtle pt-4 text-sm text-fg-secondary">
        <li className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-fg-muted" />
          {event.date}
        </li>
        <li className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-fg-muted" />
          {event.time}
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-fg-muted" />
          {event.location}
        </li>
      </ul>
    </Card>
  )
}
