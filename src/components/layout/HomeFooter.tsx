import { Link } from '@tanstack/react-router'

export function HomeFooter() {
  return (
    <footer className="border-t border-border-subtle py-8 text-center">
      <p className="text-xs text-fg-muted">
        <Link
          to="/privacy"
          preload="intent"
          className="transition-colors hover:text-fg-secondary"
        >
          Privacy Policy
        </Link>
      </p>
    </footer>
  )
}
