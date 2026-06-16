import { createFileRoute } from '@tanstack/react-router'
import { AboutTeamContent } from '#/components/sections/about/AboutTeamContent'
import { getAboutPageQueryError, useAboutPageQuery } from '#/queries/about'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

const headerBtnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg'

function AboutPage() {
  const aboutQuery = useAboutPageQuery()

  if (aboutQuery.isPending) {
    return (
      <main>
        <div className="mx-auto max-w-xl px-4 py-24 text-center text-sm text-fg-muted">
          Loading team…
        </div>
      </main>
    )
  }

  if (aboutQuery.isError || !aboutQuery.data) {
    return (
      <main>
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <p className="text-sm text-fg-secondary">
            {getAboutPageQueryError(aboutQuery.error)}
          </p>
          <button
            type="button"
            className={`${headerBtnSecondary} mt-4`}
            onClick={() => void aboutQuery.refetch()}
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <AboutTeamContent data={aboutQuery.data} />
    </main>
  )
}
