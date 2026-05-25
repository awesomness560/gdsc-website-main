/** Muted palette tones for deterministic initials avatars. */
const AVATAR_COLOR_CLASSES = [
  'bg-[rgba(66,133,244,0.88)]', // blue
  'bg-[rgba(234,67,53,0.82)]', // orange / red
  'bg-[rgba(52,168,83,0.85)]', // green
  'bg-[rgba(147,51,234,0.82)]', // pink / violet
  'bg-[rgba(20,184,166,0.85)]', // teal
] as const

function hashString(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getAvatarColorClass(seed: string) {
  const index = hashString(seed.trim().toLowerCase()) % AVATAR_COLOR_CLASSES.length
  return AVATAR_COLOR_CLASSES[index]
}
