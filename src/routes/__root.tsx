import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { AppShell } from '#/components/layout/AppShell'
import { SiteNavbar } from '#/components/layout/SiteNavbar'
import { siteNavItems } from '#/data/site-nav'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <AppShell>
      <SiteNavbar items={siteNavItems} />
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </AppShell>
  )
}
