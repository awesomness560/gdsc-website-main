import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type IconFrameProps = {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md'
}

const sizeClass = {
  sm: 'h-9 w-9 [&_svg]:h-4 [&_svg]:w-4',
  md: 'h-11 w-11 [&_svg]:h-5 [&_svg]:w-5',
}

export function IconFrame({ children, className, size = 'md' }: IconFrameProps) {
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-xl border border-border-default bg-surface-raised text-fg-muted',
        sizeClass[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
