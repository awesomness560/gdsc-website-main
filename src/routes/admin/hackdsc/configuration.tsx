import { createFileRoute } from '@tanstack/react-router'
import { HackdscConfigurationTab } from '#/components/admin/hackdsc/HackdscConfigurationTab'

export const Route = createFileRoute('/admin/hackdsc/configuration')({
  component: HackdscConfigurationRoute,
})

function HackdscConfigurationRoute() {
  return <HackdscConfigurationTab />
}
