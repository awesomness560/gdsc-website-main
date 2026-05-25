import { createFileRoute } from '@tanstack/react-router'
import { AdminPlaceholderPage } from '#/components/admin/AdminPlaceholderPage'

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
})

function AdminSettingsPage() {
  return (
    <AdminPlaceholderPage
      title="Settings"
      description="Workspace settings, integrations, and admin preferences."
    />
  )
}
