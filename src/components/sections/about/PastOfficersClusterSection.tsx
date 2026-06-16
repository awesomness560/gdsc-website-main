import type { AboutOfficer } from '#/types/about'
import { AboutOfficerCard } from '#/components/sections/about/AboutOfficerCard'

type PastOfficersClusterSectionProps = {
  officers: AboutOfficer[]
  onSelectOfficer: (officer: AboutOfficer) => void
}

export function PastOfficersClusterSection({
  officers,
  onSelectOfficer,
}: PastOfficersClusterSectionProps) {
  if (officers.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 pb-20">
      <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
        Past officers
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-4 opacity-80">
        {officers.map((officer) => (
          <AboutOfficerCard
            key={officer.id}
            officer={officer}
            onSelect={onSelectOfficer}
            className="grayscale hover:grayscale-0"
          />
        ))}
      </div>
    </section>
  )
}
