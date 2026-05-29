import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { HackdscAdminConfigProvider } from '#/contexts/HackdscAdminConfigContext'
import { HackdscAdminHeader } from '#/components/admin/hackdsc/HackdscAdminHeader'
import { HackdscAdminTabs } from '#/components/admin/hackdsc/HackdscAdminTabs'
import { cn } from '#/lib/cn'

function HackdscAdminLayoutInner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isApplicationsTab = pathname.startsWith('/admin/hackdsc/applications')
  const isFullBleed = isApplicationsTab

  return (
    <div className="flex h-full min-h-0 flex-col">
      <HackdscAdminHeader />
      <div className="shrink-0 px-4 sm:px-6">
        <HackdscAdminTabs />
      </div>
      <div className={cn('min-h-0 flex-1', isFullBleed && 'overflow-hidden')}>
        <Outlet />
      </div>
    </div>
  )
}

export function HackdscAdminLayout() {
  return (
    <HackdscAdminConfigProvider>
      <HackdscAdminLayoutInner />
    </HackdscAdminConfigProvider>
  )
}

export function HackdscPlaceholderTab({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
      <h2 className="text-xl font-semibold tracking-tight text-fg">{title}</h2>
      <p className="mt-2 max-w-xl text-sm text-fg-secondary">{description}</p>
      <p className="mt-6 text-sm text-fg-muted">
        This section is coming soon.{' '}
        <Link to="/admin/hackdsc" className="text-accent hover:underline">
          Back to overview
        </Link>
      </p>
    </div>
  )
}
