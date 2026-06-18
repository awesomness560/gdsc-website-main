import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { createResumeSignedUrl } from '#/api/resumes'
import { cn } from '#/lib/cn'

type ResumeViewButtonProps = {
  storagePath: string
  label?: string
  className?: string
}

export function ResumeViewButton({
  storagePath,
  label = 'View resume',
  className,
}: ResumeViewButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const signedUrl = await createResumeSignedUrl(storagePath)
      window.open(signedUrl, '_blank', 'noopener,noreferrer')
    } catch {
      setError('Could not open resume')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => void handleClick()}
        disabled={loading}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border border-border-default',
          'bg-surface-raised/60 px-3 py-1.5 text-sm font-medium text-fg-secondary',
          'transition-colors hover:border-accent/40 hover:text-fg disabled:opacity-60',
        )}
      >
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        {loading ? 'Opening…' : label}
      </button>
      {error ? (
        <p className="mt-1 text-xs text-google-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
