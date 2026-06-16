import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { OfficerFormFields } from '#/components/admin/team/OfficerFormFields'
import { getAvatarColorClass, getInitials } from '#/lib/avatar'
import type {
  AdminOfficer,
  AdminOfficerDraft,
  MemberSearchResult,
  OfficerRoleId,
} from '#/types/admin-team'
import { cn } from '#/lib/cn'

type AddOfficerModalProps = {
  open: boolean
  onClose: () => void
  candidates: MemberSearchResult[]
  existingOfficers: AdminOfficer[]
  onSave: (member: MemberSearchResult, draft: AdminOfficerDraft) => Promise<void>
  isSaving?: boolean
  error?: string | null
}

type AddStep = 'search' | 'details'

const actionBtnPrimary =
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60'
const actionBtnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60'

function createDefaultDraft(roleId: OfficerRoleId): AdminOfficerDraft {
  return { roleId, bio: '' }
}

export function AddOfficerModal({
  open,
  onClose,
  candidates,
  existingOfficers,
  onSave,
  isSaving = false,
  error,
}: AddOfficerModalProps) {
  const [step, setStep] = useState<AddStep>('search')
  const [search, setSearch] = useState('')
  const [selectedMember, setSelectedMember] = useState<MemberSearchResult | null>(
    null,
  )
  const [draft, setDraft] = useState<AdminOfficerDraft>(() =>
    createDefaultDraft('tech_officer'),
  )

  const officerMemberIds = useMemo(
    () => new Set(existingOfficers.map((officer) => officer.memberId)),
    [existingOfficers],
  )

  const availableCandidates = useMemo(
    () => candidates.filter((member) => !officerMemberIds.has(member.id)),
    [candidates, officerMemberIds],
  )

  const filteredCandidates = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return availableCandidates
    return availableCandidates.filter(
      (member) =>
        member.name.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q),
    )
  }, [availableCandidates, search])

  useEffect(() => {
    if (!open) return
    setStep('search')
    setSearch('')
    setSelectedMember(null)
    setDraft(createDefaultDraft('tech_officer'))
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSaving) onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, isSaving])

  function handleSelectMember(member: MemberSearchResult) {
    setSelectedMember(member)
    setDraft(createDefaultDraft('tech_officer'))
    setStep('details')
  }

  async function handleSave() {
    if (!selectedMember) return
    await onSave(selectedMember, draft)
  }

  if (!open) return null

  const canSave = draft.bio.trim().length > 0

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close add officer dialog"
        onClick={onClose}
        disabled={isSaving}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-officer-title"
        className="relative flex max-h-[min(90dvh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-base shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-border-subtle px-5 py-4">
          <div>
            <h2 id="add-officer-title" className="text-lg font-semibold text-fg">
              Add officer
            </h2>
            <p className="mt-0.5 text-xs text-fg-muted">
              {step === 'search'
                ? 'Step 1 — Find a member'
                : 'Step 2 — Officer details'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-secondary hover:bg-white/5 hover:text-fg disabled:opacity-60"
            aria-label="Close"
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

          {step === 'search' ? (
            <div className="space-y-4">
              <p className="text-sm text-fg-secondary">
                Officers are promoted from existing member accounts. Search by
                name or email.
              </p>
              <label className="relative block">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-muted"
                  aria-hidden
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search members"
                  autoFocus
                  disabled={isSaving}
                  className="h-10 w-full rounded-xl border border-border-default bg-bg-elevated/50 pr-3 pl-9 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40 disabled:opacity-60"
                />
              </label>

              {availableCandidates.length === 0 ? (
                <p className="rounded-xl border border-border-default px-4 py-8 text-center text-sm text-fg-secondary">
                  All members in the roster are already officers.
                </p>
              ) : filteredCandidates.length === 0 ? (
                <p className="rounded-xl border border-border-default px-4 py-8 text-center text-sm text-fg-secondary">
                  No members match your search.
                </p>
              ) : (
                <ul className="max-h-72 space-y-1 overflow-y-auto rounded-xl border border-border-default p-1">
                  {filteredCandidates.map((member) => (
                    <li key={member.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectMember(member)}
                        disabled={isSaving}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/5 disabled:opacity-60"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white/95',
                            getAvatarColorClass(member.email || member.name),
                          )}
                        >
                          {getInitials(member.name)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-fg">
                            {member.name}
                          </span>
                          {member.email ? (
                            <span className="block truncate text-xs text-fg-muted">
                              {member.email}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}

          {step === 'details' && selectedMember ? (
            <OfficerFormFields
              draft={draft}
              onChange={setDraft}
              memberName={selectedMember.name}
              disabled={isSaving}
            />
          ) : null}
        </div>

        <footer className="flex shrink-0 justify-end gap-2 border-t border-border-subtle px-5 py-4">
          {step === 'search' ? (
            <button
              type="button"
              className={actionBtnSecondary}
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
          ) : null}
          {step === 'details' ? (
            <>
              <button
                type="button"
                className={actionBtnSecondary}
                disabled={isSaving}
                onClick={() => {
                  setStep('search')
                  setSelectedMember(null)
                }}
              >
                Back
              </button>
              <button
                type="button"
                className={actionBtnPrimary}
                onClick={() => void handleSave()}
                disabled={!canSave || isSaving}
              >
                {isSaving ? 'Saving…' : 'Save officer'}
              </button>
            </>
          ) : null}
        </footer>
      </div>
    </div>
  )
}
