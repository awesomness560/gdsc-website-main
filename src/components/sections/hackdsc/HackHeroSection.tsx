import { Calendar, MapPin } from 'lucide-react'
import type { ComponentType } from 'react'
import type { HackHero } from '#/types/hackdsc'
import { GradientText } from '#/components/ui/GradientText'

type HackHeroSectionProps = Pick<
  HackHero,
  | 'status'
  | 'titleLines'
  | 'titleAccent'
  | 'titleSuffix'
  | 'subtitle'
  | 'meta'
>

const metaIcons: Record<
  HackHero['meta'][number]['icon'],
  ComponentType<{ className?: string }>
> = {
  calendar: Calendar,
  'map-pin': MapPin,
}

export function HackHeroSection({
  status,
  titleLines,
  titleAccent,
  titleSuffix,
  subtitle,
  meta,
}: HackHeroSectionProps) {
  const statusText = `${status.label} · ${status.highlight}`

  return (
    <section className="mx-auto max-w-4xl px-4 pt-10 pb-4 text-center sm:pt-14 sm:pb-6">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-border-default bg-surface/80 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-fg-secondary uppercase sm:text-sm">
        <span className="h-2 w-2 shrink-0 rounded-full bg-google-blue shadow-[0_0_10px_rgba(66,133,244,0.6)]" />
        {statusText}
      </div>

      <h1 className="mt-6 text-4xl leading-[1] font-extrabold tracking-tight text-fg sm:mt-7 sm:text-5xl lg:text-6xl">
        {titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className="block">
          <GradientText as="span">{titleAccent}</GradientText>{' '}
          <span className="text-fg">{titleSuffix}</span>
        </span>
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary sm:mt-5 sm:text-lg">
        {subtitle}
      </p>

      <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-fg-secondary">
        {meta.map((item) => {
          const Icon = metaIcons[item.icon]
          return (
            <li key={item.text} className="inline-flex items-center gap-1.5">
              <Icon className="h-4 w-4 shrink-0 text-fg-muted" />
              {item.text}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
