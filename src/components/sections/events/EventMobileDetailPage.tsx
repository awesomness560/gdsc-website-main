import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Share2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { ClubEventDetail, EventsSearch } from '#/types/events'
import { getPlaceholderBackground } from '#/lib/placeholder-gradient'
import { shareEvent } from '#/lib/ics'
import { MediaFrame } from '#/components/ui/MediaFrame'
import { EventDetailContent } from '#/components/sections/events/EventDetailContent'
import { EventStickyRegisterBar } from '#/components/sections/events/EventStickyRegisterBar'

type EventMobileDetailPageProps = {
  event: ClubEventDetail
  related: ClubEventDetail[]
  search: EventsSearch
}

export function EventMobileDetailPage({
  event,
  related,
  search,
}: EventMobileDetailPageProps) {
  const navigate = useNavigate()
  const registrationRef = useRef<HTMLDivElement | null>(null)
  const [stickyVisible, setStickyVisible] = useState(false)

  const placeholderBg = useMemo(
    () => getPlaceholderBackground(event.slug, event.category).background,
    [event.slug, event.category.id],
  )

  useEffect(() => {
    const node = registrationRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -80px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [event.slug])

  return (
    <main className="pb-24">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => navigate({ to: '/events', search })}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface/80 text-fg"
          aria-label="Back to events"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => shareEvent(event)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface/80 text-fg"
          aria-label="Share event"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </header>

      <div className="relative">
        {event.coverImageUrl ? (
          <div
            className="absolute inset-x-0 top-0 h-56 bg-cover bg-center opacity-40 blur-3xl"
            style={{ backgroundImage: `url(${event.coverImageUrl})` }}
            aria-hidden
          />
        ) : (
          <div
            className="absolute inset-x-0 top-0 h-56 opacity-50 blur-3xl"
            style={{ background: placeholderBg }}
            aria-hidden
          />
        )}

        <div className="relative flex justify-center px-6 pt-2">
          <MediaFrame
            src={event.coverImageUrl}
            alt={event.title}
            seed={event.slug}
            eventType={event.category}
            className="aspect-square w-full max-w-[240px] rounded-2xl border border-border-default"
            placeholderProps={{ glyph: 'category' }}
          />
        </div>

        <div className="relative mt-2 bg-gradient-to-b from-transparent via-bg-base/80 to-bg-base">
          <EventDetailContent
            event={event}
            related={related}
            search={search}
            showCover={false}
            registrationRef={registrationRef}
          />
        </div>
      </div>

      <EventStickyRegisterBar event={event} visible={stickyVisible} />
    </main>
  )
}
