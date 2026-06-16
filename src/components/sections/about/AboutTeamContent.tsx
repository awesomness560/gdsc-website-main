import { useState } from 'react'
import { AboutHeroSection } from '#/components/sections/about/AboutHeroSection'
import { DivisionClusterSection } from '#/components/sections/about/DivisionClusterSection'
import { LeadershipClusterSection } from '#/components/sections/about/LeadershipClusterSection'
import { OfficerBioReveal } from '#/components/sections/about/OfficerBioReveal'
import { PastOfficersClusterSection } from '#/components/sections/about/PastOfficersClusterSection'
import type { AboutOfficer, AboutPageData } from '#/types/about'

type AboutTeamContentProps = {
  data: AboutPageData
}

export function AboutTeamContent({ data }: AboutTeamContentProps) {
  const [selectedOfficer, setSelectedOfficer] = useState<AboutOfficer | null>(
    null,
  )

  const hasTeam =
    data.president ||
    data.vicePresident ||
    data.divisions.length > 0 ||
    data.pastOfficers.length > 0

  return (
    <>
      <AboutHeroSection {...data.hero} />

      {!hasTeam ? (
        <section className="mx-auto max-w-xl px-4 pb-20 text-center">
          <p className="text-base text-fg-secondary">
            Officer profiles are being updated. Check back soon.
          </p>
        </section>
      ) : (
        <>
          <LeadershipClusterSection
            president={data.president}
            vicePresident={data.vicePresident}
            onSelectOfficer={setSelectedOfficer}
          />

          {data.divisions.map((division) => (
            <DivisionClusterSection
              key={division.id}
              division={division}
              onSelectOfficer={setSelectedOfficer}
            />
          ))}

          <PastOfficersClusterSection
            officers={data.pastOfficers}
            onSelectOfficer={setSelectedOfficer}
          />
        </>
      )}

      <OfficerBioReveal
        officer={selectedOfficer}
        open={selectedOfficer !== null}
        onClose={() => setSelectedOfficer(null)}
      />
    </>
  )
}
