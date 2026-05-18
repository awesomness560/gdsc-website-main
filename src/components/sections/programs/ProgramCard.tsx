import { Code2, Users } from 'lucide-react'
import type { Program } from '#/types/landing'
import { Badge } from '#/components/ui/Badge'
import { Card } from '#/components/ui/Card'
import { cn } from '#/lib/cn'

type ProgramCardProps = {
  program: Program
}

const icons = {
  blue: Code2,
  green: Users,
} as const

export function ProgramCard({ program }: ProgramCardProps) {
  const Icon = icons[program.accent]
  const isBlue = program.accent === 'blue'

  return (
    <Card hover variant="elevated" className="h-full">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
            isBlue
              ? 'border-google-blue/25 bg-google-blue/10 text-google-blue'
              : 'border-google-green/25 bg-google-green/10 text-google-green',
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <Badge tone={isBlue ? 'blue' : 'green'} className="w-fit">
            {program.kicker}
          </Badge>
          <h3 className="mt-1.5 text-xl font-bold tracking-tight leading-tight">
            {program.title}
          </h3>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
        {program.description}
      </p>
    </Card>
  )
}
