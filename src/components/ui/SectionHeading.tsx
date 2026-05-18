import { GradientText } from '#/components/ui/GradientText'
import { cn } from '#/lib/cn'

type SectionHeadingProps = {
  kicker: string
  title: string
  titleGradient?: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  kicker,
  title,
  titleGradient,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        align === 'center' && 'text-center',
        className,
      )}
    >
      <p className="text-sm font-semibold tracking-[0.18em] text-fg-kicker uppercase">
        {kicker}
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl">
        {title}{' '}
        {titleGradient ? (
          <GradientText as="span">{titleGradient}</GradientText>
        ) : null}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'mt-4 max-w-2xl text-base leading-relaxed text-fg-secondary sm:text-lg',
            align === 'center' && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
