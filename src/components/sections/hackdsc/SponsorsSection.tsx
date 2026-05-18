import type { HackSponsor } from '#/types/hackdsc'
import { SponsorCard } from '#/components/sections/hackdsc/SponsorCard'
import { SectionHeading } from '#/components/ui/SectionHeading'

type SponsorsSectionProps = {
  kicker: string
  title: string
  subtitle?: string
  sponsors: HackSponsor[]
}

export function SponsorsSection({
  kicker,
  title,
  subtitle,
  sponsors,
}: SponsorsSectionProps) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker={kicker}
          title={title}
          subtitle={subtitle}
          align="center"
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  )
}
