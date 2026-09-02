import { createFileRoute } from '@tanstack/react-router'
import { AboutTeamContent } from '#/components/sections/about/AboutTeamContent'
import { aboutTeamData } from '#/data/about-team'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

/**
 * The team roster is hand-maintained in `src/data/about-team.ts` for launch.
 * To switch back to the live Supabase-backed roster, restore the
 * `useAboutPageQuery()` version of this component (see git history) — the query
 * and admin editor are still in place.
 */
function AboutPage() {
  return (
    <main>
      <AboutTeamContent data={aboutTeamData} />
    </main>
  )
}
