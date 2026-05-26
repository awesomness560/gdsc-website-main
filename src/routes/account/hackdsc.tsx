import { createFileRoute, Link } from '@tanstack/react-router'
import { Pencil } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  ApplicationStatusBanner,
  MembershipEligibilityCallout,
} from '#/components/account'
import { Card } from '#/components/ui/Card'
import { EXPERIENCE_LEVEL_OPTIONS } from '#/data/hackdsc-registration'
import { useAuth } from '#/contexts/AuthContext'
import { hasHackdscHackathonId } from '#/lib/hackathon-config'
import {
  useHackathonRegistrationQuery,
  useMyHackathonSubmissionQuery,
} from '#/queries/hackathon-submissions'

export const Route = createFileRoute('/account/hackdsc')({
  component: AccountHackdscTab,
})

function AccountHackdscTab() {
  const { user } = useAuth()
  const userId = user?.auth.id
  const canShowHackdsc = hasHackdscHackathonId()

  const submissionQuery = useMyHackathonSubmissionQuery(
    userId,
    canShowHackdsc ? undefined : null,
  )
  const registrationQuery = useHackathonRegistrationQuery(
    canShowHackdsc ? undefined : null,
  )

  if (!canShowHackdsc) {
    return (
      <Card>
        <p className="text-sm text-fg-secondary">
          HackDSC isn’t configured on this deploy yet.
        </p>
      </Card>
    )
  }

  const submission = submissionQuery.data
  const isOpen = registrationQuery.data?.isOpen ?? false

  if (!submission) {
    return (
      <Card>
        <p className="text-sm text-fg-secondary">
          You haven’t applied to HackDSC.
        </p>
        {isOpen ? (
          <div className="mt-4">
            <Link
              to="/hackdsc/register"
              className="text-sm font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent"
            >
              Apply now →
            </Link>
          </div>
        ) : null}
      </Card>
    )
  }

  const experienceLabel =
    EXPERIENCE_LEVEL_OPTIONS.find((o) => o.value === submission.form.experienceLevel)
      ?.label ??
    (submission.form.experienceLevel || '—')

  return (
    <div className="space-y-6">
      {!user?.isVerified ? <MembershipEligibilityCallout /> : null}

      <ApplicationStatusBanner status={submission.status} />

      <div className="space-y-4">
        <Section
          title="About you"
          editHref="/hackdsc/register"
          locked={!isOpen && submission.status === 'submitted'}
        >
          <SummaryRow label="Full name" value={submission.form.fullName} />
          <SummaryRow label="Preferred name" value={submission.form.preferredName} />
          <SummaryRow label="Email" value={submission.form.email} />
          <SummaryRow label="School" value={submission.form.university} />
          <SummaryRow label="Major" value={submission.form.major} />
          <SummaryRow label="Experience" value={experienceLabel} />
        </Section>

        <Section
          title="Team"
          editHref="/hackdsc/register"
          locked={!isOpen && submission.status === 'submitted'}
        >
          <SummaryRow
            label="Already have a team"
            value={
              submission.form.hasTeam === null
                ? '—'
                : submission.form.hasTeam
                  ? 'Yes'
                  : 'No'
            }
          />
          {submission.form.hasTeam ? (
            <SummaryRow label="Teammates" value={submission.form.teammateDetails} />
          ) : null}
          <SummaryRow
            label="Looking for teammates"
            value={
              submission.form.lookingForTeammates === null
                ? '—'
                : submission.form.lookingForTeammates
                  ? 'Yes'
                  : 'No'
            }
          />
          {submission.form.lookingForTeammates ? (
            <>
              <SummaryRow
                label="Preferred team size"
                value={submission.form.preferredTeamSize?.toString() ?? '—'}
              />
              <SummaryRow
                label="Skills wanted"
                value={[...submission.form.skillsWanted, submission.form.skillsWantedOther]
                  .map((v) => v.trim())
                  .filter(Boolean)
                  .join(', ') || '—'}
              />
            </>
          ) : null}
        </Section>

        <Section
          title="Logistics"
          editHref="/hackdsc/register"
          locked={false}
          note={!isOpen ? 'Logistics stay editable after the deadline.' : undefined}
        >
          <SummaryRow
            label="Dietary"
            value={submission.form.dietaryRestrictions.join(', ') || '—'}
          />
          <SummaryRow label="Allergies" value={submission.form.allergies || '—'} />
          <SummaryRow label="Emergency contact" value={submission.form.emergencyContactName || '—'} />
          <SummaryRow label="Emergency phone" value={submission.form.emergencyContactPhone || '—'} />
          <SummaryRow
            label="Relationship"
            value={submission.form.emergencyContactRelationship || '—'}
          />
        </Section>

        <Section
          title="Recruiting"
          editHref="/hackdsc/register"
          locked={!isOpen && submission.status === 'submitted'}
        >
          <SummaryRow
            label="Share with sponsors"
            value={
              submission.form.resumeShareConsent === null
                ? '—'
                : submission.form.resumeShareConsent
                  ? 'Yes'
                  : 'No'
            }
          />
          <SummaryRow label="LinkedIn" value={submission.form.linkedinUrl || '—'} />
          <SummaryRow label="GitHub" value={submission.form.githubUrl || '—'} />
          <SummaryRow label="Portfolio" value={submission.form.portfolioUrl || '—'} />
        </Section>

        <Section
          title="Essays"
          editHref="/hackdsc/register"
          locked={!isOpen && submission.status === 'submitted'}
        >
          <LongRow label="Why interested" value={submission.form.whyInterested || '—'} />
          <LongRow label="Hope to learn" value={submission.form.whatHopeToLearn || '—'} />
        </Section>
      </div>

      <p className="text-xs text-fg-muted">
        Want to withdraw? We can add a withdrawal flow once the backend supports a delete/withdraw state.
      </p>
    </div>
  )
}

function Section({
  title,
  editHref,
  locked,
  note,
  children,
}: {
  title: string
  editHref: string
  locked: boolean
  note?: string
  children: ReactNode
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-fg">{title}</h3>
          {note ? <p className="mt-1 text-xs text-fg-muted">{note}</p> : null}
        </div>
        {!locked ? (
          <Link
            to={editHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden />
            Edit
          </Link>
        ) : (
          <span className="text-xs text-fg-muted">Locked</span>
        )}
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </Card>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-fg-muted">{label}</p>
      <p className="mt-0.5 text-sm text-fg-secondary">{value}</p>
    </div>
  )
}

function LongRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-fg-muted">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-fg-secondary">
        {value}
      </p>
    </div>
  )
}

