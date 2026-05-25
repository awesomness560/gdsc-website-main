import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type MetaIconCardProps = {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md'
}

const sizeClass = {
  sm: 'size-12 min-w-12 max-w-12 rounded-md',
  md: 'size-14 min-w-14 max-w-14 rounded-md',
}

/** Square meta tile — pairs with CalendarDateIcon for aligned date/location rows. */
export function MetaIconCard({ children, className, size = 'sm' }: MetaIconCardProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center border border-border-default bg-bg-elevated/80',
        sizeClass[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
