import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { dummyHackdscData } from '#/data/dummy-hackdsc'
import type { CountdownTime } from '#/types/hackdsc'
import { getCountdownTime } from '#/lib/countdown'
import {
  CountdownSection,
  FaqSection,
  HackHeroActions,
  HackHeroSection,
  HackStatsSection,
  SponsorsSection,
  TracksSection,
} from '#/components/sections/hackdsc'

export const Route = createFileRoute('/hackdsc')({
  component: HackdscPage,
})

function HackdscPage() {
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
      <HackHeroActions
        primaryCta={hero.primaryCta}
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
