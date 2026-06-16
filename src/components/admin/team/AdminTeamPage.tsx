import { ExternalLink } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { AddOfficerModal } from '#/components/admin/team/AddOfficerModal'
import { DeactivateOfficerDialog } from '#/components/admin/team/DeactivateOfficerDialog'
import { EditOfficerPanel } from '#/components/admin/team/EditOfficerPanel'
import { OfficerCard } from '#/components/admin/team/OfficerCard'
import { organizeOfficerSections } from '#/lib/admin-team-utils'
import {
  getAdminOfficersMutationError,
  useAdminOfficersQuery,
  useCreateAdminOfficerMutation,
  useDeactivateAdminOfficerMutation,
  useReactivateAdminOfficerMutation,
  useUpdateAdminOfficerMutation,
} from '#/queries/admin-officers'
import { useAdminMembersQuery } from '#/queries/admin-users'
import type { AdminOfficerDraft, MemberSearchResult } from '#/types/admin-team'
import { cn } from '#/lib/cn'

const headerBtnPrimary =
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60'
const headerBtnSecondary =
  'inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60'

function membersToSearchCandidates(
  members: { id: string; name: string; email: string | null }[],
): MemberSearchResult[] {
  return members.map((member) => ({
    id: member.id,
    name: member.name,
    email: member.email ?? '',
  }))
}

