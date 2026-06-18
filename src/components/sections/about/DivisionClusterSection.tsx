import type { AboutDivisionCluster, AboutOfficer } from '#/types/about'
import { AboutOfficerCard } from '#/components/sections/about/AboutOfficerCard'

type DivisionClusterSectionProps = {
  division: AboutDivisionCluster
  onSelectOfficer: (officer: AboutOfficer) => void
}

export function DivisionClusterSection({
  division,
  onSelectOfficer,
}: DivisionClusterSectionProps) {
  const hasDirector = Boolean(division.director)
  const hasOfficers = division.officers.length > 0

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {division.title}
      </h2>

      {hasDirector ? (
        <div className="mt-8 flex justify-center">
          <AboutOfficerCard
            officer={division.director!}
            onSelect={onSelectOfficer}
          />
        </div>
      ) : null}

      {hasOfficers ? (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {division.officers.map((officer) => (
            <AboutOfficerCard
              key={officer.id}
              officer={officer}
              onSelect={onSelectOfficer}
            />
          ))}
        </div>
      ) : null}

      {!hasDirector && !hasOfficers ? null : null}
    </section>
  )
}
