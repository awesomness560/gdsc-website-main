import type { HackdscRegistrationFormState } from '#/types/hackdsc-registration'
import type { DbExperienceLevel, DbTeamStatus } from '#/types/hackathon-submission'

export type ApplicationDecisionStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'flagged'

export type ApplicationFlag = {
  id: string
  adminId: string
  adminName: string
  reason?: string
  createdAt: string
}

export type ApplicationNote = {
  id: string
  adminId: string
  adminName: string
  body: string
  createdAt: string
}

export type ApplicationActivityItem = {
  id: string
  kind: 'decision' | 'flag' | 'unflag' | 'note' | 'reviewed'
  label: string
  createdAt: string
  adminName?: string
}

export type AdminApplication = {
  id: string
  hackathonId: string
  userId: string
  submittedAt: string
  updatedAt: string
  form: HackdscRegistrationFormState
  /** Raw DB fields for filters */
  experienceLevel: DbExperienceLevel | null
  teamStatus: DbTeamStatus | null
  isMember: boolean
  avatarUrl?: string
  decision: ApplicationDecisionStatus
  decidedAt?: string
  decidedByName?: string
  flags: ApplicationFlag[]
  reviewed: boolean
  reviewedAt?: string
  reviewedByName?: string
  notes: ApplicationNote[]
  activity: ApplicationActivityItem[]
}

export type ApplicationListFilters = {
  status: ApplicationDecisionStatus | 'all'
  membership: 'all' | 'member' | 'non-member'
  school: string
  experienceLevel: DbExperienceLevel | 'all'
  teamStatus: DbTeamStatus | 'all'
  dateRange: 'all' | '7d' | '30d'
}

export const defaultApplicationFilters: ApplicationListFilters = {
  status: 'all',
  membership: 'all',
  school: '',
  experienceLevel: 'all',
  teamStatus: 'all',
  dateRange: 'all',
}
