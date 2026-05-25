import type { AdminApplication } from '#/types/admin-application'
import type { DbExperienceLevel, DbTeamStatus } from '#/types/hackathon-submission'

const EXPERIENCE_LABELS: Record<DbExperienceLevel, string> = {
  first_hackathon: 'First hackathon',
  one_to_three: '1–3 hackathons',
  four_plus: '4+ hackathons',
}

const TEAM_STATUS_LABELS: Record<DbTeamStatus, string> = {
  has_team: 'Has a team',
  looking_for_team: 'Looking for teammates',
  going_solo: 'Going solo',
}

export function experienceLabel(level: DbExperienceLevel | null): string {
  if (!level) return '—'
  return EXPERIENCE_LABELS[level]
}

export function teamStatusLabel(status: DbTeamStatus | null): string {
  if (!status) return '—'
  return TEAM_STATUS_LABELS[status]
}

export function displayApplicationName(app: AdminApplication): string {
  return app.form.preferredName.trim() || app.form.fullName.trim() || 'Applicant'
}

export function displayApplicationSecondaryName(
  app: AdminApplication,
): string | null {
  const preferred = app.form.preferredName.trim()
  const full = app.form.fullName.trim()
  if (preferred && full && preferred !== full) return full
  return null
}

export function schoolMajorLine(app: AdminApplication): string {
  const school = app.form.university.trim() || '—'
  const major = app.form.major.trim()
  return major ? `${school} · ${major}` : school
}

export function formatRelativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(ms / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function formatDecisionDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function flagSummary(app: AdminApplication): string | null {
  if (app.flags.length === 0) return null
  const first = app.flags[0]
  const rest = app.flags.length - 1
  const by =
    rest > 0
      ? `Flagged by ${first.adminName} + ${rest} others`
      : `Flagged by ${first.adminName}`
  return `${by} · ${formatRelativeTime(first.createdAt)}`
}

export function flagDetailLine(app: AdminApplication): string | null {
  if (app.flags.length === 0) return null
  const first = app.flags[0]
  const reason = first.reason?.trim()
  const time = formatRelativeTime(first.createdAt)
  if (reason) {
    return `Flagged by ${first.adminName} for second opinion · ${time}`
  }
  return `Flagged by ${first.adminName} · ${time}`
}

export function matchesApplicationSearch(
  app: AdminApplication,
  query: string,
): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [
    displayApplicationName(app),
    displayApplicationSecondaryName(app),
    app.form.email,
    app.form.university,
    app.form.major,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

export function filterApplications(
  apps: AdminApplication[],
  search: string,
  filters: import('#/types/admin-application').ApplicationListFilters,
): AdminApplication[] {
  const now = Date.now()
  return apps.filter((app) => {
    if (!matchesApplicationSearch(app, search)) return false
    if (filters.status !== 'all' && app.decision !== filters.status) return false
    if (filters.membership === 'member' && !app.isMember) return false
    if (filters.membership === 'non-member' && app.isMember) return false
    if (
      filters.school &&
      !app.form.university.toLowerCase().includes(filters.school.toLowerCase())
    ) {
      return false
    }
    if (
      filters.experienceLevel !== 'all' &&
      app.experienceLevel !== filters.experienceLevel
    ) {
      return false
    }
    if (filters.teamStatus !== 'all' && app.teamStatus !== filters.teamStatus) {
      return false
    }
    if (filters.dateRange !== 'all') {
      const submitted = new Date(app.submittedAt).getTime()
      const maxAge =
        filters.dateRange === '7d'
          ? 7 * 24 * 60 * 60 * 1000
          : 30 * 24 * 60 * 60 * 1000
      if (now - submitted > maxAge) return false
    }
    return true
  })
}

export function sortApplicationsForQueue(
  apps: AdminApplication[],
): AdminApplication[] {
  const rank: Record<AdminApplication['decision'], number> = {
    flagged: 0,
    pending: 1,
    accepted: 2,
    rejected: 3,
  }
  return [...apps].sort((a, b) => {
    const byDecision = rank[a.decision] - rank[b.decision]
    if (byDecision !== 0) return byDecision
    return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  })
}

export function pendingApplications(apps: AdminApplication[]): AdminApplication[] {
  return apps.filter((a) => a.decision === 'pending')
}

export function findNextPending(
  apps: AdminApplication[],
  afterId: string | null,
): AdminApplication | null {
  const pending = sortApplicationsForQueue(pendingApplications(apps))
  if (pending.length === 0) return null
  if (!afterId) return pending[0]
  const idx = pending.findIndex((a) => a.id === afterId)
  return pending[idx + 1] ?? pending[0]
}
