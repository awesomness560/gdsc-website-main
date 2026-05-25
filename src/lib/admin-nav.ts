import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
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
  {
    label: 'Applications',
    href: '/admin/applications',
    icon: ClipboardList,
    badge: 12,
  },
  { label: 'Members', href: '/admin/members', icon: Users },
  { label: 'Site content', href: '/admin/site-content', icon: FileText },
]

export const adminSecondaryNav: AdminNavItem[] = [
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function adminBreadcrumbLabel(pathname: string): string {
  const item = [...adminPrimaryNav, ...adminSecondaryNav].find(
    (entry) =>
      entry.href === pathname ||
      (entry.href !== '/admin' && pathname.startsWith(`${entry.href}/`)),
  )
  if (item) return item.label
  if (pathname === '/admin' || pathname === '/admin/') return 'Dashboard'
  return 'Admin'
}
