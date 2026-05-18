import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { dummyLandingData } from '#/data/dummy-landing'
import type { EventStatusFilter } from '#/types/landing'
import {
  EventsSection,
  HeroSection,
  ProgramsSection,
  StatsSection,
} from '#/components/sections'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { hero, stats, eventsSection, events, programsSection, programs } =
    dummyLandingData

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<EventStatusFilter>('All')

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase()
    return events.filter((event) => {
      const matchesSearch =
        query.length === 0 ||
        [event.title, event.type, event.description, event.location].some(
          (field) => field.toLowerCase().includes(query),
        )
      const matchesStatus =
        statusFilter === 'All' ? true : event.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [events, search, statusFilter])

  const eventSummary = useMemo(
    () => ({
      total: events.length,
      upcoming: events.filter((e) => e.status === 'Upcoming').length,
      ongoing: events.filter((e) => e.status === 'Ongoing').length,
    }),
    [events],
  )

  return (
    <main>
      <HeroSection {...hero} />
      <StatsSection stats={stats} />
      <EventsSection
        {...eventsSection}
        events={filteredEvents}
        search={search}
        statusFilter={statusFilter}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
        summary={eventSummary}
      />
      <ProgramsSection {...programsSection} programs={programs} />
    </main>
  )
}
