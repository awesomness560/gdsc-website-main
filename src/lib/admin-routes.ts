export const ADMIN_BASE_PATH = '/admin'

export function isAdminRoute(pathname: string) {
  return pathname === ADMIN_BASE_PATH || pathname.startsWith(`${ADMIN_BASE_PATH}/`)
}
