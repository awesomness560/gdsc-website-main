import { AlertCircle } from 'lucide-react'
import { BecomeMemberLink } from '#/components/membership/BecomeMemberLink'
import { cn } from '#/lib/cn'

type MembershipEligibilityCalloutProps = {
  className?: string
}

export function MembershipEligibilityCallout({
  className,
}: MembershipEligibilityCalloutProps) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-2xl border border-google-yellow/35 bg-google-yellow/10 px-4 py-3.5 sm:px-5',
        className,
      )}
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-google-yellow/20">
        <AlertCircle className="h-5 w-5 text-google-yellow" aria-hidden />
      </span>
      <p className="text-sm leading-relaxed text-fg-secondary">
        <span className="font-medium text-fg">Membership required for review.</span>{' '}
        Your application needs full GDG membership before it can be considered.{' '}
        <BecomeMemberLink className="font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent" />
      </p>
    </div>
  )
}
