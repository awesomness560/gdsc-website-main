import { createFileRoute, Link } from '@tanstack/react-router'
import { CalendarClock } from 'lucide-react'
import { Button } from '#/components/ui/Button'
import { GradientText } from '#/components/ui/GradientText'

export const Route = createFileRoute('/hackdsc/schedule')({
  component: SchedulePage,
})

function SchedulePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-4xl flex-col items-center px-4 pt-10 pb-16 text-center sm:pt-14">
      <Link
        to="/hackdsc"
        className="self-start text-sm font-medium text-fg-muted transition-colors hover:text-fg-secondary"
      >
        ← Back to HackDSC
      </Link>

      <div className="mt-16 flex max-w-lg flex-col items-center sm:mt-20">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-surface-raised text-fg-secondary">
          <CalendarClock className="h-7 w-7" aria-hidden />
        </div>

        <p className="mt-8 text-sm font-semibold tracking-[0.18em] text-fg-kicker uppercase">
          HackDSC 2026
        </p>
        <h1 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-fg sm:text-5xl">
          Schedule{' '}
          <GradientText as="span">coming soon</GradientText>
        </h1>
        <p className="mt-5 max-w-md text-base text-fg-secondary sm:text-lg">
          We&apos;re finalizing workshops, meals, and key events. Check back
          closer to the hackathon for the full weekend timeline.
        </p>

        <Button href="/hackdsc" className="mt-8">
          Back to overview
        </Button>
      </div>
    </main>
  )
}
