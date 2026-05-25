export type AuthProvider = 'email' | 'google' | 'github' | 'oauth'

export type AuthUser = {
  id: string
  email: string
  name: string
  avatarUrl?: string
  provider: AuthProvider
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

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = {
  name: string
  email: string
  password: string
}
