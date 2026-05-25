import { X } from 'lucide-react'
import { cn } from '#/lib/cn'

type MembersBulkBarProps = {
  count: number
  onClear: () => void
  onMakeAdmin: () => void
  onRemove: () => void
  onExport: () => void
}

const bulkBtnClass =
  'inline-flex h-9 items-center justify-center rounded-xl border border-border-default px-3 text-sm font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg'

export function MembersBulkBar({
  count,
  onClear,
  onMakeAdmin,
  onRemove,
  onExport,
}: MembersBulkBarProps) {
  if (count === 0) return null

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 border-t border-border-default bg-bg-elevated/95 px-4 py-3 backdrop-blur-md',
        'md:static md:mb-0 md:border md:rounded-xl md:bg-surface md:shadow-lg',
      )}
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3">
        <p className="text-sm font-medium text-fg">
          <span className="tabular-nums">{count}</span> selected
        </p>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 text-sm font-medium text-fg-muted transition-colors hover:text-fg-secondary"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
          Clear
        </button>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button type="button" className={bulkBtnClass} onClick={onMakeAdmin}>
            Make admin
          </button>
          <button type="button" className={bulkBtnClass} onClick={onExport}>
            Export as CSV
          </button>
          <button
            type="button"
            className={cn(
              bulkBtnClass,
              'border-google-red/30 text-google-red hover:bg-google-red/10',
            )}
            onClick={onRemove}
          >
            Remove members
          </button>
        </div>
      </div>
    </div>
  )
}
