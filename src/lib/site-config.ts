import type { SiteConfig } from '#/types/site-config'

const PLACEHOLDER_HACKATHON_ID = '00000000-0000-0000-0000-000000000000'

/** Committed site settings from `config/site.toml`. */
export function getSiteConfig(): SiteConfig {
  return __SITE_CONFIG__
}

export function getHackdscSiteConfig() {
  return getSiteConfig().hackdsc
}

export function getMembershipSiteConfig() {
  return getSiteConfig().membership
}

export function getHackdscHackathonId(): string {
  const id = getHackdscSiteConfig().hackathon_id.trim()
  if (!id || id === PLACEHOLDER_HACKATHON_ID) {
    throw new Error(
      'Set [hackdsc].hackathon_id in config/site.toml to your public.hackathons UUID.',
    )
  }
  return id
}

export function hasHackdscHackathonId(): boolean {
  const id = getHackdscSiteConfig().hackathon_id.trim()
  return Boolean(id && id !== PLACEHOLDER_HACKATHON_ID)
}
