import { Link } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { useAuth } from '#/contexts/AuthContext'
import {
  formatMembershipDeadline,
  JOIN_PAGE_PATH,
} from '#/lib/membership'
import { cn } from '#/lib/cn'

type HackMembershipBannerProps = {
  membershipDeadline: string
  className?: string
}

export function HackMembershipBanner({
  membershipDeadline,
  className,
}: HackMembershipBannerProps) {
  const { isMember } = useAuth()
  const deadlineLabel = formatMembershipDeadline(membershipDeadline)

  if (isMember) {
    return (
      <div
        className={cn(
          'mx-auto max-w-2xl rounded-2xl border border-google-green/25 bg-google-green/10 px-4 py-3 text-center text-sm text-fg-secondary',
          className,
        )}
      >
        <p className="inline-flex items-center justify-center gap-2 font-medium text-fg">
          <Check className="h-4 w-4 text-google-green" aria-hidden />
          You&apos;re a full member — your application is eligible for review.
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'mx-auto max-w-2xl rounded-2xl border border-google-yellow/25 bg-google-yellow/10 px-4 py-3 text-center text-sm leading-relaxed text-fg-secondary',
        className,
      )}
    >
      <p>
        You can apply, but you must complete membership before{' '}
        <span className="font-medium text-fg">{deadlineLabel}</span> for your
        application to be considered.{' '}
        <Link
          to={JOIN_PAGE_PATH}
          className="font-medium text-fg transition-colors hover:text-accent"
        >
          Become a member →
        </Link>
      </p>
    </div>
  )
}
