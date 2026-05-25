import { isAuthRoute } from '#/lib/auth-routes'
import { isInternalPath } from '#/lib/navigation'

export const AUTH_POST_LOGIN_REDIRECT_KEY = 'auth_post_login_redirect'

export const HACKDSC_REGISTER_PATH = '/hackdsc/register'

export const ADMIN_DASHBOARD_PATH = '/admin'

/** Safe in-app path for post-login redirect (blocks auth pages and open redirects). */
export function sanitizeAuthRedirect(redirect: unknown): string | undefined {
  if (typeof redirect !== 'string' || !isInternalPath(redirect)) return undefined
  if (isAuthRoute(redirect)) return undefined
  return redirect
}

export function stashAuthRedirect(path: string) {
  if (typeof window === 'undefined') return
  const safe = sanitizeAuthRedirect(path)
  if (!safe) return
  window.sessionStorage.setItem(AUTH_POST_LOGIN_REDIRECT_KEY, safe)
}

export function consumeAuthRedirect(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const raw = window.sessionStorage.getItem(AUTH_POST_LOGIN_REDIRECT_KEY)
  window.sessionStorage.removeItem(AUTH_POST_LOGIN_REDIRECT_KEY)
  return sanitizeAuthRedirect(raw)
}
