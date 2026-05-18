import { ArrowRight } from 'lucide-react'
import type { HackHero } from '#/types/hackdsc'
import { Button } from '#/components/ui/Button'

type HackHeroActionsProps = Pick<HackHero, 'primaryCta' | 'secondaryCta'>

export function HackHeroActions({
  primaryCta,
  secondaryCta,
}: HackHeroActionsProps) {
  return (
    <section
      id="register"
      className="mx-auto max-w-4xl px-4 pb-6 text-center sm:pb-8"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
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
    </section>
  )
}
