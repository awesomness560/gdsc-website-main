import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Check } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '#/contexts/AuthContext'
import { MemberPill } from '#/components/membership/MemberPill'
import { Button } from '#/components/ui/Button'
import {
  GDG_CHAPTER_URL,
  hasClaimedMembership,
  MEMBERSHIP_CONTACT_EMAIL,
  recordMembershipClaim,
} from '#/lib/membership'

export const Route = createFileRoute('/join')({
  component: JoinPage,
})

const benefits = [
  'Full HACKDSC application eligibility after roster sync',
  'Access to member resources, swag drops, and priority announcements',
  'Connect with builders across all four GDG divisions',
  'Workshops, project nights, and industry talks with the club',
]

function JoinPage() {
  const { isMember, user } = useAuth()
  const [claimed, setClaimed] = useState(() => hasClaimedMembership())
  const siteEmail = user?.auth.email?.trim()

  if (isMember) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <MemberPill className="mb-4" />
        <h1 className="text-3xl font-bold tracking-tight text-fg">
          You&apos;re a member
        </h1>
        <p className="mt-3 text-fg-secondary">
          Your account is verified. Your HACKDSC application is eligible for
          review.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
        >
          Back to home →
        </Link>
      </main>
    )
  }

  if (claimed) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-google-green/15">
          <Check className="h-5 w-5 text-google-green" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-fg">
          Thanks — we&apos;ll sync your status soon
        </h1>
        <p className="mt-3 leading-relaxed text-fg-secondary">
          Membership rosters sync every few days. Your status will update
          automatically once we process the next sync. No action needed from you
          after this.
        </p>
        <p className="mt-4 text-sm text-fg-muted">
          If it&apos;s been more than a week since you joined the official GDG
          page, email{' '}
          <a
            href={`mailto:${MEMBERSHIP_CONTACT_EMAIL}`}
            className="font-medium text-fg-secondary hover:text-fg"
          >
            {MEMBERSHIP_CONTACT_EMAIL}
          </a>
          .
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
        >
          Back to home →
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        Become a GDG member
      </h1>
      <p className="mt-3 text-lg text-fg-secondary">
        Official membership is free. Complete both steps below so we can verify
        you on the next roster sync.
      </p>

      <ul className="mt-8 space-y-3 text-sm text-fg-secondary">
        {benefits.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-google-green" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <ol className="mt-10 space-y-8">
        <li className="rounded-2xl border border-border-default bg-surface/50 p-5">
          <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
            Step 1
          </p>
          <p className="mt-2 font-medium text-fg">Join the official Google GDG page</p>
          <p className="mt-1 text-sm text-fg-secondary">
            Sign up on Google Developers with the email on your site account
            {siteEmail ? (
              <>
                {' '}
                (<span className="font-medium text-fg">{siteEmail}</span>)
              </>
            ) : (
              ' (the one you used to sign in here)'
            )}
            . A different email won&apos;t sync correctly.
          </p>
          <Button
            href={GDG_CHAPTER_URL}
            variant="secondary"
            className="mt-4 h-11"
            icon={<ArrowUpRight className="h-4 w-4" />}
          >
            Open GDG chapter page
          </Button>
        </li>

        <li className="rounded-2xl border border-border-default bg-surface/50 p-5">
          <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
            Step 2
          </p>
          <p className="mt-2 font-medium text-fg">Confirm here on our site</p>
          <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
            After you&apos;ve joined the official page, let us know. Membership
            rosters sync every few days. Your status will update automatically
            once we process the next sync.
          </p>
          <button
            type="button"
            onClick={() => {
              recordMembershipClaim()
              setClaimed(true)
            }}
            className="mt-4 inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-2xl bg-accent px-5 text-sm font-semibold text-accent-fg shadow-[0_12px_32px_rgba(74,140,255,0.28)] transition-colors hover:bg-accent-hover sm:w-auto"
          >
            I&apos;ve joined
          </button>
        </li>
      </ol>
    </main>
  )
}
