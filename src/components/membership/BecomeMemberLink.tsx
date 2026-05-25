import { Link } from '@tanstack/react-router'
import { JOIN_PAGE_PATH } from '#/lib/membership'
import { cn } from '#/lib/cn'

type BecomeMemberLinkProps = {
  className?: string
  onClick?: () => void
}

export function BecomeMemberLink({ className, onClick }: BecomeMemberLinkProps) {
  return (
    <Link
      to={JOIN_PAGE_PATH}
      onClick={onClick}
      className={cn(
        'text-sm font-medium text-fg-secondary transition-colors hover:text-fg',
        className,
      )}
    >
      Become a member →
    </Link>
  )
}
