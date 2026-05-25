import type { CSSProperties } from 'react'
import { cn } from '#/lib/cn'

type CalendarDateIconProps = {
  month: string
  day: number
  monthColor?: string
  size?: 'sm' | 'md'
  className?: string
}

const sizeClass = {
  sm: {
    root: 'size-12 min-w-12 max-w-12',
    month: 'h-[17px] px-1 text-[8px]',
    day: 'px-1 text-base',
  },
  md: {
    root: 'size-14 min-w-14 max-w-14',
    month: 'h-[20px] px-1 text-[9px]',
    day: 'px-1 text-xl',
  },
}

export function CalendarDateIcon({
  month,
  day,
  monthColor,
  size = 'md',
  className,
}: CalendarDateIconProps) {
  const sizes = sizeClass[size]
  const monthStyle: CSSProperties | undefined = monthColor
    ? { color: monthColor }
    : undefined

  return (
    <div
      className={cn(
        'flex shrink-0 flex-col overflow-hidden rounded-md border border-border-default bg-surface',
        sizes.root,
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-center border-b border-border-subtle bg-bg-elevated/80 font-semibold leading-none tracking-[0.08em] text-fg-muted uppercase',
          sizes.month,
        )}
        style={monthStyle}
      >
        {month}
      </div>
      <div
        className={cn(
          'flex flex-1 items-center justify-center font-medium leading-none text-fg tabular-nums',
          sizes.day,
        )}
      >
        {day}
      </div>
    </div>
  )
}
