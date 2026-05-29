export type HackdscLifecycleStatus =
  | 'draft'
  | 'applications_open'
  | 'applications_closed'
  | 'event_in_progress'
  | 'completed'

export type HackdscAdminConfig = {
  eventName: string
  eventStart: string
  eventEnd: string
  applicationDeadline: string
  acceptanceNotificationDate: string | null
  locationName: string
  locationAddress: string
  status: HackdscLifecycleStatus
  updatedAt: string
  updatedByName: string
}

export type HackdscAttentionItem = {
  id: string
  icon: 'clock' | 'flag' | 'calendar' | 'alert' | 'mail'
  message: string
  actionLabel: string
  href: string
}

export type HackdscOverviewMetrics = {
  totalApplications: number
  totalApplicationsDelta: number
  pendingReview: number
  acceptedCount: number
  reviewedCount: number
  acceptanceRate: number | null
  timeTarget: string | null
  timeTargetLabel: string
}
