import { Outlet, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AdminSidebar } from '#/components/admin/AdminSidebar'
import { AdminTopBar } from '#/components/admin/AdminTopBar'
import { useAuth } from '#/contexts/AuthContext'
import { isAdminRole } from '#/lib/auth-roles'

export function AdminShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navigate = useNavigate()
  const { user, isSessionPending, isSignOutPending } = useAuth()

  useEffect(() => {
    if (isSessionPending || isSignOutPending) return
    if (!user || !isAdminRole(user.roles)) {
      navigate({ to: '/' })
    }
  }, [user, isSessionPending, isSignOutPending, navigate])

  return (
    <div className="flex min-h-dvh bg-bg-deep text-fg">
      <AdminSidebar
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />
      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <AdminTopBar onMenuOpen={() => setMobileNavOpen(true)} />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
