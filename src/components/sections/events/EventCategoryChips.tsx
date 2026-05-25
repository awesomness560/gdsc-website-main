import type { EventType } from '#/types/events'
import { eventTypeChipClassName, eventTypeChipStyle } from '#/lib/event-types'
import { cn } from '#/lib/cn'

type EventCategoryChipsProps = {
  eventTypes: EventType[]
  active: string[]
  onToggle: (slug: string) => void
}

export function EventCategoryChips({
  eventTypes,
  active,
  onToggle,
}: EventCategoryChipsProps) {
  const chips = [...eventTypes].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  )

  return (
    <div className="relative min-w-0 flex-1">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chips.map((type) => {
          const isActive = active.includes(type.slug)
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onToggle(type.slug)}
              className={cn(eventTypeChipClassName(isActive))}
              style={eventTypeChipStyle(type, isActive)}
            >
              {type.label}
            </button>
          )
        })}
      </div>
      <div
        className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-bg-base to-transparent lg:hidden"
        aria-hidden
      />
    </div>
  )
}
