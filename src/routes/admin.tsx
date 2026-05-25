import { createFileRoute, redirect } from '@tanstack/react-router'
import { fetchAuthSession } from '#/api/auth'
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
  component: AdminDashboardPage,
})

function AdminDashboardPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        Admin dashboard
      </h1>
      <p className="mt-2 text-sm text-fg-secondary">
        Dashboard content will appear here.
      </p>
    </main>
  )
}
