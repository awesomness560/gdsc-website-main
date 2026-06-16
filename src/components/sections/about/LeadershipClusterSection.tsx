import type { AboutOfficer } from '#/types/about'
import { AboutOfficerCard } from '#/components/sections/about/AboutOfficerCard'

type LeadershipClusterSectionProps = {
  president?: AboutOfficer
  vicePresident?: AboutOfficer
  onSelectOfficer: (officer: AboutOfficer) => void
}

export function LeadershipClusterSection({
  president,
  vicePresident,
  onSelectOfficer,
}: LeadershipClusterSectionProps) {
  if (!president && !vicePresident) return null

  return (
    <section className="mx-auto max-w-6xl px-4 pb-14">
      {president ? (
        <div className="flex flex-col items-center">
          <h2 className="text-center text-lg font-bold tracking-tight text-fg-secondary uppercase">
            President
          </h2>
          <div className="mt-5">
            <AboutOfficerCard officer={president} onSelect={onSelectOfficer} />
          </div>
        </div>
      ) : null}

      {vicePresident ? (
        <div className="mt-12 flex flex-col items-center">
          <h2 className="text-center text-lg font-bold tracking-tight text-fg-secondary uppercase">
            Vice President
          </h2>
          <div className="mt-5">
            <AboutOfficerCard
              officer={vicePresident}
              onSelect={onSelectOfficer}
            />
          </div>
        </div>
      ) : null}
    </section>
  )
}
