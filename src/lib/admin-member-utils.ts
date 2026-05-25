import type { UserRole } from '#/types/auth'

const ROLE_PRIORITY: UserRole[] = ['admin', 'officer', 'moderator', 'user']

const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  officer: 'Officer',
  moderator: 'Moderator',
  user: 'Member',
}

export function primaryRoleLabel(roles: UserRole[]): string {
  for (const role of ROLE_PRIORITY) {
    if (roles.includes(role)) return ROLE_LABELS[role]
  }
  return ROLE_LABELS.user
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatSyncAge(daysAgo: number): string {
  if (daysAgo === 0) return 'just now'
  if (daysAgo === 1) return '1 day ago'
  return `${daysAgo} days ago`
}
