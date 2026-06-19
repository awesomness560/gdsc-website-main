import type { ReactNode } from 'react'
import {
  EXPERIENCE_LEVEL_OPTIONS,
  HACKDSC_REGISTRATION_STEPS,
} from '#/data/hackdsc-registration'
import type {
  HackdscRegistrationFormState,
  HackdscRegistrationStepId,
} from '#/types/hackdsc-registration'

type RegisterConfirmSummaryProps = {
  data: HackdscRegistrationFormState
  onEditStep: (step: HackdscRegistrationStepId) => void
}

function SummarySection({
  stepId,
  title,
  onEdit,
  children,
}: {
  stepId: HackdscRegistrationStepId
  title: string
  onEdit: (step: HackdscRegistrationStepId) => void
  children: ReactNode
}) {
  return (
    <section className="rounded-xl border border-border-default bg-surface/40 px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-fg">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(stepId)}
          className="text-xs font-medium text-accent hover:text-accent-hover"
        >
          Edit
        </button>
      </div>
      <dl className="mt-3 space-y-2 text-sm">{children}</dl>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null
  return (
    <div>
      <dt className="text-xs text-fg-muted">{label}</dt>
      <dd className="mt-0.5 text-fg-secondary">{value}</dd>
    </div>
  )
}

export function RegisterConfirmSummary({
  data,
  onEditStep,
}: RegisterConfirmSummaryProps) {
  const experienceLabel = EXPERIENCE_LEVEL_OPTIONS.find(
    (o) => o.value === data.experienceLevel,
  )?.label

  return (
    <div className="space-y-4">
      <SummarySection
        stepId={1}
        title={HACKDSC_REGISTRATION_STEPS[0].title}
        onEdit={onEditStep}
      >
        <Row label="Full name" value={data.fullName} />
        <Row label="Preferred name" value={data.preferredName} />
        <Row label="Email" value={data.email} />
        <Row label="Phone" value={data.phone} />
        <Row label="School" value={data.university} />
        <Row label="Major" value={data.major} />
        <Row label="Experience" value={experienceLabel ?? ''} />
      </SummarySection>

      <SummarySection
        stepId={2}
        title={HACKDSC_REGISTRATION_STEPS[1].title}
        onEdit={onEditStep}
      >
        <Row
          label="Already have a team"
          value={
            data.hasTeam === null ? '' : data.hasTeam ? 'Yes' : 'No'
          }
        />
        {data.hasTeam ? (
          <Row label="Teammates" value={data.teammateDetails} />
        ) : null}
        <Row
          label="Looking for teammates"
          value={
            data.lookingForTeammates === null
              ? ''
              : data.lookingForTeammates
                ? 'Yes'
                : 'No'
          }
        />
        {data.lookingForTeammates ? (
          <>
            <Row
              label="Preferred team size"
              value={
                data.preferredTeamSize != null
                  ? String(data.preferredTeamSize)
                  : ''
              }
            />
            <Row
              label="Skills you have"
              value={[
                ...data.skillsWanted,
                data.skillsWantedOther.trim(),
              ]
                .filter(Boolean)
                .join(', ')}
            />
          </>
        ) : null}
      </SummarySection>

      <SummarySection
        stepId={3}
        title={HACKDSC_REGISTRATION_STEPS[2].title}
        onEdit={onEditStep}
      >
        <Row
          label="Dietary"
          value={data.dietaryRestrictions.join(', ')}
        />
        <Row label="Allergies" value={data.allergies} />
        <Row label="Emergency contact" value={data.emergencyContactName} />
        <Row label="Emergency phone" value={data.emergencyContactPhone} />
        <Row
          label="Relationship"
          value={data.emergencyContactRelationship}
        />
      </SummarySection>

      <SummarySection
        stepId={4}
        title={HACKDSC_REGISTRATION_STEPS[3].title}
        onEdit={onEditStep}
      >
        <Row
          label="Share with sponsors"
          value={
            data.resumeShareConsent === null
              ? 'Skipped'
              : data.resumeShareConsent
                ? 'Yes'
                : 'No'
          }
        />
        {data.resumeShareConsent ? (
          <>
            <Row
              label="Resume"
              value={data.resumeFileName ?? 'Not uploaded'}
            />
            <Row label="LinkedIn" value={data.linkedinUrl} />
            <Row label="GitHub" value={data.githubUrl} />
            <Row label="Portfolio" value={data.portfolioUrl} />
          </>
        ) : null}
      </SummarySection>

      <SummarySection
        stepId={5}
        title={HACKDSC_REGISTRATION_STEPS[4].title}
        onEdit={onEditStep}
      >
        <Row label="Why interested" value={data.whyInterested} />
        <Row label="Hope to learn" value={data.whatHopeToLearn} />
      </SummarySection>
    </div>
  )
}
