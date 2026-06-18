import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '#/contexts/AuthContext'
import { useOfficer } from '#/contexts/OfficerContext'
import { useOfficerAccentColor } from '#/hooks/use-officer-accent-color'
import {
  accentColorFromName,
  extractDominantAccentColorFromUrl,
} from '#/lib/officer-accent-color'

export type UserAvatarPresentation = {
  name: string
  email?: string
  avatarUrl?: string
  memberRing: boolean
  officerAccentColor?: string
}

export function useUserAvatarPresentation(): UserAvatarPresentation {
  const { user } = useAuth()
  const { officer, isOfficer } = useOfficer()

  const displayName = officer?.name?.trim() || user?.name?.trim() || ''
  const email = user?.auth.email
  const avatarUrl =
    isOfficer && officer?.officerImageUrl
      ? officer.officerImageUrl
      : user?.avatarUrl

  const fallbackAccent = useMemo(
    () => accentColorFromName(displayName),
    [displayName],
  )
  const [officerAccentColor, setOfficerAccentColor] = useState<string | undefined>(
    isOfficer ? fallbackAccent : undefined,
  )

  const accentFromHook = useOfficerAccentColor(
    displayName,
    isOfficer ? officer?.officerImageUrl : undefined,
  )

  useEffect(() => {
    if (!isOfficer) {
      setOfficerAccentColor(undefined)
      return
    }
    setOfficerAccentColor(accentFromHook)
  }, [isOfficer, accentFromHook])

  return {
    name: displayName,
    email,
    avatarUrl,
    memberRing: Boolean(user?.isVerified) && !isOfficer,
    officerAccentColor: isOfficer ? officerAccentColor : undefined,
  }
}

/** Resolve accent from a local blob preview (officer profile editor). */
export function useOfficerAccentFromPreview(
  name: string,
  previewUrl?: string,
): string {
  const fallback = useMemo(() => accentColorFromName(name), [name])
  const [accent, setAccent] = useState(fallback)

  useEffect(() => {
    setAccent(fallback)
    if (!previewUrl) return

    let cancelled = false
    void extractDominantAccentColorFromUrl(previewUrl)
      .then((color) => {
        if (!cancelled) setAccent(color)
      })
      .catch(() => {
        if (!cancelled) setAccent(fallback)
      })

    return () => {
      cancelled = true
    }
  }, [name, previewUrl, fallback])

  return accent
}
