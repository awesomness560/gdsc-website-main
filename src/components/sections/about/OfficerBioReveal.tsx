import { Github, Globe, Linkedin, X } from 'lucide-react'
import { useEffect } from 'react'
import { OfficerRoleBadge } from '#/components/admin/team/OfficerRoleBadge'
import { AboutOfficerAvatar } from '#/components/sections/about/AboutOfficerAvatar'
import { OfficerAccentGlow } from '#/components/sections/about/OfficerAccentGlow'
import { isLeadershipOrDirectorRole } from '#/data/officer-roles'
import { useOfficerAccentColor } from '#/hooks/use-officer-accent-color'
import { useIsMobileLayout } from '#/lib/use-media-query'
import type { AboutOfficer } from '#/types/about'
import { cn } from '#/lib/cn'

type OfficerBioRevealProps = {
  officer: AboutOfficer | null
  open: boolean
  onClose: () => void
}

export function OfficerBioReveal({
  officer,
  open,
  onClose,
}: OfficerBioRevealProps) {
  const isMobile = useIsMobileLayout()
  const accentColor = useOfficerAccentColor(
    officer?.name ?? '',
    officer?.imageUrl,
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open || !officer) return null

  const socials = [
    officer.linkedInUrl
      ? { href: officer.linkedInUrl, Icon: Linkedin, label: 'LinkedIn' }
      : null,
    officer.githubUrl
      ? { href: officer.githubUrl, Icon: Github, label: 'GitHub' }
      : null,
    officer.websiteUrl
      ? { href: officer.websiteUrl, Icon: Globe, label: 'Website' }
      : null,
  ].filter(Boolean) as Array<{
    href: string
    Icon: typeof Linkedin
    label: string
  }>

  const content = (
    <div className="flex flex-col items-center px-5 py-6 text-center sm:px-8 sm:py-8">
      <OfficerAccentGlow accentColor={accentColor} intensity="expressive">
        <AboutOfficerAvatar
          name={officer.name}
          imageUrl={officer.imageUrl}
          size="modal"
        />
      </OfficerAccentGlow>

      <h2
        id="officer-bio-title"
        className="mt-6 text-2xl font-bold tracking-tight text-fg"
      >
        {officer.name}
      </h2>
      {isLeadershipOrDirectorRole(officer.roleId) ? (
        <OfficerRoleBadge
          roleId={officer.roleId}
          label={officer.roleLabel}
          className="mt-2"
        />
      ) : (
        <OfficerRoleBadge
          roleId={officer.roleId}
          label={officer.roleLabel}
          muted
          className="mt-2"
        />
      )}

      {officer.bio ? (
        <p className="mt-5 max-w-md text-left text-sm leading-relaxed text-fg-secondary sm:text-center">
          {officer.bio}
        </p>
      ) : (
        <p className="mt-5 text-sm text-fg-muted">Bio coming soon.</p>
      )}

      {socials.length > 0 ? (
        <div className="mt-6 flex items-center gap-3">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-default text-fg-secondary transition-colors hover:border-border-strong hover:bg-white/5 hover:text-fg"
              aria-label={`${officer.name} on ${label}`}
            >
              <Icon className="h-4 w-4" aria-hidden />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[70] flex flex-col justify-end">
        <button
          type="button"
          className="absolute inset-0 bg-black/60"
          aria-label="Close bio"
          onClick={onClose}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="officer-bio-title"
          className="relative max-h-[min(88dvh,720px)] overflow-hidden rounded-t-3xl border border-border-default bg-bg-base shadow-2xl"
        >
          <div className="flex justify-center pt-3 pb-1">
            <span
              className="h-1 w-10 rounded-full bg-border-strong"
              aria-hidden
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg-secondary hover:bg-white/5 hover:text-fg"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="overflow-y-auto pb-8">{content}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close bio"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="officer-bio-title"
        className={cn(
          'relative w-full max-w-md overflow-hidden rounded-2xl border border-border-default bg-bg-elevated shadow-2xl',
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg text-fg-secondary hover:bg-white/5 hover:text-fg"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {content}
      </div>
    </div>
  )
}
