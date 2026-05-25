import { cn } from '#/lib/cn'

type MemberStatusPillProps = {
  isMember: boolean
  className?: string
}

export function MemberStatusPill({ isMember, className }: MemberStatusPillProps) {
  if (isMember) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border border-google-green/25 bg-google-green/10 px-2.5 py-1 text-[11px] font-semibold text-google-green',
          className,
        )}
      >
        <span
          className="h-1.5 w-1.5 rounded-full bg-google-green shadow-[0_0_8px_rgba(52,168,83,0.75)]"
          aria-hidden
        />
        Member
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex rounded-full border border-border-default bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-fg-muted',
        className,
      )}
    >
      Not member
    </span>
  )
}
