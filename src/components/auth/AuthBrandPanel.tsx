import { cn } from '#/lib/cn'

const statPills = [
  { value: '2020', label: 'Founded' },
  { value: '4', label: 'Divisions' },
  { value: '1', label: 'Flagship Hackathon' },
] as const

type AuthBrandPanelProps = {
  variant: 'desktop' | 'mobile'
}

function BrandMark({ logoClassName }: { logoClassName: string }) {
  return (
    <>
      <img
        src="/gdsc-icon.png"
        alt=""
        width={120}
        height={120}
        decoding="async"
        className={logoClassName}
      />
      <p className="mt-5 text-2xl font-bold tracking-tight text-fg">GDSC</p>
    </>
  )
}

function AmbientGlows({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-[18%] left-[8%] h-56 w-56 rounded-full bg-google-blue/18 blur-3xl" />
      <div className="absolute right-[6%] bottom-[20%] h-48 w-48 rounded-full bg-[rgba(147,51,234,0.14)] blur-3xl" />
      <div className="absolute top-[55%] left-[35%] h-40 w-40 rounded-full bg-google-yellow/10 blur-3xl" />
    </div>
  )
}

export function AuthBrandPanel({ variant }: AuthBrandPanelProps) {
  if (variant === 'mobile') {
    return (
      <div className="relative shrink-0 overflow-hidden border-b border-border-subtle bg-bg-base px-4 py-8 sm:py-10 lg:hidden">
        <AmbientGlows />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-google-blue/25 via-30% via-google-yellow/20 via-55% via-google-green/20 to-transparent opacity-80"
        />
        <div className="relative flex flex-col items-center text-center">
          <BrandMark logoClassName="h-11 w-11 rounded-xl object-contain sm:h-12 sm:w-12" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'auth-brand-panel relative z-0 hidden min-h-0 shrink-0 overflow-hidden lg:flex',
        'bg-page-gradient',
      )}
    >
      <AmbientGlows />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32"
        style={{
          background:
            'linear-gradient(102deg, transparent 0%, rgba(66,133,244,0.14) 30%, rgba(251,188,5,0.1) 55%, rgba(52,168,83,0.1) 80%, transparent 100%)',
          filter: 'blur(24px)',
          opacity: 0.6,
        }}
      />

      <div className="relative z-20 flex flex-1 flex-col justify-center px-12 xl:px-16">
        <div className="max-w-md pl-[4%]">
          <BrandMark logoClassName="h-[7.5rem] w-[7.5rem] rounded-2xl object-contain" />
          <p className="mt-4 text-lg text-fg-secondary">Build with us.</p>

          <ul className="mt-10 flex flex-wrap gap-2">
            {statPills.map((pill) => (
              <li
                key={pill.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle/80 bg-surface/40 px-3 py-1.5 text-[11px] text-fg-muted"
              >
                <span className="font-semibold text-fg-secondary/90">
                  {pill.value}
                </span>
                <span className="text-fg-muted/80">· {pill.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
