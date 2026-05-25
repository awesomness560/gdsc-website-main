import { getHackdscSiteConfig } from '#/lib/hackathon-config'

export function ApplicationsEmptyState() {
  const { name } = getHackdscSiteConfig()

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <p className="text-lg font-medium text-fg">No applications yet</p>
        <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
          Once {name} applications are submitted, they&apos;ll appear here for
          review.
        </p>
      </div>
    </div>
  )
}
