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
        'flex w-full gap-4 rounded-2xl border border-google-yellow/35 bg-google-yellow/10 px-4 py-4 sm:px-5',
        className,
      )}
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-google-yellow/20">
        <AlertCircle className="h-5 w-5 text-google-yellow" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-fg">Membership required for review</p>
        <p className="mt-1 text-sm leading-relaxed text-fg-secondary">
          Your application needs full GDG membership before it can be considered.{' '}
          <BecomeMemberLink className="font-semibold text-accent underline decoration-accent/60 underline-offset-[3px] hover:text-accent-hover hover:decoration-accent" />
        </p>
      </div>
    </div>
  )
}
