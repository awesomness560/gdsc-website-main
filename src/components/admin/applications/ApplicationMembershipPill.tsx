import { cn } from '#/lib/cn'

type ApplicationMembershipPillProps = {
  isMember: boolean
  className?: string
}

export function ApplicationMembershipPill({
  isMember,
  className,
}: ApplicationMembershipPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium',
        isMember ? 'text-google-green' : 'text-google-yellow',
        className,
      )}
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          isMember
            ? 'bg-google-green shadow-[0_0_8px_rgba(52,168,83,0.75)]'
            : 'bg-google-yellow',
        )}
        aria-hidden
      />
      {isMember ? 'Member' : 'Non-member'}
    </span>
  )
}
