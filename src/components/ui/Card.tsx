import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type CardVariant = 'default' | 'elevated' | 'inset'

type CardProps = {
  children: ReactNode
  className?: string
  variant?: CardVariant
  hover?: boolean
}

const variantClass: Record<CardVariant, string> = {
  default: 'border-border-default bg-surface',
  elevated: 'border-border-default bg-surface-raised',
  inset: 'border-border-subtle bg-bg-elevated/80',
}

export function Card({
  children,
  className,
  variant = 'default',
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        variantClass[variant],
        hover &&
          'transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-google-blue/30 hover:shadow-[0_0_28px_rgba(66,133,244,0.12)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
