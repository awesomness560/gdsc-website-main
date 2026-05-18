import type { LeadershipTeam } from '#/types/about'
import { MemberCard } from '#/components/sections/about/MemberCard'

type LeadershipSectionProps = {
  leadership: LeadershipTeam
}

export function LeadershipSection({ leadership }: LeadershipSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <h2 className="text-center text-lg font-bold tracking-tight">President</h2>
      <div className="mt-4 flex justify-center">
        <MemberCard member={leadership.president} />
      </div>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:justify-items-center">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-lg font-bold tracking-tight">
            Vice President
          </h2>
          <div className="mt-4">
            <MemberCard member={leadership.vicePresident} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-center text-lg font-bold tracking-tight">Admin</h2>
          <div className="mt-4">
            <MemberCard member={leadership.admin} />
          </div>
        </div>
      </div>
    </section>
  )
}
