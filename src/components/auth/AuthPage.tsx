import { AuthBrandPanel } from '#/components/auth/AuthBrandPanel'
import { AuthForm, type AuthMode } from '#/components/auth/AuthForm'

type AuthPageProps = {
  mode: AuthMode
}

export function AuthPage({ mode }: AuthPageProps) {
  return (
    <main className="min-h-[100dvh] bg-bg-base text-fg">
      <div className="flex min-h-[100dvh] flex-col lg:flex-row">
        <AuthBrandPanel variant="mobile" />

        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <AuthBrandPanel variant="desktop" />

          <div
            aria-hidden
            className="auth-split-glow pointer-events-none absolute top-0 bottom-0 z-20 hidden lg:block"
          />

          <section className="auth-form-panel relative z-10 flex min-h-0 w-full flex-1 flex-col bg-bg-elevated lg:z-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden bg-linear-to-b from-bg-elevated to-[#0c1222] lg:block"
            />
            <div
              aria-hidden
              className="auth-form-edge-glow pointer-events-none absolute top-0 left-0 hidden h-full lg:block"
            />

            <div className="relative z-10 flex flex-1 items-center justify-center py-6 lg:py-10">
              <AuthForm mode={mode} />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
