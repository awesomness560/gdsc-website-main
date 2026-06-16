/** Deterministic accent hex palette (matches avatar tones). */
const ACCENT_PALETTE = [
  '#4285f4',
  '#ea4335',
  '#34a853',
  '#9333ea',
  '#14b8a6',
] as const

const accentUrlCache = new Map<string, string>()

function hashString(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const image = new Image()
    image.addEventListener('load', () => {
      URL.revokeObjectURL(url)
      resolve(image)
    })
    image.addEventListener('error', () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    })
    image.src = url
  })
}

function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', () => reject(new Error('Failed to load image')))
    image.src = url
  })
}

function muteRgb(r: number, g: number, b: number): string {
  const gray = (r + g + b) / 3
  const mix = 0.38
  const mr = Math.round(r * (1 - mix) + gray * mix)
  const mg = Math.round(g * (1 - mix) + gray * mix)
  const mb = Math.round(b * (1 - mix) + gray * mix)
  return `#${[mr, mg, mb].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

function extractFromImage(image: HTMLImageElement): string {
  const canvas = document.createElement('canvas')
  const size = 64
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return ACCENT_PALETTE[0]

  ctx.drawImage(image, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)

  let r = 0
  let g = 0
  let b = 0
  let count = 0

  for (let i = 0; i < data.length; i += 4) {
    const pr = data[i] ?? 0
    const pg = data[i + 1] ?? 0
    const pb = data[i + 2] ?? 0
    const max = Math.max(pr, pg, pb)
    const min = Math.min(pr, pg, pb)
    const sat = max === 0 ? 0 : (max - min) / max
    const lum = (pr + pg + pb) / 3
    if (sat > 0.12 && lum > 35 && lum < 225) {
      r += pr
      g += pg
      b += pb
      count += 1
    }
  }

  if (count === 0) return ACCENT_PALETTE[0]
  return muteRgb(
    Math.round(r / count),
    Math.round(g / count),
    Math.round(b / count),
  )
}

/** Pull a muted dominant color from a local headshot blob (admin crop flow). */
export async function extractDominantAccentColor(blob: Blob): Promise<string> {
  const image = await loadImageFromBlob(blob)
  return extractFromImage(image)
}

/** Pull a muted dominant color from a remote headshot URL (About page). */
export async function extractDominantAccentColorFromUrl(
  url: string,
): Promise<string> {
  const cached = accentUrlCache.get(url)
  if (cached) return cached

  const image = await loadImageFromUrl(url)
  const color = extractFromImage(image)
  accentUrlCache.set(url, color)
  return color
}

export function accentColorFromName(name: string): string {
  const index = hashString(name.trim().toLowerCase()) % ACCENT_PALETTE.length
  return ACCENT_PALETTE[index] ?? ACCENT_PALETTE[0]
}

/** CSS color-mix string for a soft radial glow. */
export function accentGlowStyle(
  accentColor: string,
  intensity: 'subtle' | 'expressive',
): { background: string } {
  const opacity = intensity === 'expressive' ? 0.55 : 0.22
  return {
    background: `radial-gradient(circle, color-mix(in srgb, ${accentColor} ${Math.round(opacity * 100)}%, transparent) 0%, transparent 70%)`,
  }
}
