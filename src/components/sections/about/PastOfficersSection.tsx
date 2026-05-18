import type { TeamMember } from '#/types/about'
import { MemberCard } from '#/components/sections/about/MemberCard'

type PastOfficersSectionProps = {
  officers: TeamMember[]
}

export function PastOfficersSection({ officers }: PastOfficersSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 pb-20">
      <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
        Past officers
      </h2>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {officers.map((officer) => (
          <MemberCard key={officer.id} member={officer} />
        ))}
      </div>
    </section>
  )
}
