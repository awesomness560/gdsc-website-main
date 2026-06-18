import { ChevronDown, ExternalLink, Flag } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { ApplicationMembershipPill } from '#/components/admin/applications/ApplicationMembershipPill'
import { ResumeViewButton } from '#/components/hackdsc/ResumeViewButton'
import {
  displayApplicationName,
  experienceLabel,
  flagDetailLine,
  formatDecisionDate,
  schoolMajorLine,
  teamStatusLabel,
} from '#/lib/admin-application-utils'
import type { AdminApplication } from '#/types/admin-application'
import { cn } from '#/lib/cn'

type ApplicationReaderProps = {
  app: AdminApplication
  className?: string
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[11px] font-semibold tracking-wider text-fg-muted uppercase">
      {children}
    </h3>
  )
}

function ProseBlock({ children }: { children: ReactNode }) {
  return (
    <p className="text-base leading-[1.7] text-fg-secondary whitespace-pre-wrap">
      {children}
    </p>
  )
}

function LinkRow({ href, label }: { href: string; label: string }) {
  if (!href.trim()) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
    </a>
  )
}

export function ApplicationReader({ app, className }: ApplicationReaderProps) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const { form } = app
  const flagLine = flagDetailLine(app)

  const teammatesOrSkills =
    form.hasTeam === true
      ? form.teammateDetails.trim() || '—'
      : form.lookingForTeammates === true
        ? [
            form.preferredTeamSize
              ? `Preferred team size: ${form.preferredTeamSize}`
              : null,
            [...form.skillsWanted, form.skillsWantedOther.trim()]
              .filter(Boolean)
              .join(', ') || null,
          ]
            .filter(Boolean)
            .join(' · ') || '—'
        : 'Going solo'

  return (
    <article className={cn(className)}>
      <div className="mx-auto max-w-[640px] px-5 py-8 sm:px-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-fg">
            {displayApplicationName(app)}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-secondary">
            <ApplicationMembershipPill isMember={app.isMember} />
            <span>{schoolMajorLine(app)}</span>
          </div>

          {flagLine ? (
            <div className="flex items-start gap-2 rounded-xl border border-accent/25 bg-accent/10 px-3 py-2.5 text-sm text-fg-secondary">
              <Flag className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <div className="min-w-0">
                <p>{flagLine}</p>
                {app.flags.length > 1 ? (
                  <ul className="mt-2 space-y-1 text-xs text-fg-muted">
                    {app.flags.slice(1).map((f) => (
                      <li key={f.id}>
                        {f.adminName}
                        {f.reason ? ` — ${f.reason}` : ''}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ) : null}

          {app.decidedAt &&
          app.decidedByName &&
          (app.decision === 'accepted' || app.decision === 'rejected') ? (
            <p className="text-sm text-fg-muted">
              {app.decision === 'accepted' ? 'Accepted' : 'Rejected'} by{' '}
              {app.decidedByName} · {formatDecisionDate(app.decidedAt)}
            </p>
          ) : null}
        </header>

        <div className="mt-10 space-y-10">
          <section className="space-y-3">
            <SectionTitle>About the applicant</SectionTitle>
            <dl className="grid gap-2 text-sm text-fg-secondary">
              <div>
                <dt className="text-fg-muted">Experience</dt>
                <dd>{experienceLabel(app.experienceLevel)}</dd>
              </div>
              <div>
                <dt className="text-fg-muted">Team</dt>
                <dd>{teamStatusLabel(app.teamStatus)}</dd>
              </div>
              <div>
                <dt className="text-fg-muted">
                  {form.hasTeam ? 'Teammates' : 'Skills / preferences'}
                </dt>
                <dd>{teammatesOrSkills}</dd>
              </div>
            </dl>
          </section>

          <section className="space-y-4">
            <SectionTitle>Why they&apos;re interested</SectionTitle>
            <ProseBlock>
              {form.whyInterested.trim() || '—'}
            </ProseBlock>
          </section>

          <section className="space-y-4">
            <SectionTitle>What they hope to learn</SectionTitle>
            <ProseBlock>
              {form.whatHopeToLearn.trim() || '—'}
            </ProseBlock>
          </section>

          <section className="space-y-3">
            <SectionTitle>Logistics</SectionTitle>
            <dl className="grid gap-2 text-sm text-fg-muted">
              <div>
                <dt>Dietary</dt>
                <dd className="text-fg-secondary">
                  {form.dietaryRestrictions.join(', ') || 'None'}
                </dd>
              </div>
              {form.allergies.trim() ? (
                <div>
                  <dt>Allergies</dt>
                  <dd className="text-fg-secondary">{form.allergies}</dd>
                </div>
              ) : null}
              <div>
                <dt>Emergency contact</dt>
                <dd className="text-fg-secondary">
                  {form.emergencyContactName || '—'}
                  {form.emergencyContactPhone
                    ? ` · ${form.emergencyContactPhone}`
                    : ''}
                  {form.emergencyContactRelationship
                    ? ` (${form.emergencyContactRelationship})`
                    : ''}
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-3">
            <SectionTitle>Recruiting</SectionTitle>
            {form.resumeFileName || form.resumeShareConsent ? (
              <div className="overflow-hidden rounded-xl border border-border-default bg-bg-elevated/30">
                {form.resumeFileName ? (
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle px-3 py-2">
                    <p className="text-xs text-fg-muted">
                      Resume: {form.resumeFileName}
                      {form.resumeShareConsent
                        ? ' · shared with sponsors'
                        : ''}
                    </p>
                    {form.resumeStoragePath ? (
                      <ResumeViewButton storagePath={form.resumeStoragePath} />
                    ) : null}
                  </div>
                ) : null}
                {!form.resumeStoragePath ? (
                  <div className="flex min-h-[120px] items-center justify-center px-4 py-6 text-sm text-fg-muted">
                    No resume file on record.
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-fg-muted">No resume provided.</p>
            )}
            <div className="flex flex-wrap gap-4">
              <LinkRow href={form.linkedinUrl} label="LinkedIn" />
              <LinkRow href={form.githubUrl} label="GitHub" />
              <LinkRow href={form.portfolioUrl} label="Portfolio" />
            </div>
          </section>

          <section>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 text-left"
              aria-expanded={detailsOpen}
              onClick={() => setDetailsOpen((v) => !v)}
            >
              <SectionTitle>Details</SectionTitle>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-fg-muted transition-transform',
                  detailsOpen && 'rotate-180',
                )}
                aria-hidden
              />
            </button>
            {detailsOpen ? (
              <dl className="mt-3 grid gap-2 text-sm text-fg-muted">
                <div>
                  <dt>Email</dt>
                  <dd className="text-fg-secondary">{form.email || '—'}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd className="text-fg-secondary">{form.phone || '—'}</dd>
                </div>
                <div>
                  <dt>Full name</dt>
                  <dd className="text-fg-secondary">{form.fullName || '—'}</dd>
                </div>
                <div>
                  <dt>Submitted</dt>
                  <dd className="text-fg-secondary">
                    {new Date(app.submittedAt).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt>Application ID</dt>
                  <dd className="font-mono text-xs text-fg-secondary">{app.id}</dd>
                </div>
              </dl>
            ) : null}
          </section>
        </div>
      </div>
    </article>
  )
}
