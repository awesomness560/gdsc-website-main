import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '#/components/ui/Button'
import { GradientText } from '#/components/ui/GradientText'
import { GDG_CHAPTER_URL, MEMBERSHIP_CONTACT_EMAIL } from '#/lib/membership'

export function HomeCtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-3xl border border-border-default bg-surface/60 px-6 py-12 text-center sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <p className="text-sm font-semibold tracking-[0.18em] text-fg-kicker uppercase">
          Get involved
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          Come build something with <GradientText as="span">GDG.</GradientText>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fg-secondary sm:text-lg">
          Membership is free and open to every major. Join the chapter, show up
          to a workshop or project night, and meet the rest of the club.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            href={GDG_CHAPTER_URL}
            icon={<ArrowUpRight className="h-4 w-4" />}
          >
            Join GDG
          </Button>
          <Button
            href="/about"
            variant="secondary"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Meet the team
          </Button>
        </div>

        <p className="mt-6 text-sm text-fg-muted">
          Questions?{' '}
          <a
            href={`mailto:${MEMBERSHIP_CONTACT_EMAIL}`}
            className="font-medium text-fg-secondary hover:text-fg"
          >
            {MEMBERSHIP_CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  )
}
