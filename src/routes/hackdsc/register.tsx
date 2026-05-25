import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { hasAuthSession } from '#/api/auth'
import { HackdscRegisterForm } from '#/components/hackdsc/register'
import { HackMembershipBanner } from '#/components/membership/HackMembershipBanner'
import { HACKDSC_REGISTER_EVENT } from '#/data/hackdsc-registration'
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
  pendingComponent: () => null,
  pendingMs: 500,
  component: HackdscRegisterPage,
})

function HackdscRegisterPage() {
  const { countdownTarget } = dummyHackdscData

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-[600px] flex-col px-4 pt-8 pb-0 sm:pt-10 sm:pb-6">
      <Link
        to="/hackdsc"
        className="text-sm font-medium text-fg-muted transition-colors hover:text-fg-secondary"
      >
        ← Back to HackDSC
      </Link>

      <p className="mt-6 text-sm text-fg-secondary">
        <span className="font-medium text-fg">{HACKDSC_REGISTER_EVENT.name}</span>
        {' · '}
        {HACKDSC_REGISTER_EVENT.tagline}
      </p>

      <HackMembershipBanner
        membershipDeadline={countdownTarget}
        className="mt-6"
      />

      <div className="mt-8 flex flex-1 flex-col">
        <HackdscRegisterForm />
      </div>
    </main>
  )
}
