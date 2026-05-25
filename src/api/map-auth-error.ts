import { AuthError } from '@supabase/supabase-js'
import type { AuthFieldErrors } from '#/types/auth'

export function mapAuthApiError(error: unknown): AuthFieldErrors {
  if (error instanceof AuthError) {
    const message = error.message.toLowerCase()

    if (
      message.includes('invalid login credentials') ||
      message.includes('invalid email or password')
    ) {
      return { general: 'Invalid email or password.' }
    }

    if (message.includes('user already registered')) {
      return { email: 'An account with this email already exists.' }
    }

    if (message.includes('password')) {
      return { password: error.message }
    }

    if (message.includes('email')) {
      return { email: error.message }
    }

    return { general: error.message }
  }

  if (error instanceof Error) {
    return { general: error.message }
  }

  return { general: 'Something went wrong. Please try again.' }
}
