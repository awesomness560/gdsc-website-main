import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type GradientTextProps = {
  children: ReactNode
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3'
  className?: string
}

export function GradientText({
  children,
  as: Tag = 'span',
  className,
}: GradientTextProps) {
  return <Tag className={cn('text-google-gradient', className)}>{children}</Tag>
}
