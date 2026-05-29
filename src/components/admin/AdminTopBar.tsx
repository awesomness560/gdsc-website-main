import { Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { adminBreadcrumbLabel } from '#/lib/admin-nav'
import { cn } from '#/lib/cn'

type AdminTopBarProps = {
  onMenuOpen: () => void
}

export function AdminTopBar({ onMenuOpen }: AdminTopBarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const breadcrumb = adminBreadcrumbLabel(pathname)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <header className="relative z-40 shrink-0 border-b border-border-subtle bg-bg-base/90 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,28rem)_minmax(0,1fr)] md:items-center md:gap-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3 md:min-w-0">
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border-default text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg md:hidden"
            aria-label="Open menu"
            onClick={onMenuOpen}
          >
            <Menu className="h-4 w-4" />
          </button>

          <p
            className={cn(
              'min-w-0 truncate text-sm font-semibold text-fg md:font-medium md:text-fg-secondary',
              mobileSearchOpen && 'hidden md:block',
            )}
          >
            {breadcrumb}
          </p>
        </div>

        <div
          className={cn(
            'flex min-w-0 items-center md:justify-center',
            mobileSearchOpen
              ? 'absolute inset-x-4 top-3 md:static md:inset-auto'
              : 'ml-auto md:ml-0',
          )}
        >
          {mobileSearchOpen ? (
            <label className="flex w-full items-center gap-2 md:max-w-none">
              <Search className="h-4 w-4 shrink-0 text-fg-muted" aria-hidden />
              <input
                type="search"
                placeholder="Search admin…"
                autoFocus
                className="h-9 w-full rounded-xl border border-border-default bg-bg-elevated/80 px-3 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40"
                onBlur={() => setMobileSearchOpen(false)}
              />
            </label>
          ) : (
            <>
              <label className="relative hidden w-full md:block">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fg-muted"
                  aria-hidden
                />
                <input
                  type="search"
                  placeholder="Search admin…"
                  className="h-9 w-full rounded-xl border border-border-default bg-bg-elevated/50 pr-14 pl-9 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40"
                />
                <kbd className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md border border-border-default bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-fg-muted">
                  ⌘K
                </kbd>
              </label>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-default text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg md:hidden"
                aria-label="Search"
                onClick={() => setMobileSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div className="hidden md:block" aria-hidden />
      </div>
    </header>
  )
}
