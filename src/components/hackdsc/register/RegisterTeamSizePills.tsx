import { TEAM_SIZE_OPTIONS } from '#/data/hackdsc-registration'
import type { HackdscTeamSize } from '#/types/hackdsc-registration'
import { cn } from '#/lib/cn'
import { registerChipClassName, registerLabelClassName } from '#/components/hackdsc/register/register-field-styles'

type RegisterTeamSizePillsProps = {
  value: HackdscTeamSize | null
  onChange: (value: HackdscTeamSize) => void
  error?: string
}

export function RegisterTeamSizePills({
  value,
  onChange,
  error,
}: RegisterTeamSizePillsProps) {
  const hasError = Boolean(error?.trim())

  return (
    <div className="space-y-2">
      <span className={registerLabelClassName}>Preferred team size</span>
      <div className="flex flex-wrap gap-2">
        {TEAM_SIZE_OPTIONS.map((size) => {
          const active = value === size
          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              className={cn(registerChipClassName(active), 'min-w-[3rem] font-semibold')}
              aria-pressed={active}
            >
              {size}
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
