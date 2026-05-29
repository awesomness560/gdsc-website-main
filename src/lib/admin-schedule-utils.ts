import type { HackdscAdminConfig } from '#/types/admin-hackdsc'
import type {
  AdminScheduleDayMeta,
  AdminScheduleEntry,
  ScheduleDayId,
  ScheduleEntryDraft,
} from '#/types/admin-schedule'
import { getScheduleCategory } from '#/data/hackdsc-schedule-categories'

export function minutesToTimeLabel(minutes: number): string {
  const normalized = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60)
  const hours24 = Math.floor(normalized / 60)
  const mins = normalized % 60
  const period = hours24 >= 12 ? 'PM' : 'AM'
  const hour12 = hours24 % 12 || 12
  return `${hour12}:${String(mins).padStart(2, '0')} ${period}`
}

export function parseTimeLabel(label: string): number {
  const match = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return 12 * 60
  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()
  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0
  return hours * 60 + minutes
}

export function timeInputToMinutes(value: string): number {
  const [hours, minutes] = value.split(':').map(Number)
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0
  return hours * 60 + minutes
}

export function minutesToTimeInput(minutes: number): string {
  const hours = Math.floor(minutes / 60) % 24
  const mins = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

export function sortScheduleEntries(
  entries: AdminScheduleEntry[],
): AdminScheduleEntry[] {
  return [...entries].sort((a, b) => {
    if (a.dayId !== b.dayId) return a.dayId.localeCompare(b.dayId)
    if (a.timeMinutes !== b.timeMinutes) return a.timeMinutes - b.timeMinutes
    return a.name.localeCompare(b.name)
  })
}

export function entriesForDay(
  entries: AdminScheduleEntry[],
  dayId: ScheduleDayId,
): AdminScheduleEntry[] {
  return sortScheduleEntries(entries.filter((entry) => entry.dayId === dayId))
}

export function formatScheduleDayDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function getScheduleDaysFromConfig(
  config: HackdscAdminConfig,
): AdminScheduleDayMeta[] {
  const start = new Date(config.eventStart)
  const end = new Date(config.eventEnd)
  const saturday =
    end.getTime() > start.getTime() + 12 * 60 * 60 * 1000 ? end : start

  return [
    {
      id: 'friday',
      title: 'Friday',
      dateLabel: formatScheduleDayDate(config.eventStart),
      tabLabel: `Friday · ${formatScheduleDayDate(config.eventStart)}`,
    },
    {
      id: 'saturday',
      title: 'Saturday',
      dateLabel: formatScheduleDayDate(saturday.toISOString()),
      tabLabel: `Saturday · ${formatScheduleDayDate(saturday.toISOString())}`,
    },
  ]
}

export function draftToPreviewEntry(draft: ScheduleEntryDraft): AdminScheduleEntry {
  return {
    id: draft.id ?? 'preview',
    dayId: draft.dayId,
    timeMinutes: draft.timeMinutes,
    category: draft.category,
    name: draft.name.trim() || 'Untitled entry',
    description: draft.description.trim(),
  }
}

export function emptyDraft(dayId: ScheduleDayId): ScheduleEntryDraft {
  return {
    dayId,
    timeMinutes: 12 * 60,
    category: 'workshop',
    name: '',
    description: '',
  }
}

export function entryToDraft(entry: AdminScheduleEntry): ScheduleEntryDraft {
  return {
    id: entry.id,
    dayId: entry.dayId,
    timeMinutes: entry.timeMinutes,
    category: entry.category,
    name: entry.name,
    description: entry.description,
  }
}

export function categoryLabel(category: AdminScheduleEntry['category']): string {
  return getScheduleCategory(category).label
}

export function createEntryId(): string {
  return `sched-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
