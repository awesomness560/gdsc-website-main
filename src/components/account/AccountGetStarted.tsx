import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/cn'
import { JOIN_PAGE_PATH } from '#/lib/membership'

type AccountGetStartedProps = {
  showBecomeMember?: boolean
  className?: string
}

const chipClass =
  'inline-flex items-center rounded-lg border border-border-default bg-surface-raised/60 px-3 py-1.5 text-sm font-medium text-fg-secondary transition-colors hover:border-border-strong hover:bg-surface-raised hover:text-fg'

export function AccountGetStarted({
  showBecomeMember = true,
  className,
}: AccountGetStartedProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-border-subtle bg-surface/30 px-4 py-4 sm:px-5',
        className,
      )}
    >
      <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
        Get started
      </p>
      <p className="mt-2 text-sm text-fg-muted">
        New here? A few quick ways to jump in.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link to="/events" className={chipClass}>
          Browse events
        </Link>
        <Link to="/hackdsc" className={chipClass}>
          Read about HackDSC
        </Link>
        <Link to="/account/settings" className={chipClass}>
          Complete your profile
        </Link>
        {showBecomeMember ? (
          <Link to={JOIN_PAGE_PATH} className={chipClass}>
            Become a member
          </Link>
        ) : null}
      </div>
    </section>
  )
}
