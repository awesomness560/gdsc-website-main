import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { ApplicationKeyboardHints } from '#/components/admin/applications/ApplicationKeyboardHints'
import { ApplicationListItem } from '#/components/admin/applications/ApplicationListItem'
import {
  defaultApplicationFilters,
  type ApplicationListFilters,
} from '#/types/admin-application'
import type { AdminApplication } from '#/types/admin-application'
import { cn } from '#/lib/cn'

const STATUS_PILLS = [
  { id: 'all' as const, label: 'All' },
  { id: 'pending' as const, label: 'Pending' },
  { id: 'accepted' as const, label: 'Accepted' },
  { id: 'rejected' as const, label: 'Rejected' },
  { id: 'flagged' as const, label: 'Flagged' },
]

type ApplicationsQueueProps = {
  apps: AdminApplication[]
  selectedId: string | null
  search: string
  onSearchChange: (value: string) => void
  filters: ApplicationListFilters
  onFiltersChange: (filters: ApplicationListFilters) => void
  pendingCount: number
  queuePosition: number | null
  onSelect: (id: string) => void
  searchInputRef?: React.RefObject<HTMLInputElement | null>
}

export function ApplicationsQueue({
  apps,
  selectedId,
  search,
  onSearchChange,
  filters,
  onFiltersChange,
  pendingCount,
  queuePosition,
  onSelect,
  searchInputRef,
}: ApplicationsQueueProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="flex h-full min-h-0 w-full flex-col border-r border-border-subtle bg-bg-base lg:w-[min(100%,400px)] lg:shrink-0 lg:max-w-[400px]">
      <div className="shrink-0 border-b border-border-subtle px-4 py-3">
        <p className="text-xs text-fg-muted">
          {queuePosition != null && pendingCount > 0 ? (
            <>
              Application{' '}
              <span className="font-medium tabular-nums text-fg-secondary">
                {queuePosition}
              </span>{' '}
              of{' '}
              <span className="font-medium tabular-nums text-fg-secondary">
                {pendingCount}
              </span>{' '}
              pending
            </>
          ) : (
            <>
              <span className="font-medium tabular-nums text-fg-secondary">
                {pendingCount}
              </span>{' '}
              pending
            </>
          )}
          <span className="hidden lg:inline text-fg-muted/80"> · ? shortcuts</span>
        </p>
      </div>

      <div className="shrink-0 space-y-2 border-b border-border-subtle px-3 py-3">
        <div className="flex gap-2">
          <label className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-fg-muted"
              aria-hidden
            />
            <input
              ref={searchInputRef}
              type="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search applications"
              className="h-9 w-full rounded-xl border border-border-default bg-bg-elevated/50 pr-3 pl-8 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40"
            />
          </label>
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl border px-2.5 text-sm font-medium transition-colors',
              filtersOpen
                ? 'border-accent/40 bg-accent/10 text-fg'
                : 'border-border-default text-fg-secondary hover:bg-white/5',
            )}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filter
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform',
                filtersOpen && 'rotate-180',
              )}
              aria-hidden
            />
          </button>
          <ApplicationKeyboardHints />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {STATUS_PILLS.map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() =>
                onFiltersChange({ ...filters, status: pill.id })
              }
              className={cn(
                'h-7 rounded-full border px-2.5 text-[11px] font-medium transition-colors',
                filters.status === pill.id
                  ? 'border-accent/40 bg-accent/15 text-fg'
                  : 'border-border-default text-fg-muted hover:text-fg-secondary',
              )}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {filtersOpen ? (
          <div className="grid gap-2 rounded-xl border border-border-subtle bg-bg-elevated/40 p-2.5 text-sm">
            <label className="grid gap-1">
              <span className="text-xs text-fg-muted">Membership</span>
              <select
                value={filters.membership}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    membership: e.target.value as ApplicationListFilters['membership'],
                  })
                }
                className="h-8 rounded-lg border border-border-default bg-bg-base px-2 text-fg-secondary outline-none"
              >
                <option value="all">All</option>
                <option value="member">Full members</option>
                <option value="non-member">Non-members</option>
              </select>
            </label>
            <label className="grid gap-1">
              <span className="text-xs text-fg-muted">School contains</span>
              <input
                value={filters.school}
                onChange={(e) =>
                  onFiltersChange({ ...filters, school: e.target.value })
                }
                placeholder="e.g. UTD"
                className="h-8 rounded-lg border border-border-default bg-bg-base px-2 text-fg outline-none"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs text-fg-muted">Experience</span>
              <select
                value={filters.experienceLevel}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    experienceLevel: e.target
                      .value as ApplicationListFilters['experienceLevel'],
                  })
                }
                className="h-8 rounded-lg border border-border-default bg-bg-base px-2 text-fg-secondary outline-none"
              >
                <option value="all">All</option>
                <option value="first_hackathon">First hackathon</option>
                <option value="one_to_three">1–3 hackathons</option>
                <option value="four_plus">4+ hackathons</option>
              </select>
            </label>
            <label className="grid gap-1">
              <span className="text-xs text-fg-muted">Team status</span>
              <select
                value={filters.teamStatus}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    teamStatus: e.target
                      .value as ApplicationListFilters['teamStatus'],
                  })
                }
                className="h-8 rounded-lg border border-border-default bg-bg-base px-2 text-fg-secondary outline-none"
              >
                <option value="all">All</option>
                <option value="has_team">Has a team</option>
                <option value="looking_for_team">Looking for team</option>
                <option value="going_solo">Going solo</option>
              </select>
            </label>
            <label className="grid gap-1">
              <span className="text-xs text-fg-muted">Submitted</span>
              <select
                value={filters.dateRange}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    dateRange: e.target.value as ApplicationListFilters['dateRange'],
                  })
                }
                className="h-8 rounded-lg border border-border-default bg-bg-base px-2 text-fg-secondary outline-none"
              >
                <option value="all">Any time</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </label>
            <button
              type="button"
              className="text-left text-xs font-medium text-accent hover:underline"
              onClick={() => onFiltersChange(defaultApplicationFilters)}
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {apps.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-fg-muted">
            No applications match your filters.
          </p>
        ) : (
          apps.map((app) => (
            <ApplicationListItem
              key={app.id}
              app={app}
              selected={app.id === selectedId}
              onSelect={() => onSelect(app.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
