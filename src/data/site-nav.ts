import type { SiteNavItem } from '#/types/navigation'

export const siteNavItems: SiteNavItem[] = [
  { label: 'Events', href: '/events' },
  { label: 'About Us', href: '/about' },
  {
    label: 'HACKDSC',
    href: '/hackdsc',
    children: [
      { label: 'Overview', href: '/hackdsc' },
      { label: 'Schedule', href: '/hackdsc/schedule' },
    ],
  },
]
