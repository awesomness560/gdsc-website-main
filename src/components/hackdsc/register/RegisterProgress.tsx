import type { HackdscRegistrationStepId } from '#/types/hackdsc-registration'
import { HACKDSC_REGISTRATION_STEPS } from '#/data/hackdsc-registration'
import { cn } from '#/lib/cn'

type RegisterProgressProps = {
  currentStep: HackdscRegistrationStepId
  maxReachedStep: HackdscRegistrationStepId
  onStepClick: (step: HackdscRegistrationStepId) => void
}

export function RegisterProgress({
  currentStep,
  maxReachedStep,
  onStepClick,
}: RegisterProgressProps) {
  const stepMeta = HACKDSC_REGISTRATION_STEPS.find((s) => s.id === currentStep)

  return (
    <div className="space-y-3">
      <p className="text-center text-xs text-fg-muted sm:text-left">
        Step {currentStep} of {HACKDSC_REGISTRATION_STEPS.length}
        {stepMeta ? (
          <>
            {' '}
            · <span className="text-fg-secondary">{stepMeta.title}</span>
          </>
        ) : null}
      </p>
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={HACKDSC_REGISTRATION_STEPS.length}
        aria-label={`Application step ${currentStep} of ${HACKDSC_REGISTRATION_STEPS.length}`}
      >
        {HACKDSC_REGISTRATION_STEPS.map((step) => {
          const completed = step.id < currentStep
          const active = step.id === currentStep
          const reachable = step.id <= maxReachedStep
          const segmentClass = cn(
            'h-1.5 flex-1 rounded-full border transition-colors',
            active && 'border-accent bg-accent',
            completed && 'border-accent/40 bg-accent/35',
            !active &&
              !completed &&
              'border-border-default bg-transparent',
          )

          if (reachable && !active) {
            return (
              <button
                key={step.id}
                type="button"
                className={cn(segmentClass, 'cursor-pointer hover:bg-accent/25')}
                onClick={() => onStepClick(step.id)}
                aria-label={`Go back to step ${step.id}: ${step.title}`}
              />
            )
          }

          return (
            <div
              key={step.id}
              className={segmentClass}
              aria-hidden={!active}
            />
          )
        })}
      </div>
    </div>
  )
}
