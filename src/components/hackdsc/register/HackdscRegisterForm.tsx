import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { RegisterChipSelect } from '#/components/hackdsc/register/RegisterChipSelect'
import { RegisterConditionalBlock } from '#/components/hackdsc/register/RegisterConditionalBlock'
import { RegisterConfirmSummary } from '#/components/hackdsc/register/RegisterConfirmSummary'
import { RegisterExperienceCards } from '#/components/hackdsc/register/RegisterExperienceCards'
import { RegisterField } from '#/components/hackdsc/register/RegisterField'
import { RegisterMajorField } from '#/components/hackdsc/register/RegisterMajorField'
import { RegisterProgress } from '#/components/hackdsc/register/RegisterProgress'
import { RegisterResumeUpload } from '#/components/hackdsc/register/RegisterResumeUpload'
import { RegisterSegmentedControl } from '#/components/hackdsc/register/RegisterSegmentedControl'
import { RegisterTeamSizePills } from '#/components/hackdsc/register/RegisterTeamSizePills'
import { RegisterTextarea } from '#/components/hackdsc/register/RegisterTextarea'
import {
  DIETARY_OPTIONS,
  ESSAY_MAX_LENGTH,
  HACKDSC_REGISTRATION_STEPS,
  MLH_CODE_OF_CONDUCT_URL,
  TEAMMATE_SKILL_OPTIONS,
} from '#/data/hackdsc-registration'
import { useAuth } from '#/contexts/AuthContext'
import { createInitialRegistrationForm } from '#/lib/hackdsc-registration-form'
import {
  validateAllRegistrationSteps,
  validateRegistrationStep,
} from '#/lib/hackdsc-registration-validation'
import { cn } from '#/lib/cn'
import type {
  HackdscRegistrationErrors,
  HackdscRegistrationFormState,
  HackdscRegistrationStepId,
} from '#/types/hackdsc-registration'
const TOTAL_STEPS = 6 as const
const CONFIRM_STEP = 6 as HackdscRegistrationStepId

type HackdscRegisterFormProps = {
  onSubmitted?: () => void
}

