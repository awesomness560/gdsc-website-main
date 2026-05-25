import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { useState } from 'react'

import { AppShell } from '#/components/layout/AppShell'
import { SiteNavbar } from '#/components/layout/SiteNavbar'
import { AuthProvider } from '#/contexts/AuthContext'
import { siteNavItems } from '#/data/site-nav'
import { isAdminRoute } from '#/lib/admin-routes'
import { isAuthRoute } from '#/lib/auth-routes'
import { createAppQueryClient } from '#/queries/query-client'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const [queryClient] = useState(createAppQueryClient)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const hideNav = isAuthRoute(pathname) || isAdminRoute(pathname)

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}
