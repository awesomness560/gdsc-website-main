import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { HackFaqItem } from '#/types/hackdsc'
import { cn } from '#/lib/cn'

type FaqItemProps = {
  item: HackFaqItem
}

export function FaqItem({ item }: FaqItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'rounded-2xl border border-border-default bg-surface transition-colors',
        open && 'border-border-strong bg-surface-raised',
      )}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold sm:text-base">{item.question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-fg-muted transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>
      {open ? (
        <p className="border-t border-border-subtle px-4 pt-0 pb-4 text-sm leading-relaxed text-fg-secondary sm:px-5 sm:pb-5">
          {item.answer}
        </p>
      ) : null}
    </div>
  )
}
