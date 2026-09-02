import { createFileRoute } from '@tanstack/react-router'
import { dummyLandingData } from '#/data/dummy-landing'
import { HomeFooter } from '#/components/layout/HomeFooter'
import {
  HeroSection,
  HomeCtaSection,
  ProgramsSection,
  StatsSection,
} from '#/components/sections'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { hero, stats, programsSection, programs } = dummyLandingData

  return (
    <main>
      <HeroSection {...hero} />
      <StatsSection stats={stats} />
      {/* Events feed hidden for launch — restore <HomeEventsSection /> when the Events pages return. */}
      <ProgramsSection {...programsSection} programs={programs} />
      <HomeCtaSection />
      <HomeFooter />
    </main>
  )
}
