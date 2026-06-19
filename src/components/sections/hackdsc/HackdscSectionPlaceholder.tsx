import type { SectionCopy } from '#/types/landing'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { cn } from '#/lib/cn'

type HackdscSectionPlaceholderProps = SectionCopy & {
  message: string
  align?: 'left' | 'center'
  className?: string
}

export function HackdscSectionPlaceholder({
  kicker,
  title,
  titleGradient,
  subtitle,
  message,
  align = 'left',
  className,
}: HackdscSectionPlaceholderProps) {
  return (
    <section className={cn('py-14 sm:py-16', className)}>
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          kicker={kicker}
          title={title}
          titleGradient={titleGradient}
          subtitle={subtitle}
          align={align}
        />
        <div
          className={cn(
            'mt-10 rounded-2xl border border-dashed border-border-default bg-surface-raised/40 px-6 py-10',
            align === 'center' && 'text-center',
          )}
        >
          <p className="text-sm font-medium text-fg-muted sm:text-base">{message}</p>
        </div>
      </div>
    </section>
  )
}
