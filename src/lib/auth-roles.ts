import type { UserRole } from '#/types/auth'

export function hasRole(roles: UserRole[] | undefined, role: UserRole): boolean {
  return roles?.includes(role) ?? false
}

export function isAdminRole(roles: UserRole[] | undefined): boolean {
  return hasRole(roles, 'admin')
}
