import { getMembershipSiteConfig } from '#/lib/site-config'

const membership = getMembershipSiteConfig()

/** GDG chapter page — from `config/site.toml`. */
export const GDG_CHAPTER_URL = membership.gdg_chapter_url

export const MEMBERSHIP_CONTACT_EMAIL = membership.contact_email
export const JOIN_PAGE_PATH = '/join'

const MEMBERSHIP_CLAIM_KEY = 'gdg_membership_claimed'

export function formatMembershipDeadline(isoDate: string) {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Chicago',
  })
}

export function hasClaimedMembership() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(MEMBERSHIP_CLAIM_KEY) === 'true'
}

export function recordMembershipClaim() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(MEMBERSHIP_CLAIM_KEY, 'true')
}

export function clearMembershipClaim() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(MEMBERSHIP_CLAIM_KEY)
}
