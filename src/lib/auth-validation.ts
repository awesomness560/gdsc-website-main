import type { AuthFieldErrors } from '#/types/auth'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type PasswordRequirement = {
  id: string
  label: string
  test: (password: string) => boolean
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (p) => p.length >= 8,
  },
  {
    id: 'number',
    label: 'One number',
    test: (p) => /\d/.test(p),
  },
  {
    id: 'symbol',
    label: 'One symbol',
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
]

export function isValidEmail(email: string) {
  return EMAIL_RE.test(email.trim())
}

export function meetsAllPasswordRequirements(password: string) {
  return passwordRequirements.every((r) => r.test(password))
}

export function validateLoginFields(
  email: string,
  password: string,
): AuthFieldErrors {
  const errors: AuthFieldErrors = {}
  if (!email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!password) {
    errors.password = 'Password is required.'
  }
  return errors
}

export function validateSignupFields(
  name: string,
  email: string,
  password: string,
): AuthFieldErrors {
  const errors: AuthFieldErrors = {}
  if (!name.trim()) {
    errors.name = 'Full name is required.'
  }
  if (!email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!password) {
    errors.password = 'Password is required.'
  } else if (!meetsAllPasswordRequirements(password)) {
    errors.password = 'Password does not meet the requirements below.'
  }
  return errors
}
