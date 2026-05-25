import { MoreHorizontal } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MemberStatusPill } from '#/components/admin/members/MemberStatusPill'
import { UserAvatar } from '#/components/ui/UserAvatar'
import type { AdminMember } from '#/types/admin-member'
import { formatShortDate, primaryRoleLabel } from '#/lib/admin-member-utils'
import { cn } from '#/lib/cn'

type MembersTableProps = {
  members: AdminMember[]
  selectedIds: Set<string>
  onToggleSelect: (id: string) => void
  onToggleSelectAll: (checked: boolean) => void
  onRowClick: (member: AdminMember) => void
  onFlipMembership: (id: string) => void
  onMakeAdmin: (id: string) => void
  onRemove: (id: string) => void
  disabled?: boolean
}

type MenuPosition = {
  top: number
  right: number
}

const MENU_GAP = 4

function RowActionsMenu({
  member,
  onFlipMembership,
  onMakeAdmin,
  onRemove,
}: {
  member: AdminMember
  onFlipMembership: (id: string) => void
  onMakeAdmin: (id: string) => void
  onRemove: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  function updateMenuPosition() {
    const button = buttonRef.current
    const menu = menuRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const menuHeight = menu?.offsetHeight ?? 132
    const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP
    const openAbove =
      spaceBelow < menuHeight && rect.top - MENU_GAP >= menuHeight

    const top = openAbove
      ? rect.top - menuHeight - MENU_GAP
      : rect.bottom + MENU_GAP

    setMenuPosition({
      top: Math.max(MENU_GAP, top),
      right: Math.max(MENU_GAP, window.innerWidth - rect.right),
    })
  }

  useLayoutEffect(() => {
    if (!open) return
    updateMenuPosition()
  }, [open])

  useEffect(() => {
    if (!open) return

    function handlePointerDown(e: MouseEvent) {
      const target = e.target as Node
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return
      }
      setOpen(false)
      setMenuPosition(null)
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        setMenuPosition(null)
      }
    }

    function handleReposition() {
      updateMenuPosition()
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleReposition)
    window.addEventListener('scroll', handleReposition, true)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleReposition)
      window.removeEventListener('scroll', handleReposition, true)
    }
  }, [open])

  const menu =
    open && menuPosition
      ? createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: 'fixed',
              top: menuPosition.top,
              right: menuPosition.right,
              zIndex: 100,
            }}
            className="min-w-[11rem] overflow-hidden rounded-xl border border-border-default bg-surface-overlay py-1 shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm text-fg-secondary hover:bg-white/5 hover:text-fg"
              onClick={(e) => {
                e.stopPropagation()
                onFlipMembership(member.id)
                setOpen(false)
              }}
            >
              Flip membership flag
            </button>
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm text-fg-secondary hover:bg-white/5 hover:text-fg"
              onClick={(e) => {
                e.stopPropagation()
                onMakeAdmin(member.id)
                setOpen(false)
              }}
            >
              Make admin
            </button>
            <button
              type="button"
              role="menuitem"
              className="block w-full px-3 py-2 text-left text-sm text-google-red hover:bg-google-red/10"
              onClick={(e) => {
                e.stopPropagation()
                onRemove(member.id)
                setOpen(false)
              }}
            >
              Remove
            </button>
          </div>,
          document.body,
        )
      : null

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
        aria-label={`Actions for ${member.name}`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(e) => {
          e.stopPropagation()
          if (open) {
            setOpen(false)
            setMenuPosition(null)
            return
          }
          const rect = buttonRef.current?.getBoundingClientRect()
          if (!rect) return
          setMenuPosition({
            top: rect.bottom + MENU_GAP,
            right: Math.max(MENU_GAP, window.innerWidth - rect.right),
          })
          setOpen(true)
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {menu}
    </div>
  )
}

export function MembersTable({
  members,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onRowClick,
  onFlipMembership,
  onMakeAdmin,
  onRemove,
  disabled,
}: MembersTableProps) {
  const allSelected =
    members.length > 0 && members.every((m) => selectedIds.has(m.id))

  return (
    <div className="overflow-x-auto rounded-xl border border-border-default">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border-default bg-bg-elevated/60 text-xs font-semibold tracking-wide text-fg-muted uppercase">
            <th className="w-12 px-3 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                aria-label="Select all members"
                onChange={(e) => onToggleSelectAll(e.target.checked)}
                className="h-4 w-4 rounded border-border-strong accent-accent"
              />
            </th>
            <th className="px-3 py-3 font-semibold">Member</th>
            <th className="px-3 py-3 font-semibold">Status</th>
            <th className="px-3 py-3 font-semibold">Role</th>
            <th className="px-3 py-3 font-semibold">Joined</th>
            <th className="px-3 py-3 font-semibold">Last activity</th>
            <th className="w-12 px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const selected = selectedIds.has(member.id)
            return (
              <tr
                key={member.id}
                className={cn(
                  'cursor-pointer border-b border-border-subtle transition-colors last:border-b-0',
                  'hover:bg-white/[0.03]',
                  selected && 'bg-accent/5',
                )}
                onClick={() => !disabled && onRowClick(member)}
              >
                <td className="px-3 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected}
                    aria-label={`Select ${member.name}`}
                    onChange={() => onToggleSelect(member.id)}
                    className="h-4 w-4 rounded border-border-strong accent-accent"
                  />
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      name={member.name}
                      email={member.email ?? undefined}
                      avatarUrl={member.avatarUrl}
                      size="sm"
                      memberRing={member.isMember}
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-fg">{member.name}</p>
                      <p className="truncate text-xs text-fg-muted">
                        {member.email ?? '—'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <MemberStatusPill isMember={member.isMember} />
                </td>
                <td className="px-3 py-4 text-fg-secondary">
                  {primaryRoleLabel(member.roles)}
                </td>
                <td className="px-3 py-4 text-fg-secondary tabular-nums">
                  {formatShortDate(member.joinedAt)}
                </td>
                <td className="px-3 py-4 text-fg-muted">
                  {member.lastActivity ?? '—'}
                </td>
                <td className="px-3 py-4" onClick={(e) => e.stopPropagation()}>
                  <RowActionsMenu
                    member={member}
                    onFlipMembership={onFlipMembership}
                    onMakeAdmin={onMakeAdmin}
                    onRemove={onRemove}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
