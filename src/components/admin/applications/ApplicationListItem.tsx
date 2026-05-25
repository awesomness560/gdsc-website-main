import { Flag } from 'lucide-react'
import { UserAvatar } from '#/components/ui/UserAvatar'
import {
  displayApplicationName,
  displayApplicationSecondaryName,
  flagSummary,
  schoolMajorLine,
} from '#/lib/admin-application-utils'
import type { AdminApplication } from '#/types/admin-application'
import { cn } from '#/lib/cn'

type ApplicationListItemProps = {
  app: AdminApplication
  selected: boolean
  queueIndex?: number
  onSelect: () => void
}

function StatusDot({ decision }: { decision: AdminApplication['decision'] }) {
  if (decision === 'flagged') return null
  const color =
    decision === 'accepted'
      ? 'bg-google-green'
      : decision === 'rejected'
        ? 'bg-google-red'
        : 'bg-fg-muted'
  return <span className={cn('h-2 w-2 shrink-0 rounded-full', color)} aria-hidden />
}

export function ApplicationListItem({
  app,
  selected,
  onSelect,
}: ApplicationListItemProps) {
  const isFlagged = app.decision === 'flagged' || app.flags.length > 0
  const secondaryName = displayApplicationSecondaryName(app)
  const flagLine = flagSummary(app)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'w-full border-b border-border-subtle px-3 py-3 text-left transition-colors',
        'hover:bg-white/[0.04]',
        selected && 'border-l-2 border-l-accent bg-accent/10',
        isFlagged && !selected && 'bg-accent/[0.06]',
      )}
    >
      <div className="flex gap-3">
        <UserAvatar
          name={displayApplicationName(app)}
          email={app.form.email}
          avatarUrl={app.avatarUrl}
          size="sm"
          memberRing={app.isMember}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-fg">
                {displayApplicationName(app)}
              </p>
              {secondaryName ? (
                <p className="truncate text-xs text-fg-muted">{secondaryName}</p>
              ) : null}
            </div>
            {isFlagged ? (
              <Flag className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
            ) : (
              <StatusDot decision={app.decision} />
            )}
          </div>
          <p className="mt-1 truncate text-xs text-fg-secondary">
            {schoolMajorLine(app)}
          </p>
          {flagLine ? (
            <p className="mt-1 truncate text-[11px] text-accent/90">{flagLine}</p>
          ) : null}
        </div>
      </div>
    </button>
  )
}
