/** Matches `public.user_role` in Postgres — extend as your enum grows. */
export type UserRole = 'user' | 'admin' | 'officer' | 'moderator'

export type AuthProvider = 'email' | 'google' | 'github' | 'oauth'

/** Row shape for `public.users`. */
export type UserProfile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  is_verified: boolean
  roles: UserRole[]
  created_at: string
  updated_at: string
}

/** Metadata from Supabase Auth (`auth.users` / `user_metadata`). */
export type AuthUserMetadata = {
  full_name?: string
  name?: string
  avatar_url?: string
  picture?: string
  [key: string]: unknown
}

/** Snapshot of useful fields from `@supabase/supabase-js` `User`. */
export type SupabaseAuthUser = {
  id: string
  email: string
  phone: string | null
  emailConfirmedAt: string | null
  lastSignInAt: string | null
  createdAt: string
  updatedAt: string | null
  provider: AuthProvider
  isAnonymous: boolean
  userMetadata: AuthUserMetadata
  appMetadata: Record<string, unknown>
}

/**
 * Authenticated user in app state: full auth session + `public.users` profile.
 * `name` / `avatarUrl` / `isVerified` / `roles` are resolved for UI convenience.
 */
export type AuthUser = {
  auth: SupabaseAuthUser
  profile: UserProfile | null
  name: string
  avatarUrl?: string
  isVerified: boolean
  roles: UserRole[]
}

export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'

export type AuthErrorCode =
  | 'invalid_email'
  | 'invalid_credentials'
  | 'weak_password'
  | 'name_required'
  | 'unknown'

export type AuthFieldErrors = {
  name?: string
  email?: string
  password?: string
  general?: string
}

export type SignUpEmailOutcome =
  | { ok: true; needsEmailConfirmation: boolean }
  | { ok: false; errors: AuthFieldErrors }

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = {
  name: string
  email: string
  password: string
}
