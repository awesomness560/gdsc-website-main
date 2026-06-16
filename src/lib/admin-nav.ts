import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  LayoutDashboard,
  Rocket,
  Settings,
  UserRound,
  Users,
} from 'lucide-react'

export type AdminNavItem = {
  label: string
  href: string
  icon: LucideIcon
  /** Shown as a muted pill on the nav row (e.g. pending applications). */
  badge?: number
}

export const adminPrimaryNav: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'HackDSC', href: '/admin/hackdsc', icon: Rocket },
  { label: 'Members', href: '/admin/members', icon: Users },
  { label: 'Team', href: '/admin/team', icon: UserRound },
]

export const adminSecondaryNav: AdminNavItem[] = [
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function adminBreadcrumbLabel(pathname: string): string {
  if (pathname.startsWith('/admin/hackdsc')) {
    return 'HackDSC'
  }

  const item = [...adminPrimaryNav, ...adminSecondaryNav].find(
    (entry) =>
      entry.href === pathname ||
      (entry.href !== '/admin' && pathname.startsWith(`${entry.href}/`)),
  )
  if (item) return item.label
  if (pathname === '/admin' || pathname === '/admin/') return 'Dashboard'
  return 'Admin'
}
