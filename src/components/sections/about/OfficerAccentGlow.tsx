import type { CSSProperties, ReactNode } from 'react'
import { accentGlowStyle } from '#/lib/officer-accent-color'
import { cn } from '#/lib/cn'

type OfficerAccentGlowProps = {
  accentColor: string
  intensity?: 'subtle' | 'expressive'
  className?: string
  children: ReactNode
}

export function OfficerAccentGlow({
  accentColor,
  intensity = 'subtle',
  className,
  children,
}: OfficerAccentGlowProps) {
  const glowStyle: CSSProperties = accentGlowStyle(accentColor, intensity)

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 scale-125 rounded-full blur-2xl',
          intensity === 'expressive' ? 'opacity-90' : 'opacity-70',
        )}
        style={glowStyle}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
