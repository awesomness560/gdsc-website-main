import { Loader2 } from 'lucide-react'

type AuthSessionCompletingProps = {
  message?: string
}

export function AuthSessionCompleting({
  message = 'Finishing sign-in…',
}: AuthSessionCompletingProps) {
  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col items-center justify-center gap-3 px-5 py-16 sm:px-6">
      <Loader2 className="h-8 w-8 animate-spin text-accent" aria-hidden />
      <p className="text-sm text-fg-secondary">{message}</p>
    </div>
  )
}
