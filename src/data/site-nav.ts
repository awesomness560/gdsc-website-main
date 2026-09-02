import type { SiteNavItem } from '#/types/navigation'
import { GDG_CHAPTER_URL } from '#/lib/membership'

export const siteNavItems: SiteNavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Join GDG', href: GDG_CHAPTER_URL, external: true },
  // Hidden until the Events and HackDSC pages are ready to publish again.
  // { label: 'Events', href: '/events' },
  // { label: 'HACKDSC', href: '/hackdsc' },
]

export const signInNavLink = { label: 'Sign in', href: '/login' } as const
