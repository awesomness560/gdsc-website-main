import { ArrowRight, MapPin, Sparkles } from 'lucide-react'
import type { ComponentType } from 'react'
import type { HeroContent, HeroMetaIcon } from '#/types/landing'
import { Button } from '#/components/ui/Button'
import { GradientText } from '#/components/ui/GradientText'

type HeroSectionProps = HeroContent

const metaIcons: Record<HeroMetaIcon, ComponentType<{ className?: string }>> = {
  'map-pin': MapPin,
  sparkles: Sparkles,
}

export function HeroSection({
  statusLabel,
  titleLines,
  titleGradient,
  subtitle,
  primaryCta,
  secondaryCta,
  meta,
}: HeroSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-16 pb-20 text-center sm:pt-20 sm:pb-24">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-border-default bg-surface/80 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-fg-secondary uppercase">
        <span className="h-2 w-2 rounded-full bg-google-green shadow-[0_0_10px_rgba(52,168,83,0.8)]" />
        {statusLabel}
      </div>

      <h1 className="mt-8 text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
        {titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <GradientText as="span" className="block">
          {titleGradient}
        </GradientText>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-secondary">
        {subtitle}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          href={primaryCta.href}
          icon={<ArrowRight className="h-4 w-4" />}
        >
          {primaryCta.label}
        </Button>
        <Button href={secondaryCta.href} variant="secondary">
          {secondaryCta.label}
        </Button>
      </div>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fg-secondary">
        {meta.map((item) => {
          const Icon = metaIcons[item.icon]
          return (
            <li key={item.text} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-fg-muted" />
              {item.text}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
