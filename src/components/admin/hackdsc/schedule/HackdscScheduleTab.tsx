import { ExternalLink, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useHackdscAdminConfig } from '#/contexts/HackdscAdminConfigContext'
import { useHackdscSchedule } from '#/contexts/HackdscScheduleContext'
import {
  emptyDraft,
  entriesForDay,
  entryToDraft,
  getScheduleDaysFromConfig,
} from '#/lib/admin-schedule-utils'
import type { ScheduleDayId, ScheduleEntryDraft } from '#/types/admin-schedule'
import { ScheduleEntryCard } from '#/components/admin/hackdsc/schedule/ScheduleEntryCard'
import { ScheduleEntryInlineForm } from '#/components/admin/hackdsc/schedule/ScheduleEntryInlineForm'
import { cn } from '#/lib/cn'

const btnPrimary =
  'inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover'

const btnSecondary =
  'inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg'

export function HackdscScheduleTab() {
  const { config } = useHackdscAdminConfig()
  const { entries, upsertEntry, deleteEntry, duplicateLastYear } = useHackdscSchedule()

  const days = useMemo(() => getScheduleDaysFromConfig(config), [config])
  const [activeDayId, setActiveDayId] = useState<ScheduleDayId>('friday')
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<ScheduleEntryDraft | null>(null)

  const activeDay = days.find((day) => day.id === activeDayId) ?? days[0]
  const dayEntries = useMemo(
    () => entriesForDay(entries, activeDayId),
    [entries, activeDayId],
  )

  const scheduleIsEmpty = entries.length === 0
  const dayIsEmpty = dayEntries.length === 0 && !isAdding && !editingId

  function startAdd() {
    setEditingId(null)
    setIsAdding(true)
    setDraft(emptyDraft(activeDayId))
  }

  function startEdit(id: string) {
    const entry = entries.find((item) => item.id === id)
    if (!entry) return
    setIsAdding(false)
    setEditingId(id)
    setDraft(entryToDraft(entry))
  }

  function cancelForm() {
    setIsAdding(false)
    setEditingId(null)
    setDraft(null)
  }

  function handleSave() {
    if (!draft || !draft.name.trim()) return
    upsertEntry(draft)
    cancelForm()
  }

  function handleDelete() {
    if (!editingId) return
    const entry = entries.find((item) => item.id === editingId)
    if (
      !window.confirm(
        entry
          ? `Delete “${entry.name}”? This cannot be undone.`
          : 'Delete this schedule entry?',
      )
    ) {
      return
    }
    deleteEntry(editingId)
    cancelForm()
  }

  function handleQuickDelete(id: string) {
    const entry = entries.find((item) => item.id === id)
    if (
      !window.confirm(
        entry
          ? `Delete “${entry.name}”? This cannot be undone.`
          : 'Delete this schedule entry?',
      )
    ) {
      return
    }
    if (editingId === id) cancelForm()
    deleteEntry(id)
  }

  function handleDuplicateLastYear() {
    if (!duplicateLastYear()) {
      window.alert('Duplicate last year’s schedule is not available yet.')
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 pb-16 sm:px-6 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">
            Schedule
          </h2>
          <p className="mt-1 text-sm text-fg-secondary">
            {config.eventName}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/hackdsc/schedule"
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            Preview public schedule
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
          <button type="button" className={btnPrimary} onClick={startAdd}>
            <Plus className="h-4 w-4" aria-hidden />
            Add entry
          </button>
        </div>
      </div>

      <nav
        className="mt-8 -mx-1 overflow-x-auto border-b border-border-subtle"
        aria-label="Schedule days"
      >
        <div className="flex min-w-max gap-1 px-1">
          {days.map((day) => {
            const active = day.id === activeDayId
            const count = entriesForDay(entries, day.id).length
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => {
                  setActiveDayId(day.id)
                  if (isAdding) setDraft(emptyDraft(day.id))
                }}
                className={cn(
                  'relative px-3 py-3 text-sm font-medium transition-colors',
                  active
                    ? 'text-fg after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:rounded-full after:bg-accent'
                    : 'text-fg-muted hover:text-fg-secondary',
                )}
              >
                {day.tabLabel}
                {active ? (
                  <span className="ml-2 text-xs font-normal text-fg-muted">
                    · {count} {count === 1 ? 'entry' : 'entries'}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </nav>

      {activeDay ? (
        <p className="mt-4 text-sm text-fg-muted">
          {dayEntries.length}{' '}
          {dayEntries.length === 1 ? 'entry' : 'entries'} on {activeDay.title}
        </p>
      ) : null}

      {dayIsEmpty ? (
        <div className="mt-10 rounded-2xl border border-border-subtle bg-bg-elevated/30 px-6 py-14 text-center">
          <p className="text-sm text-fg-secondary">
            No entries yet for {activeDay?.title ?? 'this day'}.
          </p>
          <button type="button" className={cn(btnPrimary, 'mt-5')} onClick={startAdd}>
            <Plus className="h-4 w-4" aria-hidden />
            Add entry
          </button>
          {scheduleIsEmpty ? (
            <button
              type="button"
              className={cn(btnSecondary, 'mt-3 w-full sm:w-auto')}
              onClick={handleDuplicateLastYear}
            >
              Duplicate last year&apos;s schedule
            </button>
          ) : null}
        </div>
      ) : (
        <ul className="mt-6 space-y-0">
          {isAdding && draft ? (
            <ScheduleEntryInlineForm
              draft={draft}
              days={days}
              isEditing={false}
              onChange={(patch) => setDraft((current) => ({ ...current!, ...patch }))}
              onSave={handleSave}
              onCancel={cancelForm}
            />
          ) : null}

          {dayEntries.map((entry, index) => {
            const isEditing = editingId === entry.id
            const isLast =
              index === dayEntries.length - 1 && !isAdding && !isEditing

            if (isEditing && draft) {
              return (
                <ScheduleEntryInlineForm
                  key={entry.id}
                  draft={draft}
                  days={days}
                  isEditing
                  onChange={(patch) =>
                    setDraft((current) => ({ ...current!, ...patch }))
                  }
                  onSave={handleSave}
                  onCancel={cancelForm}
                  onDelete={handleDelete}
                />
              )
            }

            return (
              <ScheduleEntryCard
                key={entry.id}
                entry={entry}
                isLast={isLast}
                onEdit={() => startEdit(entry.id)}
                onDelete={() => handleQuickDelete(entry.id)}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}
