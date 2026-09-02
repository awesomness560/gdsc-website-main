import { Link } from '@tanstack/react-router'
import { GDG_CHAPTER_URL, MEMBERSHIP_CONTACT_EMAIL } from '#/lib/membership'

const linkClass = 'text-fg-muted transition-colors hover:text-fg-secondary'

export function HomeFooter() {
  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/gdsc-icon.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-lg object-contain"
          />
          <div>
            <p className="text-sm font-semibold text-fg-secondary">
              GDG on Campus · UT Dallas
            </p>
            <p className="text-xs text-fg-muted">
              A student developer community. Not an official Google product.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link to="/about" preload="intent" className={linkClass}>
            About
          </Link>
          <a
            href={GDG_CHAPTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Join GDG
          </a>
          <a href={`mailto:${MEMBERSHIP_CONTACT_EMAIL}`} className={linkClass}>
            Contact
          </a>
          <Link to="/privacy" preload="intent" className={linkClass}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
