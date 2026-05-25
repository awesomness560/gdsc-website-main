import { Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import { AdminSidebar } from '#/components/admin/AdminSidebar'
import { AdminTopBar } from '#/components/admin/AdminTopBar'

export function AdminShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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
