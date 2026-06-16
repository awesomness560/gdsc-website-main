import { Pencil, UserMinus, UserPlus } from 'lucide-react'
import { OfficerRoleBadge } from '#/components/admin/team/OfficerRoleBadge'
import { getAvatarColorClass, getInitials } from '#/lib/avatar'
import { truncateBio } from '#/lib/admin-team-utils'
import type { AdminOfficer } from '#/types/admin-team'
import { cn } from '#/lib/cn'

type OfficerCardProps = {
  officer: AdminOfficer
  onEdit: () => void
  onDeactivate: () => void
  onReactivate?: () => void
  disabled?: boolean
}

export function OfficerCard({
  officer,
  onEdit,
  onDeactivate,
  onReactivate,
  disabled,
}: OfficerCardProps) {
  const deactivated = !officer.active

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-2xl border border-border-default bg-surface p-4 transition-colors',
        deactivated
          ? 'grayscale opacity-70 hover:opacity-80'
          : 'hover:border-border-strong',
      )}
    >
      <div className="flex items-start gap-3">
        {officer.officerImageUrl ? (
          <img
            src={officer.officerImageUrl}
            alt=""
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <span
            aria-hidden
            className={cn(
              'inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-lg font-semibold tracking-tight text-white/95',
              deactivated ? 'bg-fg-muted/40' : getAvatarColorClass(officer.email || officer.memberId),
            )}
          >
            {getInitials(officer.name)}
          </span>
        )}
        <div className="min-w-0 flex-1 pt-1">
          <h3 className="truncate text-base font-semibold tracking-tight text-fg">
            {officer.name}
          </h3>
          <OfficerRoleBadge
            roleId={officer.roleId}
            muted={deactivated}
            className="mt-2 normal-case"
          />
        </div>
      </div>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-fg-secondary">
        {officer.bio.trim() ? truncateBio(officer.bio) : 'No bio yet'}
      </p>

      <div
        className={cn(
          'mt-4 flex items-center justify-end gap-1 border-t border-border-subtle pt-3',
          'opacity-100 md:opacity-0 md:group-hover:opacity-100',
        )}
      >
        <button
          type="button"
          onClick={onEdit}
          disabled={disabled}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border-default px-3 text-xs font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:opacity-60"
        >
          <Pencil className="h-3.5 w-3.5" aria-hidden />
          Edit
        </button>
        {deactivated ? (
          <button
            type="button"
            onClick={onReactivate}
            disabled={disabled}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border-default px-3 text-xs font-medium text-fg-secondary transition-colors hover:border-google-green/40 hover:bg-google-green/10 hover:text-google-green disabled:opacity-60"
          >
            <UserPlus className="h-3.5 w-3.5" aria-hidden />
            Reactivate
          </button>
        ) : (
          <button
            type="button"
            onClick={onDeactivate}
            disabled={disabled}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-border-default px-3 text-xs font-medium text-fg-secondary transition-colors hover:border-google-yellow/40 hover:bg-google-yellow/10 hover:text-google-yellow disabled:opacity-60"
          >
            <UserMinus className="h-3.5 w-3.5" aria-hidden />
            Deactivate
          </button>
        )}
      </div>
    </article>
  )
}
