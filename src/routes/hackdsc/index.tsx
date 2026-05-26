import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { HACKDSC_REGISTER_PATH } from '#/lib/auth-redirect'
import { dummyHackdscData } from '#/data/dummy-hackdsc'
import type { CountdownTime } from '#/types/hackdsc'
import { getCountdownTime } from '#/lib/countdown'
import { useAuth } from '#/contexts/AuthContext'
import { hasHackdscHackathonId } from '#/lib/hackathon-config'
import { useMyHackathonSubmissionQuery } from '#/queries/hackathon-submissions'
import { cn } from '#/lib/cn'
import {
  CountdownSection,
  FaqSection,
  HackHeroActions,
  HackHeroSection,
  HackStatsSection,
  SponsorsSection,
  TracksSection,
} from '#/components/sections/hackdsc'

export const Route = createFileRoute('/hackdsc/')({
  component: HackdscPage,
})

function HackdscPage() {
  const router = useRouter()
  const { user } = useAuth()
  const canCheckSubmission = hasHackdscHackathonId()
  const submissionQuery = useMyHackathonSubmissionQuery(
    user?.auth.id,
    canCheckSubmission ? undefined : null,
  )
  const hasSubmission = Boolean(submissionQuery.data)

  useEffect(() => {
    void router.preloadRoute({ to: HACKDSC_REGISTER_PATH })
  }, [router])

  const {
    countdownTarget,
    hero,
    stats,
    tracksSection,
    tracks,
    sponsorsSection,
    sponsors,
    faqSection,
    faq,
  } = dummyHackdscData

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    getCountdownTime(countdownTarget),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdownTime(countdownTarget))
    }, 1000)
    return () => clearInterval(timer)
  }, [countdownTarget])

  return (
    <main>
      <HackHeroSection
        status={hero.status}
        titleLines={hero.titleLines}
        titleAccent={hero.titleAccent}
        titleSuffix={hero.titleSuffix}
        subtitle={hero.subtitle}
        meta={hero.meta}
      />
      {hasSubmission ? (
        <section className="mx-auto max-w-4xl px-4 pb-3 text-center sm:pb-4">
          <div
            className={cn(
              'rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-fg-secondary',
            )}
          >
            <span className="font-medium text-fg">✓ You’ve applied.</span>{' '}
            View and manage your application in{' '}
            <Link
              to="/account/hackdsc"
              className="font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent"
            >
              My account
            </Link>
            .
          </div>
        </section>
      ) : null}
      <HackHeroActions
        primaryCta={
          hasSubmission
            ? { label: 'View application', href: '/account/hackdsc' }
            : hero.primaryCta
        }
        secondaryCta={hero.secondaryCta}
      />
      <CountdownSection timeLeft={timeLeft} />
      <TracksSection {...tracksSection} tracks={tracks} />
      <HackStatsSection stats={stats} />
      <SponsorsSection {...sponsorsSection} sponsors={sponsors} />
      <FaqSection {...faqSection} items={faq} />
    </main>
  )
}
