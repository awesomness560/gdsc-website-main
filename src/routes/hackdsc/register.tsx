import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { hasAuthSession } from '#/api/auth'
import { HackMembershipBanner } from '#/components/membership/HackMembershipBanner'
import { dummyHackdscData } from '#/data/dummy-hackdsc'
import { HACKDSC_REGISTER_PATH } from '#/lib/auth-redirect'

export const Route = createFileRoute('/hackdsc/register')({
  beforeLoad: async () => {
    const signedIn = await hasAuthSession()
    if (!signedIn) {
      throw redirect({
        to: '/login',
        search: { redirect: HACKDSC_REGISTER_PATH },
      })
    }
  },
  /** Match auth routes: avoid a pending placeholder flash on this lazy child route. */
  pendingComponent: () => null,
  pendingMs: 500,
  component: HackdscRegisterPage,
})

function HackdscRegisterPage() {
  const { countdownTarget } = dummyHackdscData

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
      <Link
        to="/hackdsc"
        className="text-sm font-medium text-fg-muted transition-colors hover:text-fg-secondary"
      >
        ← Back to HACKDSC
      </Link>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        Apply to HACKDSC
      </h1>
      <p className="mt-3 text-fg-secondary">
        Complete your application below. Review the membership note first if you
        haven&apos;t joined GDG yet.
      </p>
      <HackMembershipBanner
        membershipDeadline={countdownTarget}
        className="mt-8"
      />
      <p className="mt-8 text-sm text-fg-muted">
        Application form coming soon.
      </p>
    </main>
  )
}
