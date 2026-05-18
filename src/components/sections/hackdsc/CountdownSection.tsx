import type { CountdownTime } from '#/types/hackdsc'

type CountdownSectionProps = {
  timeLeft: CountdownTime
}

const units: Array<{ key: keyof CountdownTime; label: string }> = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

export function CountdownSection({ timeLeft }: CountdownSectionProps) {
  return (
    <section
      aria-label="Countdown to event"
      className="mx-auto max-w-3xl px-4 pb-10 sm:pb-12"
    >
      <div className="rounded-2xl border border-border-subtle bg-surface/50 px-4 py-5 sm:px-6 sm:py-6">
        <p className="text-center text-[11px] font-medium tracking-[0.2em] text-fg-muted uppercase">
          Hacking begins in
        </p>

        <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
          {units.map(({ key, label }) => (
            <div key={key} className="text-center">
              <p className="text-2xl font-semibold tracking-tight text-fg tabular-nums sm:text-3xl">
                {timeLeft[key]}
              </p>
              <p className="mt-1 text-[10px] font-medium tracking-wider text-fg-muted uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
