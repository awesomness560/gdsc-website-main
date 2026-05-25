import { ArrowUpRight, MapPin } from 'lucide-react'
import type { ClubEventDetail } from '#/types/events'
import {
  getCampusMapEmbedUrl,
  getCampusMapsLinkUrl,
} from '#/lib/campus-map'

type EventLocationSectionProps = {
  event: ClubEventDetail
}

export function EventLocationSection({ event }: EventLocationSectionProps) {
  const { location } = event
  const mapsLink =
    location.mapUrl ??
    getCampusMapsLinkUrl(location.buildingFullName, location.room)
  const embedUrl =
    location.mapEmbedUrl ??
    getCampusMapEmbedUrl(location.buildingFullName, location.room)

  return (
    <section>
      <h2 className="text-sm font-semibold text-fg">Location</h2>
      <p className="mt-2 text-sm text-fg">
        {location.room} · {location.building}
      </p>
      <p className="text-sm text-fg-secondary">{location.buildingFullName}</p>

      <div className="group mt-3 overflow-hidden rounded-2xl border border-border-default bg-bg-elevated/40 transition-colors hover:border-border-strong">
        <div className="relative aspect-[21/9] min-h-[11rem] w-full bg-bg-elevated">
          <iframe
            title={`Map: ${location.buildingFullName}, ${location.room}`}
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <a
          href={mapsLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 border-t border-border-subtle px-3 py-2.5 text-xs font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg"
        >
          <MapPin className="h-3.5 w-3.5" />
          Open in Maps
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </section>
  )
}
