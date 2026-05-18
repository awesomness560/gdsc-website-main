import {
  Code2,
  Coffee,
  Flag,
  Mic,
  Moon,
  Users,
  UtensilsCrossed,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { ScheduleEvent } from '#/types/schedule'
import { accentTextClass } from '#/lib/accents'
import { Card } from '#/components/ui/Card'
import { cn } from '#/lib/cn'

type ScheduleTimelineItemProps = {
  event: ScheduleEvent
  isLast?: boolean
}

const icons: Record<
  ScheduleEvent['icon'],
  ComponentType<{ className?: string }>
> = {
  flag: Flag,
  mic: Mic,
  code: Code2,
  utensils: UtensilsCrossed,
  coffee: Coffee,
  users: Users,
  moon: Moon,
}

const markerClass = {
  blue: 'bg-google-blue shadow-[0_0_12px_rgba(66,133,244,0.5)]',
  red: 'bg-google-red shadow-[0_0_12px_rgba(234,67,53,0.5)]',
  yellow: 'bg-google-yellow shadow-[0_0_12px_rgba(251,188,5,0.5)]',
  green: 'bg-google-green shadow-[0_0_12px_rgba(52,168,83,0.5)]',
} as const

export function ScheduleTimelineItem({
  event,
  isLast = false,
}: ScheduleTimelineItemProps) {
  const Icon = icons[event.icon]

  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-4 sm:gap-5">
      <div className="flex flex-col items-center pt-5">
        <span
          className={cn('h-3 w-3 shrink-0 rounded-full', markerClass[event.accent])}
        />
        {!isLast ? (
          <span className="mt-2 w-px flex-1 bg-border-default" aria-hidden />
        ) : null}
      </div>

      <Card hover className="mb-4 flex gap-4 p-4 sm:p-5">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-default bg-bg-elevated',
            accentTextClass[event.accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p
            className={cn(
              'text-xs font-bold tracking-wider uppercase',
              accentTextClass[event.accent],
            )}
          >
            {event.time}
          </p>
          <h3 className="mt-1 text-lg font-bold tracking-tight">{event.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
            {event.description}
          </p>
        </div>
      </Card>
    </li>
  )
}
