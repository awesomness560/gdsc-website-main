import { Upload, X } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { OfficerPhotoCropModal } from '#/components/admin/team/OfficerPhotoCropModal'
import { AboutOfficerCard } from '#/components/sections/about/AboutOfficerCard'
import { AboutOfficerAvatar } from '#/components/sections/about/AboutOfficerAvatar'
import { OfficerAccentGlow } from '#/components/sections/about/OfficerAccentGlow'
import { OfficerBioReveal } from '#/components/sections/about/OfficerBioReveal'
import { useAuth } from '#/contexts/AuthContext'
import {
  OFFICER_BIO_GUIDELINE,
  OFFICER_BIO_MAX_LENGTH,
} from '#/data/officer-profile'
import { getOfficerRoleLabel } from '#/data/officer-roles'
import { useOfficerAccentFromPreview } from '#/hooks/use-user-avatar-presentation'
import { mapAdminOfficerToAboutOfficer } from '#/lib/officer-profile'
import { cn } from '#/lib/cn'
import {
  getMyOfficerMutationError,
  useUpdateMyOfficerProfileMutation,
} from '#/queries/my-officer'
import type { AdminOfficer, OfficerProfileDraft } from '#/types/admin-team'

type OfficerProfileEditorProps = {
  officer: AdminOfficer
}

function draftFromOfficer(officer: AdminOfficer): OfficerProfileDraft {
  return {
    displayName: officer.name,
    bio: officer.bio,
    officerImageUrl: officer.officerImageUrl,
    removePhoto: false,
  }
}

