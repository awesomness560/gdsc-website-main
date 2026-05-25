import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { cn } from '#/lib/cn'

type EventDetailPanelProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function EventDetailPanel({ open, onClose, children }: EventDetailPanelProps) {
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
    <div className="fixed inset-0 z-[60] hidden lg:block">
      <button
        type="button"
        className="absolute inset-0 bg-black/55"
        aria-label="Close event panel"
        onClick={onClose}
      />
      <aside
        className={cn(
          'absolute top-20 right-0 flex h-[calc(100dvh-5rem)] w-full max-w-[720px] flex-col overflow-hidden',
          'border-l border-border-default bg-bg-base shadow-2xl',
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </aside>
    </div>
  )
}
