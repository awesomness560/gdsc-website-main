export interface NavLink {
  label: string
  href: string
}

export interface NavGroup {
  label: string
  href: string
  children: NavLink[]
}

export type SiteNavItem = NavLink | NavGroup

export function isNavGroup(item: SiteNavItem): item is NavGroup {
  return 'children' in item
}