export function OfficerProfileEditor({ officer }: OfficerProfileEditorProps) {
  const { user } = useAuth()
  const userId = user?.auth.id
  const updateMutation = useUpdateMyOfficerProfileMutation(userId)

  const [draft, setDraft] = useState<OfficerProfileDraft>(() =>
    draftFromOfficer(officer),
  )
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [bioPreviewOpen, setBioPreviewOpen] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDraft(draftFromOfficer(officer))
  }, [officer])

  useEffect(() => {
    if (draft.pendingPhoto) {
      const url = URL.createObjectURL(draft.pendingPhoto)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreviewUrl(
      draft.removePhoto ? null : draft.officerImageUrl ?? officer.officerImageUrl ?? null,
    )
    return undefined
  }, [draft.pendingPhoto, draft.officerImageUrl, draft.removePhoto, officer.officerImageUrl])

  const accentColor = useOfficerAccentFromPreview(
    draft.displayName.trim() || officer.name,
    previewUrl ?? undefined,
  )

  const previewOfficer = mapAdminOfficerToAboutOfficer(officer, {
    name: draft.displayName.trim() || officer.name,
    imageUrl: draft.removePhoto ? undefined : previewUrl ?? undefined,
    bio: draft.bio,
  })

  const roleLabel = getOfficerRoleLabel(officer.roleId)
  const hasPhoto = Boolean(previewUrl)
  const isDirty =
    draft.displayName.trim() !== officer.name ||
    draft.bio !== officer.bio ||
    Boolean(draft.pendingPhoto) ||
    draft.removePhoto

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const url = URL.createObjectURL(file)
    setCropSrc(url)
  }

  function handleCropClose() {
    if (cropSrc) URL.revokeObjectURL(cropSrc)
    setCropSrc(null)
  }

  function handleCropComplete(blob: Blob) {
    setDraft((prev) => ({
      ...prev,
      pendingPhoto: blob,
      removePhoto: false,
      officerImageUrl: undefined,
    }))
    setSaved(false)
    handleCropClose()
  }

  function handleRemovePhoto() {
    setDraft((prev) => ({
      ...prev,
      pendingPhoto: undefined,
      officerImageUrl: undefined,
      removePhoto: true,
    }))
    setSaved(false)
  }

  async function handleSave() {
    if (!draft.displayName.trim()) {
      setSaveError('Display name is required.')
      return
    }

    setSaveError(null)
    setSaved(false)
    try {
      await updateMutation.mutateAsync({
        officerId: officer.id,
        input: {
          displayName: draft.displayName.trim(),
          bio: draft.bio,
          photo: draft.pendingPhoto,
          removePhoto: draft.removePhoto,
        },
      })
      setDraft((prev) => ({
        ...prev,
        pendingPhoto: undefined,
        removePhoto: false,
      }))
      setSaved(true)
    } catch (error) {
      setSaveError(getMyOfficerMutationError(error))
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,280px)] lg:items-start">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-fg">
            Your About Us presence
          </h2>
          <p className="mt-1 text-sm text-fg-secondary">
            This is how you appear on the public About page. Changes go live
            after you save.
          </p>
        </div>

        {saveError ? (
          <p className="rounded-xl border border-google-red/30 bg-google-red/10 px-3 py-2 text-xs text-google-red">
            {saveError}
          </p>
        ) : null}

        {saved ? (
          <p className="rounded-xl border border-google-green/30 bg-google-green/10 px-3 py-2 text-xs text-fg-secondary">
            Profile saved. Your About Us page will reflect these updates.
          </p>
        ) : null}

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <span className="text-sm font-medium text-fg">Officer photo</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImageChange}
          />
          <div className="relative">
            <OfficerAccentGlow accentColor={accentColor} intensity="expressive">
              <AboutOfficerAvatar
                name={draft.displayName.trim() || officer.name}
                imageUrl={previewUrl ?? undefined}
                size="modal"
              />
            </OfficerAccentGlow>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-full',
                'bg-black/45 text-xs font-medium text-white opacity-0 transition-opacity hover:opacity-100',
              )}
            >
              <Upload className="h-5 w-5" aria-hidden />
              {hasPhoto ? 'Replace' : 'Upload'}
            </button>
          </div>
          {hasPhoto ? (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="inline-flex items-center gap-1 text-xs font-medium text-fg-muted hover:text-fg"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
              Remove photo
            </button>
          ) : (
            <p className="text-xs text-fg-muted">
              Drag a headshot here or click the photo to upload. Cropped to a
              circle before saving.
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="officer-display-name" className="text-sm font-medium text-fg">
            Display name
          </label>
          <p className="text-xs text-fg-muted">
            How your name appears on About Us — can differ from your account
            name.
          </p>
          <input
            id="officer-display-name"
            value={draft.displayName}
            onChange={(e) => {
              setSaved(false)
              setDraft((prev) => ({ ...prev, displayName: e.target.value }))
            }}
            className="h-11 w-full rounded-xl border border-border-default bg-surface-raised/80 px-4 text-sm text-fg outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
            autoComplete="name"
          />
        </div>

        <div className="space-y-1.5">
          <span className="text-sm font-medium text-fg">Role</span>
          <p className="inline-flex rounded-full border border-border-default bg-white/5 px-3 py-1.5 text-sm text-fg-secondary">
            {roleLabel}
          </p>
          <p className="text-xs text-fg-muted">
            Your role is set by the team. Contact leadership if it needs to
            change.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="officer-public-bio" className="text-sm font-medium text-fg">
            Public bio
          </label>
          <p className="text-xs text-fg-muted">{OFFICER_BIO_GUIDELINE}</p>
          <textarea
            id="officer-public-bio"
            value={draft.bio}
            maxLength={OFFICER_BIO_MAX_LENGTH}
            rows={5}
            onChange={(e) => {
              setSaved(false)
              setDraft((prev) => ({ ...prev, bio: e.target.value }))
            }}
            placeholder="Tell visitors a bit about yourself…"
            className="min-h-[120px] w-full resize-y rounded-xl border border-border-default bg-surface-raised/80 px-4 py-3 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
          />
          <p className="text-right text-xs text-fg-muted">
            {draft.bio.length}/{OFFICER_BIO_MAX_LENGTH}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={updateMutation.isPending || !isDirty}
          className={cn(
            'inline-flex h-11 items-center justify-center rounded-2xl bg-accent px-5 text-sm font-semibold text-accent-fg',
            'shadow-[0_12px_32px_rgba(74,140,255,0.28)] transition-colors hover:bg-accent-hover',
            'disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          {updateMutation.isPending ? 'Saving…' : 'Save profile'}
        </button>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
          Live preview
        </p>
        <div className="flex flex-col items-center rounded-2xl border border-border-default bg-surface/40 px-4 py-8">
          <AboutOfficerCard officer={previewOfficer} preview />
          <button
            type="button"
            onClick={() => setBioPreviewOpen(true)}
            className="mt-5 text-xs font-medium text-accent hover:text-accent-hover"
          >
            Preview bio modal
          </button>
        </div>
      </aside>

      {cropSrc ? (
        <OfficerPhotoCropModal
          open
          imageSrc={cropSrc}
          onClose={handleCropClose}
          onComplete={handleCropComplete}
        />
      ) : null}

      <OfficerBioReveal
        officer={previewOfficer}
        open={bioPreviewOpen}
        onClose={() => setBioPreviewOpen(false)}
      />
    </div>
  )
}
