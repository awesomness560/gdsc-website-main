import { createFileRoute } from '@tanstack/react-router'
import { HackdscPlaceholderTab } from '#/components/admin/hackdsc/HackdscAdminLayout'

export const Route = createFileRoute('/admin/hackdsc/attendees')({
  component: HackdscAttendeesRoute,
})

function HackdscAttendeesRoute() {
  return (
    <HackdscPlaceholderTab
      title="Attendees"
      description="Track accepted hackers, check-in status, and attendance confirmations."
    />
  )
}
