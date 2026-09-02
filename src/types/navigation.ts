export interface NavLink {
  label: string
  href: string
  /** Render as a plain external anchor (opens in a new tab) instead of a router Link. */
  external?: boolean
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
