import { createFileRoute } from '@tanstack/react-router'
import { HackdscPlaceholderTab } from '#/components/admin/hackdsc/HackdscAdminLayout'

export const Route = createFileRoute('/admin/hackdsc/schedule')({
  component: HackdscScheduleRoute,
})

function HackdscScheduleRoute() {
  return (
    <HackdscPlaceholderTab
      title="Schedule"
      description="Build and edit the hackathon schedule — workshops, meals, ceremonies, and more."
    />
  )
}
