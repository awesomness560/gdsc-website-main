import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
import type { ClubEventDetail } from '#/types/events'
import type { SectionCopy } from '#/types/landing'
import { getLiveEvent, splitEventsByTime } from '#/lib/events'
import { EventListCard } from '#/components/sections/events/EventListCard'
import { LiveNowStrip } from '#/components/sections/events/LiveNowStrip'
import { SectionHeading } from '#/components/ui/SectionHeading'

type HomeEventsSectionProps = SectionCopy & {
  events: ClubEventDetail[]
  previewLimit?: number
}

const emptySearch = {}

export function HomeEventsSection({
  kicker,
  title,
  titleGradient,
  subtitle,
  events,
  previewLimit = 6,
}: HomeEventsSectionProps) {
  const liveEvent = useMemo(() => getLiveEvent(events), [events])

  const upcoming = useMemo(() => {
    const { upcoming: list } = splitEventsByTime(events)
    return list.slice(0, previewLimit)
  }, [events, previewLimit])

  return (
    <section
      id="events"
      className="border-t border-border-subtle bg-bg-elevated/60 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker={kicker}
          title={title}
          titleGradient={titleGradient}
          subtitle={subtitle}
        />

        {liveEvent ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-border-default">
            <LiveNowStrip event={liveEvent} search={emptySearch} />
          </div>
        ) : null}

        {upcoming.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 min-[1400px]:grid-cols-3">
            {upcoming.map((event) => (
              <EventListCard key={event.id} event={event} search={emptySearch} />
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-border-default bg-surface/50 px-4 py-10 text-center text-sm text-fg-secondary">
            No upcoming events right now.
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/events"
            preload="intent"
            className="inline-flex items-center gap-2 rounded-2xl border border-border-default bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-border-strong hover:bg-surface-raised"
          >
            View all events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
