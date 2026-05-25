import { Globe, Linkedin } from 'lucide-react'
import type { EventPresenter } from '#/types/events'
import { cn } from '#/lib/cn'

type EventPresenterCardProps = {
  presenter: EventPresenter
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function EventPresenterCard({ presenter }: EventPresenterCardProps) {
  const socials = [
    presenter.linkedInUrl
      ? { href: presenter.linkedInUrl, Icon: Linkedin, label: 'LinkedIn' }
      : null,
    presenter.websiteUrl
      ? { href: presenter.websiteUrl, Icon: Globe, label: 'Website' }
      : null,
  ].filter(Boolean) as Array<{
    href: string
    Icon: typeof Linkedin
    label: string
  }>

  return (
    <div className="flex gap-3 rounded-2xl border border-border-subtle bg-surface/50 p-4">
      {presenter.avatarUrl ? (
        <img
          src={presenter.avatarUrl}
          alt=""
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          className={cn(
            'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
            'border border-border-default bg-bg-elevated text-sm font-semibold text-fg-secondary',
          )}
        >
          {getInitials(presenter.name)}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="font-medium text-fg">{presenter.name}</p>
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-fg-muted transition-colors hover:text-fg"
              aria-label={`${presenter.name} on ${label}`}
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
        <p className="text-sm text-fg-secondary">{presenter.role}</p>
        {presenter.bio ? (
          <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{presenter.bio}</p>
        ) : null}
      </div>
    </div>
  )
}
