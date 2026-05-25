import { useId, type TextareaHTMLAttributes } from 'react'
import { cn } from '#/lib/cn'
import {
  registerInputClassName,
  registerLabelClassName,
} from '#/components/hackdsc/register/register-field-styles'

type RegisterTextareaProps = {
  label: string
  optional?: boolean
  hint?: string
  error?: string
  maxLength?: number
  value: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function RegisterTextarea({
  label,
  optional,
  hint,
  error,
  maxLength,
  value,
  className,
  id: idProp,
  ...textareaProps
}: RegisterTextareaProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const hasError = Boolean(error?.trim())
  const count = value.length

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className={registerLabelClassName}>
          {label}
          {optional ? (
            <span className="font-normal text-fg-muted/80"> (optional)</span>
          ) : null}
        </label>
        {maxLength != null ? (
          <span className="text-xs text-fg-muted tabular-nums">
            {count} / {maxLength}
          </span>
        ) : null}
      </div>
      {hint ? <p className="text-xs text-fg-muted">{hint}</p> : null}
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        rows={textareaProps.rows ?? 5}
        className={cn(
          registerInputClassName(hasError),
          'min-h-[7.5rem] resize-y py-3',
          className,
        )}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...textareaProps}
      />
      {hasError ? (
        <p id={`${id}-error`} className="text-xs text-google-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
