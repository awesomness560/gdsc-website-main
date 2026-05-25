import {
  BookOpen,
  Calendar,
  FileText,
  Github,
  Image,
  Link2,
  MapPin,
  Share2,
  Video,
} from 'lucide-react'
import type { ComponentType, Ref } from 'react'
import type { ClubEventDetail, EventResourceKind, EventsSearch } from '#/types/events'
import {
  formatDateRail,
  formatEventTimeRange,
  formatFullDate,
  getStatusPillLabel,
  shouldShowRegistrationBlock,
} from '#/lib/events'
import { CalendarDateIcon } from '#/components/ui/CalendarDateIcon'
import { MetaIconCard } from '#/components/ui/MetaIconCard'
import { Badge } from '#/components/ui/Badge'
import { EventDetailCover } from '#/components/sections/events/EventDetailCover'
import { EventRegistrationBlock } from '#/components/sections/events/EventRegistrationBlock'
import { EventPresenterCard } from '#/components/sections/events/EventPresenterCard'
import { EventLocationSection } from '#/components/sections/events/EventLocationSection'
import { MoreLikeThis } from '#/components/sections/events/MoreLikeThis'
import { downloadEventIcs, shareEvent } from '#/lib/ics'

const resourceIcons: Record<
  EventResourceKind,
  ComponentType<{ className?: string }>
> = {
  slides: FileText,
  recording: Video,
  github: Github,
  reading: BookOpen,
  form: Link2,
  photos: Image,
  other: Link2,
}

const DEFAULT_RESOURCE_BLURBS: Partial<Record<EventResourceKind, string>> = {
  reading: 'Recommended pre-reading',
  github: 'Starter code and setup',
  slides: 'Session deck',
  recording: 'Watch after the event',
  form: 'External sign-up',
  photos: 'Event album',
}

type EventDetailContentProps = {
  event: ClubEventDetail
  related: ClubEventDetail[]
  search: EventsSearch
  showCover?: boolean
  registrationRef?: Ref<HTMLDivElement>
}

export function EventDetailContent({
  event,
  related,
  search,
  showCover = true,
  registrationRef,
}: EventDetailContentProps) {
  const rail = formatDateRail(event.startsAt)
  const statusLabel = getStatusPillLabel(event.statusPill)
  const timeRange = formatEventTimeRange(event.startsAt, event.endsAt)

  return (
    <article>
      {showCover ? <EventDetailCover event={event} /> : null}

      <div className="space-y-6 px-6 py-5">
        {statusLabel ? (
          <Badge tone="neutral" className="normal-case tracking-normal">
            {statusLabel}
          </Badge>
        ) : null}

        <header>
          <h1 className="text-2xl font-medium tracking-tight text-fg sm:text-[1.75rem]">
            {event.title}
          </h1>
          <p className="mt-1.5 text-sm text-fg-secondary">Google Developer Student Club · UTD</p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <CalendarDateIcon
              month={rail.month}
              day={rail.day}
              monthColor={event.category.colors.muted ?? event.category.colors.text}
              size="sm"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-fg">{formatFullDate(event.startsAt)}</p>
              <p className="text-sm text-fg-secondary">{timeRange}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MetaIconCard size="sm">
              <MapPin className="h-4 w-4 text-fg-muted" strokeWidth={1.75} />
            </MetaIconCard>
            <div className="min-w-0">
              <p className="text-sm font-medium text-fg">{event.location.room}</p>
              <p className="text-sm text-fg-secondary">{event.location.buildingFullName}</p>
            </div>
          </div>
        </div>

        {shouldShowRegistrationBlock(event) ? (
          <div ref={registrationRef}>
            <EventRegistrationBlock event={event} />
          </div>
        ) : null}

        <section>
          <h2 className="text-sm font-semibold text-fg">About Event</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-fg-secondary">
            {event.descriptionParagraphs.map((paragraph, index) => (
              <p key={`${event.id}-p-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>

        {event.presenters.length > 0 ? (
          <section>
            <h2 className="text-sm font-semibold text-fg">Presenters</h2>
            <div className="mt-3 space-y-3">
              {event.presenters.map((presenter) => (
                <EventPresenterCard key={presenter.id} presenter={presenter} />
              ))}
            </div>
          </section>
        ) : null}

        {event.resources.length > 0 ? (
          <section>
            <h2 className="text-sm font-semibold text-fg">Resources</h2>
            <ul className="mt-3 space-y-2">
              {event.resources.map((resource) => {
                const Icon = resourceIcons[resource.kind]
                const description =
                  resource.description ?? DEFAULT_RESOURCE_BLURBS[resource.kind]
                return (
                  <li key={resource.id}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-3 rounded-xl border border-border-subtle bg-surface/40 p-3 transition-colors hover:border-border-default"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-fg-muted" />
                      <div>
                        <p className="text-sm font-medium text-fg">{resource.title}</p>
                        {description ? (
                          <p className="text-xs text-fg-muted">{description}</p>
                        ) : null}
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}

        <EventLocationSection event={event} />

        <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border-subtle pt-6">
          <button
            type="button"
            onClick={() => downloadEventIcs(event)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-secondary transition-colors hover:text-fg"
          >
            <Calendar className="h-3.5 w-3.5" />
            Add to calendar
          </button>
          <button
            type="button"
            onClick={() => shareEvent(event)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-fg-secondary transition-colors hover:text-fg"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
          <a
            href="mailto:gdsc@utdallas.edu"
            className="text-[11px] text-fg-muted/80 transition-colors hover:text-fg-muted"
          >
            Report an issue
          </a>
        </footer>

        <MoreLikeThis events={related} currentSlug={event.slug} search={search} />
      </div>
    </article>
  )
}
