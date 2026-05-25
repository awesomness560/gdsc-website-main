import { createFileRoute } from '@tanstack/react-router'
import { AdminMembersPage } from '#/components/admin/members/AdminMembersPage'

export const Route = createFileRoute('/admin/members')({
  component: AdminMembersRoute,
})

function AdminMembersRoute() {
  return <AdminMembersPage />
}