export function HackdscRegisterForm({ onSubmitted }: HackdscRegisterFormProps) {
  const { user } = useAuth()
  const [step, setStep] = useState<HackdscRegistrationStepId>(1)
  const [maxReachedStep, setMaxReachedStep] =
    useState<HackdscRegistrationStepId>(1)
  const [form, setForm] = useState<HackdscRegistrationFormState>(() =>
    createInitialRegistrationForm(user),
  )
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<HackdscRegistrationErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  /** User jumped here from confirm — offer quick return to review. */
  const [editingFromConfirm, setEditingFromConfirm] = useState(false)

  const stepMeta = HACKDSC_REGISTRATION_STEPS[step - 1]

  function patch(partial: Partial<HackdscRegistrationFormState>) {
    setForm((prev) => ({ ...prev, ...partial }))
    setErrors((prev) => {
      const next = { ...prev }
      for (const key of Object.keys(partial) as Array<
        keyof HackdscRegistrationFormState
      >) {
        delete next[key]
      }
      return next
    })
  }

  function goToStep(next: HackdscRegistrationStepId, options?: { fromConfirm?: boolean }) {
    setStep(next)
    if (options?.fromConfirm) {
      setEditingFromConfirm(true)
    } else if (next === CONFIRM_STEP) {
      setEditingFromConfirm(false)
    }
    setErrors({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function returnToConfirm() {
    goToStep(CONFIRM_STEP)
  }

  function handleBack() {
    if (editingFromConfirm) {
      returnToConfirm()
      return
    }
    if (step > 1) goToStep((step - 1) as HackdscRegistrationStepId)
  }

  function handleContinue() {
    const stepErrors = validateRegistrationStep(step, form, resumeFile)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    if (editingFromConfirm) {
      returnToConfirm()
      return
    }

    if (step < TOTAL_STEPS) {
      const next = (step + 1) as HackdscRegistrationStepId
      setMaxReachedStep((prev) => (next > prev ? next : prev))
      goToStep(next)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const stepErrors = validateAllRegistrationSteps(form, resumeFile)
    if (Object.keys(stepErrors).length > 0) {
      const firstStep = ([1, 2, 3, 4, 5, 6] as const).find(
        (s) => Object.keys(validateRegistrationStep(s, form, resumeFile)).length > 0,
      )
      setErrors(stepErrors)
      if (firstStep) {
        setStep(firstStep)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    setSubmitting(true)
    // Database wiring will replace this stub.
    await new Promise((r) => setTimeout(r, 600))
    setSubmitting(false)
    setSubmitted(true)
    onSubmitted?.()
  }

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-google-green/15">
          <Check className="h-6 w-6 text-google-green" aria-hidden />
        </div>
        <h2 className="mt-6 text-2xl font-medium tracking-tight text-fg">
          Application submitted
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
          Thanks for applying to HackDSC Fall 2026. We&apos;ll review your
          application and email you at{' '}
          <span className="font-medium text-fg">{form.email}</span>.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={step === 6 ? handleSubmit : (e) => e.preventDefault()}
      className="flex flex-col sm:min-h-[min(720px,calc(100dvh-8rem))]"
      noValidate
    >
      <RegisterProgress
        currentStep={step}
        maxReachedStep={maxReachedStep}
        onStepClick={(s) => {
          if (s < step) goToStep(s)
        }}
      />

      {editingFromConfirm && step !== CONFIRM_STEP ? (
        <p className="mt-6 rounded-xl border border-accent/25 bg-accent/8 px-3 py-2 text-center text-xs text-fg-secondary sm:text-left">
          Editing your application.{' '}
          <button
            type="button"
            onClick={returnToConfirm}
            className="font-medium text-accent hover:text-accent-hover"
          >
            Back to review
          </button>
        </p>
      ) : null}

      <header className={cn('space-y-1', editingFromConfirm && step !== CONFIRM_STEP ? 'mt-4' : 'mt-8')}>
        <h2 className="text-[1.75rem] font-medium tracking-tight text-fg">
          {stepMeta.title}
          {step === 4 ? (
            <span className="ml-2 text-base font-normal text-fg-muted">
              (Optional)
            </span>
          ) : null}
        </h2>
        <p className="text-sm text-fg-muted">{stepMeta.subtitle}</p>
      </header>

      <div
        className={cn(
          'mt-6 flex-1 space-y-5 sm:pb-4',
          step === 6
            ? 'pb-[calc(8.25rem+env(safe-area-inset-bottom,0px))]'
            : 'pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))]',
        )}
      >
        {step === 1 ? (
          <>
            <RegisterField
              label="Full name"
              name="fullName"
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => patch({ fullName: e.target.value })}
              error={errors.fullName}
            />
            <RegisterField
              label="Preferred name"
              optional
              name="preferredName"
              autoComplete="nickname"
              value={form.preferredName}
              onChange={(e) => patch({ preferredName: e.target.value })}
            />
            <RegisterField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => patch({ email: e.target.value })}
              error={errors.email}
            />
            <RegisterField
              label="Phone"
              optional
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => patch({ phone: e.target.value })}
            />
            <RegisterField
              label="University / school"
              name="university"
              autoComplete="organization"
              value={form.university}
              onChange={(e) => patch({ university: e.target.value })}
              error={errors.university}
            />
            <RegisterMajorField
              value={form.major}
              onChange={(major) => patch({ major })}
              error={errors.major}
            />
            <RegisterExperienceCards
              value={form.experienceLevel}
              onChange={(experienceLevel) => patch({ experienceLevel })}
              error={errors.experienceLevel}
            />
          </>
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <RegisterSegmentedControl
              label="Do you already have a team?"
              value={form.hasTeam}
              onChange={(hasTeam) =>
                patch({
                  hasTeam,
                  teammateDetails: hasTeam ? form.teammateDetails : '',
                })
              }
              error={errors.hasTeam}
            />
            <RegisterConditionalBlock show={form.hasTeam === true}>
              <div className="pt-1 pb-2">
                <RegisterTextarea
                  label="Teammate names and emails"
                  hint="One per line"
                  value={form.teammateDetails}
                  onChange={(e) => patch({ teammateDetails: e.target.value })}
                  error={errors.teammateDetails}
                  rows={4}
                />
              </div>
            </RegisterConditionalBlock>

            <RegisterSegmentedControl
              label="Are you looking for teammates?"
              value={form.lookingForTeammates}
              onChange={(lookingForTeammates) =>
                patch({
                  lookingForTeammates,
                  ...(lookingForTeammates
                    ? {}
                    : {
                        preferredTeamSize: null,
                        skillsWanted: [],
                        skillsWantedOther: '',
                      }),
                })
              }
              error={errors.lookingForTeammates}
            />
            <RegisterConditionalBlock show={form.lookingForTeammates === true}>
              <div className="space-y-5 pt-1 pb-2">
                <RegisterTeamSizePills
                  value={form.preferredTeamSize}
                  onChange={(preferredTeamSize) => patch({ preferredTeamSize })}
                  error={errors.preferredTeamSize}
                />
                <RegisterChipSelect
                  label="Skills you want on your team"
                  options={TEAMMATE_SKILL_OPTIONS}
                  value={form.skillsWanted}
                  onChange={(skillsWanted) => patch({ skillsWanted })}
                  error={errors.skillsWanted}
                />
                <RegisterField
                  label="Other skills"
                  optional
                  value={form.skillsWantedOther}
                  onChange={(e) => patch({ skillsWantedOther: e.target.value })}
                  placeholder="e.g. game dev, cybersecurity"
                />
              </div>
            </RegisterConditionalBlock>
          </div>
        ) : null}

        {step === 3 ? (
          <>
            <RegisterChipSelect
              label="Dietary restrictions"
              options={DIETARY_OPTIONS}
              value={form.dietaryRestrictions}
              onChange={(dietaryRestrictions) => patch({ dietaryRestrictions })}
              exclusiveOption="None"
              error={errors.dietaryRestrictions}
            />
            <RegisterTextarea
              label="Allergies"
              optional
              hint="We take this seriously — please be specific."
              value={form.allergies}
              onChange={(e) => patch({ allergies: e.target.value })}
            />
            <RegisterField
              label="Emergency contact name"
              value={form.emergencyContactName}
              onChange={(e) =>
                patch({ emergencyContactName: e.target.value })
              }
              error={errors.emergencyContactName}
            />
            <RegisterField
              label="Emergency contact phone"
              type="tel"
              value={form.emergencyContactPhone}
              onChange={(e) =>
                patch({ emergencyContactPhone: e.target.value })
              }
              error={errors.emergencyContactPhone}
            />
            <RegisterField
              label="Relationship to you"
              placeholder="e.g. Parent, Sibling, Friend, Partner"
              value={form.emergencyContactRelationship}
              onChange={(e) =>
                patch({ emergencyContactRelationship: e.target.value })
              }
              error={errors.emergencyContactRelationship}
            />
          </>
        ) : null}

        {step === 4 ? (
          <>
            <RegisterSegmentedControl
              label="Share my resume with sponsors for recruiting?"
              value={form.resumeShareConsent}
              onChange={(resumeShareConsent) =>
                patch({
                  resumeShareConsent,
                  ...(resumeShareConsent
                    ? {}
                    : {
                        resumeFileName: null,
                        linkedinUrl: '',
                        githubUrl: '',
                        portfolioUrl: '',
                      }),
                })
              }
            />
            <RegisterConditionalBlock show={form.resumeShareConsent === true}>
              <div className="space-y-5 pt-1 pb-2">
                <RegisterResumeUpload
                  file={resumeFile}
                  fileName={form.resumeFileName}
                  onFileChange={(file, fileName) => {
                    setResumeFile(file)
                    patch({ resumeFileName: fileName })
                  }}
                  onValidationError={(message) => {
                    setErrors((prev) => {
                      const next = { ...prev }
                      if (message) next.resumeFile = message
                      else delete next.resumeFile
                      return next
                    })
                  }}
                  error={errors.resumeFile}
                />
                <RegisterField
                  label="LinkedIn URL"
                  optional
                  type="url"
                  placeholder="https://linkedin.com/in/…"
                  value={form.linkedinUrl}
                  onChange={(e) => patch({ linkedinUrl: e.target.value })}
                  error={errors.linkedinUrl}
                />
                <RegisterField
                  label="GitHub URL"
                  optional
                  type="url"
                  placeholder="https://github.com/…"
                  value={form.githubUrl}
                  onChange={(e) => patch({ githubUrl: e.target.value })}
                  error={errors.githubUrl}
                />
                <RegisterField
                  label="Portfolio URL"
                  optional
                  type="url"
                  placeholder="https://…"
                  value={form.portfolioUrl}
                  onChange={(e) => patch({ portfolioUrl: e.target.value })}
                  error={errors.portfolioUrl}
                />
              </div>
            </RegisterConditionalBlock>
          </>
        ) : null}

        {step === 5 ? (
          <>
            <RegisterTextarea
              label="Why are you interested in HackDSC?"
              value={form.whyInterested}
              maxLength={ESSAY_MAX_LENGTH}
              onChange={(e) => patch({ whyInterested: e.target.value })}
              error={errors.whyInterested}
            />
            <RegisterTextarea
              label="What do you hope to learn or build?"
              value={form.whatHopeToLearn}
              maxLength={ESSAY_MAX_LENGTH}
              onChange={(e) => patch({ whatHopeToLearn: e.target.value })}
              error={errors.whatHopeToLearn}
            />
          </>
        ) : null}

        {step === 6 ? (
          <>
            <RegisterConfirmSummary
              data={form}
              onEditStep={(target) => goToStep(target, { fromConfirm: true })}
            />
            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-border-default bg-surface/40 px-4 py-3">
              <input
                type="checkbox"
                checked={form.mlhCodeOfConduct}
                onChange={(e) => patch({ mlhCodeOfConduct: e.target.checked })}
                className="mt-1 h-4 w-4 shrink-0 rounded border-border-strong accent-accent"
              />
              <span className="text-sm leading-relaxed text-fg-secondary">
                I agree to the{' '}
                <a
                  href={MLH_CODE_OF_CONDUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  MLH Code of Conduct
                </a>
                .
              </span>
            </label>
            {errors.mlhCodeOfConduct ? (
              <p className="text-xs text-google-red" role="alert">
                {errors.mlhCodeOfConduct}
              </p>
            ) : null}
          </>
        ) : null}
      </div>

      <footer
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle',
          'bg-hack-bg-base/95 shadow-[0_-12px_32px_rgba(2,6,17,0.65)] backdrop-blur-md',
          'pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]',
          'sm:static sm:z-auto sm:mt-auto sm:border-0 sm:bg-transparent sm:pb-0 sm:pt-6 sm:backdrop-blur-none',
        )}
      >
        <div className="mx-auto w-full max-w-[600px] px-4 pt-3 sm:max-w-none sm:px-0">
          <div
            className={cn(
              'flex gap-3',
              step === 6
                ? 'flex-col sm:flex-row sm:items-center sm:justify-between'
                : 'items-center justify-between',
            )}
          >
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1 && !editingFromConfirm}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                step === 1 && !editingFromConfirm
                  ? 'cursor-not-allowed text-fg-muted/50'
                  : 'text-fg-secondary hover:bg-white/5 hover:text-fg',
              )}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {editingFromConfirm ? 'Back to review' : 'Back'}
            </button>

            {step < 6 ? (
              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-2xl bg-accent px-5 text-sm font-semibold text-accent-fg shadow-[0_12px_32px_rgba(74,140,255,0.28)] transition-colors hover:bg-accent-hover"
              >
                {editingFromConfirm ? 'Save & review' : 'Continue'}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  'inline-flex h-11 w-full items-center justify-center rounded-2xl',
                  'bg-accent px-5 text-sm font-semibold text-accent-fg',
                  'shadow-[0_12px_32px_rgba(74,140,255,0.28)] transition-colors',
                  'hover:bg-accent-hover disabled:opacity-70',
                  'sm:w-auto sm:min-w-[200px]',
                )}
              >
                {submitting ? 'Submitting…' : 'Submit application'}
              </button>
            )}
          </div>
        </div>
      </footer>
    </form>
  )
}
