import { Keyboard } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '#/lib/cn'

const SHORTCUTS = [
  { keys: ['J', '↓'], label: 'Next application' },
  { keys: ['K', '↑'], label: 'Previous application' },
  { keys: ['A'], label: 'Accept' },
  { keys: ['R'], label: 'Reject' },
  { keys: ['F'], label: 'Flag for discussion' },
  { keys: ['U'], label: 'Unflag' },
  { keys: ['/'], label: 'Focus search' },
  { keys: ['?'], label: 'Show shortcuts' },
  { keys: ['Esc'], label: 'Close / blur field' },
] as const

function Kbd({ children }: { children: string }) {
  return (
    <kbd className="inline-flex min-w-[1.25rem] items-center justify-center rounded border border-border-default bg-white/5 px-1 py-0.5 font-mono text-[10px] font-medium text-fg-secondary">
      {children}
    </kbd>
  )
}

type ApplicationKeyboardHintsProps = {
  className?: string
  hiddenOnMobile?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ApplicationKeyboardHints({
  className,
  hiddenOnMobile = true,
  open: openProp,
  onOpenChange,
}: ApplicationKeyboardHintsProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = openProp ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handlePointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open, setOpen])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== '?' || e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return
      }
      e.preventDefault()
      setOpen(!open)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, setOpen])

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative',
        hiddenOnMobile && 'hidden lg:block',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-default text-fg-muted transition-colors',
          'hover:bg-white/5 hover:text-fg-secondary',
          open && 'border-accent/40 bg-accent/10 text-fg',
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Keyboard shortcuts"
        title="Shortcuts (?)"
      >
        <Keyboard className="h-4 w-4" aria-hidden />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Keyboard shortcuts"
          className="absolute top-full right-0 z-50 mt-1.5 w-[min(16rem,calc(100vw-2rem))] rounded-xl border border-border-default bg-surface-overlay p-3 shadow-lg"
        >
          <p className="text-[11px] font-semibold tracking-wide text-fg-muted uppercase">
            Shortcuts
          </p>
          <ul className="mt-2 space-y-1.5">
            {SHORTCUTS.map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between gap-3 text-xs"
              >
                <span className="text-fg-secondary">{row.label}</span>
                <span className="flex shrink-0 items-center gap-1">
                  {row.keys.map((key, i) => (
                    <span key={key} className="flex items-center gap-1">
                      {i > 0 ? (
                        <span className="text-[10px] text-fg-muted">/</span>
                      ) : null}
                      <Kbd>{key}</Kbd>
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
