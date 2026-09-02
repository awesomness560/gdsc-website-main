import { createFileRoute } from '@tanstack/react-router'
import { Check, Users } from 'lucide-react'
import { MembershipPromptBanner } from '#/components/account'
import { Card } from '#/components/ui/Card'
import { useAuth } from '#/contexts/AuthContext'
import { MemberPill } from '#/components/membership/MemberPill'

export const Route = createFileRoute('/account/')({
  component: AccountOverviewTab,
})

/**
 * Trimmed for launch: the Events and HackDSC cards / "Get started" chips are
 * hidden while those pages are paused. See git history for the fuller version.
 */
function AccountOverviewTab() {
  const { user } = useAuth()
  const isMember = user?.isVerified ?? false

  const memberJoinedLabel = user?.profile?.created_at
    ? new Date(user.profile.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null

  return (
    <div className="space-y-6">
      {!isMember ? <MembershipPromptBanner /> : null}

      {isMember ? (
        <Card className="sm:max-w-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-google-green/15">
              <Users className="h-4 w-4 text-google-green" aria-hidden />
            </span>
            <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
              Membership
            </p>
          </div>
          <div className="mt-3 inline-flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-google-green/15">
              <Check className="h-5 w-5 text-google-green" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-fg">Full member</p>
              {memberJoinedLabel ? (
                <p className="text-xs text-fg-muted">Joined {memberJoinedLabel}</p>
              ) : (
                <p className="text-xs text-fg-muted">
                  You&apos;re eligible for member-only perks.
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <MemberPill />
          </div>
        </Card>
      ) : null}
    </div>
  )
}
