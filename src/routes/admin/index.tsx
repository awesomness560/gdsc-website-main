import { createFileRoute } from '@tanstack/react-router'
import { AdminPlaceholderPage } from '#/components/admin/AdminPlaceholderPage'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboardPage,
})

function AdminDashboardPage() {
  return (
    <AdminPlaceholderPage
      title="Dashboard"
      description="Overview metrics and quick actions will live here."
    />
  )
}
