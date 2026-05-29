import { Pencil, Trash2 } from 'lucide-react'
import { getScheduleCategory } from '#/data/hackdsc-schedule-categories'
import { minutesToTimeLabel } from '#/lib/admin-schedule-utils'
import type { AdminScheduleEntry } from '#/types/admin-schedule'
import { cn } from '#/lib/cn'

type ScheduleEntryCardProps = {
  entry: AdminScheduleEntry
  isLast?: boolean
  preview?: boolean
  onEdit: () => void
  onDelete: () => void
}

export function ScheduleEntryCard({
  entry,
  isLast = false,
  preview = false,
  onEdit,
  onDelete,
}: ScheduleEntryCardProps) {
  const category = getScheduleCategory(entry.category)
  const Icon = category.icon

  return (
    <li className="group relative grid grid-cols-[auto_1fr] gap-4 sm:gap-5">
      <div className="flex flex-col items-center pt-5">
        <span
          className={cn('h-3 w-3 shrink-0 rounded-full', category.dotClass)}
          aria-hidden
        />
        {!isLast ? (
          <span className="mt-2 w-px flex-1 bg-border-default" aria-hidden />
        ) : null}
      </div>

      <div className="mb-4 flex min-w-0 items-center gap-3 rounded-2xl border border-border-default bg-surface p-4 transition-colors group-hover:border-border-strong sm:gap-4 sm:p-5">
        <p className="w-[4.5rem] shrink-0 text-xs font-bold tracking-wide text-fg-muted uppercase tabular-nums sm:w-20">
          {minutesToTimeLabel(entry.timeMinutes)}
        </p>

        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-default bg-bg-elevated',
            category.iconBgClass,
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold tracking-tight text-fg sm:text-lg">
            {entry.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-fg-muted">
            {entry.description || 'No description'}
          </p>
        </div>

        {!preview ? (
          <div
            className={cn(
              'flex shrink-0 items-center gap-1',
              'opacity-100 md:opacity-0 md:group-hover:opacity-100',
            )}
          >
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-default text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg"
              aria-label={`Edit ${entry.name}`}
            >
              <Pencil className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-default text-fg-secondary transition-colors hover:border-google-red/40 hover:bg-google-red/10 hover:text-google-red"
              aria-label={`Delete ${entry.name}`}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
    </li>
  )
}
