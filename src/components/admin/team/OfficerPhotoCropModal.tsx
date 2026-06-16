import { useCallback, useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { cropAndDownscaleImage } from '#/lib/officer-photo'
import { cn } from '#/lib/cn'
import 'react-easy-crop/react-easy-crop.css'

type OfficerPhotoCropModalProps = {
  open: boolean
  imageSrc: string
  onClose: () => void
  onComplete: (blob: Blob) => void
}

const actionBtnPrimary =
  'inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60'
const actionBtnSecondary =
  'inline-flex h-10 items-center justify-center rounded-xl border border-border-default px-4 text-sm font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg disabled:cursor-not-allowed disabled:opacity-60'

export function OfficerPhotoCropModal({
  open,
  imageSrc,
  onClose,
  onComplete,
}: OfficerPhotoCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels)
  }, [])

  async function handleSave() {
    if (!croppedAreaPixels) return
    setIsSaving(true)
    setError(null)
    try {
      const blob = await cropAndDownscaleImage(imageSrc, croppedAreaPixels)
      onComplete(blob)
      onClose()
    } catch {
      setError('Could not process the image. Try a different file.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close crop dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="crop-photo-title"
        className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-base shadow-2xl"
      >
        <header className="border-b border-border-subtle px-5 py-4">
          <h2 id="crop-photo-title" className="text-lg font-semibold text-fg">
            Crop headshot
          </h2>
          <p className="mt-0.5 text-xs text-fg-muted">
            Drag to reposition. Image is downscaled before upload.
          </p>
        </header>

        <div className="relative h-72 bg-bg-deep sm:h-80">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="space-y-3 border-b border-border-subtle px-5 py-4">
          <label className="flex items-center gap-3 text-sm text-fg-secondary">
            <span className="shrink-0">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </label>
          {error ? (
            <p className="text-sm text-google-red" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        <footer className="flex justify-end gap-2 px-5 py-4">
          <button
            type="button"
            className={actionBtnSecondary}
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="button"
            className={cn(actionBtnPrimary)}
            onClick={() => void handleSave()}
            disabled={isSaving || !croppedAreaPixels}
          >
            {isSaving ? 'Processing…' : 'Use photo'}
          </button>
        </footer>
      </div>
    </div>
  )
}
