import { AuthError } from '@supabase/supabase-js'
import type { AuthFieldErrors } from '#/types/auth'

function messageFromUnknown(error: unknown): string | undefined {
  if (error instanceof Error) return error.message
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message: unknown }).message
    if (typeof message === 'string' && message.trim()) return message
  }
  return undefined
}

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

  const message = messageFromUnknown(error)
  if (message) {
    return { general: message }
  }

  return { general: 'Something went wrong. Please try again.' }
}
