import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AuthSessionCompleting } from '#/components/auth/AuthSessionCompleting'
import { completeAuthFromUrl } from '#/api/auth'
import { mapAuthApiError } from '#/api/map-auth-error'
import { consumeAuthRedirect } from '#/lib/auth-redirect'
import { authKeys } from '#/queries/auth-keys'
import { useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallbackPage,
  pendingComponent: () => null,
})

function AuthCallbackPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function finish() {
      try {
        await completeAuthFromUrl()
        await queryClient.invalidateQueries({ queryKey: authKeys.session() })
        if (!cancelled) {
          navigate({ to: consumeAuthRedirect() ?? '/', replace: true })
        }
      } catch (err) {
        if (!cancelled) {
          setError(mapAuthApiError(err).general ?? 'Sign-in failed.')
        }
      }
    }

    void finish()
    return () => {
      cancelled = true
    }
  }, [navigate, queryClient])

  if (error) {
    return (
      <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-google-red">{error}</p>
        <button
          type="button"
          className="cursor-pointer text-sm font-medium text-accent hover:text-accent-hover"
          onClick={() => navigate({ to: '/login' })}
        >
          Back to sign in
        </button>
      </main>
    )
  }

  return (
    <main className="flex min-h-[50vh] items-center justify-center px-4">
      <AuthSessionCompleting />
    </main>
  )
}
