import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isNavGroup, type NavGroup, type NavLink, type SiteNavItem } from '#/types/navigation'
import { cn } from '#/lib/cn'

type SiteNavbarProps = {
  items: SiteNavItem[]
}

const linkClass =
  'rounded-2xl px-4 py-2.5 text-sm font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg'

const mobileLinkClass =
  'block rounded-xl px-3 py-2.5 text-sm font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg'

function isPathActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function isGroupActive(pathname: string, group: NavGroup) {
  return (
    isPathActive(pathname, group.href) ||
    group.children.some((child) => isPathActive(pathname, child.href))
  )
}

function DesktopNavLink({
  link,
  pathname,
}: {
  link: NavLink
  pathname: string
}) {
  const active = isPathActive(pathname, link.href)
  return (
    <Link
      to={link.href}
      preload="intent"
      className={cn(linkClass, active && 'bg-white/5 text-fg')}
    >
      {link.label}
    </Link>
  )
}

function DesktopNavGroup({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  const [open, setOpen] = useState(false)
  const groupActive = isGroupActive(pathname, group)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={group.href}
        preload="intent"
        className={cn(
          linkClass,
          'inline-flex items-center gap-1',
          (groupActive || open) && 'bg-white/5 text-fg',
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {group.label}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </Link>

      <div
        className={cn(
          'absolute top-full left-1/2 z-50 min-w-[12rem] -translate-x-1/2 pt-2 transition-[opacity,transform] duration-150',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        )}
      >
        <div className="rounded-xl border border-border-default bg-surface-raised p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
          {group.children.map((child) => {
            const childActive = isPathActive(pathname, child.href)
            return (
              <Link
                key={child.href}
                to={child.href}
                preload="intent"
                className={cn(
                  'block rounded-lg px-3 py-2.5 text-sm text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg',
                  childActive && 'bg-white/5 text-fg',
                )}
              >
                {child.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function MobileNavLink({
  link,
  pathname,
  onNavigate,
  className,
}: {
  link: NavLink
  pathname: string
  onNavigate?: () => void
  className?: string
}) {
  const active = isPathActive(pathname, link.href)
  return (
    <Link
      to={link.href}
      preload="intent"
      onClick={onNavigate}
      className={cn(mobileLinkClass, className, active && 'bg-white/5 text-fg')}
    >
      {link.label}
    </Link>
  )
}

function MobileNavGroup({
  group,
  pathname,
  onNavigate,
}: {
  group: NavGroup
  pathname: string
  onNavigate: () => void
}) {
  const groupActive = isGroupActive(pathname, group)
  const [expanded, setExpanded] = useState(groupActive)

  useEffect(() => {
    if (groupActive) setExpanded(true)
  }, [groupActive])

  return (
    <div className="rounded-xl border border-border-subtle/80 bg-bg-elevated/40">
      <button
        type="button"
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors',
          groupActive ? 'text-fg' : 'text-fg-secondary',
        )}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <span>{group.label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            expanded && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-0.5 border-t border-border-subtle px-2 py-2">
            {group.children.map((child) => (
              <MobileNavLink
                key={child.href}
                link={child}
                pathname={pathname}
                onNavigate={onNavigate}
                className="pl-3"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SiteNavbar({ items }: SiteNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMenu}
        />
      ) : null}

      <header className="sticky top-0 z-50 overflow-visible px-4 pt-3 backdrop-blur-md">
        <nav
          className={cn(
            'relative mx-auto max-w-6xl overflow-visible rounded-3xl border border-border-subtle px-4 py-3 sm:px-6',
            'bg-surface-overlay shadow-[0_12px_40px_rgba(0,0,0,0.28)]',
          )}
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-4 overflow-visible">
            <Link
              to="/"
              preload="intent"
              aria-label="GDSC home"
              className="flex shrink-0 items-center gap-2.5"
              onClick={closeMenu}
            >
              <img
                src="/gdsc-icon.png"
                alt=""
                width={36}
                height={36}
                decoding="async"
                className="h-9 w-9 shrink-0 rounded-lg object-contain"
              />
              <span className="text-base font-bold leading-none tracking-tight">
                GDSC
              </span>
            </Link>

            <div className="hidden items-center gap-1 overflow-visible md:flex">
              {items.map((item) =>
                isNavGroup(item) ? (
                  <DesktopNavGroup
                    key={item.label}
                    group={item}
                    pathname={pathname}
                  />
                ) : (
                  <DesktopNavLink
                    key={item.label}
                    link={item}
                    pathname={pathname}
                  />
                ),
              )}
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-default text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          <div
            id="mobile-nav-menu"
            className={cn(
              'overflow-hidden transition-[max-height,opacity] duration-200 ease-out md:hidden',
              menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            <div className="mt-3 flex flex-col gap-2 border-t border-border-subtle pt-3">
              {items.map((item) =>
                isNavGroup(item) ? (
                  <MobileNavGroup
                    key={item.label}
                    group={item}
                    pathname={pathname}
                    onNavigate={closeMenu}
                  />
                ) : (
                  <MobileNavLink
                    key={item.label}
                    link={item}
                    pathname={pathname}
                    onNavigate={closeMenu}
                  />
                ),
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
