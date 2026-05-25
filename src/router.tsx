import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { RoutePending } from '#/components/layout/RoutePending'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: RoutePending,
    /** Brief delay avoids a one-frame pending flash on fast/lazy route transitions. */
    defaultPendingMs: 150,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
