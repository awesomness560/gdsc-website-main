import type { Provider, User } from '@supabase/supabase-js'
import { fetchUserProfile, upsertUserProfile } from '#/api/users'
import { supabase } from '#/lib/supabase'
import type {
  AuthProvider,
  AuthUser,
  AuthUserMetadata,
  SignInCredentials,
  SignUpCredentials,
  SupabaseAuthUser,
  UserProfile,
} from '#/types/auth'

export type { AuthUserMetadata } from '#/types/auth'

const OAUTH_REDIRECT_PATH = '/auth/callback'

function authCallbackUrl() {
  if (typeof window === 'undefined') {
    return OAUTH_REDIRECT_PATH
  }
  return `${window.location.origin}${OAUTH_REDIRECT_PATH}`
}

function resolveProvider(user: User): AuthProvider {
  const provider = user.app_metadata?.provider as string | undefined
  if (provider === 'google') return 'google'
  if (provider === 'github') return 'github'
  if (provider === 'email') return 'email'
  return 'oauth'
}

export function mapSupabaseAuthUser(user: User): SupabaseAuthUser {
  return {
    id: user.id,
    email: user.email ?? '',
    phone: user.phone ?? null,
    emailConfirmedAt: user.email_confirmed_at ?? null,
    lastSignInAt: user.last_sign_in_at ?? null,
    createdAt: user.created_at,
    updatedAt: user.updated_at ?? null,
    provider: resolveProvider(user),
    isAnonymous: user.is_anonymous ?? false,
    userMetadata: (user.user_metadata ?? {}) as AuthUserMetadata,
    appMetadata: { ...(user.app_metadata ?? {}) },
  }
}

function resolveDisplayFields(
  auth: SupabaseAuthUser,
  profile: UserProfile | null,
): Pick<AuthUser, 'name' | 'avatarUrl' | 'isVerified' | 'roles'> {
  const meta = auth.userMetadata

  const name =
    profile?.full_name ??
    meta.full_name ??
    meta.name ??
    auth.email.split('@')[0] ??
    'Member'

  const avatarUrl =
    profile?.avatar_url ?? meta.avatar_url ?? meta.picture ?? undefined

  return {
    name,
    avatarUrl: avatarUrl ?? undefined,
    isVerified: profile?.is_verified ?? false,
    roles: profile?.roles ?? (['user'] as AuthUser['roles']),
  }
}

export function buildAuthUser(
  user: User,
  profile: UserProfile | null,
): AuthUser {
  const auth = mapSupabaseAuthUser(user)
  return {
    auth,
    profile,
    ...resolveDisplayFields(auth, profile),
  }
}

async function ensureUserProfile(user: User): Promise<UserProfile | null> {
  let profile = await fetchUserProfile(user.id)
  if (profile) return profile

  const meta = (user.user_metadata ?? {}) as AuthUserMetadata
  const fullName = meta.full_name ?? meta.name
  const avatarUrl = meta.avatar_url ?? meta.picture

  if (!fullName && !avatarUrl) return null

  await upsertUserProfile({
    id: user.id,
    full_name: fullName ?? user.email?.split('@')[0] ?? 'Member',
    avatar_url: avatarUrl ?? null,
  })
  profile = await fetchUserProfile(user.id)
  return profile
}

export async function resolveAuthUser(user: User): Promise<AuthUser> {
  const profile = await ensureUserProfile(user)
  return buildAuthUser(user, profile)
}

/** @deprecated Use `resolveAuthUser` — metadata only, no `public.users` row. */
export function mapAuthUser(user: User): AuthUser {
  return buildAuthUser(user, null)
}

/** Fast gate for route `beforeLoad` — session only, no profile fetch. */
export async function hasAuthSession(): Promise<boolean> {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return Boolean(data.session?.user)
}

export async function fetchAuthSession(): Promise<AuthUser | null> {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  if (!data.session?.user) return null
  return resolveAuthUser(data.session.user)
}

export async function signInWithEmailPassword({
  email,
  password,
}: SignInCredentials): Promise<AuthUser> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })
  if (error) throw error
  if (!data.user) throw new Error('Sign-in succeeded but no user was returned.')
  return resolveAuthUser(data.user)
}

export type SignUpResult = {
  user: AuthUser
  needsEmailConfirmation: boolean
}

export async function signUpWithEmailPassword({
  name,
  email,
  password,
}: SignUpCredentials): Promise<SignUpResult> {
  const trimmedName = name.trim()
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: {
        full_name: trimmedName,
        avatar_url: null,
      },
    },
  })
  if (error) throw error
  if (!data.user) throw new Error('Sign-up succeeded but no user was returned.')

  const needsEmailConfirmation = data.session === null

  if (data.session) {
    try {
      await upsertUserProfile({
        id: data.user.id,
        full_name: trimmedName,
        avatar_url: null,
      })
    } catch (profileError) {
      console.warn('[auth] profile upsert failed after signup', profileError)
    }

    let user: AuthUser
    try {
      user = await resolveAuthUser(data.user)
    } catch (profileError) {
      console.warn('[auth] profile load failed after signup', profileError)
      user = buildAuthUser(data.user, null)
    }

    return {
      user,
      needsEmailConfirmation: false,
    }
  }

  return {
    user: buildAuthUser(data.user, null),
    needsEmailConfirmation,
  }
}

export async function signInWithOAuthProvider(provider: Provider) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: authCallbackUrl(),
    },
  })
  if (error) throw error
}

export async function signInWithGoogle() {
  return signInWithOAuthProvider('google')
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/** After OAuth redirect, exchange URL params for a session (PKCE / implicit). */
export async function completeAuthFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) throw error
    return
  }

  const { error } = await supabase.auth.getSession()
  if (error) throw error
}
