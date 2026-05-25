import type { EventType } from '#/types/events'

export type PlaceholderGradientParams = {
  angle: number
  radialX: number
  radialY: number
  stopShift: number
}

export function hashSeed(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function getPlaceholderGradientParams(seed: string): PlaceholderGradientParams {
  const base = hashSeed(seed)
  return {
    angle: 125 + (base % 55),
    radialX: 28 + (base % 44),
    radialY: 18 + ((base >> 4) % 52),
    stopShift: (base % 14) - 7,
  }
}

const NEUTRAL = {
  light: 'rgba(74, 140, 255, 0.28)',
  deep: 'rgba(20, 30, 55, 0.2)',
}

function shiftRgba(rgba: string, shift: number, alphaMul = 1): string {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!match) return rgba
  const clamp = (n: number) => Math.min(255, Math.max(0, Math.round(n)))
  const r = clamp(Number(match[1]) + shift)
  const g = clamp(Number(match[2]) + shift)
  const b = clamp(Number(match[3]) + shift)
  const a = (match[4] ? Number(match[4]) : 1) * alphaMul
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function getPlaceholderBackground(
  seed: string,
  eventType?: EventType,
): { background: string } {
  const params = getPlaceholderGradientParams(seed)

  if (!eventType) {
    const light = shiftRgba(NEUTRAL.light, params.stopShift)
    const deep = shiftRgba(NEUTRAL.deep, params.stopShift * 0.5)
    return {
      background: [
        `radial-gradient(ellipse 90% 75% at ${params.radialX}% ${params.radialY}%, ${light}, transparent 62%)`,
        `linear-gradient(${params.angle}deg, ${deep} 0%, rgba(7, 10, 20, 0.96) 100%)`,
      ].join(', '),
    }
  }

  const glowFrom = shiftRgba(
    eventType.colors.glowFrom ?? eventType.colors.background,
    params.stopShift,
  )
  const glowVia = shiftRgba(
    eventType.colors.glowVia ?? eventType.colors.background,
    params.stopShift * 0.5,
    0.55,
  )
  const deep = shiftRgba(eventType.colors.background, params.stopShift * 0.5, 0.35)

  const background = [
    `radial-gradient(ellipse 90% 75% at ${params.radialX}% ${params.radialY}%, ${glowFrom}, transparent 62%)`,
    `radial-gradient(ellipse 80% 65% at ${100 - params.radialX}% ${100 - params.radialY}%, ${glowVia}, transparent 58%)`,
    `linear-gradient(${params.angle}deg, ${deep} 0%, rgba(7, 10, 20, 0.96) 100%)`,
  ].join(', ')

  return { background }
}
