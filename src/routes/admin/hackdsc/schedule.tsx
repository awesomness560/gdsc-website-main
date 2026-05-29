import { createFileRoute } from '@tanstack/react-router'
import { HackdscScheduleProvider } from '#/contexts/HackdscScheduleContext'
import { HackdscScheduleTab } from '#/components/admin/hackdsc/schedule/HackdscScheduleTab'

export const Route = createFileRoute('/admin/hackdsc/schedule')({
  component: HackdscScheduleRoute,
})

function HackdscScheduleRoute() {
  return (
    <HackdscScheduleProvider>
      <HackdscScheduleTab />
    </HackdscScheduleProvider>
  )
}
