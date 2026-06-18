import { ChevronRight } from 'lucide-react'
import { OfficerRoleBadge } from '#/components/admin/team/OfficerRoleBadge'
import { AboutOfficerAvatar } from '#/components/sections/about/AboutOfficerAvatar'
import { isLeadershipOrDirectorRole } from '#/data/officer-roles'
import { useOfficerAccentColor } from '#/hooks/use-officer-accent-color'
import { accentGlowStyle } from '#/lib/officer-accent-color'
import type { AboutOfficer } from '#/types/about'
import { cn } from '#/lib/cn'

const cardShellClass =
  'relative flex w-[200px] shrink-0 flex-col items-center rounded-2xl border border-border-default bg-surface p-4 text-center'

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
  const showColoredRole = isLeadershipOrDirectorRole(officer.roleId)

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

      <h3 className="mt-4 line-clamp-2 w-full text-base font-bold leading-snug tracking-tight text-fg">
        {officer.name}
      </h3>

      <OfficerRoleBadge
        roleId={officer.roleId}
        muted={!showColoredRole}
        className="mt-2 max-w-full whitespace-normal text-center leading-tight"
      />

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
          cardShellClass,
          'shadow-[0_8px_28px_rgba(0,0,0,0.12)]',
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
        cardShellClass,
        'group transition-[transform,border-color,box-shadow] duration-200',
        'cursor-pointer hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        className,
      )}
    >
      {content}
    </button>
  )
}
