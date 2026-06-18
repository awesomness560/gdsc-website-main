import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { AuthEmailConfirmation } from '#/components/auth/AuthEmailConfirmation'
import { AuthField } from '#/components/auth/AuthField'
import { GoogleSignInButton } from '#/components/auth/GoogleSignInButton'
import { AuthSessionCompleting } from '#/components/auth/AuthSessionCompleting'
import { useAuth } from '#/contexts/AuthContext'
import {
  passwordRequirements,
  validateLoginFields,
  validateSignupFields,
} from '#/lib/auth-validation'
import { stashAuthRedirect } from '#/lib/auth-redirect'
import { cn } from '#/lib/cn'
import type { AuthFieldErrors } from '#/types/auth'

export type AuthMode = 'login' | 'signup'

type AuthFormProps = {
  mode: AuthMode
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-border-default" />
      <span className="text-xs font-medium text-fg-muted">or</span>
      <div className="h-px flex-1 bg-border-default" />
    </div>
  )
}

function PasswordRequirements({ password }: { password: string }) {
  if (!password) return null

  return (
    <ul className="space-y-1 pt-1">
      {passwordRequirements.map((req) => {
        const met = req.test(password)
        return (
          <li
            key={req.id}
            className={cn(
              'flex items-center gap-2 text-xs transition-colors',
              met ? 'text-google-green' : 'text-fg-muted',
            )}
          >
            <Check
              className={cn('h-3.5 w-3.5 shrink-0', !met && 'opacity-35')}
              aria-hidden
            />
            {req.label}
          </li>
        )
      })}
    </ul>
  )
}

export function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate()
  const { redirect } = useSearch({ from: '/_auth' })
  const redirectSearch = redirect ? { redirect } : undefined
  const postAuthTo = redirect ?? '/'

  const {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    isSignInPending,
    isSignUpPending,
  } = useAuth()

  const isSignup = mode === 'signup'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<AuthFieldErrors>({})
  const [signupEmailSent, setSignupEmailSent] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const isCreatingAccount = submitLoading || isSignUpPending
  const busy = isCreatingAccount || isSignInPending || googleLoading

  if (signupEmailSent) {
    return (
      <AuthEmailConfirmation
        email={email}
        onUseDifferentEmail={() => {
          setSignupEmailSent(false)
          setErrors({})
        }}
      />
    )
  }

  if (isCreatingAccount || isSignInPending) {
    return (
      <AuthSessionCompleting
        message={isSignup ? 'Creating your account…' : 'Finishing sign-in…'}
      />
    )
  }

  async function handleGoogle() {
    setErrors({})
    if (redirect) stashAuthRedirect(redirect)
    setGoogleLoading(true)
    const result = await signInWithGoogle()
    setGoogleLoading(false)
    if (result) setErrors(result)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrors({})

    const fieldErrors = isSignup
      ? validateSignupFields(name, email, password)
      : validateLoginFields(email, password)

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setSubmitLoading(true)
    if (isSignup) {
      const outcome = await signUpWithEmail({ name, email, password })
      setSubmitLoading(false)

      if (!outcome.ok) {
        setErrors(outcome.errors)
        setSignupEmailSent(false)
        return
      }

      if (outcome.needsEmailConfirmation) {
        setErrors({})
        setSignupEmailSent(true)
        return
      }

      navigate({ to: postAuthTo, replace: true })
      return
    }

    const signInErrors = await signInWithEmail({ email, password })
    setSubmitLoading(false)

    if (signInErrors) {
      setErrors(signInErrors)
      return
    }

    navigate({ to: postAuthTo, replace: true })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-[400px] flex-col gap-4 px-5 py-8 sm:px-6 lg:py-0"
      noValidate
    >
      <header className="space-y-2 text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-fg">
          {isSignup ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-sm text-fg-secondary">
          {isSignup
            ? 'Join the GDG community.'
            : 'Sign in to your GDG account.'}
        </p>
      </header>

      {errors.general ? (
        <p className="rounded-xl border border-google-red/30 bg-google-red/10 px-3 py-2 text-xs text-google-red">
          {errors.general}
        </p>
      ) : null}

      <GoogleSignInButton
        onClick={handleGoogle}
        loading={googleLoading}
        disabled={busy && !googleLoading}
      />

      <OrDivider />

      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          isSignup ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className={cn(!isSignup && 'pointer-events-none')}>
            <AuthField
              label="Full name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              disabled={busy}
              tabIndex={isSignup ? 0 : -1}
            />
          </div>
        </div>
      </div>

      <AuthField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        invalid={Boolean(errors.general && !errors.email)}
        disabled={busy}
      />

      <div className="space-y-1">
        <AuthField
          label="Password"
          name="password"
          type="password"
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          invalid={Boolean(errors.general && !errors.password)}
          disabled={busy}
        />
        {isSignup ? <PasswordRequirements password={password} /> : null}
      </div>

      <div
        className={cn(
          'transition-[grid-template-rows,opacity] duration-300 ease-out',
          !isSignup ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="flex justify-end">
            <button
              type="button"
              className="cursor-pointer text-xs text-fg-muted transition-colors hover:text-fg-secondary"
              tabIndex={!isSignup ? 0 : -1}
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className={cn(
          'inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold',
          'bg-accent text-accent-fg shadow-[0_12px_32px_rgba(74,140,255,0.28)]',
          'transition-[background-color,box-shadow,transform] duration-200',
          'hover:bg-accent-hover hover:shadow-[0_14px_36px_rgba(74,140,255,0.36)]',
          'active:scale-[0.99]',
          'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-accent disabled:hover:shadow-[0_12px_32px_rgba(74,140,255,0.28)]',
        )}
      >
        {isSignup ? 'Create account' : 'Sign in'}
      </button>

      <p className="text-center text-sm text-fg-muted lg:text-left">
        {isSignup ? (
          <>
            Already have an account?{' '}
            <Link
              to="/login"
              search={redirectSearch}
              replace
              preload="intent"
              onClick={() => {
                setErrors({})
                setSignupEmailSent(false)
              }}
              className="cursor-pointer font-medium text-fg-secondary transition-colors hover:text-fg"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              search={redirectSearch}
              replace
              preload="intent"
              onClick={() => setErrors({})}
              className="cursor-pointer font-medium text-fg-secondary transition-colors hover:text-fg"
            >
              Sign up
            </Link>
          </>
        )}
      </p>

      <div
        className={cn(
          'text-center transition-[grid-template-rows,opacity] duration-300 ease-out lg:text-left',
          isSignup ? 'grid grid-rows-[1fr] opacity-100' : 'grid grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <p className="text-xs leading-relaxed text-fg-muted">
            By creating an account, you agree to our{' '}
            <span className="text-fg-secondary">Terms</span> and{' '}
            <span className="text-fg-secondary">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </form>
  )
}
