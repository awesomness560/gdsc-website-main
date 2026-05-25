import { createFileRoute } from '@tanstack/react-router'
import { dummyEventsData } from '#/data/dummy-events'
import { dummyLandingData } from '#/data/dummy-landing'
import {
  HomeEventsSection,
  HeroSection,
  ProgramsSection,
  StatsSection,
} from '#/components/sections'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { hero, stats, eventsSection, programsSection, programs } = dummyLandingData
  const { events } = dummyEventsData

  return (
    <main>
      <HeroSection {...hero} />
      <StatsSection stats={stats} />
      <HomeEventsSection {...eventsSection} events={events} />
      <ProgramsSection {...programsSection} programs={programs} />
    </main>
  )
}
