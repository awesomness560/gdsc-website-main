import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyContent } from '#/components/legal/PrivacyPolicyContent'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return <PrivacyPolicyContent />
}
