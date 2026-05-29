import {
  draftToPreviewEntry,
  getScheduleDaysFromConfig,
  minutesToTimeInput,
  timeInputToMinutes,
} from '#/lib/admin-schedule-utils'
import { useHackdscAdminConfig } from '#/contexts/HackdscAdminConfigContext'
import type {
  AdminScheduleDayMeta,
  ScheduleEntryDraft,
  ScheduleDayId,
} from '#/types/admin-schedule'
import { ScheduleCategorySelect } from '#/components/admin/hackdsc/schedule/ScheduleCategorySelect'
import { ScheduleEntryCard } from '#/components/admin/hackdsc/schedule/ScheduleEntryCard'
import { Select, type SelectOption } from '#/components/ui/Select'
import { cn } from '#/lib/cn'

const fieldInputClass =
  'h-10 w-full rounded-xl border border-border-default bg-bg-elevated/50 px-3 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40'

const fieldLabelClass = 'block text-sm font-medium text-fg-secondary'

const btnPrimary =
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60'

const btnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg'

type ScheduleEntryInlineFormProps = {
  draft: ScheduleEntryDraft
  days: AdminScheduleDayMeta[]
  isEditing: boolean
  onChange: (patch: Partial<ScheduleEntryDraft>) => void
  onSave: () => void
  onCancel: () => void
  onDelete?: () => void
}

export function ScheduleEntryInlineForm({
  draft,
  days,
  isEditing,
  onChange,
  onSave,
  onCancel,
  onDelete,
}: ScheduleEntryInlineFormProps) {
  const { config } = useHackdscAdminConfig()
  const scheduleDays = days.length > 0 ? days : getScheduleDaysFromConfig(config)
  const preview = draftToPreviewEntry(draft)
  const canSave = draft.name.trim().length > 0

  const dayOptions: SelectOption<ScheduleDayId>[] = scheduleDays.map((day) => ({
    value: day.id,
    label: day.tabLabel,
  }))

  return (
    <li className="mb-4 rounded-2xl border border-accent/30 bg-surface-raised/80 p-4 sm:p-5">
      <p className="mb-4 text-xs font-semibold tracking-wide text-fg-muted uppercase">
        Live preview
      </p>
      <ul className="pointer-events-none mb-6 opacity-95">
        <ScheduleEntryCard
          entry={preview}
          isLast
          preview
          onEdit={() => undefined}
          onDelete={() => undefined}
        />
      </ul>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          className="sm:col-span-1"
          label="Day"
          value={draft.dayId}
          options={dayOptions}
          onChange={(dayId) => onChange({ dayId })}
        />

        <label className="block sm:col-span-1">
          <span className={fieldLabelClass}>Time</span>
          <input
            type="time"
            value={minutesToTimeInput(draft.timeMinutes)}
            onChange={(e) =>
              onChange({ timeMinutes: timeInputToMinutes(e.target.value) })
            }
            className={cn(fieldInputClass, 'mt-2')}
          />
        </label>

        <ScheduleCategorySelect
          className="sm:col-span-2"
          value={draft.category}
          onChange={(category) => onChange({ category })}
        />

        <label className="block sm:col-span-2">
          <span className={fieldLabelClass}>Name</span>
          <input
            type="text"
            value={draft.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Opening ceremony"
            className={cn(fieldInputClass, 'mt-2')}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className={fieldLabelClass}>Description</span>
          <input
            type="text"
            value={draft.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="One-line description for the public schedule"
            className={cn(fieldInputClass, 'mt-2')}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className={btnPrimary}
          disabled={!canSave}
          onClick={onSave}
        >
          Save
        </button>
        <button type="button" className={btnSecondary} onClick={onCancel}>
          Cancel
        </button>
        {isEditing && onDelete ? (
          <button
            type="button"
            className="ml-auto inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-google-red transition-colors hover:bg-google-red/10"
            onClick={onDelete}
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  )
}
