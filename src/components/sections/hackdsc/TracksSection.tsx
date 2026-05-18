import type { HackTrack } from '#/types/hackdsc'
import type { SectionCopy } from '#/types/landing'
import { TrackCard } from '#/components/sections/hackdsc/TrackCard'
import { SectionHeading } from '#/components/ui/SectionHeading'

type TracksSectionProps = SectionCopy & {
  tracks: HackTrack[]
}

export function TracksSection({
  kicker,
  title,
  titleGradient,
  subtitle,
  tracks,
}: TracksSectionProps) {
  return (
    <section className="border-t border-border-subtle bg-bg-elevated/40 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker={kicker}
          title={title}
          titleGradient={titleGradient}
          subtitle={subtitle}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  )
}
