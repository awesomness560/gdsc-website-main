import type { ReactNode } from 'react'
import { getAvatarColorClass, getInitials } from '#/lib/avatar'
import { cn } from '#/lib/cn'

type UserAvatarSize = 'nav' | 'sm' | 'md' | 'lg'

type UserAvatarProps = {
  name: string
  email?: string
  avatarUrl?: string
  size?: UserAvatarSize
  /** 2px smooth Google-color ring for verified members (nav + presenter cards only). */
  memberRing?: boolean
  className?: string
}

const sizeClass: Record<UserAvatarSize, { box: string; text: string }> = {
  nav: { box: 'h-9 w-9 text-[13px]', text: 'font-medium' },
  sm: { box: 'h-8 w-8 text-xs', text: 'font-medium' },
  md: { box: 'h-10 w-10 text-[13px]', text: 'font-medium' },
  lg: { box: 'h-16 w-16 text-lg', text: 'font-semibold' },
}

/** Smooth conic blend through Google palette (loops back to blue). */
const memberRingClass =
  'bg-[conic-gradient(from_210deg,#4285f4,#5b9cf5,#ea4335,#f5a623,#fbbc05,#7bc67e,#34a853,#4285f4)] shadow-[0_0_8px_rgba(66,133,244,0.35),0_0_12px_rgba(52,168,83,0.25)]'

export function UserAvatar({
  name,
  email,
  avatarUrl,
  size = 'md',
  memberRing = false,
  className,
}: UserAvatarProps) {
  const { box, text } = sizeClass[size]

  let inner: ReactNode

  if (avatarUrl) {
    inner = (
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
  } else {
    const seed = email?.trim() || name.trim()
    const colorClass = getAvatarColorClass(seed)

    inner = (
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

  if (!memberRing) {
    return inner
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 rounded-full p-[2px]',
        memberRingClass,
      )}
    >
      <span className="inline-flex rounded-full bg-bg-base p-[2px]">{inner}</span>
    </span>
  )
}
