import { createFileRoute } from '@tanstack/react-router'
import { AdminPlaceholderPage } from '#/components/admin/AdminPlaceholderPage'

export const Route = createFileRoute('/admin/site-content')({
  component: AdminSiteContentPage,
})

function AdminSiteContentPage() {
  return (
    <AdminPlaceholderPage
      title="Site content"
      description="Edit homepage copy, about page sections, and other public content."
    />
  )
}
