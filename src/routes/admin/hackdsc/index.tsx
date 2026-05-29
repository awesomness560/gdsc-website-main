import { createFileRoute } from '@tanstack/react-router'
import { HackdscOverviewTab } from '#/components/admin/hackdsc/HackdscOverviewTab'

export const Route = createFileRoute('/admin/hackdsc/')({
  component: HackdscOverviewRoute,
})

function HackdscOverviewRoute() {
  return <HackdscOverviewTab />
}
