import type { HackStat } from '#/types/hackdsc'
import { accentTextClass } from '#/lib/accents'
import { Card } from '#/components/ui/Card'

type HackStatsSectionProps = {
  stats: HackStat[]
}

export function HackStatsSection({ stats }: HackStatsSectionProps) {
  return (
    <section className="border-t border-border-subtle py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-sm font-semibold tracking-[0.18em] text-fg-kicker uppercase">
          By the numbers
        </p>
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-fg sm:text-3xl">
          What we&apos;re aiming for this year
        </h2>

        <Card
          className="mt-8 grid grid-cols-2 gap-5 p-5 sm:grid-cols-4 sm:gap-6 sm:p-7"
          variant="default"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${accentTextClass[stat.accent]}`}
              >
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] font-semibold tracking-[0.1em] text-fg-muted uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </Card>
      </div>
    </section>
  )
}
