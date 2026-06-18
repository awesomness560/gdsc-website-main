import { createFileRoute, Navigate } from '@tanstack/react-router'
import { OfficerProfileEditor } from '#/components/account/OfficerProfileEditor'
import { useOfficer } from '#/contexts/OfficerContext'

export const Route = createFileRoute('/account/officer')({
  component: AccountOfficerTab,
})

function AccountOfficerTab() {
  const { officer, isOfficer, isOfficerPending } = useOfficer()

  if (isOfficerPending) {
    return (
      <p className="text-sm text-fg-muted">Loading your officer profile…</p>
    )
  }

  if (!isOfficer || !officer) {
    return <Navigate to="/account" replace />
  }

  return <OfficerProfileEditor officer={officer} />
}
