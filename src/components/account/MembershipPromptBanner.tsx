import { Link } from '@tanstack/react-router'
import { JOIN_PAGE_PATH } from '#/lib/membership'
import { cn } from '#/lib/cn'

type MembershipPromptBannerProps = {
  className?: string
}

export function MembershipPromptBanner({ className }: MembershipPromptBannerProps) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-google-yellow/25 bg-google-yellow/[0.08] py-6 pl-6 pr-5 sm:py-7 sm:pl-8 sm:pr-7',
        'border-l-[3px] border-l-google-yellow/70',
        className,
      )}
    >
      <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
        Membership
      </p>
      <h2 className="mt-2 text-lg font-semibold tracking-tight text-fg sm:text-xl">
        You&apos;re not a full member yet
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-secondary">
        Full membership is free and unlocks HackDSC application eligibility, member-only
        events, and priority access to club resources. It only takes a few minutes on the
        official GDG page.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link
          to={JOIN_PAGE_PATH}
          className="inline-flex h-11 items-center justify-center rounded-2xl bg-accent px-6 text-sm font-semibold text-accent-fg shadow-[0_12px_32px_rgba(74,140,255,0.28)] transition-colors hover:bg-accent-hover"
        >
          Become a member
        </Link>
        <Link
          to={JOIN_PAGE_PATH}
          className="text-sm font-medium text-fg-secondary transition-colors hover:text-fg"
        >
          Learn more
        </Link>
      </div>
    </section>
  )
}
