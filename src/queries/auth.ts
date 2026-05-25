import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  fetchAuthSession,
  signInWithEmailPassword,
  signInWithGoogle,
  signOut,
  signUpWithEmailPassword,
} from '#/api/auth'
import { supabase } from '#/lib/supabase'
import type { SignInCredentials, SignUpCredentials } from '#/types/auth'
import { authKeys } from '#/queries/auth-keys'

export function useAuthSessionQuery() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: fetchAuthSession,
    staleTime: 5 * 60 * 1000,
  })
}

/** Keep session query in sync with Supabase auth events. */
export function useAuthSessionListener() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void queryClient.invalidateQueries({ queryKey: authKeys.session() })
    })

    return () => subscription.unsubscribe()
  }, [queryClient])
}

export function useSignInMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: SignInCredentials) =>
      signInWithEmailPassword(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.session(), user)
    },
  })
}

export function useSignUpMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: SignUpCredentials) =>
      signUpWithEmailPassword(credentials),
    onSuccess: (result) => {
      if (!result.needsEmailConfirmation) {
        queryClient.setQueryData(authKeys.session(), result.user)
      }
    },
  })
}

export function useSignOutMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.session(), null)
    },
  })
}

export function useGoogleSignInMutation() {
  return useMutation({
    mutationFn: signInWithGoogle,
  })
}
