import { useEffect, useState } from 'react'
import { useAuth } from '#/contexts/AuthContext'
import { useHackdscAdminConfig } from '#/contexts/HackdscAdminConfigContext'
import {
  dateValueToIso,
  datetimeLocalToIso,
  daysUntilLabel,
  formatTimestamp,
  HACKDSC_LIFECYCLE_OPTIONS,
  isoToDateValue,
  isoToDatetimeLocalValue,
} from '#/lib/hackdsc-admin-utils'
import type { HackdscLifecycleStatus } from '#/types/admin-hackdsc'
import { cn } from '#/lib/cn'

const fieldInputClass =
  'h-10 w-full rounded-xl border border-border-default bg-bg-elevated/50 px-3 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40'

const fieldLabelClass = 'block text-sm font-medium text-fg-secondary'

const saveBtnClass =
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60'

function FormSection({
  title,
  children,
  prominent,
}: {
  title: string
  children: React.ReactNode
  prominent?: boolean
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-border-subtle bg-surface/40',
        prominent ? 'p-6 sm:p-7' : 'p-5 sm:p-6',
      )}
    >
      <h2 className="text-sm font-semibold tracking-tight text-fg">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}

function FieldHelper({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-fg-muted">{children}</p>
}

export function HackdscConfigurationTab() {
  const { user } = useAuth()
  const { config, savedConfig, isDirty, updateConfig, saveConfig, discardChanges } =
    useHackdscAdminConfig()
  const [savedToast, setSavedToast] = useState(false)

  useEffect(() => {
    if (!savedToast) return
    const timer = window.setTimeout(() => setSavedToast(false), 2500)
    return () => window.clearTimeout(timer)
  }, [savedToast])

  function handleSave() {
    saveConfig(user?.name ?? 'Admin')
    setSavedToast(true)
  }

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-8 pb-32 sm:px-6 sm:py-10">
      <div className="space-y-6">
        <FormSection title="Basics">
          <label className="block">
            <span className={fieldLabelClass}>Event name</span>
            <input
              type="text"
              value={config.eventName}
              onChange={(e) => updateConfig({ eventName: e.target.value })}
              placeholder="HackDSC Fall 2026"
              className={cn(fieldInputClass, 'mt-2')}
            />
          </label>
        </FormSection>

        <FormSection title="Dates">
          <label className="block">
            <span className={fieldLabelClass}>Event start</span>
            <input
              type="datetime-local"
              value={isoToDatetimeLocalValue(config.eventStart)}
              onChange={(e) =>
                updateConfig({ eventStart: datetimeLocalToIso(e.target.value) })
              }
              className={cn(fieldInputClass, 'mt-2')}
            />
          </label>

          <label className="block">
            <span className={fieldLabelClass}>Event end</span>
            <input
              type="datetime-local"
              value={isoToDatetimeLocalValue(config.eventEnd)}
              onChange={(e) =>
                updateConfig({ eventEnd: datetimeLocalToIso(e.target.value) })
              }
              className={cn(fieldInputClass, 'mt-2')}
            />
          </label>

          <label className="block">
            <span className={fieldLabelClass}>Application deadline</span>
            <input
              type="datetime-local"
              value={isoToDatetimeLocalValue(config.applicationDeadline)}
              onChange={(e) =>
                updateConfig({
                  applicationDeadline: datetimeLocalToIso(e.target.value),
                })
              }
              className={cn(fieldInputClass, 'mt-2')}
            />
            <FieldHelper>
              {daysUntilLabel(config.applicationDeadline, 'Closes')}
            </FieldHelper>
          </label>

          <label className="block">
            <span className={fieldLabelClass}>
              Acceptance notification date
              <span className="font-normal text-fg-muted"> (optional)</span>
            </span>
            <input
              type="date"
              value={
                config.acceptanceNotificationDate
                  ? isoToDateValue(config.acceptanceNotificationDate)
                  : ''
              }
              onChange={(e) =>
                updateConfig({
                  acceptanceNotificationDate: e.target.value
                    ? dateValueToIso(e.target.value)
                    : null,
                })
              }
              className={cn(fieldInputClass, 'mt-2')}
            />
            <FieldHelper>
              Used in messaging like &ldquo;We&apos;ll notify you by [date]&rdquo;
            </FieldHelper>
          </label>
        </FormSection>

        <FormSection title="Logistics">
          <label className="block">
            <span className={fieldLabelClass}>Location name</span>
            <input
              type="text"
              value={config.locationName}
              onChange={(e) => updateConfig({ locationName: e.target.value })}
              placeholder="ECSW, UT Dallas"
              className={cn(fieldInputClass, 'mt-2')}
            />
          </label>

          <label className="block">
            <span className={fieldLabelClass}>Location address</span>
            <input
              type="text"
              value={config.locationAddress}
              onChange={(e) => updateConfig({ locationAddress: e.target.value })}
              placeholder="800 W Campbell Rd, Richardson, TX 75080"
              className={cn(fieldInputClass, 'mt-2')}
            />
          </label>
        </FormSection>

        <FormSection title="Status" prominent>
          <fieldset className="space-y-3">
            <legend className="sr-only">Event lifecycle status</legend>
            {HACKDSC_LIFECYCLE_OPTIONS.map((option) => {
              const selected = config.status === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    updateConfig({ status: option.value as HackdscLifecycleStatus })
                  }
                  className={cn(
                    'flex w-full flex-col items-start gap-1.5 rounded-xl border px-4 py-4 text-left transition-colors',
                    selected
                      ? 'border-accent/60 bg-accent/12'
                      : 'border-border-default bg-bg-elevated/30 hover:border-border-strong hover:bg-bg-elevated/50',
                  )}
                  aria-pressed={selected}
                >
                  <span className="text-sm font-semibold text-fg">
                    {option.label}
                  </span>
                  <span className="text-xs leading-snug text-fg-muted">
                    {option.description}
                  </span>
                </button>
              )
            })}
          </fieldset>
        </FormSection>
      </div>

      <p className="mt-8 text-xs text-fg-muted">
        Last updated by {savedConfig.updatedByName} ·{' '}
        {formatTimestamp(savedConfig.updatedAt)}
      </p>

      {isDirty ? (
        <div className="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-2xl border border-border-default bg-surface-overlay px-4 py-3 shadow-lg sm:right-6 sm:bottom-6">
          <button
            type="button"
            onClick={discardChanges}
            className="text-sm font-medium text-fg-muted transition-colors hover:text-fg-secondary"
          >
            Discard changes
          </button>
          <button type="button" className={saveBtnClass} onClick={handleSave}>
            Save changes
          </button>
        </div>
      ) : null}

      {savedToast ? (
        <div
          className="fixed right-4 bottom-4 z-[60] rounded-xl border border-google-green/30 bg-google-green/10 px-4 py-2.5 text-sm font-medium text-google-green shadow-lg sm:right-6 sm:bottom-6"
          role="status"
        >
          Saved
        </div>
      ) : null}
    </div>
  )
}
