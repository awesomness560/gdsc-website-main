import { dummyScheduleData } from '#/data/dummy-schedule'
import { parseTimeLabel } from '#/lib/admin-schedule-utils'
import type { AdminScheduleEntry, ScheduleEntryCategory } from '#/types/admin-schedule'
import type { ScheduleEventIcon } from '#/types/schedule'

const iconToCategory: Record<ScheduleEventIcon, ScheduleEntryCategory> = {
  flag: 'ceremony',
  mic: 'talk',
  code: 'hacking',
  utensils: 'meal',
  coffee: 'meal',
  users: 'activity',
  moon: 'activity',
}

export const defaultHackdscScheduleEntries: AdminScheduleEntry[] =
  dummyScheduleData.days.flatMap((day) =>
    day.events.map((event) => ({
      id: `sched-${event.id}`,
      dayId: day.id === 'saturday' ? 'saturday' : 'friday',
      timeMinutes: parseTimeLabel(event.time),
      category: iconToCategory[event.icon],
      name: event.title,
      description: event.description,
    })),
  )
