/** Dev/dummy window: started recently, ends one year out — keeps LIVE NOW testable. */
export function getDevLiveEventWindow() {
  const start = new Date()
  start.setMinutes(0, 0, 0)
  start.setHours(start.getHours() - 1)

  const end = new Date(start)
  end.setFullYear(end.getFullYear() + 1)

  return {
    startsAt: start.toISOString(),
    endsAt: end.toISOString(),
  }
}
