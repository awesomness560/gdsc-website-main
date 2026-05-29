import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/applications')({
  beforeLoad: () => {
    throw redirect({ to: '/admin/hackdsc/applications' })
  },
})
