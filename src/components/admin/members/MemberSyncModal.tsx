import { Check, ChevronDown, Upload, X } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type ReactNode } from 'react'
import {
  getRosterSyncMutationError,
  useApplyRosterSyncMutation,
  useParseRosterCsvMutation,
} from '#/queries/roster-sync'
import type { RosterSyncPreview } from '#/types/admin-member'
import type { RosterSyncApplyResult } from '#/types/roster-sync'
import { cn } from '#/lib/cn'

type MemberSyncModalProps = {
  open: boolean
  onClose: () => void
  onComplete: (result: RosterSyncApplyResult) => void
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
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60'
const actionBtnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60'

export function MemberSyncModal({
  open,
  onClose,
  onComplete,
}: MemberSyncModalProps) {
  const parseMutation = useParseRosterCsvMutation()
  const applyMutation = useApplyRosterSyncMutation()

  const [step, setStep] = useState<SyncStep>('upload')
  const [preview, setPreview] = useState<RosterSyncPreview | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
  const [appliedResult, setAppliedResult] = useState<RosterSyncApplyResult | null>(
    null,
  )
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setStep('upload')
    setPreview(null)
    setParseError(null)
    setAppliedResult(null)
    setDragOver(false)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const processFile = async (file: File) => {
    setParseError(null)
    try {
      const nextPreview = await parseMutation.mutateAsync(file)
      setPreview(nextPreview)
      setStep('preview')
    } catch (error) {
      setParseError(getRosterSyncMutationError(error))
    }
  }

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (file) void processFile(file)
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) void processFile(file)
  }

  async function handleConfirm() {
    if (!preview) return
    setParseError(null)
    try {
      const result = await applyMutation.mutateAsync(preview.emails)
      setAppliedResult(result)
      setStep('success')
    } catch (error) {
      setParseError(getRosterSyncMutationError(error))
    }
  }

  function handleDone() {
    if (appliedResult) onComplete(appliedResult)
    onClose()
  }

  if (!open) return null

  const isBusy = parseMutation.isPending || applyMutation.isPending
  const emailCount = preview?.emailCount ?? 0

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
          {parseError ? (
            <div
              className="mb-4 rounded-xl border border-google-red/30 bg-google-red/10 px-3 py-2.5 text-sm text-fg-secondary"
              role="alert"
            >
              {parseError}
            </div>
          ) : null}

          {step === 'upload' ? (
            <div className="space-y-4">
              <p className="text-sm text-fg-secondary">
                Upload the CSV export from Google&apos;s GDSC platform.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={handleFileInputChange}
              />
              <button
                type="button"
                disabled={parseMutation.isPending}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={cn(
                  'flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-10 text-center transition-colors',
                  dragOver
                    ? 'border-accent/50 bg-accent/10'
                    : 'border-border-strong bg-bg-elevated/50 hover:border-accent/40 hover:bg-white/5',
                  parseMutation.isPending && 'opacity-60',
                )}
              >
                <Upload className="h-8 w-8 text-fg-muted" aria-hidden />
                <span className="text-sm font-medium text-fg">
                  {parseMutation.isPending
                    ? 'Reading file…'
                    : 'Drag and drop CSV, or click to browse'}
                </span>
              </button>
              <p className="text-xs text-fg-muted">
                Expected columns include an <span className="font-medium">emails</span>{' '}
                column (third column in the GDSC export).
              </p>
            </div>
          ) : null}

          {step === 'preview' && preview ? (
            <div className="space-y-3">
              <p className="text-sm text-fg-secondary">
                File:{' '}
                <span className="font-medium text-fg">{preview.fileName}</span>
              </p>
              <p className="text-sm text-fg-secondary">
                <span className="font-medium tabular-nums text-fg">
                  {emailCount}
                </span>{' '}
                email{emailCount === 1 ? '' : 's'} extracted from the roster.
              </p>
              <CollapsibleList
                title="Roster emails"
                count={emailCount}
                defaultOpen
              >
                <ul className="space-y-1.5 text-sm text-fg-secondary">
                  {preview.emails.map((email) => (
                    <li key={email} className="truncate font-mono text-xs">
                      {email}
                    </li>
                  ))}
                </ul>
              </CollapsibleList>
              <div className="rounded-xl border border-border-subtle bg-bg-elevated/30 px-3 py-2.5 text-xs text-fg-muted">
                After you confirm, we&apos;ll verify matching accounts against
                this roster.
              </div>
            </div>
          ) : null}

          {step === 'confirm' && preview ? (
            <p className="text-sm text-fg-secondary">
              Apply sync for{' '}
              <span className="font-medium tabular-nums text-fg">
                {emailCount}
              </span>{' '}
              roster email{emailCount === 1 ? '' : 's'}?
            </p>
          ) : null}

          {step === 'success' && appliedResult ? (
            <div className="space-y-4 py-2">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-google-green/15 text-google-green">
                  <Check className="h-6 w-6" aria-hidden />
                </div>
                <p className="text-sm font-medium text-fg">
                  Roster sync complete
                </p>
                <p className="text-xs text-fg-muted">
                  {appliedResult.emailCount} email
                  {appliedResult.emailCount === 1 ? '' : 's'} in file
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-2 rounded-xl border border-border-subtle bg-bg-elevated/40 px-3 py-3 text-center">
                <div>
                  <dt className="text-[10px] font-semibold tracking-wide text-fg-muted uppercase">
                    Newly verified
                  </dt>
                  <dd className="mt-1 text-lg font-semibold tabular-nums text-google-green">
                    {appliedResult.rpc.newly_verified}
                  </dd>
                </div>
                <div className="border-x border-border-subtle">
                  <dt className="text-[10px] font-semibold tracking-wide text-fg-muted uppercase">
                    Total verified
                  </dt>
                  <dd className="mt-1 text-lg font-semibold tabular-nums text-fg">
                    {appliedResult.rpc.total_verified}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold tracking-wide text-fg-muted uppercase">
                    Total users
                  </dt>
                  <dd className="mt-1 text-lg font-semibold tabular-nums text-fg-secondary">
                    {appliedResult.rpc.total_users}
                  </dd>
                </div>
              </dl>
            </div>
          ) : null}
        </div>

        <footer className="flex shrink-0 justify-end gap-2 border-t border-border-subtle px-5 py-4">
          {step === 'upload' ? (
            <button
              type="button"
              className={actionBtnSecondary}
              onClick={onClose}
              disabled={isBusy}
            >
              Cancel
            </button>
          ) : null}
          {step === 'preview' ? (
            <>
              <button
                type="button"
                className={actionBtnSecondary}
                onClick={() => {
                  setPreview(null)
                  setStep('upload')
                }}
                disabled={isBusy}
              >
                Back
              </button>
              <button
                type="button"
                className={actionBtnPrimary}
                onClick={() => setStep('confirm')}
                disabled={isBusy}
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
                disabled={isBusy}
              >
                Back
              </button>
              <button
                type="button"
                className={actionBtnPrimary}
                onClick={() => void handleConfirm()}
                disabled={isBusy}
              >
                {applyMutation.isPending ? 'Applying…' : 'Confirm'}
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
