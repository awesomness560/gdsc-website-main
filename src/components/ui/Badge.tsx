import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type BadgeTone = 'neutral' | 'blue' | 'green' | 'upcoming' | 'ongoing' | 'past'

type BadgeProps = {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

const toneClass: Record<BadgeTone, string> = {
  neutral: 'border-border-default bg-white/5 text-fg-secondary',
  blue: 'border-google-blue/25 bg-google-blue/10 text-google-blue',
  green: 'border-google-green/25 bg-google-green/10 text-google-green',
  upcoming: 'border-status-upcoming/25 bg-google-blue/10 text-status-upcoming',
  ongoing: 'border-status-ongoing/25 bg-google-green/10 text-status-ongoing',
  past: 'border-status-past/25 bg-google-yellow/10 text-status-past',
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
