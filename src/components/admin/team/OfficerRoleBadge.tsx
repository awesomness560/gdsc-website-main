import { getOfficerRole } from '#/data/officer-roles'
import type { OfficerRoleId } from '#/types/admin-team'
import { cn } from '#/lib/cn'

type OfficerRoleBadgeProps = {
  roleId: OfficerRoleId
  /** Overrides the default role label text (keeps the role's color). */
  label?: string
  className?: string
  muted?: boolean
}

export function OfficerRoleBadge({
  roleId,
  label,
  className,
  muted = false,
}: OfficerRoleBadgeProps) {
  const role = getOfficerRole(roleId)

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide',
        muted
          ? 'border-border-default bg-white/5 text-fg-muted'
          : role.badgeClass,
        className,
      )}
    >
      {label ?? role.label}
    </span>
  )
}
