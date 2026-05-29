import { createFileRoute } from '@tanstack/react-router'
import { HackdscAdminLayout } from '#/components/admin/hackdsc/HackdscAdminLayout'

export const Route = createFileRoute('/admin/hackdsc')({
  component: HackdscAdminLayout,
})
