import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type RegisterConditionalBlockProps = {
  show: boolean
  children: ReactNode
  className?: string
}

export function RegisterConditionalBlock({
  show,
  children,
  className,
}: RegisterConditionalBlockProps) {
  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
        show ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="overflow-hidden">
        <div
          className={cn(
            'border-l-2 border-accent/50 pl-4',
            !show && 'pointer-events-none',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
