import type { AuthUser } from '#/types/auth'

/** Placeholder user returned after a successful dummy sign-in. */
export const dummyAuthUser: AuthUser = {
  id: 'usr_dummy_001',
  email: 'student@utdallas.edu',
  name: 'Alex Rivera',
  avatarUrl: undefined,
  provider: 'email',
}

export const dummyGoogleUser: AuthUser = {
  id: 'usr_dummy_google',
  email: 'alex.rivera@gmail.com',
  name: 'Alex Rivera',
  avatarUrl: undefined,
  provider: 'google',
}

/** Simulated network delay for auth actions (ms). */
export const AUTH_STUB_DELAY_MS = 900

/** Demo credentials accepted by the skeleton auth layer. */
export const DEMO_LOGIN = {
  email: 'student@utdallas.edu',
  password: 'Demo123!',
} as const
