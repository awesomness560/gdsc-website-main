import type { AboutHero } from '#/types/about'
import { GradientText } from '#/components/ui/GradientText'

type AboutHeroSectionProps = AboutHero

export function AboutHeroSection({
  kicker,
  title,
  titleGradient,
  subtitle,
}: AboutHeroSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-10 pb-12 text-center sm:pt-14 sm:pb-16">
      <p className="text-sm font-semibold tracking-[0.18em] text-fg-kicker uppercase">
        {kicker}
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        {title}{' '}
        {titleGradient ? (
          <GradientText as="span">{titleGradient}</GradientText>
        ) : null}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-fg-secondary sm:text-lg">
        {subtitle}
      </p>
    </section>
  )
}
