import {
  getScheduleCategory,
  SCHEDULE_CATEGORIES,
} from '#/data/hackdsc-schedule-categories'
import type { ScheduleEntryCategory } from '#/types/admin-schedule'
import { Select, type SelectOption } from '#/components/ui/Select'
import { cn } from '#/lib/cn'

function categoryRow(categoryId: ScheduleEntryCategory) {
  const category = getScheduleCategory(categoryId)
  const Icon = category.icon
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={cn('h-2.5 w-2.5 shrink-0 rounded-full', category.dotClass)}
        aria-hidden
      />
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-default bg-bg-elevated',
          category.iconBgClass,
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="font-medium text-fg">{category.label}</span>
    </span>
  )
}

const categoryOptions: SelectOption<ScheduleEntryCategory>[] =
  SCHEDULE_CATEGORIES.map((category) => ({
    value: category.id,
    label: category.label,
    triggerLabel: categoryRow(category.id),
    optionContent: categoryRow(category.id),
  }))

type ScheduleCategorySelectProps = {
  value: ScheduleEntryCategory
  onChange: (value: ScheduleEntryCategory) => void
  className?: string
}

export function ScheduleCategorySelect({
  value,
  onChange,
  className,
}: ScheduleCategorySelectProps) {
  return (
    <Select
      label="Category"
      value={value}
      options={categoryOptions}
      onChange={onChange}
      className={className}
    />
  )
}