export function AdminTeamPage() {
  const officersQuery = useAdminOfficersQuery()
  const membersQuery = useAdminMembersQuery()
  const createMutation = useCreateAdminOfficerMutation()
  const updateMutation = useUpdateAdminOfficerMutation()
  const deactivateMutation = useDeactivateAdminOfficerMutation()
  const reactivateMutation = useReactivateAdminOfficerMutation()

  const [addOpen, setAddOpen] = useState(false)
  const [editOfficerId, setEditOfficerId] = useState<string | null>(null)
  const [deactivateOfficerId, setDeactivateOfficerId] = useState<string | null>(
    null,
  )
  const [actionError, setActionError] = useState<string | null>(null)

  const officers = officersQuery.data ?? []
  const sections = useMemo(() => organizeOfficerSections(officers), [officers])
  const activeCount = officers.filter((officer) => officer.active).length

  const memberCandidates = useMemo(
    () => membersToSearchCandidates(membersQuery.data ?? []),
    [membersQuery.data],
  )

  const editOfficer = officers.find((officer) => officer.id === editOfficerId) ?? null
  const deactivateOfficer =
    officers.find((officer) => officer.id === deactivateOfficerId) ?? null

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deactivateMutation.isPending ||
    reactivateMutation.isPending

  const isLoading = officersQuery.isPending || membersQuery.isPending

  async function handleAddOfficer(
    member: MemberSearchResult,
    draft: AdminOfficerDraft,
  ) {
    setActionError(null)
    try {
      await createMutation.mutateAsync({
        userId: member.id,
        displayName: member.name,
        draft,
      })
      setAddOpen(false)
    } catch (error) {
      setActionError(getAdminOfficersMutationError(error))
      throw error
    }
  }

  async function handleEditOfficer(officerId: string, draft: AdminOfficerDraft) {
    const officer = officers.find((entry) => entry.id === officerId)
    if (!officer) return
    setActionError(null)
    try {
      await updateMutation.mutateAsync({
        officerId,
        userId: officer.memberId,
        draft,
      })
      setEditOfficerId(null)
    } catch (error) {
      setActionError(getAdminOfficersMutationError(error))
      throw error
    }
  }

  async function handleDeactivateOfficer(officerId: string) {
    setActionError(null)
    try {
      await deactivateMutation.mutateAsync(officerId)
      setDeactivateOfficerId(null)
    } catch (error) {
      setActionError(getAdminOfficersMutationError(error))
    }
  }

  async function handleReactivateOfficer(officerId: string) {
    setActionError(null)
    try {
      await reactivateMutation.mutateAsync(officerId)
    } catch (error) {
      setActionError(getAdminOfficersMutationError(error))
    }
  }

  const hasAnyOfficers = officers.length > 0

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-8 pb-24 sm:px-6 sm:pt-10 sm:pb-10">
      {actionError ? (
        <div
          className="mb-6 rounded-xl border border-google-red/30 bg-google-red/10 px-4 py-3 text-sm text-fg-secondary"
          role="alert"
        >
          {actionError}
          <button
            type="button"
            className="ml-3 text-xs font-medium text-fg-muted hover:text-fg"
            onClick={() => setActionError(null)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-tight text-fg">Team</h1>
          <p className="mt-1 text-sm text-fg-secondary">
            Manage officers shown on the About Us page
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/about"
            target="_blank"
            rel="noopener noreferrer"
            className={headerBtnSecondary}
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Preview About Us
          </Link>
          <button
            type="button"
            className={headerBtnPrimary}
            onClick={() => {
              setActionError(null)
              setAddOpen(true)
            }}
            disabled={isLoading || membersQuery.isError}
          >
            Add officer
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-fg-secondary">
        {isLoading ? (
          'Loading team…'
        ) : officersQuery.isError ? (
          'Could not load officers.'
        ) : (
          <>
            <span className="tabular-nums">{activeCount}</span> active officer
            {activeCount === 1 ? '' : 's'}
            {officers.length > activeCount ? (
              <>
                {' '}
                ·{' '}
                <span className="tabular-nums">
                  {officers.length - activeCount}
                </span>{' '}
                deactivated
              </>
            ) : null}
            {' '}
            · Grouped by leadership, directors, and officers
          </>
        )}
      </p>

      {officersQuery.isPending ? (
        <div className="mt-8 rounded-xl border border-border-default px-6 py-16 text-center text-sm text-fg-muted">
          Loading officers…
        </div>
      ) : officersQuery.isError ? (
        <div className="mt-8 rounded-xl border border-google-red/30 bg-google-red/5 px-6 py-12 text-center text-sm text-fg-secondary">
          {getAdminOfficersMutationError(officersQuery.error)}
          <div className="mt-4">
            <button
              type="button"
              className={headerBtnSecondary}
              onClick={() => void officersQuery.refetch()}
            >
              Retry
            </button>
          </div>
        </div>
      ) : !hasAnyOfficers ? (
        <div className="mt-8 rounded-xl border border-border-default bg-bg-elevated/30 px-6 py-16 text-center">
          <p className="text-lg font-medium text-fg">No officers yet</p>
          <p className="mt-2 text-sm text-fg-secondary">
            Promote members from the roster to appear on the About Us page.
          </p>
          <button
            type="button"
            className={cn(headerBtnPrimary, 'mt-6')}
            onClick={() => setAddOpen(true)}
            disabled={membersQuery.isError}
          >
            Add officer
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-semibold tracking-wide text-fg-secondary uppercase">
                {section.label}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.officers.map((officer) => (
                  <OfficerCard
                    key={officer.id}
                    officer={officer}
                    disabled={isMutating}
                    onEdit={() => {
                      setActionError(null)
                      setEditOfficerId(officer.id)
                    }}
                    onDeactivate={() => {
                      setActionError(null)
                      setDeactivateOfficerId(officer.id)
                    }}
                    onReactivate={() => void handleReactivateOfficer(officer.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      <AddOfficerModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        candidates={memberCandidates}
        existingOfficers={officers}
        onSave={handleAddOfficer}
        isSaving={createMutation.isPending}
        error={createMutation.isError ? actionError : null}
      />

      <EditOfficerPanel
        officer={editOfficer}
        open={editOfficerId !== null}
        onClose={() => setEditOfficerId(null)}
        onSave={handleEditOfficer}
        isSaving={updateMutation.isPending}
        error={updateMutation.isError ? actionError : null}
      />

      <DeactivateOfficerDialog
        officer={deactivateOfficer}
        open={deactivateOfficerId !== null}
        onClose={() => setDeactivateOfficerId(null)}
        onConfirm={(officerId) => void handleDeactivateOfficer(officerId)}
      />
    </div>
  )
}
