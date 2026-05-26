import { CheckCircle2, Clock3, FilePenLine } from 'lucide-react'
import type { SubmissionStatus } from '#/types/hackathon-submission'
import { cn } from '#/lib/cn'

type ApplicationStatusBannerProps = {
  status: SubmissionStatus
  className?: string
}

const statusConfig: Record<
  SubmissionStatus,
  {
    label: string
    description: string
    icon: typeof Clock3
    containerClass: string
    iconWrapClass: string
    iconClass: string
  }
> = {
  draft: {
    label: 'Draft application',
    description: 'Finish and submit when you’re ready — your progress is saved.',
    icon: FilePenLine,
    containerClass: 'border-google-yellow/30 bg-google-yellow/10',
    iconWrapClass: 'bg-google-yellow/20',
    iconClass: 'text-google-yellow',
  },
  submitted: {
    label: 'Under review',
    description: 'We’ll notify you by email once decisions are released.',
    icon: Clock3,
    containerClass: 'border-accent/35 bg-accent/10',
    iconWrapClass: 'bg-accent/20',
    iconClass: 'text-accent',
  },
}

export function ApplicationStatusBanner({
  status,
  className,
}: ApplicationStatusBannerProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'flex gap-4 rounded-2xl border px-4 py-4 sm:px-5',
        config.containerClass,
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
          config.iconWrapClass,
        )}
      >
        <Icon className={cn('h-5 w-5', config.iconClass)} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-fg">{config.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
          {config.description}
        </p>
        {status === 'submitted' ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            Application received
          </p>
        ) : null}
      </div>
    </div>
  )
}
