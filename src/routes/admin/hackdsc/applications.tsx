import { createFileRoute } from '@tanstack/react-router'
import { AdminApplicationsPage } from '#/components/admin/applications/AdminApplicationsPage'

export const Route = createFileRoute('/admin/hackdsc/applications')({
  component: HackdscApplicationsRoute,
})

function HackdscApplicationsRoute() {
  return <AdminApplicationsPage />
}
