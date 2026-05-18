import { Brain, Code2, Rocket, Target } from 'lucide-react'
import type { ComponentType } from 'react'
import type { HackTrack, HackTrackIcon } from '#/types/hackdsc'
import { accentTextClass } from '#/lib/accents'
import { Card } from '#/components/ui/Card'
import { cn } from '#/lib/cn'

type TrackCardProps = {
  track: HackTrack
}

const icons: Record<
  HackTrackIcon,
  ComponentType<{ className?: string }>
> = {
  brain: Brain,
  rocket: Rocket,
  code: Code2,
  target: Target,
}

const borderAccent = {
  blue: 'border-google-blue/25 bg-google-blue/10',
  red: 'border-google-red/25 bg-google-red/10',
  yellow: 'border-google-yellow/25 bg-google-yellow/10',
  green: 'border-google-green/25 bg-google-green/10',
} as const

export function TrackCard({ track }: TrackCardProps) {
  const Icon = icons[track.icon]

  return (
    <Card hover variant="elevated" className="h-full">
      <div
        className={cn(
          'mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border',
          borderAccent[track.accent],
          accentTextClass[track.accent],
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-bold tracking-tight">{track.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
        {track.description}
      </p>
    </Card>
  )
}
