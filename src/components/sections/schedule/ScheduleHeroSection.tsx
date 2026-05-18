import type { ScheduleHero } from '#/types/schedule'
import { GradientText } from '#/components/ui/GradientText'

type ScheduleHeroSectionProps = ScheduleHero

export function ScheduleHeroSection({
  kicker,
  title,
  titleGradient,
  titleGradientLine2,
  subtitle,
}: ScheduleHeroSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-10 pb-6 text-center sm:pt-14 sm:pb-8">
      <p className="text-sm font-semibold tracking-[0.18em] text-fg-kicker uppercase">
        {kicker}
      </p>
      <h1 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-fg sm:text-5xl lg:text-6xl">
        {title}{' '}
        <GradientText as="span">{titleGradient}</GradientText>
        {titleGradientLine2 ? (
          <>
            <br />
            <GradientText as="span">{titleGradientLine2}</GradientText>
          </>
        ) : null}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-fg-secondary sm:text-lg">
        {subtitle}
      </p>
    </section>
  )
}
