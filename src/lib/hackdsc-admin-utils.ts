import type { AdminApplication } from '#/types/admin-application'
import type {
  HackdscAdminConfig,
  HackdscAttentionItem,
  HackdscLifecycleStatus,
  HackdscOverviewMetrics,
} from '#/types/admin-hackdsc'
import { dummyScheduleData } from '#/data/dummy-schedule'

const MS_DAY = 1000 * 60 * 60 * 24

export const HACKDSC_LIFECYCLE_OPTIONS: {
  value: HackdscLifecycleStatus
  label: string
  description: string
}[] = [
  {
    value: 'draft',
    label: 'Draft',
    description: 'Nothing public — applications cannot be submitted.',
  },
  {
    value: 'applications_open',
    label: 'Applications open',
    description: 'Public page is live and accepting applications.',
  },
  {
    value: 'applications_closed',
    label: 'Applications closed',
    description: 'Public page is live — no new applications.',
  },
  {
    value: 'event_in_progress',
    label: 'Event in progress',
    description: 'Active during the hackathon weekend.',
  },
  {
    value: 'completed',
    label: 'Completed',
    description: 'Archived — public page shows recap.',
  },
]

export const HACKDSC_TAB_LABELS: Record<string, string> = {
  '/admin/hackdsc': 'Overview',
  '/admin/hackdsc/': 'Overview',
  '/admin/hackdsc/applications': 'Applications',
  '/admin/hackdsc/configuration': 'Configuration',
  '/admin/hackdsc/schedule': 'Schedule',
  '/admin/hackdsc/attendees': 'Attendees',
  '/admin/hackdsc/communications': 'Communications',
}

export function hackdscTabLabel(pathname: string): string {
  const normalized =
    pathname.endsWith('/') && pathname !== '/admin/hackdsc/'
      ? pathname.slice(0, -1)
      : pathname
  if (normalized === '/admin/hackdsc') return 'Overview'
  return HACKDSC_TAB_LABELS[normalized] ?? 'Overview'
}

export function lifecycleStatusLabel(status: HackdscLifecycleStatus): string {
  return (
    HACKDSC_LIFECYCLE_OPTIONS.find((option) => option.value === status)?.label ??
    status
  )
}

type LifecycleVisual = {
  pillClass: string
  bannerAccentClass: string
}

export function lifecycleVisual(status: HackdscLifecycleStatus): LifecycleVisual {
  switch (status) {
    case 'draft':
      return {
        pillClass: 'border-border-default bg-white/5 text-fg-secondary',
        bannerAccentClass: 'border-l-fg-muted',
      }
    case 'applications_open':
      return {
        pillClass: 'border-google-green/30 bg-google-green/10 text-google-green',
        bannerAccentClass: 'border-l-google-green',
      }
    case 'applications_closed':
      return {
        pillClass: 'border-google-yellow/30 bg-google-yellow/10 text-google-yellow',
        bannerAccentClass: 'border-l-google-yellow',
      }
    case 'event_in_progress':
      return {
        pillClass: 'border-accent/40 bg-accent/15 text-accent',
        bannerAccentClass: 'border-l-accent',
      }
    case 'completed':
      return {
        pillClass: 'border-border-default bg-white/5 text-fg-muted',
        bannerAccentClass: 'border-l-border-strong',
      }
  }
}

export function daysUntil(iso: string): number {
  const target = new Date(iso).getTime()
  return Math.ceil((target - Date.now()) / MS_DAY)
}

export function daysUntilLabel(iso: string, prefix: string): string {
  const days = daysUntil(iso)
  if (days < 0) return `${prefix} passed`
  if (days === 0) return `${prefix} today`
  if (days === 1) return `${prefix} in 1 day`
  return `${prefix} in ${days} days`
}

