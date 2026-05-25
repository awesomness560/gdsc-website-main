import { FileText, Upload, X } from 'lucide-react'
import { useId, useRef, type DragEvent } from 'react'
import { validateResumeFile } from '#/lib/hackdsc-registration-validation'
import { cn } from '#/lib/cn'
import { registerLabelClassName } from '#/components/hackdsc/register/register-field-styles'

type RegisterResumeUploadProps = {
  file: File | null
  fileName: string | null
  onFileChange: (file: File | null, fileName: string | null) => void
  onValidationError?: (message: string | null) => void
  error?: string
}

export function RegisterResumeUpload({
  file,
  fileName,
  onFileChange,
  onValidationError,
  error,
}: RegisterResumeUploadProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const displayName = file?.name ?? fileName
  const hasError = Boolean(error?.trim())

  function applyFile(next: File | null) {
    if (!next) {
      onValidationError?.(null)
      onFileChange(null, null)
      return
    }
    const validationError = validateResumeFile(next)
    if (validationError) {
      onValidationError?.(validationError)
      onFileChange(null, null)
      return
    }
    onValidationError?.(null)
    onFileChange(next, next.name)
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (dropped) applyFile(dropped)
  }

  return (
    <div className="space-y-1.5">
      <span className={registerLabelClassName}>Resume (PDF)</span>
      <p className="text-xs text-fg-muted">PDF only, max 5 MB</p>

      {displayName ? (
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl border bg-surface-raised/80 px-4 py-3',
            hasError ? 'border-google-red/50' : 'border-border-default',
          )}
        >
          <FileText className="h-5 w-5 shrink-0 text-accent" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-sm text-fg">
            {displayName}
          </span>
          <button
            type="button"
            onClick={() => {
              applyFile(null)
              if (inputRef.current) inputRef.current.value = ''
            }}
            className="rounded-lg p-1.5 text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
            aria-label="Remove resume"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className={cn(
            'rounded-xl border border-dashed px-4 py-8 text-center transition-colors',
            hasError
              ? 'border-google-red/40 bg-google-red/5'
              : 'border-border-default bg-surface-raised/40 hover:border-accent/40',
          )}
        >
          <Upload
            className="mx-auto h-6 w-6 text-fg-muted sm:hidden"
            aria-hidden
          />
          <p className="text-sm text-fg-secondary">
            <label
              htmlFor={inputId}
              className="cursor-pointer font-medium text-accent hover:text-accent-hover"
            >
              <span className="sm:hidden">Upload resume</span>
              <span className="hidden sm:inline">
                Drag and drop your resume, or{' '}
                <span className="text-accent">browse</span>
              </span>
            </label>
          </p>
          <p className="mt-1 hidden text-xs text-fg-muted sm:block">
            PDF, up to 5 MB
          </p>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => {
              const picked = e.target.files?.[0] ?? null
              applyFile(picked)
            }}
          />
        </div>
      )}

      {hasError ? (
        <p className="text-xs text-google-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
