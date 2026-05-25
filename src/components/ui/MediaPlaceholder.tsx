import { Braces, Mic, RefreshCw, Sparkles, Wrench } from 'lucide-react'
import type { ComponentType } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { EventType } from '#/types/events'
import { getPlaceholderBackground } from '#/lib/placeholder-gradient'
import { cn } from '#/lib/cn'

export type PlaceholderVariantMode = 'seeded' | 'generated'

/** Optional slug → icon map; unknown slugs fall back to GDSC mark. */
const SLUG_GLYPHS: Record<string, ComponentType<{ className?: string }>> = {
  workshop: Wrench,
  'industry-talk': Mic,
  'project-night': Braces,
  social: Sparkles,
}

export type MediaPlaceholderProps = {
  seed: string
  eventType?: EventType
  variant?: PlaceholderVariantMode
  state?: 'static' | 'loading'
  glyph?: 'category' | 'gdsc' | 'none'
  className?: string
  showVariantToggle?: boolean
  'aria-label'?: string
}

function GdscMark({ className }: { className?: string }) {
  return (
    <img
      src="/gdsc-icon.png"
      alt=""
      className={cn('object-contain opacity-[0.22]', className)}
      draggable={false}
    />
  )
}

export function MediaPlaceholder({
  seed,
  eventType,
  variant: variantProp = 'seeded',
  state = 'static',
  glyph,
  className,
  showVariantToggle = false,
  'aria-label': ariaLabel = 'Placeholder image',
}: MediaPlaceholderProps) {
  const [mode, setMode] = useState<PlaceholderVariantMode>(variantProp)
  const [generatedNonce, setGeneratedNonce] = useState(0)

  useEffect(() => {
    setMode(variantProp)
  }, [variantProp])

  const effectiveSeed = mode === 'seeded' ? seed : `${seed}-gen-${generatedNonce}`

  const backgroundStyle = useMemo(
    () => getPlaceholderBackground(effectiveSeed, eventType).background,
    [effectiveSeed, eventType],
  )

  const Glyph = eventType ? SLUG_GLYPHS[eventType.slug] : undefined
  const useCategoryGlyph = glyph === 'category' || (glyph == null && Glyph != null)

  const regenerate = useCallback(() => {
    setMode('generated')
    setGeneratedNonce((n) => n + 1)
  }, [])

  const useSeeded = useCallback(() => {
    setMode('seeded')
  }, [])

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden',
        state === 'loading' && 'animate-pulse',
        className,
      )}
      style={{ background: backgroundStyle }}
      role="img"
      aria-label={ariaLabel}
    >
      <div className="absolute inset-0 bg-bg-deep/25" aria-hidden />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {glyph === 'none' ? null : useCategoryGlyph && Glyph ? (
          <Glyph className="h-[42%] w-[42%] max-h-32 max-w-32 text-white/20" strokeWidth={1.25} />
        ) : (
          <GdscMark className="h-[38%] w-[38%] max-h-28 max-w-28" />
        )}
      </div>

      {state === 'loading' ? (
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/8 to-transparent [animation:shimmer_1.8s_ease-in-out_infinite]" />
        </div>
      ) : null}

      {showVariantToggle ? (
        <div className="absolute right-2 bottom-2 flex gap-1">
          <button
            type="button"
            onClick={useSeeded}
            className={cn(
              'rounded-lg border border-border-default bg-surface/80 px-2 py-1 text-[10px] font-medium text-fg-secondary backdrop-blur-sm transition-colors hover:text-fg',
              mode === 'seeded' && 'border-border-strong text-fg',
            )}
            title="Use seeded variant from slug"
          >
            Seeded
          </button>
          <button
            type="button"
            onClick={regenerate}
            className={cn(
              'inline-flex items-center gap-1 rounded-lg border border-border-default bg-surface/80 px-2 py-1 text-[10px] font-medium text-fg-secondary backdrop-blur-sm transition-colors hover:text-fg',
              mode === 'generated' && 'border-border-strong text-fg',
            )}
            title="Generate new variant"
          >
            <RefreshCw className="h-3 w-3" />
            New
          </button>
        </div>
      ) : null}
    </div>
  )
}
