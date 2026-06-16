import { useEffect } from 'react'
import type { AdminOfficer } from '#/types/admin-team'

type DeactivateOfficerDialogProps = {
  officer: AdminOfficer | null
  open: boolean
  onClose: () => void
  onConfirm: (officerId: string) => void
}

const actionBtnPrimary =
  'inline-flex h-10 items-center justify-center rounded-xl bg-google-yellow px-4 text-sm font-semibold text-bg-deep transition-colors hover:bg-google-yellow/90 disabled:cursor-not-allowed disabled:opacity-60'
const actionBtnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60'

export function DeactivateOfficerDialog({
  officer,
  open,
  onClose,
  onConfirm,
}: DeactivateOfficerDialogProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open || !officer) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close deactivate officer dialog"
        onClick={onClose}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="deactivate-officer-title"
        aria-describedby="deactivate-officer-desc"
        className="relative w-full max-w-md rounded-2xl border border-border-default bg-bg-base p-6 shadow-2xl"
      >
        <h2 id="deactivate-officer-title" className="text-lg font-semibold text-fg">
          Deactivate officer?
        </h2>
        <p
          id="deactivate-officer-desc"
          className="mt-2 text-sm leading-relaxed text-fg-secondary"
        >
          Deactivate <span className="font-medium text-fg">{officer.name}</span>?
          They&apos;ll remain a member but won&apos;t appear on the About Us page.
          Profile data is kept in case you reactivate them later.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className={actionBtnSecondary} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={actionBtnPrimary}
            onClick={() => {
              onConfirm(officer.id)
              onClose()
            }}
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  )
}
