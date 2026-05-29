import { createFileRoute } from '@tanstack/react-router'
import { HackdscPlaceholderTab } from '#/components/admin/hackdsc/HackdscAdminLayout'

export const Route = createFileRoute('/admin/hackdsc/communications')({
  component: HackdscCommunicationsRoute,
})

function HackdscCommunicationsRoute() {
  return (
    <HackdscPlaceholderTab
      title="Communications"
      description="Send reminders and announcements to applicants and accepted hackers."
    />
  )
}
