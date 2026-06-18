import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react'
import { useAuth } from '#/contexts/AuthContext'
import { useMyOfficerQuery } from '#/queries/my-officer'
import type { AdminOfficer } from '#/types/admin-team'

type OfficerContextValue = {
  officer: AdminOfficer | null
  isOfficer: boolean
  isOfficerPending: boolean
}

const OfficerContext = createContext<OfficerContextValue | null>(null)

export function OfficerProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const userId = isAuthenticated ? user?.auth.id : undefined
  const officerQuery = useMyOfficerQuery(userId)

  const value = useMemo<OfficerContextValue>(() => {
    const officer = officerQuery.data ?? null
    return {
      officer,
      isOfficer: Boolean(officer?.active),
      isOfficerPending: Boolean(userId) && officerQuery.isPending,
    }
  }, [officerQuery.data, officerQuery.isPending, userId])

  return (
    <OfficerContext.Provider value={value}>{children}</OfficerContext.Provider>
  )
}

export function useOfficer() {
  const ctx = useContext(OfficerContext)
  if (!ctx) {
    throw new Error('useOfficer must be used within OfficerProvider')
  }
  return ctx
}
