import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '#/lib/cn'
import {
  registerInputClassName,
  registerLabelClassName,
} from '#/components/hackdsc/register/register-field-styles'

type RegisterFieldProps = {
  label: string
  optional?: boolean
  error?: string
  hideErrorText?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export function RegisterField({
  label,
  optional,
  error,
  hideErrorText,
  className,
  id: idProp,
  ...inputProps
}: RegisterFieldProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const hasError = Boolean(error?.trim())

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={registerLabelClassName}>
        {label}
        {optional ? (
          <span className="font-normal text-fg-muted/80"> (optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        className={cn(registerInputClassName(hasError), className)}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        {...inputProps}
      />
      {hasError && !hideErrorText ? (
        <p id={`${id}-error`} className="text-xs text-google-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
