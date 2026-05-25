import { ChevronLeft, ChevronRight, Copy, X } from 'lucide-react'
import { cn } from '#/lib/cn'

type EventDetailToolbarProps = {
  onClose: () => void
  onCopyLink: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev: boolean
  hasNext: boolean
  className?: string
}

export function EventDetailToolbar({
  onClose,
  onCopyLink,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  className,
}: EventDetailToolbarProps) {
  return (
    <header
      className={cn(
        'flex shrink-0 items-center gap-2 border-b border-border-default bg-bg-base px-3 py-2.5',
        className,
      )}
    >
      <button
        type="button"
        onClick={onClose}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg"
        aria-label="Close panel"
      >
        <X className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={onCopyLink}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border-default px-2.5 text-xs font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg"
      >
        <Copy className="h-3.5 w-3.5" />
        Copy Link
      </button>

      <div className="ml-auto flex items-center gap-0.5">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:opacity-30"
          aria-label="Previous event"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:opacity-30"
          aria-label="Next event"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
