import { registerChipClassName, registerLabelClassName } from '#/components/hackdsc/register/register-field-styles'

type RegisterChipSelectProps = {
  label: string
  optional?: boolean
  options: readonly string[]
  value: string[]
  onChange: (value: string[]) => void
  /** When selected, clears all other options (e.g. "None"). */
  exclusiveOption?: string
  error?: string
}

export function RegisterChipSelect({
  label,
  optional,
  options,
  value,
  onChange,
  exclusiveOption,
  error,
}: RegisterChipSelectProps) {
  const hasError = Boolean(error?.trim())

  function toggle(option: string) {
    const isSelected = value.includes(option)

    if (exclusiveOption && option === exclusiveOption) {
      onChange(isSelected ? [] : [exclusiveOption])
      return
    }

    let next = isSelected ? value.filter((v) => v !== option) : [...value, option]

    if (exclusiveOption) {
      next = next.filter((v) => v !== exclusiveOption)
    }

    onChange(next)
  }

  return (
    <div className="space-y-2">
      <span className={registerLabelClassName}>
        {label}
        {optional ? (
          <span className="font-normal text-fg-muted/80"> (optional)</span>
        ) : null}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={registerChipClassName(active)}
              aria-pressed={active}
            >
              {option}
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
