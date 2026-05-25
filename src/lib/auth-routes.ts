const AUTH_PATHS = ['/login', '/signup'] as const

export function isAuthRoute(pathname: string) {
  return AUTH_PATHS.some((p) => pathname === p)
}
