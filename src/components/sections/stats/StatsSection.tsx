import type { Stat } from '#/types/landing'
import { accentTextClass } from '#/lib/accents'
import { Card } from '#/components/ui/Card'

type StatsSectionProps = {
  stats: Stat[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <Card className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-4 sm:p-8" variant="elevated">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p
              className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${accentTextClass[stat.accent]}`}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </Card>
    </section>
  )
}
