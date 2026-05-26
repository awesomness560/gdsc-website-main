import { createFileRoute, Link } from '@tanstack/react-router'
import { CalendarDays, Check, FileText, Users } from 'lucide-react'
import { AccountGetStarted } from '#/components/account'
import { Card } from '#/components/ui/Card'
import { useAuth } from '#/contexts/AuthContext'
import { BecomeMemberLink } from '#/components/membership/BecomeMemberLink'
import { MemberPill } from '#/components/membership/MemberPill'
import { hasHackdscHackathonId } from '#/lib/hackathon-config'
import { useHackathonRegistrationQuery, useMyHackathonSubmissionQuery } from '#/queries/hackathon-submissions'
import { cn } from '#/lib/cn'

export const Route = createFileRoute('/account/')({
  component: AccountOverviewTab,
})

function AccountOverviewTab() {
  const { user } = useAuth()
  const userId = user?.auth.id

  const canShowHackdsc = hasHackdscHackathonId()
  const hackdscSubmissionQuery = useMyHackathonSubmissionQuery(
    userId,
    canShowHackdsc ? undefined : null,
  )
  const hackdscRegistrationQuery = useHackathonRegistrationQuery(
    canShowHackdsc ? undefined : null,
  )

  const hasApplication = Boolean(hackdscSubmissionQuery.data)
  const hasSubmittedApplication =
    hackdscSubmissionQuery.data?.status === 'submitted'
  // RSVP list not wired yet — flip when event_rsvps exists.
  const hasEventRsvps = false

  const showGetStarted = !hasEventRsvps && !hasApplication

  const isOpen = hackdscRegistrationQuery.data?.isOpen ?? false

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="sm:col-span-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-google-green/15">
              <Users className="h-4 w-4 text-google-green" aria-hidden />
            </span>
            <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
              Membership
            </p>
          </div>
          {user?.isVerified ? (
            <>
              <div className="mt-3 inline-flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-google-green/15">
                  <Check className="h-5 w-5 text-google-green" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">Full member</p>
                  <p className="text-xs text-fg-muted">
                    You’re eligible for member-only drops.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <MemberPill />
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm text-fg-secondary">
                Not a member yet. Join to unlock eligibility for HackDSC reviews
                and member perks.
              </p>
              <div className="mt-4">
                <BecomeMemberLink className="font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent" />
              </div>
            </>
          )}
        </Card>

        <Card className="sm:col-span-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15">
              <CalendarDays className="h-4 w-4 text-accent" aria-hidden />
            </span>
            <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
              Upcoming events
            </p>
          </div>
          <p className="mt-3 text-sm text-fg-secondary">
            You haven’t RSVP’d to any upcoming events yet.
          </p>
          <div className="mt-4">
            <Link
              to="/events"
              className="text-sm font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent"
            >
              Browse events →
            </Link>
          </div>
        </Card>

        {canShowHackdsc ? (
          <Card className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-lg',
                  hasApplication ? 'bg-accent/15' : 'bg-surface-raised',
                )}
              >
                <FileText
                  className={cn(
                    'h-4 w-4',
                    hasApplication ? 'text-accent' : 'text-fg-muted',
                  )}
                  aria-hidden
                />
              </span>
              <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
                HackDSC
              </p>
            </div>
            {hasApplication ? (
              <>
                <p className="mt-3 text-sm text-fg-secondary">
                  {hasSubmittedApplication
                    ? 'Your application is submitted and queued for review.'
                    : 'You have a saved draft application.'}
                </p>
                <div className="mt-4">
                  <Link
                    to="/account/hackdsc"
                    className="text-sm font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent"
                  >
                    View application →
                  </Link>
                </div>
              </>
            ) : isOpen ? (
              <>
                <p className="mt-3 text-sm text-fg-secondary">
                  Applications are open.
                </p>
                <div className="mt-4">
                  <Link
                    to="/hackdsc/register"
                    className="text-sm font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent"
                  >
                    Apply now →
                  </Link>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-fg-secondary">
                Applications are closed for now.
              </p>
            )}
          </Card>
        ) : null}
      </div>

      {showGetStarted ? (
        <AccountGetStarted showBecomeMember={!user?.isVerified} />
      ) : null}
    </div>
  )
}
