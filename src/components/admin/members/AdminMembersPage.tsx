import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { computeAdminMembersSummary } from '#/api/admin-users'
import { MemberDetailPanel } from '#/components/admin/members/MemberDetailPanel'
import { MemberSyncModal } from '#/components/admin/members/MemberSyncModal'
import { MembersBulkBar } from '#/components/admin/members/MembersBulkBar'
import { MembersTable } from '#/components/admin/members/MembersTable'
import { dummyRosterSyncPreview } from '#/data/dummy-admin-members'
import { formatSyncAge } from '#/lib/admin-member-utils'
import {
  getAdminUsersMutationError,
  useAdminMembersQuery,
  useBulkSetAdminMembersRoleMutation,
  useSetAdminMemberRoleMutation,
  useSetAdminMemberVerifiedMutation,
} from '#/queries/admin-users'
import type { AdminMember, MemberFilter, MemberSort } from '#/types/admin-member'
import type { UserRole } from '#/types/auth'
import { cn } from '#/lib/cn'

const headerBtnPrimary =
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60'
const headerBtnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60'

const filterPills: { id: MemberFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'members', label: 'Full members' },
  { id: 'non-members', label: 'Non-members' },
  { id: 'admins', label: 'Admins' },
]

function filterMembers(
  members: AdminMember[],
  query: string,
  filter: MemberFilter,
): AdminMember[] {
  const q = query.trim().toLowerCase()
  return members.filter((m) => {
    if (filter === 'members' && !m.isMember) return false
    if (filter === 'non-members' && m.isMember) return false
    if (filter === 'admins' && !m.roles.includes('admin')) return false
    if (!q) return true
    return (
      m.name.toLowerCase().includes(q) ||
      (m.email?.toLowerCase().includes(q) ?? false)
    )
  })
}

