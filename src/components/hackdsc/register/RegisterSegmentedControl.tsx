import { cn } from '#/lib/cn'
import { registerLabelClassName } from '#/components/hackdsc/register/register-field-styles'

type RegisterSegmentedControlProps = {
  label: string
  optional?: boolean
  value: boolean | null
  onChange: (value: boolean) => void
  error?: string
  disabled?: boolean
}

export function RegisterSegmentedControl({
  label,
  optional,
  value,
  onChange,
  error,
  disabled,
}: RegisterSegmentedControlProps) {
  const hasError = Boolean(error?.trim())

  return (
    <div className="space-y-3">
      <span className={cn('block', registerLabelClassName)}>
        {label}
        {optional ? (
          <span className="font-normal text-fg-muted/80"> (optional)</span>
        ) : null}
      </span>
      <div
        className={cn(
          'inline-flex h-11 w-full max-w-[13.5rem] rounded-full border p-1',
          hasError ? 'border-google-red/50' : 'border-border-default bg-surface/40',
        )}
        role="group"
        aria-label={label}
      >
        {([true, false] as const).map((option) => {
          const selected = value === option
          return (
            <button
              key={String(option)}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option)}
              className={cn(
                'flex h-full min-w-[3.25rem] flex-1 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors',
                selected
                  ? 'bg-accent text-accent-fg shadow-sm'
                  : 'text-fg-secondary hover:bg-white/5 hover:text-fg',
                disabled && 'cursor-not-allowed opacity-60',
              )}
              aria-pressed={selected}
            >
              {option ? 'Yes' : 'No'}
            </button>
          )
        })}
      </div>
      {hasError ? (
        <p className="text-xs text-google-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
