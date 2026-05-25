import { Link } from '@tanstack/react-router'
import { Pencil, X } from 'lucide-react'
import { SlideOverPanel } from '#/components/admin/SlideOverPanel'
import { MemberStatusPill } from '#/components/admin/members/MemberStatusPill'
import { UserAvatar } from '#/components/ui/UserAvatar'
import type { AdminMember } from '#/types/admin-member'
import { formatShortDate, primaryRoleLabel } from '#/lib/admin-member-utils'
import type { UserRole } from '#/types/auth'
import { cn } from '#/lib/cn'

type MemberDetailPanelProps = {
  member: AdminMember | null
  open: boolean
  onClose: () => void
  onToggleMembership: (id: string) => void
  onRoleChange: (id: string, role: UserRole) => void
  disabled?: boolean
}

const panelBtnClass =
  'inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border-default px-2.5 text-xs font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg'

const ROLE_OPTIONS: UserRole[] = ['user', 'officer', 'admin']

export function MemberDetailPanel({
  member,
  open,
  onClose,
  onToggleMembership,
  onRoleChange,
  disabled,
}: MemberDetailPanelProps) {
  if (!member) return null

  const primaryRole = primaryRoleLabel(member.roles)

  return (
    <SlideOverPanel
      open={open}
      onClose={onClose}
      ariaLabel={`Member details for ${member.name}`}
    >
      <header className="flex shrink-0 items-center gap-2 border-b border-border-default px-4 py-3">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-secondary hover:bg-white/5 hover:text-fg"
          aria-label="Close panel"
        >
          <X className="h-4 w-4" />
        </button>
        <button type="button" className={panelBtnClass}>
          <Pencil className="h-3.5 w-3.5" aria-hidden />
          Edit
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col items-start gap-3">
          <UserAvatar
            name={member.name}
            email={member.email ?? undefined}
            avatarUrl={member.avatarUrl}
            size="md"
            memberRing={member.isMember}
          />
          <div>
            <h2 className="text-xl font-semibold text-fg">{member.name}</h2>
            <p className="text-sm text-fg-secondary">{member.email ?? '—'}</p>
            <div className="mt-2">
              <MemberStatusPill isMember={member.isMember} />
            </div>
          </div>
        </div>

        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-fg-muted">Joined</dt>
            <dd className="mt-0.5 font-medium text-fg">
              {formatShortDate(member.joinedAt)}
            </dd>
          </div>

          <div>
            <dt className="text-fg-muted">Membership</dt>
            <dd className="mt-2">
              <button
                type="button"
                className={cn(
                  'inline-flex h-9 items-center rounded-xl border px-3 text-sm font-medium transition-colors',
                  member.isMember
                    ? 'border-border-default text-fg-secondary hover:bg-white/5'
                    : 'border-accent/40 bg-accent/10 text-accent hover:bg-accent/15',
                )}
                disabled={disabled}
                onClick={() => onToggleMembership(member.id)}
              >
                {member.isMember ? 'Flip to non-member' : 'Flip to member'}
              </button>
            </dd>
          </div>

          <div>
            <dt className="text-fg-muted">Role</dt>
            <dd className="mt-1.5">
              <select
                value={
                  member.roles.includes('admin')
                    ? 'admin'
                    : member.roles.includes('officer')
                      ? 'officer'
                      : 'user'
                }
                disabled={disabled}
                onChange={(e) =>
                  onRoleChange(member.id, e.target.value as UserRole)
                }
                className="h-9 w-full max-w-[200px] rounded-xl border border-border-default bg-bg-elevated px-3 text-sm text-fg outline-none focus:border-accent/40 disabled:opacity-60"
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {primaryRoleLabel([role])}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-fg-muted">Current: {primaryRole}</p>
            </dd>
          </div>
        </dl>

        {member.hackdscApplication ? (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-fg">HackDSC application</h3>
            <Link
              to={member.hackdscApplication.href}
              className="mt-1 inline-block text-sm text-accent hover:underline"
            >
              {member.hackdscApplication.label}
            </Link>
          </div>
        ) : null}

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-fg">Activity</h3>
          {member.activity.length === 0 ? (
            <p className="mt-2 text-sm text-fg-muted">No activity yet.</p>
          ) : (
            <ul className="mt-3 space-y-3 border-l border-border-subtle pl-4">
              {member.activity.map((item) => (
                <li key={item.id} className="relative text-sm">
                  <span
                    className="absolute top-1.5 -left-[1.125rem] h-2 w-2 rounded-full bg-border-strong"
                    aria-hidden
                  />
                  <p className="font-medium text-fg-secondary">{item.label}</p>
                  <p className="text-xs text-fg-muted">
                    {formatShortDate(item.date)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <label htmlFor="member-notes" className="text-sm font-semibold text-fg">
            Admin notes
          </label>
          <textarea
            id="member-notes"
            defaultValue={member.notes ?? ''}
            rows={3}
            placeholder="Context for other admins…"
            className="mt-2 w-full resize-y rounded-xl border border-border-default bg-bg-elevated/50 px-3 py-2 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40"
          />
        </div>

        <div className="mt-8 rounded-xl border border-google-red/25 bg-google-red/5 p-4">
          <h3 className="text-sm font-semibold text-google-red">Danger zone</h3>
          <p className="mt-1 text-xs text-fg-muted">
            Permanently remove this member from the workspace.
          </p>
          <button
            type="button"
            className="mt-3 inline-flex h-9 items-center rounded-xl border border-google-red/40 px-3 text-sm font-medium text-google-red transition-colors hover:bg-google-red/10"
          >
            Remove member
          </button>
        </div>
      </div>
    </SlideOverPanel>
  )
}
