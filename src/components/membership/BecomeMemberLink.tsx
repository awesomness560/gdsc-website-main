import { GDG_CHAPTER_URL } from '#/lib/membership'
import { cn } from '#/lib/cn'

type BecomeMemberLinkProps = {
  className?: string
  onClick?: () => void
}

/**
 * Sends people straight to the official GDG chapter page to join.
 * The in-app `/join` flow is paused for launch (see `src/routes/join.tsx`).
 */
export function BecomeMemberLink({
  className,
  onClick,
}: BecomeMemberLinkProps) {
  return (
    <a
      href={GDG_CHAPTER_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={cn(
        'text-sm font-medium text-fg-secondary transition-colors hover:text-fg',
        className,
      )}
    >
      Become a member →
    </a>
  )
}
