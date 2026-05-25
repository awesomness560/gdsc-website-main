import { createFileRoute } from '@tanstack/react-router'
import { AdminPlaceholderPage } from '#/components/admin/AdminPlaceholderPage'

export const Route = createFileRoute('/admin/events')({
  component: AdminEventsPage,
})

function AdminEventsPage() {
  return (
    <AdminPlaceholderPage
      title="Events"
      description="Create and manage events, RSVPs, and event content."
    />
  )
}
