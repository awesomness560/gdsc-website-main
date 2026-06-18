import { Mail } from 'lucide-react'

type AuthEmailConfirmationProps = {
  email: string
  onUseDifferentEmail: () => void
}

export function AuthEmailConfirmation({
  email,
  onUseDifferentEmail,
}: AuthEmailConfirmationProps) {
  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col gap-5 px-5 py-8 sm:px-6 lg:py-0">
      <header className="space-y-2 text-center lg:text-left">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-google-green/15 lg:mx-0">
          <Mail className="h-6 w-6 text-google-green" aria-hidden />
        </div>
        <h1 className="pt-2 text-2xl font-bold tracking-tight text-fg">
          Confirm your email
        </h1>
        <p className="text-sm leading-relaxed text-fg-secondary">
          We sent a confirmation link to{' '}
          <span className="font-medium text-fg">{email}</span>. Open it in your
          inbox to verify your address — that link will sign you in.
        </p>
      </header>

      <p className="rounded-xl border border-border-default bg-surface/40 px-3 py-2.5 text-xs leading-relaxed text-fg-muted">
        Didn&apos;t get it? Check spam, or wait a minute — the link may still be
        on its way.
      </p>

      <p className="text-center text-sm text-fg-muted lg:text-left">
        Wrong address?{' '}
        <button
          type="button"
          onClick={onUseDifferentEmail}
          className="cursor-pointer font-medium text-fg-secondary transition-colors hover:text-fg"
        >
          Use a different email
        </button>
      </p>
    </div>
  )
}
