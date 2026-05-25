import { createFileRoute } from '@tanstack/react-router'
import { AdminPlaceholderPage } from '#/components/admin/AdminPlaceholderPage'

export const Route = createFileRoute('/admin/applications')({
  component: AdminApplicationsPage,
})

function AdminApplicationsPage() {
  return (
    <AdminPlaceholderPage
      title="Applications"
      description="Review HackDSC and other applications from members."
    />
  )
}
