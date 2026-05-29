import { useEffect, useState } from 'react'
import type { AdminApplication } from '#/types/admin-application'
import { cn } from '#/lib/cn'

type ApplicationDecisionBarProps = {
  app: AdminApplication
  autoAdvance: boolean
  onAutoAdvanceChange: (value: boolean) => void
  onAccept: () => void
  onReject: () => void
  onFlag: (reason?: string) => void
  onUnflag: () => void
  onMarkReviewed: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
  disabled?: boolean
  /** Increment to open the flag reason input from keyboard shortcuts. */
  flagPromptToken?: number
}

const btnBase =
  'relative inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

function ShortcutHint({ keys }: { keys: string }) {
  return (
    <span
      className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 text-[10px] font-medium text-fg-muted opacity-0 transition-opacity group-hover:opacity-100 lg:block"
      aria-hidden
    >
      {keys}
    </span>
  )
}

export function ApplicationDecisionBar({
  app,
  autoAdvance,
  onAutoAdvanceChange,
  onAccept,
  onReject,
  onFlag,
  onUnflag,
  onMarkReviewed,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  disabled,
  flagPromptToken = 0,
}: ApplicationDecisionBarProps) {
  const [flagReason, setFlagReason] = useState('')
  const [showFlagInput, setShowFlagInput] = useState(false)

  useEffect(() => {
    if (flagPromptToken > 0) setShowFlagInput(true)
  }, [flagPromptToken])

  const isFlagged = app.decision === 'flagged' || app.flags.length > 0
  const isDecided =
    app.decision === 'accepted' || app.decision === 'rejected'

  function submitFlag() {
    onFlag(flagReason.trim() || undefined)
    setFlagReason('')
    setShowFlagInput(false)
  }

  return (
    <div className="border-t border-border-subtle bg-bg-base/80">
      <div className="mx-auto max-w-[640px] space-y-4 px-5 py-6 sm:px-8">
        {showFlagInput ? (
          <div className="space-y-2">
            <label className="text-sm text-fg-secondary">
              Why are you flagging this?
            </label>
            <input
              type="text"
              value={flagReason}
              onChange={(e) => setFlagReason(e.target.value)}
              placeholder="Optional reason for the team"
              autoFocus
              className="h-10 w-full rounded-xl border border-border-default bg-bg-elevated px-3 text-sm text-fg outline-none focus:border-accent/40"
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitFlag()
                if (e.key === 'Escape') setShowFlagInput(false)
              }}
            />
            <div className="flex gap-2">
              <button
                type="button"
                className={cn(btnBase, 'bg-accent text-accent-fg hover:bg-accent-hover')}
                disabled={disabled}
                onClick={submitFlag}
              >
                Submit flag
              </button>
              <button
                type="button"
                className={cn(btnBase, 'border border-border-default text-fg-secondary hover:bg-white/5')}
                onClick={() => setShowFlagInput(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={cn(
              btnBase,
              'group bg-google-green text-white hover:bg-google-green/90',
              app.decision === 'accepted' && 'ring-2 ring-google-green/50',
            )}
            disabled={disabled}
            title="Accept (A)"
            onClick={onAccept}
          >
            Accept
            <ShortcutHint keys="A" />
          </button>
          <button
            type="button"
            className={cn(
              btnBase,
              'group border border-google-red/40 text-google-red hover:bg-google-red/10',
              app.decision === 'rejected' && 'ring-2 ring-google-red/40',
            )}
            disabled={disabled}
            title="Reject (R)"
            onClick={onReject}
          >
            Reject
            <ShortcutHint keys="R" />
          </button>
          <button
            type="button"
            className={cn(
              btnBase,
              'group border border-accent/40 text-accent hover:bg-accent/10',
            )}
            disabled={disabled}
            title="Flag (F)"
            onClick={() => setShowFlagInput(true)}
          >
            Flag for discussion
            <ShortcutHint keys="F" />
          </button>
          {isFlagged ? (
            <button
              type="button"
              className={cn(
                btnBase,
                'group border border-border-default text-fg-secondary hover:bg-white/5',
              )}
              disabled={disabled}
              title="Unflag (U)"
              onClick={onUnflag}
            >
              Unflag
              <ShortcutHint keys="U" />
            </button>
          ) : null}
        </div>

        {isDecided ? (
          <p className="text-xs text-fg-muted">
            Change decision using the buttons above.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4 text-sm">
          <button
            type="button"
            className="font-medium text-fg-secondary transition-colors hover:text-fg disabled:opacity-50"
            disabled={disabled || app.reviewed}
            onClick={onMarkReviewed}
          >
            {app.reviewed ? 'Marked as reviewed' : 'Mark as reviewed'}
          </button>
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-fg-muted">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => onAutoAdvanceChange(e.target.checked)}
              className="rounded border-border-strong accent-accent"
            />
            Auto-advance after decision
          </label>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              className={cn(btnBase, 'h-9 px-3 text-xs border border-border-default text-fg-secondary hover:bg-white/5')}
              disabled={!hasPrevious}
              title="Previous (K)"
              onClick={onPrevious}
            >
              Previous
            </button>
            <button
              type="button"
              className={cn(btnBase, 'h-9 px-3 text-xs border border-border-default text-fg-secondary hover:bg-white/5')}
              disabled={!hasNext}
              title="Next (J)"
              onClick={onNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
