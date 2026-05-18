import type { CountdownTime } from '#/types/hackdsc'

export function getCountdownTime(targetDateString: string): CountdownTime {
  const target = new Date(targetDateString).getTime()
  const difference = target - Date.now()

  if (difference <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' }
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}
