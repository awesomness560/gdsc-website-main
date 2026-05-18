import { createFileRoute } from '@tanstack/react-router'
import { dummyScheduleData } from '#/data/dummy-schedule'
import {
  ScheduleDaySection,
  ScheduleHeroSection,
} from '#/components/sections/schedule'

export const Route = createFileRoute('/hackdsc/schedule')({
  component: SchedulePage,
})

function SchedulePage() {
  const { hero, days } = dummyScheduleData

  return (
    <main className="pb-16">
      <ScheduleHeroSection {...hero} />
      {days.map((day) => (
        <ScheduleDaySection key={day.id} day={day} />
      ))}
    </main>
  )
}
