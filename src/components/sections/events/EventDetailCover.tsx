import type { ClubEventDetail } from '#/types/events'
import { MediaFrame } from '#/components/ui/MediaFrame'
import { cn } from '#/lib/cn'

type EventDetailCoverProps = {
  event: ClubEventDetail
  className?: string
}

export function EventDetailCover({ event, className }: EventDetailCoverProps) {
  return (
    <div className={cn('flex justify-center px-8 pt-4 pb-2', className)}>
      <MediaFrame
        src={event.coverImageUrl}
        alt={event.title}
        seed={event.slug}
        eventType={event.category}
        className="aspect-square w-full max-w-[240px] rounded-2xl border border-border-default"
        placeholderProps={{ glyph: 'category' }}
      />
    </div>
  )
}
