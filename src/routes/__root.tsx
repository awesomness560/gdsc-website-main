import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { AppShell } from '#/components/layout/AppShell'
import { SiteNavbar } from '#/components/layout/SiteNavbar'
import { AuthProvider } from '#/contexts/AuthContext'
import { siteNavItems } from '#/data/site-nav'
import { isAuthRoute } from '#/lib/auth-routes'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const hideNav = isAuthRoute(pathname)

  return (
    <AuthProvider>
      <AppShell>
        {hideNav ? null : <SiteNavbar items={siteNavItems} />}
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
    </AuthProvider>
  )
}
