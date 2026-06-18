import { Link } from '@tanstack/react-router'
import { BadgeCheck, FileText, LayoutDashboard, Loader2, LogOut, User } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useOfficer } from '#/contexts/OfficerContext'
import { useUserAvatarPresentation } from '#/hooks/use-user-avatar-presentation'
import { isAdminRole } from '#/lib/auth-roles'
import { BecomeMemberLink } from '#/components/membership/BecomeMemberLink'
import { MemberPill } from '#/components/membership/MemberPill'
import { UserAvatar } from '#/components/ui/UserAvatar'
import type { AuthUser } from '#/types/auth'
import { cn } from '#/lib/cn'
import { hasHackdscHackathonId } from '#/lib/hackathon-config'
import { useMyHackathonSubmissionQuery } from '#/queries/hackathon-submissions'

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
  onNavigate?: () => void
}

function ProfileMenuHeader({ user }: { user: AuthUser }) {
  const avatar = useUserAvatarPresentation()

  return (
    <div className="border-b border-border-subtle px-3.5 py-3">
      <p className="truncate text-sm font-semibold text-fg">{avatar.name}</p>
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

const menuItemClass =
  'flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60'

function ProfileMenuPanel({
  user,
  onSignOut,
  signingOut,
  className,
  onNavigate,
}: ProfileMenuPanelProps) {
  const showAdminLink = isAdminRole(user.roles)
  const { isOfficer } = useOfficer()
  const canShowHackdsc = hasHackdscHackathonId()
  const submissionQuery = useMyHackathonSubmissionQuery(
    user.auth.id,
    canShowHackdsc ? undefined : null,
  )
  const hasSubmission = Boolean(submissionQuery.data)

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
      <Link
        to="/account"
        role="menuitem"
        onClick={onNavigate}
        className={menuItemClass}
      >
        <User className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
        My account
      </Link>
      {hasSubmission ? (
        <Link
          to="/account/hackdsc"
          role="menuitem"
          onClick={onNavigate}
          className={menuItemClass}
        >
          <FileText className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
          My application
        </Link>
      ) : null}
      {isOfficer ? (
        <Link
          to="/account/officer"
          role="menuitem"
          onClick={onNavigate}
          className={menuItemClass}
        >
          <BadgeCheck className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
          Officer profile
        </Link>
      ) : null}
      {showAdminLink ? (
        <Link
          to="/admin"
          role="menuitem"
          onClick={onNavigate}
          className={menuItemClass}
        >
          <LayoutDashboard className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
          Admin dashboard
        </Link>
      ) : null}
      <button
        type="button"
        role="menuitem"
        disabled={signingOut}
        onClick={onSignOut}
        className={menuItemClass}
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
  const avatar = useUserAvatarPresentation()

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
        name={avatar.name}
        email={avatar.email}
        avatarUrl={avatar.avatarUrl}
        size={avatarSize}
        memberRing={avatar.memberRing}
        officerAccentColor={avatar.officerAccentColor}
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
          onNavigate={() => setOpen(false)}
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
