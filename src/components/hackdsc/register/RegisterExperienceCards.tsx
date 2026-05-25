import { EXPERIENCE_LEVEL_OPTIONS } from '#/data/hackdsc-registration'
import type { HackdscExperienceLevel } from '#/types/hackdsc-registration'
import { cn } from '#/lib/cn'
import { registerLabelClassName } from '#/components/hackdsc/register/register-field-styles'

type RegisterExperienceCardsProps = {
  value: HackdscExperienceLevel | ''
  onChange: (value: HackdscExperienceLevel) => void
  error?: string
}

export function RegisterExperienceCards({
  value,
  onChange,
  error,
}: RegisterExperienceCardsProps) {
  const hasError = Boolean(error?.trim())

  return (
    <fieldset className="space-y-2">
      <legend className={registerLabelClassName}>
        Hackathon experience
      </legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {EXPERIENCE_LEVEL_OPTIONS.map((option) => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                'rounded-xl border px-3 py-3.5 text-left transition-colors',
                selected
                  ? 'border-accent/70 bg-accent/12'
                  : 'border-border-default bg-surface-raised/60 hover:border-border-strong',
                hasError && !selected && 'border-google-red/30',
              )}
              aria-pressed={selected}
            >
              <span className="block text-sm font-semibold text-fg">
                {option.label}
              </span>
              <span className="mt-1 block text-xs leading-snug text-fg-muted">
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
      {hasError ? (
        <p className="text-xs text-google-red" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  )
}
