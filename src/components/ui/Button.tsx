import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: ButtonVariant
  className?: string
  icon?: ReactNode
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-accent-fg shadow-[0_12px_32px_rgba(74,140,255,0.28)] hover:bg-accent-hover',
  secondary:
    'border border-border-default bg-surface-raised text-fg hover:border-border-strong hover:bg-surface',
  ghost: 'text-fg-secondary hover:bg-white/5 hover:text-fg',
}

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  icon,
}: ButtonProps) {
  const classes = cn(
    'inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-colors',
    variantClass[variant],
    className,
  )

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon}
      </a>
    )
  }

  return (
    <button type="button" className={classes}>
      {children}
      {icon}
    </button>
  )
}
