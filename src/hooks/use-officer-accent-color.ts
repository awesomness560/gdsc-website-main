import { useEffect, useMemo, useState } from 'react'
import {
  accentColorFromName,
  extractDominantAccentColorFromUrl,
} from '#/lib/officer-accent-color'

/** Resolve glow accent from photo (client-side) with name-hash fallback. */
export function useOfficerAccentColor(name: string, imageUrl?: string): string {
  const fallback = useMemo(() => accentColorFromName(name), [name])
  const [accent, setAccent] = useState(fallback)

  useEffect(() => {
    setAccent(fallback)

    if (!imageUrl) return

    let cancelled = false
    void extractDominantAccentColorFromUrl(imageUrl)
      .then((color) => {
        if (!cancelled) setAccent(color)
      })
      .catch(() => {
        if (!cancelled) setAccent(fallback)
      })

    return () => {
      cancelled = true
    }
  }, [name, imageUrl, fallback])

  return accent
}
