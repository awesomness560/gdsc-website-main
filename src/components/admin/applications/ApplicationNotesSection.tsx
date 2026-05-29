import { useState } from 'react'
import { UserAvatar } from '#/components/ui/UserAvatar'
import { formatRelativeTime } from '#/lib/admin-application-utils'
import type { AdminApplication } from '#/types/admin-application'

type ApplicationNotesSectionProps = {
  app: AdminApplication
  onAddNote: (body: string) => void
  disabled?: boolean
  collapsed?: boolean
}

export function ApplicationNotesSection({
  app,
  onAddNote,
  disabled,
  collapsed,
}: ApplicationNotesSectionProps) {
  const [draft, setDraft] = useState('')
  const [expanded, setExpanded] = useState(!collapsed)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const body = draft.trim()
    if (!body) return
    onAddNote(body)
    setDraft('')
  }

  const timeline = app.activity

  return (
    <section className="border-t border-border-subtle bg-bg-base/50 pb-10">
      <div className="mx-auto max-w-[640px] px-5 py-6 sm:px-8">
        {collapsed ? (
          <button
            type="button"
            className="text-sm font-medium text-fg-secondary hover:text-fg"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Hide' : 'Show'} team notes ({timeline.length})
          </button>
        ) : (
          <h3 className="text-[11px] font-semibold tracking-wider text-fg-muted uppercase">
            Team notes
          </h3>
        )}

        {expanded ? (
          <>
            {timeline.length === 0 ? (
              <p className="mt-3 text-sm text-fg-muted">No activity yet.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {timeline.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <UserAvatar
                      name={item.adminName ?? 'Admin'}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-fg-muted">
                        {item.adminName ?? 'System'} ·{' '}
                        {formatRelativeTime(item.createdAt)}
                      </p>
                      <p className="mt-0.5 text-sm text-fg-secondary">
                        {item.label}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={2}
                placeholder="Add a note for the team…"
                disabled={disabled}
                className="w-full resize-y rounded-xl border border-border-default bg-bg-elevated/50 px-3 py-2 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={disabled || !draft.trim()}
                className="inline-flex h-9 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                Add note
              </button>
            </form>
          </>
        ) : null}
      </div>
    </section>
  )
}
