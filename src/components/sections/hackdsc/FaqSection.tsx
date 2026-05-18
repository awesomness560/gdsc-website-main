import type { HackFaqItem } from '#/types/hackdsc'
import { FaqItem } from '#/components/sections/hackdsc/FaqItem'
import { SectionHeading } from '#/components/ui/SectionHeading'

type FaqSectionProps = {
  kicker: string
  title: string
  items: HackFaqItem[]
}

export function FaqSection({ kicker, title, items }: FaqSectionProps) {
  return (
    <section className="border-t border-border-subtle bg-bg-elevated/40 py-14 pb-20 sm:py-16 sm:pb-24">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading kicker={kicker} title={title} align="center" />
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
