import { Loader2, LogOut } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BecomeMemberLink } from '#/components/membership/BecomeMemberLink'
import { MemberPill } from '#/components/membership/MemberPill'
import { UserAvatar } from '#/components/ui/UserAvatar'
import type { AuthUser } from '#/types/auth'
import { cn } from '#/lib/cn'

const avatarButtonClass =
  'relative rounded-full transition-[transform,box-shadow] duration-200 ease-out hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

const avatarHoverRing =
  'hover:shadow-[0_0_0_2px_rgba(74,140,255,0.45)]'

const avatarOpenRing =
  'shadow-[0_0_0_2px_rgba(74,140,255,0.55)] ring-2 ring-accent/35'

type ProfileMenuPanelProps = {
  user: AuthUser
  onSignOut: () => void
  signingOut: boolean
  className?: string
}

function ProfileMenuHeader({ user }: { user: AuthUser }) {
  return (
    <div className="border-b border-border-subtle px-3.5 py-3">
      <p className="truncate text-sm font-semibold text-fg">{user.name}</p>
      <p className="truncate text-xs text-fg-muted">{user.auth.email}</p>
      <div className="mt-2">
        {user.isVerified ? (
          <MemberPill />
        ) : (
          <BecomeMemberLink />
        )}
      </div>
    </div>
  )
}

function ProfileMenuPanel({
  user,
  onSignOut,
  signingOut,
  className,
}: ProfileMenuPanelProps) {
  return (
    <div
      className={cn(
        'min-w-[14rem] overflow-hidden rounded-2xl border border-border-default',
        'bg-surface-overlay shadow-[0_16px_40px_rgba(0,0,0,0.42)] ring-1 ring-white/8',
        className,
      )}
      role="menu"
    >
      <ProfileMenuHeader user={user} />
      <button
        type="button"
        role="menuitem"
        disabled={signingOut}
        onClick={onSignOut}
        className={cn(
          'flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-fg-secondary',
          'transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60',
        )}
      >
        {signingOut ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-fg-muted" aria-hidden />
        ) : (
          <LogOut className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
        )}
        Log out
      </button>
    </div>
  )
}

type NavProfileMenuProps = {
  user: AuthUser
  onSignOut: () => void
  signingOut: boolean
  variant: 'desktop' | 'mobile'
}

export function NavProfileMenu({
  user,
  onSignOut,
  signingOut,
  variant,
}: NavProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (variant !== 'mobile' || !open) return

    function handlePointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, variant])

  const avatarSize = variant === 'desktop' ? 'md' : 'nav'

  const trigger = (
    <button
      type="button"
      className={cn(
        avatarButtonClass,
        avatarHoverRing,
        open && avatarOpenRing,
      )}
      aria-expanded={open}
      aria-haspopup="menu"
      aria-label="Account menu"
      onClick={variant === 'mobile' ? () => setOpen((v) => !v) : undefined}
    >
      <UserAvatar
        name={user.name}
        email={user.auth.email}
        avatarUrl={user.avatarUrl}
        size={avatarSize}
        memberRing={user.isVerified}
      />
    </button>
  )

  if (variant === 'desktop') {
    return (
      <div
        className="relative ml-2 hidden md:block"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {trigger}
        <div
          className={cn(
            'absolute top-full right-0 z-50 pt-1.5 transition-[opacity,transform] duration-200 ease-out',
            open
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-0.5 opacity-0',
          )}
        >
          <ProfileMenuPanel
            user={user}
            onSignOut={onSignOut}
            signingOut={signingOut}
          />
        </div>
      </div>
    )
  }

  return (
    <div ref={rootRef} className="relative md:hidden">
      {trigger}
      <div
        className={cn(
          'absolute top-full right-0 z-50 pt-1.5 transition-[opacity,transform] duration-200 ease-out',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-0.5 scale-[0.98] opacity-0',
        )}
      >
        <ProfileMenuPanel
          user={user}
          onSignOut={() => {
            onSignOut()
            setOpen(false)
          }}
          signingOut={signingOut}
          className="max-w-[min(16rem,calc(100vw-2rem))]"
        />
      </div>
    </div>
  )
}

export function NavAuthSkeleton({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        'h-9 w-9 shrink-0 rounded-full bg-white/5 animate-pulse md:h-10 md:w-10',
        className,
      )}
      aria-hidden
    >
      {children}
    </div>
  )
}
