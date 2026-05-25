import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { mapAuthApiError } from '#/api/map-auth-error'
import {
  useAuthSessionListener,
  useAuthSessionQuery,
  useGoogleSignInMutation,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} from '#/queries/auth'
import type {
  AuthFieldErrors,
  AuthStatus,
  AuthUser,
  SignInCredentials,
  SignUpCredentials,
  SupabaseAuthUser,
  UserProfile,
} from '#/types/auth'

type AuthContextValue = {
  /** Full auth + profile payload stored in context. */
  user: AuthUser | null
  /** `public.users` row when loaded (null if missing or signed out). */
  profile: UserProfile | null
  /** Supabase Auth session user fields. */
  auth: SupabaseAuthUser | null
  /** `users.is_verified` — full GDG member (roster sync). */
  isMember: boolean
  status: AuthStatus
  isAuthenticated: boolean
  isLoading: boolean
  isSessionPending: boolean
  isSignInPending: boolean
  isSignUpPending: boolean
  isSignOutPending: boolean
  isGoogleSignInPending: boolean
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

export function AuthProvider({ children }: { children: ReactNode }) {
  useAuthSessionListener()

  const sessionQuery = useAuthSessionQuery()
  const signInMutation = useSignInMutation()
  const signUpMutation = useSignUpMutation()
  const signOutMutation = useSignOutMutation()
  const googleSignInMutation = useGoogleSignInMutation()

  const user = sessionQuery.data ?? null
  const profile = user?.profile ?? null
  const auth = user?.auth ?? null
  const isMember = user?.isVerified ?? false

  const isSessionPending = sessionQuery.isPending
  const isSignInPending = signInMutation.isPending
  const isSignUpPending = signUpMutation.isPending
  const isSignOutPending = signOutMutation.isPending
  const isGoogleSignInPending = googleSignInMutation.isPending

  const isLoading =
    isSessionPending ||
    isSignInPending ||
    isSignUpPending ||
    isSignOutPending ||
    isGoogleSignInPending

  const status: AuthStatus = useMemo(() => {
    if (isSessionPending) return 'loading'
    if (user) return 'authenticated'
    return 'unauthenticated'
  }, [isSessionPending, user])

  const isAuthenticated = status === 'authenticated' && user !== null

  const signInWithEmail = useCallback(
    async (credentials: SignInCredentials) => {
      try {
        await signInMutation.mutateAsync(credentials)
        return null
      } catch (error) {
        return mapAuthApiError(error)
      }
    },
    [signInMutation],
  )

  const signUpWithEmail = useCallback(
    async (credentials: SignUpCredentials) => {
      try {
        const result = await signUpMutation.mutateAsync(credentials)
        if (result.needsEmailConfirmation) {
          return {
            general:
              'Check your email to confirm your account, then sign in.',
          }
        }
        return null
      } catch (error) {
        return mapAuthApiError(error)
      }
    },
    [signUpMutation],
  )

  const signInWithGoogle = useCallback(async () => {
    try {
      await googleSignInMutation.mutateAsync()
      return null
    } catch (error) {
      return mapAuthApiError(error)
    }
  }, [googleSignInMutation])

  const signOut = useCallback(async () => {
    await signOutMutation.mutateAsync()
  }, [signOutMutation])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      auth,
      isMember,
      status,
      isAuthenticated,
      isLoading,
      isSessionPending,
      isSignInPending,
      isSignUpPending,
      isSignOutPending,
      isGoogleSignInPending,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
    }),
    [
      user,
      profile,
      auth,
      isMember,
      status,
      isAuthenticated,
      isLoading,
      isSessionPending,
      isSignInPending,
      isSignUpPending,
      isSignOutPending,
      isGoogleSignInPending,
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