function sortMembers(members: AdminMember[], sort: MemberSort): AdminMember[] {
  const copy = [...members]
  switch (sort) {
    case 'joined-asc':
      return copy.sort(
        (a, b) => new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime(),
      )
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return copy.sort((a, b) => b.name.localeCompare(a.name))
    case 'joined-desc':
    default:
      return copy.sort(
        (a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime(),
      )
  }
}

function daysSince(iso: string | null): number | null {
  if (!iso) return null
  const ms = Date.now() - new Date(iso).getTime()
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

export function AdminMembersPage() {
  const membersQuery = useAdminMembersQuery()
  const verifiedMutation = useSetAdminMemberVerifiedMutation()
  const roleMutation = useSetAdminMemberRoleMutation()
  const bulkAdminMutation = useBulkSetAdminMembersRoleMutation()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<MemberFilter>('all')
  const [sort, setSort] = useState<MemberSort>('joined-desc')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [detailMemberId, setDetailMemberId] = useState<string | null>(null)
  const [syncOpen, setSyncOpen] = useState(false)
  const [syncBanner, setSyncBanner] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const members = membersQuery.data ?? []
  const summary = useMemo(() => computeAdminMembersSummary(members), [members])

  const filtered = useMemo(
    () => sortMembers(filterMembers(members, search, filter), sort),
    [members, search, filter, sort],
  )

  const detailMember = members.find((m) => m.id === detailMemberId) ?? null

  const lastSyncedDaysAgo = daysSince(summary.lastSyncedAt)
  const syncStale = lastSyncedDaysAgo !== null && lastSyncedDaysAgo >= 3

  const isMutating =
    verifiedMutation.isPending ||
    roleMutation.isPending ||
    bulkAdminMutation.isPending

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll(checked: boolean) {
    if (!checked) {
      setSelectedIds(new Set())
      return
    }
    setSelectedIds(new Set(filtered.map((m) => m.id)))
  }

  async function handleToggleMembership(id: string) {
    const member = members.find((m) => m.id === id)
    if (!member) return
    setActionError(null)
    try {
      await verifiedMutation.mutateAsync({
        userId: id,
        isVerified: !member.isMember,
      })
    } catch (error) {
      setActionError(getAdminUsersMutationError(error))
    }
  }

  async function handleRoleChange(id: string, role: UserRole) {
    setActionError(null)
    try {
      await roleMutation.mutateAsync({ userId: id, role })
    } catch (error) {
      setActionError(getAdminUsersMutationError(error))
    }
  }

  async function handleBulkMakeAdmin() {
    const ids = [...selectedIds]
    if (ids.length === 0) return
    setActionError(null)
    try {
      await bulkAdminMutation.mutateAsync({ userIds: ids, role: 'admin' })
      setSelectedIds(new Set())
    } catch (error) {
      setActionError(getAdminUsersMutationError(error))
    }
  }

  function handleSyncComplete() {
    const added = dummyRosterSyncPreview.added.length
    const removed = dummyRosterSyncPreview.removed.length
    setSyncBanner(
      `Synced ${added} new members and removed ${removed}. Roster sync API coming soon.`,
    )
  }

  const showEmptyTable =
    !membersQuery.isPending && !membersQuery.isError && members.length === 0
  const showNoResults =
    !membersQuery.isPending && !membersQuery.isError && members.length > 0 && filtered.length === 0

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-8 pb-24 sm:px-6 sm:pt-10 sm:pb-10">
      {syncBanner ? (
        <div
          className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-google-green/25 bg-google-green/10 px-4 py-3 text-sm text-fg-secondary"
          role="status"
        >
          <span>✓ {syncBanner}</span>
          <button
            type="button"
            className="shrink-0 text-xs font-medium text-fg-muted hover:text-fg"
            onClick={() => setSyncBanner(null)}
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {actionError ? (
        <div
          className="mb-6 rounded-xl border border-google-red/30 bg-google-red/10 px-4 py-3 text-sm text-fg-secondary"
          role="alert"
        >
          {actionError}
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-[28px] font-semibold tracking-tight text-fg">Members</h1>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={headerBtnPrimary}
            onClick={() => setSyncOpen(true)}
            disabled={membersQuery.isPending}
          >
            Sync roster
          </button>
          <button type="button" className={headerBtnSecondary} disabled>
            Add member
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm text-fg-secondary">
        {membersQuery.isPending ? (
          'Loading members…'
        ) : membersQuery.isError ? (
          'Could not load members.'
        ) : (
          <>
            <span className="tabular-nums">{summary.total}</span> total ·{' '}
            <span className="tabular-nums">{summary.fullMembers}</span> full
            members ·{' '}
            <span className="tabular-nums">{summary.nonMembers}</span>{' '}
            non-members
            {summary.lastSyncedAt ? (
              <>
                {' '}
                ·{' '}
                <span className={cn(syncStale && 'text-google-yellow')}>
                  Last synced {formatSyncAge(lastSyncedDaysAgo ?? 0)}
                </span>
              </>
            ) : null}
          </>
        )}
      </p>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative w-full max-w-[360px]">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-muted"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            disabled={membersQuery.isPending}
            className="h-10 w-full rounded-xl border border-border-default bg-bg-elevated/50 pr-3 pl-9 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40 disabled:opacity-60"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {filterPills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setFilter(pill.id)}
              disabled={membersQuery.isPending}
              className={cn(
                'h-9 rounded-full border px-3 text-xs font-medium transition-colors sm:text-sm disabled:opacity-60',
                filter === pill.id
                  ? 'border-accent/40 bg-accent/15 text-fg'
                  : 'border-border-default text-fg-secondary hover:bg-white/5',
              )}
            >
              {pill.label}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as MemberSort)}
            aria-label="Sort members"
            disabled={membersQuery.isPending}
            className="ml-auto h-9 rounded-xl border border-border-default bg-bg-elevated px-3 text-sm text-fg-secondary outline-none focus:border-accent/40 disabled:opacity-60 lg:ml-2"
          >
            <option value="joined-desc">Sort by: Recently joined</option>
            <option value="joined-asc">Sort by: Oldest joined</option>
            <option value="name-asc">Sort by: Name A–Z</option>
            <option value="name-desc">Sort by: Name Z–A</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        {membersQuery.isPending ? (
          <div className="rounded-xl border border-border-default px-6 py-16 text-center text-sm text-fg-muted">
            Loading members…
          </div>
        ) : membersQuery.isError ? (
          <div className="rounded-xl border border-google-red/30 bg-google-red/5 px-6 py-12 text-center text-sm text-fg-secondary">
            {getAdminUsersMutationError(membersQuery.error)}
            <div className="mt-4">
              <button
                type="button"
                className={headerBtnSecondary}
                onClick={() => void membersQuery.refetch()}
              >
                Retry
              </button>
            </div>
          </div>
        ) : showEmptyTable ? (
          <div className="rounded-xl border border-border-default bg-bg-elevated/30 px-6 py-16 text-center">
            <p className="text-lg font-medium text-fg">No members yet</p>
            <p className="mt-2 text-sm text-fg-secondary">
              Users appear here after they sign up and a profile row exists in
              Supabase.
            </p>
            <button
              type="button"
              className={cn(headerBtnPrimary, 'mt-6')}
              onClick={() => setSyncOpen(true)}
            >
              Sync roster
            </button>
          </div>
        ) : showNoResults ? (
          <div className="rounded-xl border border-border-default px-6 py-12 text-center text-sm text-fg-secondary">
            {search.trim() ? (
              <>
                No members match &lsquo;{search.trim()}&rsquo; — try a different
                search.{' '}
                <button
                  type="button"
                  className="text-accent hover:underline"
                  onClick={() => setSearch('')}
                >
                  Clear search
                </button>
              </>
            ) : filter === 'non-members' ? (
              "No non-members yet — everyone's a full member!"
            ) : (
              'No members match the current filters.'
            )}
          </div>
        ) : (
          <MembersTable
            members={filtered}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onToggleSelectAll={toggleSelectAll}
            onRowClick={(m) => setDetailMemberId(m.id)}
            onFlipMembership={(id) => void handleToggleMembership(id)}
            onMakeAdmin={(id) => void handleRoleChange(id, 'admin')}
            onRemove={() => {
              setActionError('Remove member is not available yet.')
            }}
            disabled={isMutating}
          />
        )}
      </div>

      <MembersBulkBar
        count={selectedIds.size}
        onClear={() => setSelectedIds(new Set())}
        onMakeAdmin={() => void handleBulkMakeAdmin()}
        onRemove={() => setActionError('Bulk remove is not available yet.')}
        onExport={() => {
          const rows = members.filter((m) => selectedIds.has(m.id))
          const header = ['name', 'email', 'is_member', 'roles', 'joined_at']
          const lines = rows.map((m) =>
            [
              m.name,
              m.email ?? '',
              m.isMember ? 'yes' : 'no',
              m.roles.join(';'),
              m.joinedAt,
            ]
              .map((v) => `"${String(v).replace(/"/g, '""')}"`)
              .join(','),
          )
          const csv = [header.join(','), ...lines].join('\n')
          const blob = new Blob([csv], { type: 'text/csv' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'gdg-members.csv'
          a.click()
          URL.revokeObjectURL(url)
          setSelectedIds(new Set())
        }}
      />

      <MemberDetailPanel
        member={detailMember}
        open={detailMemberId !== null}
        onClose={() => setDetailMemberId(null)}
        onToggleMembership={(id) => void handleToggleMembership(id)}
        onRoleChange={(id, role) => void handleRoleChange(id, role)}
        disabled={isMutating}
      />

      <MemberSyncModal
        open={syncOpen}
        onClose={() => setSyncOpen(false)}
        preview={dummyRosterSyncPreview}
        onComplete={handleSyncComplete}
      />
    </div>
  )
}
