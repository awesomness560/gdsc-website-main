import {
  Clock,
  Code2,
  Flag,
  Mic,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { ScheduleEntryCategory } from '#/types/admin-schedule'

export type ScheduleCategoryDef = {
  id: ScheduleEntryCategory
  label: string
  icon: LucideIcon
  dotClass: string
  textClass: string
  iconBgClass: string
}

export const SCHEDULE_CATEGORIES: ScheduleCategoryDef[] = [
  {
    id: 'ceremony',
    label: 'Ceremony',
    icon: Flag,
    dotClass: 'bg-google-blue shadow-[0_0_12px_rgba(66,133,244,0.5)]',
    textClass: 'text-google-blue',
    iconBgClass: 'text-google-blue',
  },
  {
    id: 'hacking',
    label: 'Hacking',
    icon: Code2,
    dotClass: 'bg-google-yellow shadow-[0_0_12px_rgba(251,188,5,0.5)]',
    textClass: 'text-google-yellow',
    iconBgClass: 'text-google-yellow',
  },
  {
    id: 'workshop',
    label: 'Workshop',
    icon: Wrench,
    dotClass: 'bg-schedule-teal shadow-[0_0_12px_rgba(20,184,166,0.45)]',
    textClass: 'text-schedule-teal',
    iconBgClass: 'text-schedule-teal',
  },
  {
    id: 'talk',
    label: 'Talk',
    icon: Mic,
    dotClass: 'bg-schedule-purple shadow-[0_0_12px_rgba(147,51,234,0.45)]',
    textClass: 'text-schedule-purple',
    iconBgClass: 'text-schedule-purple',
  },
  {
    id: 'meal',
    label: 'Meal',
    icon: UtensilsCrossed,
    dotClass: 'bg-google-green shadow-[0_0_12px_rgba(52,168,83,0.5)]',
    textClass: 'text-google-green',
    iconBgClass: 'text-google-green',
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: Sparkles,
    dotClass: 'bg-schedule-pink shadow-[0_0_12px_rgba(236,72,153,0.45)]',
    textClass: 'text-schedule-pink',
    iconBgClass: 'text-schedule-pink',
  },
  {
    id: 'deadline',
    label: 'Deadline',
    icon: Clock,
    dotClass: 'bg-google-red shadow-[0_0_12px_rgba(234,67,53,0.5)]',
    textClass: 'text-google-red',
    iconBgClass: 'text-google-red',
  },
  {
    id: 'judging',
    label: 'Judging',
    icon: Trophy,
    dotClass: 'bg-schedule-coral shadow-[0_0_12px_rgba(249,115,22,0.45)]',
    textClass: 'text-schedule-coral',
    iconBgClass: 'text-schedule-coral',
  },
]

export function getScheduleCategory(id: ScheduleEntryCategory): ScheduleCategoryDef {
  const found = SCHEDULE_CATEGORIES.find((category) => category.id === id)
  return found ?? SCHEDULE_CATEGORIES[0]
}
