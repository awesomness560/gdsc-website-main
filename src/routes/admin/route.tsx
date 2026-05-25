import { createFileRoute, redirect } from '@tanstack/react-router'
import { fetchAuthSession } from '#/api/auth'
import { AdminShell } from '#/components/admin/AdminShell'
import { isAdminRole } from '#/lib/auth-roles'
import { ADMIN_DASHBOARD_PATH } from '#/lib/auth-redirect'

export const Route = createFileRoute('/admin')({
  beforeLoad: async () => {
    const user = await fetchAuthSession()
    if (!user) {
      throw redirect({
        to: '/login',
        search: { redirect: ADMIN_DASHBOARD_PATH },
      })
    }
    if (!isAdminRole(user.roles)) {
      throw redirect({ to: '/' })
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  return <AdminShell />
}
