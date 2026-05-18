import type { HackSponsor } from '#/types/hackdsc'
import { Card } from '#/components/ui/Card'

type SponsorCardProps = {
  sponsor: HackSponsor
}

export function SponsorCard({ sponsor }: SponsorCardProps) {
  return (
    <Card
      hover
      variant="inset"
      className="flex flex-col items-center justify-center py-6 text-center"
    >
      <span className="text-2xl font-extrabold tracking-tight text-fg-secondary">
        {sponsor.initials}
      </span>
      <span className="mt-2 text-sm font-medium text-fg-muted">{sponsor.name}</span>
    </Card>
  )
}
