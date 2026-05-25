import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { cn } from '#/lib/cn'

type SlideOverPanelProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  /** Tailwind max-width class for the panel (desktop). */
  widthClass?: string
  ariaLabel?: string
}

export function SlideOverPanel({
  open,
  onClose,
  children,
  widthClass = 'max-w-[520px]',
  ariaLabel = 'Detail panel',
}: SlideOverPanelProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        className="absolute inset-0 bg-black/55"
        aria-label="Close panel"
        onClick={onClose}
      />
      <aside
        className={cn(
          'absolute top-0 right-0 flex h-dvh w-full flex-col overflow-hidden',
          'border-l border-border-default bg-bg-base shadow-2xl',
          widthClass,
        )}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        {children}
      </aside>
    </div>
  )
}
