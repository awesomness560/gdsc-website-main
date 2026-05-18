import { createFileRoute } from '@tanstack/react-router'
import { dummyAboutData } from '#/data/dummy-about'
import {
  AboutHeroSection,
  DivisionSection,
  LeadershipSection,
  PastOfficersSection,
} from '#/components/sections/about'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  const { hero, leadership, divisions, pastOfficers } = dummyAboutData

  return (
    <main>
      <AboutHeroSection {...hero} />
      <LeadershipSection leadership={leadership} />
      {divisions.map((division) => (
        <DivisionSection key={division.id} division={division} />
      ))}
      <PastOfficersSection officers={pastOfficers} />
    </main>
  )
}
