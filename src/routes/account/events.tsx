import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from '#/components/ui/Card'

export const Route = createFileRoute('/account/events')({
  component: AccountEventsTab,
})

function AccountEventsTab() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-fg">My events</h2>
        <p className="text-sm text-fg-muted">
          Your RSVPs will show up here once we wire event RSVPs to your account.
        </p>
      </header>

      <Card>
        <p className="text-sm text-fg-secondary">
          You haven’t RSVP’d to any events yet.
        </p>
        <div className="mt-4">
          <Link
            to="/events"
            className="text-sm font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent"
          >
            Browse events →
          </Link>
        </div>
      </Card>
    </div>
  )
}

