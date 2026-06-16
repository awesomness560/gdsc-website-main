import { Upload, User } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { OfficerPhotoCropModal } from '#/components/admin/team/OfficerPhotoCropModal'
import { OfficerRoleSelect } from '#/components/admin/team/OfficerRoleSelect'
import type { AdminOfficerDraft } from '#/types/admin-team'
import { cn } from '#/lib/cn'

type OfficerFormFieldsProps = {
  draft: AdminOfficerDraft
  onChange: (draft: AdminOfficerDraft) => void
  /** When set, shows the selected member name above the form. */
  memberName?: string
  disabled?: boolean
}

export function OfficerFormFields({
  draft,
  onChange,
  memberName,
  disabled,
}: OfficerFormFieldsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (draft.pendingPhoto) {
      const url = URL.createObjectURL(draft.pendingPhoto)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreviewUrl(draft.removePhoto ? null : draft.officerImageUrl ?? null)
    return undefined
  }, [draft.pendingPhoto, draft.officerImageUrl, draft.removePhoto])

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
    onChange({
      ...draft,
      pendingPhoto: blob,
      removePhoto: false,
      officerImageUrl: undefined,
    })
    handleCropClose()
  }

  function handleRemovePhoto() {
    onChange({
      ...draft,
      pendingPhoto: undefined,
      officerImageUrl: undefined,
      removePhoto: true,
    })
  }

  const hasPhoto = Boolean(previewUrl)

  return (
    <div className="space-y-4">
      {memberName ? (
        <p className="text-sm text-fg-secondary">
          Promoting{' '}
          <span className="font-medium text-fg">{memberName}</span> to officer
        </p>
      ) : null}

      <OfficerRoleSelect
        value={draft.roleId}
        onChange={(roleId) => onChange({ ...draft, roleId })}
        disabled={disabled}
      />
      <p className="-mt-2 text-xs text-fg-muted">
        Placement on the About Us page is determined automatically from role.
      </p>

      <div>
        <span className="text-sm font-medium text-fg">Officer photo</span>
        <p className="mt-0.5 text-xs text-fg-muted">
          Headshot shown on the public About Us page. Cropped and downscaled
          before upload.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={disabled}
          onChange={handleImageChange}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center transition-colors',
            'border-border-strong bg-bg-elevated/50 hover:border-accent/40 hover:bg-white/5',
            disabled && 'opacity-60',
          )}
        >
          <Upload className="h-6 w-6 text-fg-muted" aria-hidden />
          <span className="text-sm text-fg-secondary">
            {hasPhoto ? 'Replace photo' : 'Upload photo'}
          </span>
        </button>
        {hasPhoto ? (
          <div className="mt-3 flex items-center gap-3">
            <img
              src={previewUrl ?? undefined}
              alt=""
              className="h-16 w-16 rounded-xl object-cover"
            />
            <button
              type="button"
              disabled={disabled}
              onClick={handleRemovePhoto}
              className="text-xs font-medium text-fg-muted hover:text-fg"
            >
              Remove photo
            </button>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2 text-xs text-fg-muted">
            <User className="h-3.5 w-3.5" aria-hidden />
            Initials placeholder shown until a photo is uploaded.
          </div>
        )}
      </div>

      <div>
        <label htmlFor="officer-bio" className="text-sm font-medium text-fg">
          Bio
        </label>
        <textarea
          id="officer-bio"
          value={draft.bio}
          disabled={disabled}
          onChange={(e) => onChange({ ...draft, bio: e.target.value })}
          rows={4}
          placeholder="Short public bio shown on the About Us page"
          className={cn(
            'mt-1.5 min-h-[100px] w-full resize-y rounded-xl border border-border-default bg-bg-elevated/50 px-3 py-2.5 text-sm text-fg outline-none placeholder:text-fg-muted focus:border-accent/40 disabled:opacity-60',
          )}
        />
      </div>

      {cropSrc ? (
        <OfficerPhotoCropModal
          open
          imageSrc={cropSrc}
          onClose={handleCropClose}
          onComplete={handleCropComplete}
        />
      ) : null}
    </div>
  )
}
