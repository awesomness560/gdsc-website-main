import { cn } from '#/lib/cn'

type MemberPillProps = {
  className?: string
}

export function MemberPill({ className }: MemberPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border-default bg-surface/80 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-fg-secondary uppercase',
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
