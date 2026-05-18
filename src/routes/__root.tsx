import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { PageBackground } from '#/components/layout/PageBackground'
import { SiteNavbar } from '#/components/layout/SiteNavbar'
import { dummyLandingData } from '#/data/dummy-landing'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <PageBackground>
      <SiteNavbar links={dummyLandingData.navLinks} />
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
    </PageBackground>
  )
}
