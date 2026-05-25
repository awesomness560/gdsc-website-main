import { cn } from '#/lib/cn'

export const registerInputClassName = (hasError?: boolean) =>
  cn(
    'h-11 w-full rounded-xl border bg-surface-raised/80 px-4 text-sm text-fg',
    'placeholder:text-fg-muted/70 transition-[border-color,box-shadow]',
    'outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20',
    hasError
      ? 'border-google-red/70 focus:border-google-red/80 focus:ring-google-red/15'
      : 'border-border-default hover:border-border-strong',
  )

export const registerLabelClassName =
  'text-[13px] font-medium text-fg-muted'

/** Shared chip / pill styling for multi-select controls. */
export function registerChipClassName(active: boolean) {
  return cn(
    'rounded-lg border px-3.5 py-2 text-sm font-medium leading-snug transition-colors',
    active
      ? 'border-accent/60 bg-accent/15 text-fg'
      : 'border-border-default text-fg-secondary hover:border-border-strong hover:text-fg',
  )
}
