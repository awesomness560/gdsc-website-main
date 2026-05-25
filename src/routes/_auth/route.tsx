import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'
import { AuthPage } from '#/components/auth'
import type { AuthMode } from '#/components/auth/AuthForm'
import { sanitizeAuthRedirect } from '#/lib/auth-redirect'

type AuthSearch = {
  redirect?: string
}

export const Route = createFileRoute('/_auth')({
  validateSearch: (search: Record<string, unknown>): AuthSearch => ({
    redirect: sanitizeAuthRedirect(search.redirect),
  }),
  component: AuthLayout,
  /** Avoid flashing the global pending placeholder when switching login ↔ signup. */
  pendingComponent: () => null,
  pendingMs: 500,
})

function AuthLayout() {
  const router = useRouter()
  const mode = useRouterState({
    select: (s): AuthMode =>
      s.location.pathname === '/signup' ? 'signup' : 'login',
  })

  useEffect(() => {
    void router.preloadRoute({ to: '/login' })
    void router.preloadRoute({ to: '/signup' })
  }, [router])

  return <AuthPage mode={mode} />
}
