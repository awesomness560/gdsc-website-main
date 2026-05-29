import type { HackdscLifecycleStatus } from '#/types/admin-hackdsc'
import { lifecycleStatusLabel, lifecycleVisual } from '#/lib/hackdsc-admin-utils'
import { cn } from '#/lib/cn'

type HackdscStatusPillProps = {
  status: HackdscLifecycleStatus
  className?: string
}

export function HackdscStatusPill({ status, className }: HackdscStatusPillProps) {
  const visual = lifecycleVisual(status)
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold',
        visual.pillClass,
        className,
      )}
    >
      {lifecycleStatusLabel(status)}
    </span>
  )
}
