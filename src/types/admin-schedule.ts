export type ScheduleDayId = 'friday' | 'saturday'

export type ScheduleEntryCategory =
  | 'ceremony'
  | 'hacking'
  | 'workshop'
  | 'talk'
  | 'meal'
  | 'activity'
  | 'deadline'
  | 'judging'

export type AdminScheduleEntry = {
  id: string
  dayId: ScheduleDayId
  /** Minutes from midnight — used for sorting. */
  timeMinutes: number
  category: ScheduleEntryCategory
  name: string
  description: string
}

export type AdminScheduleDayMeta = {
  id: ScheduleDayId
  title: string
  dateLabel: string
  tabLabel: string
}

export type ScheduleEntryDraft = Omit<AdminScheduleEntry, 'id'> & {
  id?: string
}
