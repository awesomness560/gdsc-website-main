import type { ScheduleDay } from '#/types/schedule'
import { ScheduleTimelineItem } from '#/components/sections/schedule/ScheduleTimelineItem'

type ScheduleDaySectionProps = {
  day: ScheduleDay
}

export function ScheduleDaySection({ day }: ScheduleDaySectionProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-border-subtle pb-4">
        <h2 className="text-2xl font-bold tracking-tight">{day.title}</h2>
        <span className="text-sm font-medium text-fg-muted">{day.date}</span>
      </div>
      <ul className="space-y-0">
        {day.events.map((event, index) => (
          <ScheduleTimelineItem
            key={event.id}
            event={event}
            isLast={index === day.events.length - 1}
          />
        ))}
      </ul>
    </section>
  )
}