export function formatEventDateRange(config: HackdscAdminConfig): string {
  const start = new Date(config.eventStart)
  const end = new Date(config.eventEnd)
  const sameMonth = start.getMonth() === end.getMonth()
  const startLabel = start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
  const endLabel = end.toLocaleDateString('en-US', {
    month: sameMonth ? undefined : 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return `${startLabel}–${endLabel}`
}

export function formatEventSubtitle(config: HackdscAdminConfig): string {
  return `${config.eventName} · ${formatEventDateRange(config)}`
}

export function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function isoToDatetimeLocalValue(iso: string): string {
  const date = new Date(iso)
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function datetimeLocalToIso(value: string): string {
  return new Date(value).toISOString()
}

export function isoToDateValue(iso: string): string {
  return iso.slice(0, 10)
}

export function dateValueToIso(value: string): string {
  return new Date(`${value}T12:00:00`).toISOString()
}

function applicationsThisWeek(apps: AdminApplication[]): number {
  const weekAgo = Date.now() - 7 * MS_DAY
  return apps.filter((app) => new Date(app.submittedAt).getTime() >= weekAgo).length
}

export function computeOverviewMetrics(
  apps: AdminApplication[],
  config: HackdscAdminConfig,
): HackdscOverviewMetrics {
  const pendingReview = apps.filter((app) => app.decision === 'pending').length
  const acceptedCount = apps.filter((app) => app.decision === 'accepted').length
  const reviewedCount = apps.filter(
    (app) => app.decision === 'accepted' || app.decision === 'rejected',
  ).length
  const acceptanceRate =
    reviewedCount > 0 ? Math.round((acceptedCount / reviewedCount) * 100) : null

  const duringApplications = config.status === 'applications_open'
  const timeTarget = duringApplications
    ? config.applicationDeadline
    : config.status === 'completed'
      ? null
      : config.eventStart

  const timeTargetLabel = duringApplications ? 'Time to deadline' : 'Time to event'

  return {
    totalApplications: apps.length,
    totalApplicationsDelta: applicationsThisWeek(apps),
    pendingReview,
    acceptedCount,
    reviewedCount,
    acceptanceRate,
    timeTarget,
    timeTargetLabel,
  }
}

export type StatusBannerContent = {
  message: string
  actionLabel?: string
  actionHref?: string
}

export function getStatusBannerContent(
  config: HackdscAdminConfig,
  apps: AdminApplication[],
): StatusBannerContent {
  const total = apps.length
  const pending = apps.filter((app) => app.decision === 'pending').length
  const reviewed = apps.filter(
    (app) => app.decision !== 'pending' && app.decision !== 'flagged',
  ).length
  const accepted = apps.filter((app) => app.decision === 'accepted').length

  switch (config.status) {
    case 'applications_open': {
      const days = daysUntil(config.applicationDeadline)
      const dayLabel = days === 1 ? '1 day' : `${Math.max(days, 0)} days`
      return {
        message: `Applications close in ${dayLabel} · ${total} submitted so far`,
      }
    }
    case 'applications_closed':
      return {
        message: `Application review in progress · ${pending} pending · ${reviewed} reviewed`,
        actionLabel: 'Review applications →',
        actionHref: '/admin/hackdsc/applications',
      }
    case 'event_in_progress':
      return { message: 'HackDSC is live' }
    case 'completed':
      return {
        message: `${config.eventName} completed · View summary →`,
        actionHref: '/hackdsc',
        actionLabel: 'View summary →',
      }
    default: {
      const days = daysUntil(config.eventStart)
      return {
        message: `Event starts in ${Math.max(days, 0)} days · ${accepted} accepted`,
      }
    }
  }
}

export function computeAttentionItems(
  apps: AdminApplication[],
  config: HackdscAdminConfig,
): HackdscAttentionItem[] {
  const items: HackdscAttentionItem[] = []
  const fiveDaysAgo = Date.now() - 5 * MS_DAY

  const stalePending = apps.filter(
    (app) =>
      app.decision === 'pending' &&
      new Date(app.submittedAt).getTime() <= fiveDaysAgo,
  ).length
  if (stalePending > 0) {
    items.push({
      id: 'stale-pending',
      icon: 'clock',
      message: `${stalePending} application${stalePending === 1 ? '' : 's'} pending review for more than 5 days`,
      actionLabel: 'Review now',
      href: '/admin/hackdsc/applications',
    })
  }

  const flagged = apps.filter((app) => app.flags.length > 0).length
  if (flagged > 0) {
    items.push({
      id: 'flagged',
      icon: 'flag',
      message: `${flagged} application${flagged === 1 ? '' : 's'} flagged by other admins`,
      actionLabel: 'View flagged',
      href: '/admin/hackdsc/applications',
    })
  }

  const saturday = dummyScheduleData.days.find((day) => day.id === 'saturday')
  const saturdayAfternoonEmpty =
    !saturday?.events.some((event) => {
      const hour = parseInt(event.time, 10)
      return event.time.includes('PM') && hour >= 12 && hour < 6
    }) ?? true
  if (saturdayAfternoonEmpty && config.status !== 'completed') {
    items.push({
      id: 'schedule-gap',
      icon: 'calendar',
      message: 'Schedule is incomplete — no entries for Saturday afternoon',
      actionLabel: 'Edit schedule',
      href: '/admin/hackdsc/schedule',
    })
  }

  const deadlineDays = daysUntil(config.applicationDeadline)
  const pending = apps.filter((app) => app.decision === 'pending').length
  if (
    config.status === 'applications_closed' &&
    deadlineDays <= 3 &&
    deadlineDays >= 0 &&
    pending > 0
  ) {
    items.push({
      id: 'deadline-pending',
      icon: 'alert',
      message: `Acceptance deadline is in ${Math.max(deadlineDays, 0)} days and ${pending} applications still pending`,
      actionLabel: 'Review pending',
      href: '/admin/hackdsc/applications',
    })
  }

  if (config.status === 'applications_closed' || config.status === 'event_in_progress') {
    const unconfirmed = Math.min(
      apps.filter((app) => app.decision === 'accepted').length,
      5,
    )
    if (unconfirmed >= 5) {
      items.push({
        id: 'attendance-reminder',
        icon: 'mail',
        message: `${unconfirmed} accepted applicants haven't confirmed attendance`,
        actionLabel: 'Send reminder',
        href: '/admin/hackdsc/communications',
      })
    }
  }

  return items
}

export function fridaySchedulePreview() {
  return dummyScheduleData.days.find((day) => day.id === 'friday') ?? null
}
