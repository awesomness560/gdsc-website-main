import { Link } from '@tanstack/react-router'
import { ExternalLink, Loader2, LogOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { AdminBrand } from '#/components/admin/AdminBrand'
import { AdminSidebarNav } from '#/components/admin/AdminSidebarNav'
import { UserAvatar } from '#/components/ui/UserAvatar'
import { useAuth } from '#/contexts/AuthContext'
import { adminPrimaryNav, adminSecondaryNav } from '#/lib/admin-nav'
import { primaryRoleLabel } from '#/lib/admin-member-utils'
import { cn } from '#/lib/cn'

type AdminSidebarProps = {
  mobileOpen: boolean
  onMobileClose: () => void
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut, isSignOutPending } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handlePointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [menuOpen])

  if (!user) return null

  const roleLabel = primaryRoleLabel(user.roles)
  const shortName = user.name.split(' ').slice(0, 2).join(' ')

  return (
    <div ref={rootRef} className="relative border-t border-border-subtle px-3 py-3">
      <button
        type="button"
        className="flex w-full items-center gap-2.5 rounded-xl px-1 py-1 text-left transition-colors hover:bg-white/5"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <UserAvatar
          name={user.name}
          email={user.auth.email}
          avatarUrl={user.avatarUrl}
          size="sm"
          memberRing={user.isVerified}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-fg">{shortName}</p>
          <p className="truncate text-xs text-fg-muted">{roleLabel}</p>
        </div>
      </button>

      {menuOpen ? (
        <div
          role="menu"
          className="absolute right-3 bottom-full left-3 mb-1 overflow-hidden rounded-xl border border-border-default bg-surface-overlay shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            disabled={isSignOutPending}
            onClick={() => {
              void signOut()
              onNavigate?.()
              setMenuOpen(false)
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:opacity-60"
          >
            {isSignOutPending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <LogOut className="h-4 w-4" aria-hidden />
            )}
            Log out
          </button>
        </div>
      ) : null}
    </div>
  )
}

function SidebarPanel({
  onNavigate,
  className,
}: {
  onNavigate?: () => void
  className?: string
}) {
  return (
    <aside
      className={cn(
        'flex h-full w-60 shrink-0 flex-col border-r border-border-subtle bg-bg-elevated',
        className,
      )}
    >
      <div className="px-4 pt-5 pb-4">
        <AdminBrand />
      </div>

      <div className="flex-1 overflow-y-auto px-1 pb-2">
        <AdminSidebarNav items={adminPrimaryNav} onNavigate={onNavigate} />
        <div className="mx-3 my-3 border-t border-border-subtle" />
        <AdminSidebarNav items={adminSecondaryNav} onNavigate={onNavigate} />
        <div className="px-2 pt-1">
          <Link
            to="/"
            preload="intent"
            onClick={onNavigate}
            className="flex h-10 items-center gap-2.5 rounded-xl px-2.5 text-sm font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg"
          >
            <ExternalLink className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
            Back to public site
          </Link>
        </div>
      </div>

      <SidebarFooter onNavigate={onNavigate} />
    </aside>
  )
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  return (
    <>
      <div className="hidden h-dvh shrink-0 md:block">
        <SidebarPanel />
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[65] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label="Close menu"
            onClick={onMobileClose}
          />
          <div className="absolute top-0 left-0 h-full w-[min(18rem,88vw)] shadow-2xl">
            <SidebarPanel onNavigate={onMobileClose} className="h-full" />
          </div>
        </div>
      ) : null}
    </>
  )
}
