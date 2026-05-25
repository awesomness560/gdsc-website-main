import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '#/lib/cn'

type AuthFieldProps = {
  label: string
  error?: string
  invalid?: boolean
  hideErrorText?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export function AuthField({
  label,
  error,
  invalid,
  hideErrorText,
  className,
  id: idProp,
  ...inputProps
}: AuthFieldProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const hasError =
    invalid || Boolean(error && error.trim())

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-medium text-fg-secondary">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'h-11 w-full rounded-xl border bg-surface-raised/80 px-4 text-sm text-fg',
          'placeholder:text-fg-muted/70 transition-[border-color,box-shadow]',
          'outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20',
          hasError
            ? 'border-google-red/70 focus:border-google-red/80 focus:ring-google-red/15'
            : 'border-border-default hover:border-border-strong',
          className,
        )}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...inputProps}
      />
      {hasError && !hideErrorText ? (
        <p id={`${id}-error`} className="text-xs text-google-red" role="alert">
          {error?.trim()}
        </p>
      ) : null}
    </div>
  )
}
