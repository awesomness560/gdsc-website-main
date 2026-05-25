import { useState } from 'react'
import type { EventType } from '#/types/events'
import type { MediaPlaceholderProps } from '#/components/ui/MediaPlaceholder'
import { MediaPlaceholder } from '#/components/ui/MediaPlaceholder'
import { cn } from '#/lib/cn'

type MediaFrameProps = {
  src?: string | null
  alt?: string
  seed: string
  eventType?: EventType
  loading?: boolean
  className?: string
  imageClassName?: string
  placeholderClassName?: string
  placeholderProps?: Omit<
    MediaPlaceholderProps,
    'seed' | 'eventType' | 'className' | 'aria-label' | 'state'
  >
}

export function MediaFrame({
  src,
  alt = '',
  seed,
  eventType,
  loading = false,
  className,
  imageClassName,
  placeholderClassName,
  placeholderProps,
}: MediaFrameProps) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed

  if (showPlaceholder || loading) {
    return (
      <MediaPlaceholder
        seed={seed}
        eventType={eventType}
        state={loading ? 'loading' : 'static'}
        className={cn(className, placeholderClassName)}
        aria-label={alt || 'Placeholder image'}
        {...placeholderProps}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-cover', className, imageClassName)}
      onError={() => setFailed(true)}
    />
  )
}
