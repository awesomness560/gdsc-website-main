import { Link, useRouterState } from '@tanstack/react-router'
import type { AdminNavItem } from '#/lib/admin-nav'
import { cn } from '#/lib/cn'

type AdminSidebarNavProps = {
  items: AdminNavItem[]
  onNavigate?: () => void
}

function isNavActive(pathname: string, href: string) {
  if (href === '/admin') {
    return pathname === '/admin' || pathname === '/admin/'
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminSidebarNav({ items, onNavigate }: AdminSidebarNavProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <nav className="flex flex-col gap-0.5 px-2">
      {items.map((item) => {
        const active = isNavActive(pathname, item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            to={item.href}
            preload="intent"
            onClick={onNavigate}
            className={cn(
              'flex h-10 items-center gap-2.5 rounded-xl px-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-accent/15 text-fg'
                : 'text-fg-secondary hover:bg-white/5 hover:text-fg',
            )}
          >
            <Icon
              className={cn(
                'h-4 w-4 shrink-0',
                active ? 'text-accent' : 'text-fg-muted',
              )}
              aria-hidden
            />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.badge != null && item.badge > 0 ? (
              <span className="shrink-0 rounded-full border border-border-default bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-fg-muted tabular-nums">
                {item.badge}
              </span>
            ) : null}
          </Link>
        )
      })}
    </nav>
  )
}
