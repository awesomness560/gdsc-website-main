import type { CSSProperties } from 'react'
import type { EventType } from '#/types/events'
import { cn } from '#/lib/cn'

export function eventTypeLabel(type: EventType) {
  return type.label
}

export function eventTypeChipStyle(type: EventType, isActive: boolean): CSSProperties | undefined {
  if (!isActive) return undefined
  return {
    color: type.colors.text,
    backgroundColor: type.colors.background,
    borderColor: type.colors.border,
  }
}

/** Filter row chips on the events list page. */
export function eventTypeChipClassName(isActive: boolean) {
  return cn(
    'h-9 shrink-0 rounded-full border px-3.5 text-xs font-medium transition-colors sm:text-sm',
    isActive
      ? ''
      : 'border-border-default text-fg-secondary hover:border-border-strong hover:text-fg',
  )
}

/** Compact category pill on event cards and related links. */
export function eventTypeCardChipClassName() {
  return cn(
    'inline-flex w-fit items-center rounded-full border px-2 py-0.5',
    'text-[10px] font-semibold leading-none tracking-wide uppercase',
  )
}

export function eventTypeTextStyle(type: EventType): CSSProperties {
  return { color: type.colors.text }
}

export function eventTypeMutedStyle(type: EventType): CSSProperties {
  return { color: type.colors.muted ?? type.colors.text }
}
