import { createFileRoute } from '@tanstack/react-router'
import { Card } from '#/components/ui/Card'
import { useAuth } from '#/contexts/AuthContext'

export const Route = createFileRoute('/account/settings')({
  component: AccountSettingsTab,
})

function AccountSettingsTab() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-fg">Settings</h2>
        <p className="text-sm text-fg-muted">
          Manage your account info and preferences.
        </p>
      </header>

      <Card>
        <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
          Account info
        </p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-fg-muted">Name</dt>
            <dd className="mt-0.5 text-fg-secondary">{user?.name ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs text-fg-muted">Email</dt>
            <dd className="mt-0.5 text-fg-secondary">{user?.auth.email ?? '—'}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-fg-muted">
          Inline editing and notification toggles can be added once we decide how
          to store preferences and handle email-change verification.
        </p>
      </Card>

      <Card className="border-google-red/20 bg-google-red/5">
        <p className="text-xs font-semibold tracking-[0.12em] text-google-red uppercase">
          Danger zone
        </p>
        <p className="mt-3 text-sm text-fg-secondary">
          Delete account and membership actions will live here (with multi-step
          confirmations).
        </p>
      </Card>
    </div>
  )
}

