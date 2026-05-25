import {
  buildActivityTimeline,
  type StoredApplicationReview,
} from '#/lib/admin-application-review-store'
import { mapSubmissionRowToForm } from '#/lib/hackathon-submission-mapper'
import type {
  AdminApplication,
  ApplicationDecisionStatus,
} from '#/types/admin-application'
import type { UserProfile } from '#/types/auth'
import type { HackathonSubmissionRow } from '#/types/hackathon-submission'

export function resolveApplicationDecision(
  review: StoredApplicationReview | null,
): ApplicationDecisionStatus {
  if (!review) return 'pending'
  if (review.flags.length > 0 && review.decision !== 'accepted' && review.decision !== 'rejected') {
    return 'flagged'
  }
  return review.decision
}

export function mapSubmissionToAdminApplication(
  row: HackathonSubmissionRow,
  profile: UserProfile | null,
  review: StoredApplicationReview | null,
): AdminApplication | null {
  if (row.status !== 'submitted' || !row.submitted_at) return null

  const decision = resolveApplicationDecision(review)
  const activity = buildActivityTimeline(review)

  return {
    id: row.id,
    hackathonId: row.hackathon_id,
    userId: row.user_id,
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
    form: mapSubmissionRowToForm(row),
    experienceLevel: row.experience_level,
    teamStatus: row.team_status,
    isMember: profile?.is_verified ?? false,
    avatarUrl: profile?.avatar_url ?? undefined,
    decision,
    decidedAt: review?.decidedAt,
    decidedByName: review?.decidedByName,
    flags: review?.flags ?? [],
    reviewed: review?.reviewed ?? false,
    reviewedAt: review?.reviewedAt,
    reviewedByName: review?.reviewedByName,
    notes: review?.notes ?? [],
    activity,
  }
}
