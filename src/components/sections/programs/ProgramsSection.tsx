import type { Program, SectionCopy } from '#/types/landing'
import { ProgramCard } from '#/components/sections/programs/ProgramCard'
import { SectionHeading } from '#/components/ui/SectionHeading'

type ProgramsSectionProps = SectionCopy & {
  programs: Program[]
}

export function ProgramsSection({
  kicker,
  title,
  titleGradient,
  subtitle,
  programs,
}: ProgramsSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker={kicker}
          title={title}
          titleGradient={titleGradient}
          subtitle={subtitle}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  )
}
