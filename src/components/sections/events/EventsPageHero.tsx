import type { EventsPageHero as EventsPageHeroData } from '#/types/events'

type EventsPageHeroProps = EventsPageHeroData

export function EventsPageHero({ badge, title, subtitle }: EventsPageHeroProps) {
  return (
    <section className="mx-auto max-w-2xl px-4 pt-8 pb-6 text-center sm:pt-10 sm:pb-8">
      <p className="inline-flex items-center rounded-full border border-border-default bg-surface/80 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-fg-secondary uppercase">
        {badge}
      </p>
      <h1 className="mt-4 text-2xl font-medium tracking-tight text-fg sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-fg-secondary sm:text-base">{subtitle}</p>
    </section>
  )
}
