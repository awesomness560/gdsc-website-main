import { createFileRoute } from '@tanstack/react-router'
import { AdminTeamPage } from '#/components/admin/team/AdminTeamPage'

export const Route = createFileRoute('/admin/team')({
  component: AdminTeamPageRoute,
})

function AdminTeamPageRoute() {
  return <AdminTeamPage />
}
