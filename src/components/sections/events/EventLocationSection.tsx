import { ArrowUpRight, MapPin } from 'lucide-react'
import type { ClubEventDetail } from '#/types/events'
import { getCampusMapThumbnailUrl } from '#/lib/campus-map'

type EventLocationSectionProps = {
  event: ClubEventDetail
}

export function EventLocationSection({ event }: EventLocationSectionProps) {
  const { location } = event
  const mapUrl =
    location.mapUrl ??
    `https://maps.google.com/?q=${encodeURIComponent(
      `${location.buildingFullName} ${location.room} UTD`,
    )}`
  const mapImage =
    location.mapImageUrl ??
    getCampusMapThumbnailUrl(location.buildingFullName, location.room)

  return (
    <section>
      <h2 className="text-sm font-semibold text-fg">Location</h2>
      <p className="mt-2 text-sm text-fg">
        {location.room} · {location.building}
      </p>
      <p className="text-sm text-fg-secondary">{location.buildingFullName}</p>

      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="group mt-3 block overflow-hidden rounded-xl border border-border-default bg-bg-elevated/40 transition-colors hover:border-border-strong"
      >
        <img
          src={mapImage}
          alt=""
          className="aspect-[21/9] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
        <span className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-fg-secondary transition-colors group-hover:text-fg">
          <MapPin className="h-3.5 w-3.5" />
          Open in Maps
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </a>
    </section>
  )
}
