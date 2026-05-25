import type { Provider, User } from '@supabase/supabase-js'
import { supabase } from '#/lib/supabase'
import type {
  AuthProvider,
  AuthUser,
  SignInCredentials,
  SignUpCredentials,
} from '#/types/auth'

/** Raw `user_metadata` shape from Supabase (email signup + OAuth). */
export type AuthUserMetadata = {
  full_name?: string
  name?: string
  avatar_url?: string
  picture?: string
}

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

/** Map Supabase user → app `AuthUser` (full_name + avatar_url from metadata). */
export function mapAuthUser(user: User): AuthUser {
  const meta = (user.user_metadata ?? {}) as AuthUserMetadata

  return {
    id: user.id,
    email: user.email ?? '',
    name:
      meta.full_name ??
      meta.name ??
      user.email?.split('@')[0] ??
      'Member',
    avatarUrl: meta.avatar_url ?? meta.picture,
    provider: resolveProvider(user),
  }
}

export async function fetchAuthSession(): Promise<AuthUser | null> {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  if (!data.session?.user) return null
  return mapAuthUser(data.session.user)
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
  return mapAuthUser(data.user)
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
      },
    },
  })
  if (error) throw error
  if (!data.user) throw new Error('Sign-up succeeded but no user was returned.')

  return {
    user: mapAuthUser(data.user),
    needsEmailConfirmation: data.session === null,
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
