import { Link, useRouterState } from '@tanstack/react-router'
import { cn } from '#/lib/cn'

const tabs = [
  { to: '/admin/hackdsc', label: 'Overview', exact: true },
  { to: '/admin/hackdsc/applications', label: 'Applications' },
  { to: '/admin/hackdsc/configuration', label: 'Configuration' },
  { to: '/admin/hackdsc/schedule', label: 'Schedule' },
  { to: '/admin/hackdsc/attendees', label: 'Attendees' },
  { to: '/admin/hackdsc/communications', label: 'Communications' },
] as const

export function HackdscAdminTabs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <nav
      className="-mx-1 overflow-x-auto border-b border-border-subtle"
      aria-label="HackDSC sections"
    >
      <div className="flex min-w-max gap-1 px-1">
        {tabs.map((tab) => {
          const active =
            tab.to === '/admin/hackdsc'
              ? pathname === '/admin/hackdsc' || pathname === '/admin/hackdsc/'
              : pathname === tab.to || pathname.startsWith(`${tab.to}/`)

          return (
            <Link
              key={tab.to}
              to={tab.to}
              preload="intent"
              className={cn(
                'relative px-3 py-3 text-sm font-medium transition-colors',
                active
                  ? 'text-fg after:absolute after:inset-x-2 after:bottom-0 after:h-[2px] after:rounded-full after:bg-accent'
                  : 'text-fg-muted hover:text-fg-secondary',
              )}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
