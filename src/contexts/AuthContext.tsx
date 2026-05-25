import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  AUTH_STUB_DELAY_MS,
  DEMO_LOGIN,
  dummyAuthUser,
  dummyGoogleUser,
} from '#/data/dummy-auth'
import { meetsAllPasswordRequirements } from '#/lib/auth-validation'
import type {
  AuthFieldErrors,
  AuthStatus,
  AuthUser,
  SignInCredentials,
  SignUpCredentials,
} from '#/types/auth'

type AuthContextValue = {
  user: AuthUser | null
  status: AuthStatus
  isAuthenticated: boolean
  isLoading: boolean
  signInWithEmail: (
    credentials: SignInCredentials,
  ) => Promise<AuthFieldErrors | null>
  signUpWithEmail: (
    credentials: SignUpCredentials,
  ) => Promise<AuthFieldErrors | null>
  signInWithGoogle: () => Promise<AuthFieldErrors | null>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function mapLoginFailure(): AuthFieldErrors {
  return {
    general: 'Invalid email or password. Try the demo account or sign up.',
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('unauthenticated')

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated' && user !== null

  const signInWithEmail = useCallback(
    async ({ email, password }: SignInCredentials) => {
      setStatus('loading')
      await delay(AUTH_STUB_DELAY_MS)

      const normalizedEmail = email.trim().toLowerCase()
      const valid =
        normalizedEmail === DEMO_LOGIN.email.toLowerCase() &&
        password === DEMO_LOGIN.password

      if (!valid) {
        setStatus('unauthenticated')
        return mapLoginFailure()
      }

      setUser({ ...dummyAuthUser, email: normalizedEmail })
      setStatus('authenticated')
      return null
    },
    [],
  )

  const signUpWithEmail = useCallback(
    async ({ name, email, password }: SignUpCredentials) => {
      setStatus('loading')
      await delay(AUTH_STUB_DELAY_MS)

      if (!meetsAllPasswordRequirements(password)) {
        setStatus('unauthenticated')
        return { password: 'Password does not meet the requirements below.' }
      }

      setUser({
        ...dummyAuthUser,
        id: `usr_${Date.now()}`,
        email: email.trim().toLowerCase(),
        name: name.trim(),
        provider: 'email',
      })
      setStatus('authenticated')
      return null
    },
    [],
  )

  const signInWithGoogle = useCallback(async () => {
    setStatus('loading')
    await delay(AUTH_STUB_DELAY_MS)
    setUser(dummyGoogleUser)
    setStatus('authenticated')
    return null
  }, [])

  const signOut = useCallback(async () => {
    setStatus('loading')
    await delay(400)
    setUser(null)
    setStatus('unauthenticated')
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isAuthenticated,
      isLoading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
    }),
    [
      user,
      status,
      isAuthenticated,
      isLoading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
