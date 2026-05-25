import type { ReactNode } from 'react'
import { getAvatarColorClass, getInitials } from '#/lib/avatar'
import { cn } from '#/lib/cn'

type UserAvatarSize = 'nav' | 'sm' | 'md'

type UserAvatarProps = {
  name: string
  email?: string
  avatarUrl?: string
  size?: UserAvatarSize
  /** 2px Google four-color ring for verified members (nav + presenter cards only). */
  memberRing?: boolean
  className?: string
}

const sizeClass: Record<UserAvatarSize, { box: string; text: string }> = {
  nav: { box: 'h-9 w-9 text-[13px]', text: 'font-medium' },
  sm: { box: 'h-8 w-8 text-xs', text: 'font-medium' },
  md: { box: 'h-10 w-10 text-[13px]', text: 'font-medium' },
}

/** Google subscriber-style ring: blue, red, yellow, green — one quarter each. */
const memberRingClass =
  'bg-[conic-gradient(from_225deg,#4285f4_0deg_90deg,#ea4335_90deg_180deg,#fbbc05_180deg_270deg,#34a853_270deg_360deg)] shadow-[0_0_6px_rgba(66,133,244,0.5),0_0_10px_rgba(234,67,53,0.25),0_0_10px_rgba(251,188,5,0.2),0_0_6px_rgba(52,168,83,0.45)]'

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
