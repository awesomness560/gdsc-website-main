import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultHackdscScheduleEntries } from '#/data/default-hackdsc-schedule'
import { createEntryId, sortScheduleEntries } from '#/lib/admin-schedule-utils'
import type { AdminScheduleEntry, ScheduleEntryDraft } from '#/types/admin-schedule'

const STORAGE_KEY = 'gdsc-hackdsc-admin-schedule'

type HackdscScheduleContextValue = {
  entries: AdminScheduleEntry[]
  upsertEntry: (draft: ScheduleEntryDraft) => void
  deleteEntry: (id: string) => void
  duplicateLastYear: () => boolean
}

const HackdscScheduleContext = createContext<HackdscScheduleContextValue | null>(
  null,
)

function loadStoredEntries(): AdminScheduleEntry[] {
  if (typeof window === 'undefined') return defaultHackdscScheduleEntries
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultHackdscScheduleEntries
    const parsed = JSON.parse(raw) as AdminScheduleEntry[]
    return sortScheduleEntries(parsed)
  } catch {
    return defaultHackdscScheduleEntries
  }
}

function persistEntries(entries: AdminScheduleEntry[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function HackdscScheduleProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<AdminScheduleEntry[]>(loadStoredEntries)

  const upsertEntry = useCallback((draft: ScheduleEntryDraft) => {
    setEntries((current) => {
      const nextEntry: AdminScheduleEntry = {
        id: draft.id ?? createEntryId(),
        dayId: draft.dayId,
        timeMinutes: draft.timeMinutes,
        category: draft.category,
        name: draft.name.trim(),
        description: draft.description.trim(),
      }
      const without = current.filter((entry) => entry.id !== nextEntry.id)
      const next = sortScheduleEntries([...without, nextEntry])
      persistEntries(next)
      return next
    })
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries((current) => {
      const next = current.filter((entry) => entry.id !== id)
      persistEntries(next)
      return next
    })
  }, [])

  const duplicateLastYear = useCallback(() => false, [])

  const value = useMemo(
    () => ({ entries, upsertEntry, deleteEntry, duplicateLastYear }),
    [deleteEntry, duplicateLastYear, entries, upsertEntry],
  )

  return (
    <HackdscScheduleContext.Provider value={value}>
      {children}
    </HackdscScheduleContext.Provider>
  )
}

export function useHackdscSchedule() {
  const context = useContext(HackdscScheduleContext)
  if (!context) {
    throw new Error('useHackdscSchedule must be used within HackdscScheduleProvider')
  }
  return context
}
