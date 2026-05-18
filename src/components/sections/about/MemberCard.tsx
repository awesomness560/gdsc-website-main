import { User } from 'lucide-react'
import type { TeamMember } from '#/types/about'
import { Card } from '#/components/ui/Card'

type MemberCardProps = {
  member: TeamMember
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card hover className="w-full max-w-[220px] p-3">
      <div className="aspect-square overflow-hidden rounded-xl bg-bg-elevated">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-fg-muted">
            <User className="h-14 w-14" strokeWidth={1.25} />
          </div>
        )}
      </div>
      <div className="pt-3">
        <h3 className="text-base font-bold tracking-tight">{member.name}</h3>
        <p className="mt-0.5 text-sm text-fg-secondary">{member.role}</p>
      </div>
    </Card>
  )
}
