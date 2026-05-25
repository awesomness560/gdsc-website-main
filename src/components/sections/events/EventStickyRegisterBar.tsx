import type { ClubEventDetail } from '#/types/events'
import { shouldShowRegistrationBlock } from '#/lib/events'
import { Button } from '#/components/ui/Button'

type EventStickyRegisterBarProps = {
  event: ClubEventDetail
  visible: boolean
}

export function EventStickyRegisterBar({ event, visible }: EventStickyRegisterBarProps) {
  if (!visible || !shouldShowRegistrationBlock(event)) return null

  const { registerUrl } = event.registration
  if (!registerUrl) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border-default bg-surface-overlay/95 p-3 backdrop-blur-md lg:hidden">
      <Button href={registerUrl} className="h-11 w-full">
        RSVP
      </Button>
    </div>
  )
}
