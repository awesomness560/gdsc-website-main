import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SlideOverPanel } from '#/components/admin/SlideOverPanel'
import { OfficerFormFields } from '#/components/admin/team/OfficerFormFields'
import type { AdminOfficer, AdminOfficerDraft } from '#/types/admin-team'

type EditOfficerPanelProps = {
  officer: AdminOfficer | null
  open: boolean
  onClose: () => void
  onSave: (officerId: string, draft: AdminOfficerDraft) => Promise<void>
  isSaving?: boolean
  error?: string | null
}

const actionBtnPrimary =
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60'
const actionBtnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60'

function officerToDraft(officer: AdminOfficer): AdminOfficerDraft {
  return {
    roleId: officer.roleId,
    officerImageUrl: officer.officerImageUrl,
    bio: officer.bio,
  }
}

export function EditOfficerPanel({
  officer,
  open,
  onClose,
  onSave,
  isSaving = false,
  error,
}: EditOfficerPanelProps) {
  const [draft, setDraft] = useState<AdminOfficerDraft | null>(null)

  useEffect(() => {
    if (officer) setDraft(officerToDraft(officer))
  }, [officer])

  if (!officer || !draft) return null

  const canSave = draft.bio.trim().length > 0

  return (
    <SlideOverPanel
      open={open}
      onClose={onClose}
      ariaLabel={`Edit officer ${officer.name}`}
    >
      <header className="flex shrink-0 items-center justify-between border-b border-border-default px-4 py-3">
        <div>
          <h2 className="text-lg font-semibold text-fg">Edit officer</h2>
          {!officer.active ? (
            <p className="text-xs text-fg-muted">Currently deactivated</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          disabled={isSaving}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-secondary hover:bg-white/5 hover:text-fg disabled:opacity-60"
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {error ? (
          <div
            className="mb-4 rounded-xl border border-google-red/30 bg-google-red/10 px-3 py-2.5 text-sm text-fg-secondary"
            role="alert"
          >
            {error}
          </div>
        ) : null}
        <OfficerFormFields
          draft={draft}
          onChange={setDraft}
          disabled={isSaving}
        />
      </div>

      <footer className="flex shrink-0 justify-end gap-2 border-t border-border-subtle px-5 py-4">
        <button
          type="button"
          className={actionBtnSecondary}
          onClick={onClose}
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          type="button"
          className={actionBtnPrimary}
          disabled={!canSave || isSaving}
          onClick={() => void onSave(officer.id, draft)}
        >
          {isSaving ? 'Saving…' : 'Save changes'}
        </button>
      </footer>
    </SlideOverPanel>
  )
}
