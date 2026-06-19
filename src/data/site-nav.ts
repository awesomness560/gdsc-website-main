import type { SiteNavItem } from '#/types/navigation'

export const siteNavItems: SiteNavItem[] = [
  { label: 'Events', href: '/events' },
  { label: 'About Us', href: '/about' },
  { label: 'HACKDSC', href: '/hackdsc' },
]

export const signInNavLink = { label: 'Sign in', href: '/login' } as const
