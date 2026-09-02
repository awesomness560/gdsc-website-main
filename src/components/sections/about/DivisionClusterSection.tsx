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
  const directors = division.directors?.length
    ? division.directors
    : division.director
      ? [division.director]
      : []
  const hasDirectors = directors.length > 0
  const hasOfficers = division.officers.length > 0

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {division.title}
      </h2>

      {hasDirectors ? (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {directors.map((director) => (
            <AboutOfficerCard
              key={director.id}
              officer={director}
              onSelect={onSelectOfficer}
            />
          ))}
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
    </section>
  )
}
