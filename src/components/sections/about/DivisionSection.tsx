import type { Division } from '#/types/about'
import { MemberCard } from '#/components/sections/about/MemberCard'

type DivisionSectionProps = {
  division: Division
}

export function DivisionSection({ division }: DivisionSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {division.title}
      </h2>

      <div className="mt-6 flex justify-center">
        <MemberCard member={division.director} />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {division.officers.map((officer) => (
          <MemberCard key={officer.id} member={officer} />
        ))}
      </div>
    </section>
  )
}
