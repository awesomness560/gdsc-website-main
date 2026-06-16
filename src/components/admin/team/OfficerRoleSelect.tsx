import { OFFICER_ROLES, getOfficerRole } from '#/data/officer-roles'
import { Select, type SelectOption } from '#/components/ui/Select'
import type { OfficerRoleId } from '#/types/admin-team'
import { cn } from '#/lib/cn'

function roleRow(roleId: OfficerRoleId) {
  const role = getOfficerRole(roleId)
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={cn('h-2.5 w-2.5 shrink-0 rounded-full', role.dotClass)}
        aria-hidden
      />
      <span className="font-medium text-fg">{role.label}</span>
    </span>
  )
}

const roleOptions: SelectOption<OfficerRoleId>[] = OFFICER_ROLES.map((role) => ({
  value: role.id,
  label: role.label,
  triggerLabel: roleRow(role.id),
  optionContent: roleRow(role.id),
}))

type OfficerRoleSelectProps = {
  value: OfficerRoleId
  onChange: (value: OfficerRoleId) => void
  disabled?: boolean
  className?: string
}

export function OfficerRoleSelect({
  value,
  onChange,
  disabled,
  className,
}: OfficerRoleSelectProps) {
  return (
    <Select
      label="Role"
      value={value}
      options={roleOptions}
      onChange={onChange}
      disabled={disabled}
      className={className}
    />
  )
}
