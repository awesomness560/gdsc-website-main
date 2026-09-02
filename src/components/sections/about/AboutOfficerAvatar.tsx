import { getAvatarColorClass, getInitials } from '#/lib/avatar'
import { cn } from '#/lib/cn'

type AboutOfficerAvatarProps = {
  name: string
  imageUrl?: string
  size?: 'card' | 'modal'
  className?: string
}

const sizeClass = {
  card: 'h-24 w-24 text-xl',
  modal: 'h-[120px] w-[120px] text-3xl',
} as const

export function AboutOfficerAvatar({
  name,
  imageUrl,
  size = 'card',
  className,
}: AboutOfficerAvatarProps) {
  const box = sizeClass[size]

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn(box, 'rounded-full object-cover', className)}
      />
    )
  }

  return (
    <span
      aria-hidden
      className={cn(
        box,
        'inline-flex items-center justify-center rounded-full font-semibold tracking-tight text-white/95',
        getAvatarColorClass(name),
        className,
      )}
    >
      {getInitials(name)}
    </span>
  )
}
