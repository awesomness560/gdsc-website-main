import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { NavLink } from '#/types/landing'
import { cn } from '#/lib/cn'

type SiteNavbarProps = {
  links: NavLink[]
}

export function SiteNavbar({ links }: SiteNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

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

      <header className="sticky top-0 z-50 px-4 pt-3 backdrop-blur-md">
        <nav
          className={cn(
            'relative mx-auto max-w-6xl rounded-3xl border border-border-subtle px-4 py-3 sm:px-6',
            'bg-surface-overlay shadow-[0_12px_40px_rgba(0,0,0,0.28)]',
          )}
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="/"
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
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-2.5 text-sm font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg"
                >
                  {link.label}
                </a>
              ))}
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
              menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            <div className="mt-3 flex flex-col gap-1 border-t border-border-subtle pt-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
