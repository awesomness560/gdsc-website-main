import { cn } from '#/lib/cn'

type AdminBrandProps = {
  compact?: boolean
  className?: string
}

export function AdminBrand({ compact, className }: AdminBrandProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img
        src="/gdsc-icon.png"
        alt=""
        width={32}
        height={32}
        decoding="async"
        className="h-8 w-8 shrink-0 rounded-lg object-contain"
      />
      <div className="min-w-0">
        <p
          className={cn(
            'font-bold tracking-tight text-fg',
            compact ? 'text-sm' : 'text-base',
          )}
        >
          GDG
        </p>
        <p className="text-[10px] font-semibold tracking-wide text-fg-muted uppercase">
          Admin
        </p>
      </div>
    </div>
  )
}
