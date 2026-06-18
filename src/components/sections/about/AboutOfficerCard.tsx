import { ChevronRight } from 'lucide-react'
import { AboutOfficerAvatar } from '#/components/sections/about/AboutOfficerAvatar'
import { useOfficerAccentColor } from '#/hooks/use-officer-accent-color'
import { accentGlowStyle } from '#/lib/officer-accent-color'
import type { AboutOfficer } from '#/types/about'
import { cn } from '#/lib/cn'

type AboutOfficerCardProps = {
  officer: AboutOfficer
  onSelect?: (officer: AboutOfficer) => void
  /** Static preview for the officer profile editor — always shows glow. */
  preview?: boolean
  className?: string
}

export function AboutOfficerCard({
  officer,
  onSelect,
  preview = false,
  className,
}: AboutOfficerCardProps) {
  const accentColor = useOfficerAccentColor(officer.name, officer.imageUrl)
  const hoverGlow = accentGlowStyle(accentColor, 'subtle')

  const content = (
    <>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-8 h-24 w-24 scale-110 rounded-full blur-xl transition-opacity duration-200',
          preview ? 'opacity-60' : 'opacity-0 group-hover:opacity-60',
        )}
        style={hoverGlow}
      />

      <AboutOfficerAvatar name={officer.name} imageUrl={officer.imageUrl} />

      <h3 className="mt-4 text-base font-bold tracking-tight text-fg">
        {officer.name}
      </h3>
      <p className="mt-1 text-sm text-fg-secondary">{officer.roleLabel}</p>

      {!preview ? (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-fg-muted transition-colors group-hover:text-accent lg:hidden">
          View bio
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      ) : null}
    </>
  )

  if (preview) {
    return (
      <div
        className={cn(
          'relative flex w-full max-w-[200px] flex-col items-center rounded-2xl border border-border-default bg-surface p-4 text-center shadow-[0_8px_28px_rgba(0,0,0,0.12)]',
          className,
        )}
      >
        {content}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onSelect?.(officer)}
      className={cn(
        'group relative flex w-full max-w-[200px] flex-col items-center rounded-2xl border border-border-default bg-surface p-4 text-center transition-[transform,border-color,box-shadow] duration-200',
        'cursor-pointer hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        className,
      )}
    >
      {content}
    </button>
  )
}
