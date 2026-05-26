import { Link, Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { CalendarDays, FileText, Settings, User } from 'lucide-react'
import type { ReactNode } from 'react'
import { hasAuthSession } from '#/api/auth'
import { useAuth } from '#/contexts/AuthContext'
import { hasHackdscHackathonId } from '#/lib/hackathon-config'
import { getInitials } from '#/lib/avatar'
import { cn } from '#/lib/cn'
import { MemberPill } from '#/components/membership/MemberPill'
import { BecomeMemberLink } from '#/components/membership/BecomeMemberLink'
import { UserAvatar } from '#/components/ui/UserAvatar'
import { useMyHackathonSubmissionQuery } from '#/queries/hackathon-submissions'

export const Route = createFileRoute('/account')({
  beforeLoad: async () => {
    const signedIn = await hasAuthSession()
    if (!signedIn) throw redirect({ to: '/login', search: { redirect: '/account' } })
  },
  component: AccountLayout,
})

type AccountTab = {
  to: '/account' | '/account/events' | '/account/hackdsc' | '/account/settings'
  label: string
  icon: ReactNode
  hidden?: boolean
}

const tabBaseClass =
  'inline-flex items-center gap-2 px-2.5 py-3 text-sm font-medium text-fg-muted transition-colors hover:text-fg'

function AccountLayout() {
  const { user } = useAuth()
  if (!user) return null

  const userId = user.auth.id
  const canShowHackdsc = hasHackdscHackathonId()
  const hackdscSubmissionQuery = useMyHackathonSubmissionQuery(
    userId,
    canShowHackdsc ? undefined : null,
  )

  const hasHackdscSubmission = Boolean(hackdscSubmissionQuery.data)

  const joinedSource = user.profile?.created_at ?? user.auth.createdAt
  const joinedLabel = new Date(joinedSource).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const tabs: (AccountTab & { exact?: boolean })[] = [
    {
      to: '/account',
      label: 'Overview',
      icon: <User className="h-4 w-4" aria-hidden />,
      exact: true,
    },
    {
      to: '/account/events',
      label: 'My events',
      icon: <CalendarDays className="h-4 w-4" aria-hidden />,
    },
    {
      to: '/account/hackdsc',
      label: 'HackDSC',
      icon: <FileText className="h-4 w-4" aria-hidden />,
      hidden: !hasHackdscSubmission,
    },
    {
      to: '/account/settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" aria-hidden />,
    },
  ]

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-12">
      <header className="rounded-2xl border border-border-default bg-surface/40 px-5 py-5 sm:px-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <UserAvatar
              name={user.name}
              email={user.auth.email}
              avatarUrl={user.avatarUrl}
              size="lg"
              memberRing={user.isVerified}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              {user.name || getInitials(user.auth.email)}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-fg-muted">
              <span className="truncate">{user.auth.email}</span>
              <span aria-hidden className="text-fg-muted/50">
                ·
              </span>
              <span>Joined {joinedLabel}</span>
              <span aria-hidden className="text-fg-muted/50">
                ·
              </span>
              {user.isVerified ? (
                <MemberPill />
              ) : (
                <span className="inline-flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-wide text-fg-muted uppercase">
                    Not yet a member
                  </span>
                  <BecomeMemberLink className="text-sm font-medium text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent" />
                </span>
              )}
            </div>
          </div>
        </div>

        <nav className="mt-5 -mx-2 overflow-x-auto">
          <div className="flex min-w-max gap-1 px-2">
            {tabs
              .filter((t) => !t.hidden)
              .map((tab) => (
                <RouteTab key={tab.to} to={tab.to} icon={tab.icon} exact={tab.exact}>
                  {tab.label}
                </RouteTab>
              ))}
          </div>
        </nav>
      </header>

      <section className="mx-auto mt-8 w-full max-w-3xl sm:max-w-none">
        <Outlet />
      </section>
    </main>
  )
}

function RouteTab({
  to,
  icon,
  children,
  exact,
}: {
  to: AccountTab['to']
  icon: ReactNode
  children: ReactNode
  exact?: boolean
}) {
  return (
    <Link
      to={to}
      activeOptions={exact ? { exact: true } : undefined}
      className={cn(
        tabBaseClass,
        'relative rounded-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
      )}
      activeProps={{
        className: cn(
          tabBaseClass,
          'text-fg',
          'after:absolute after:inset-x-2 after:bottom-1 after:h-[2px] after:rounded-full after:bg-accent',
        ),
      }}
    >
      {icon}
      {children}
    </Link>
  )
}

