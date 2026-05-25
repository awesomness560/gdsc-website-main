import { Check, ChevronDown, Upload, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import type { RosterSyncPreview } from '#/types/admin-member'
import { cn } from '#/lib/cn'

type MemberSyncModalProps = {
  open: boolean
  onClose: () => void
  preview: RosterSyncPreview
  onComplete: () => void
}

type SyncStep = 'upload' | 'preview' | 'confirm' | 'success'

function CollapsibleList({
  title,
  count,
  children,
  defaultOpen,
}: {
  title: string
  count: number
  children: ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen ?? false)

  return (
    <div className="rounded-xl border border-border-default bg-bg-elevated/40">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium text-fg"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {title}{' '}
          <span className="font-semibold text-fg-secondary tabular-nums">
            ({count})
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-fg-muted transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="max-h-40 overflow-y-auto border-t border-border-subtle px-3 py-2">
          {children}
        </div>
      ) : null}
    </div>
  )
}

const actionBtnPrimary =
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:opacity-60'
const actionBtnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg'

export function MemberSyncModal({
  open,
  onClose,
  preview,
  onComplete,
}: MemberSyncModalProps) {
  const [step, setStep] = useState<SyncStep>('upload')
  const [fileName, setFileName] = useState<string | null>(null)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    if (!open) return
    setStep('upload')
    setFileName(null)
    setApplying(false)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const addedCount = preview.added.length
  const removedCount = preview.removed.length

  function handleFileSelect() {
    setFileName('gdsc-roster-spring-2026.csv')
    setStep('preview')
  }

  async function handleConfirm() {
    setApplying(true)
    await new Promise((r) => setTimeout(r, 800))
    setApplying(false)
    setStep('success')
  }

  function handleDone() {
    onComplete()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close sync dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sync-modal-title"
        className="relative flex max-h-[min(90dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-base shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-border-subtle px-5 py-4">
          <h2 id="sync-modal-title" className="text-lg font-semibold text-fg">
            Sync roster
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-secondary hover:bg-white/5 hover:text-fg"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === 'upload' ? (
            <div className="space-y-4">
              <p className="text-sm text-fg-secondary">
                Upload the CSV export from Google&apos;s GDSC platform.
              </p>
              <button
                type="button"
                onClick={handleFileSelect}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-strong bg-bg-elevated/50 px-4 py-10 text-center transition-colors hover:border-accent/40 hover:bg-white/5"
              >
                <Upload className="h-8 w-8 text-fg-muted" aria-hidden />
                <span className="text-sm font-medium text-fg">
                  Drag and drop CSV, or click to browse
                </span>
              </button>
              <p className="text-xs text-fg-muted">
                Expected columns: email, full name, joined date.{' '}
                <button type="button" className="text-accent hover:underline">
                  Download template
                </button>
              </p>
            </div>
          ) : null}

          {step === 'preview' ? (
            <div className="space-y-3">
              {fileName ? (
                <p className="text-sm text-fg-secondary">
                  File: <span className="font-medium text-fg">{fileName}</span>
                </p>
              ) : null}
              <CollapsibleList
                title="New members — will be marked as members"
                count={addedCount}
                defaultOpen
              >
                <ul className="space-y-1.5 text-sm text-fg-secondary">
                  {preview.added.map((row) => (
                    <li key={row.email}>
                      {row.name}{' '}
                      <span className="text-fg-muted">· {row.email}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleList>
              <CollapsibleList title="Removed from roster" count={removedCount}>
                <ul className="space-y-1.5 text-sm text-fg-secondary">
                  {preview.removed.map((row) => (
                    <li key={row.email}>
                      {row.name}{' '}
                      <span className="text-fg-muted">· {row.email}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleList>
              <p className="text-sm text-fg-muted">
                Unchanged:{' '}
                <span className="font-medium tabular-nums text-fg-secondary">
                  {preview.unchangedCount}
                </span>
              </p>
              {preview.pendingSignups.length > 0 ? (
                <div className="rounded-xl border border-google-yellow/25 bg-google-yellow/10 px-3 py-2.5 text-sm text-fg-secondary">
                  <span className="font-medium tabular-nums text-fg">
                    {preview.pendingSignups.length}
                  </span>{' '}
                  emails in the roster don&apos;t have GDSC accounts yet — they&apos;ll
                  be flagged as members when they sign up.
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 'confirm' ? (
            <p className="text-sm text-fg-secondary">
              Apply changes?{' '}
              <span className="font-medium text-fg">
                {addedCount} added, {removedCount} removed, {preview.unchangedCount}{' '}
                unchanged.
              </span>
            </p>
          ) : null}

          {step === 'success' ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-green/15 text-google-green">
                <Check className="h-6 w-6" aria-hidden />
              </div>
              <p className="text-sm font-medium text-fg">
                Synced {addedCount} new members and removed {removedCount}.
              </p>
              <p className="text-xs text-fg-muted">Most recent sync: just now</p>
            </div>
          ) : null}
        </div>

        <footer className="flex shrink-0 justify-end gap-2 border-t border-border-subtle px-5 py-4">
          {step === 'upload' ? (
            <button type="button" className={actionBtnSecondary} onClick={onClose}>
              Cancel
            </button>
          ) : null}
          {step === 'preview' ? (
            <>
              <button
                type="button"
                className={actionBtnSecondary}
                onClick={() => setStep('upload')}
              >
                Back
              </button>
              <button
                type="button"
                className={actionBtnPrimary}
                onClick={() => setStep('confirm')}
              >
                Continue
              </button>
            </>
          ) : null}
          {step === 'confirm' ? (
            <>
              <button
                type="button"
                className={actionBtnSecondary}
                onClick={() => setStep('preview')}
                disabled={applying}
              >
                Back
              </button>
              <button
                type="button"
                className={actionBtnPrimary}
                onClick={() => void handleConfirm()}
                disabled={applying}
              >
                {applying ? 'Applying…' : 'Confirm'}
              </button>
            </>
          ) : null}
          {step === 'success' ? (
            <button type="button" className={actionBtnPrimary} onClick={handleDone}>
              Done
            </button>
          ) : null}
        </footer>
      </div>
    </div>
  )
}
