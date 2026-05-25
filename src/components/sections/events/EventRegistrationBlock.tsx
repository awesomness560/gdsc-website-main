import type { ClubEventDetail } from '#/types/events'
import { shouldShowRegistrationBlock } from '#/lib/events'
import { Button } from '#/components/ui/Button'

type EventRegistrationBlockProps = {
  event: ClubEventDetail
}

export function EventRegistrationBlock({ event }: EventRegistrationBlockProps) {
  if (!shouldShowRegistrationBlock(event)) return null

  const { registration } = event

  return (
    <section className="rounded-2xl border border-border-default bg-surface/50 p-5">
      <p className="text-xs font-medium tracking-wide text-fg-muted uppercase">
        Registration
      </p>
      {registration.registerUrl ? (
        <Button href={registration.registerUrl} className="mt-3 h-11 w-full">
          RSVP
        </Button>
      ) : null}
      {registration.rsvpCount != null ? (
        <p className="mt-3 text-xs text-fg-muted">{registration.rsvpCount} RSVPs</p>
      ) : null}
    </section>
  )
}
