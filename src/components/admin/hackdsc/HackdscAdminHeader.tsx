import { useRouterState } from '@tanstack/react-router'
import { useHackdscAdminConfig } from '#/contexts/HackdscAdminConfigContext'
import { formatEventSubtitle, hackdscTabLabel } from '#/lib/hackdsc-admin-utils'
import { HackdscStatusPill } from '#/components/admin/hackdsc/HackdscStatusPill'

export function HackdscAdminHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const { config } = useHackdscAdminConfig()
  const subTab = hackdscTabLabel(pathname)

  return (
    <header className="relative shrink-0 border-b border-border-subtle px-4 py-6 sm:px-6">
      <p className="text-sm font-medium text-fg-muted">
        HackDSC <span aria-hidden>›</span> {subTab}
      </p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-[28px] font-semibold tracking-tight text-fg">
            HackDSC
          </h1>
          <p className="mt-1 text-sm text-fg-secondary">
            {formatEventSubtitle(config)}
          </p>
        </div>
        <HackdscStatusPill status={config.status} />
      </div>
    </header>
  )
}
