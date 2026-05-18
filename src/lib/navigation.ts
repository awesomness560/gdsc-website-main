/** In-app path (TanStack Router client navigation). */
export function isInternalPath(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

/** Same-page anchor (e.g. #events). */
export function isHashOnly(href: string): boolean {
  return href.startsWith('#')
}
