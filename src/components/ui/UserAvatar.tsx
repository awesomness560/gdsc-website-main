import { getAvatarColorClass, getInitials } from '#/lib/avatar'
import { cn } from '#/lib/cn'

type UserAvatarSize = 'nav' | 'sm' | 'md'

type UserAvatarProps = {
  name: string
  email?: string
  avatarUrl?: string
  size?: UserAvatarSize
  className?: string
}

const sizeClass: Record<UserAvatarSize, { box: string; text: string }> = {
  nav: { box: 'h-9 w-9 text-[13px]', text: 'font-medium' },
  sm: { box: 'h-8 w-8 text-xs', text: 'font-medium' },
  md: { box: 'h-10 w-10 text-[13px]', text: 'font-medium' },
}

export function UserAvatar({
  name,
  email,
  avatarUrl,
  size = 'md',
  className,
}: UserAvatarProps) {
  const { box, text } = sizeClass[size]

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt=""
        width={40}
        height={40}
        decoding="async"
        referrerPolicy="no-referrer"
        className={cn(box, 'shrink-0 rounded-full object-cover', className)}
      />
    )
  }

  const seed = email?.trim() || name.trim()
  const colorClass = getAvatarColorClass(seed)

  return (
    <span
      aria-hidden
      className={cn(
        box,
        'inline-flex shrink-0 items-center justify-center rounded-full',
        colorClass,
        text,
        'tracking-tight text-white/95',
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}
