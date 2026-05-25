import type {
  ApplicationActivityItem,
  ApplicationDecisionStatus,
  ApplicationFlag,
  ApplicationNote,
} from '#/types/admin-application'

const STORAGE_KEY = 'gdg_admin_application_reviews'

export type StoredApplicationReview = {
  decision: ApplicationDecisionStatus
  decidedAt?: string
  decidedById?: string
  decidedByName?: string
  flags: ApplicationFlag[]
  reviewed?: boolean
  reviewedAt?: string
  reviewedById?: string
  reviewedByName?: string
  notes: ApplicationNote[]
}

function readStore(): Record<string, StoredApplicationReview> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, StoredApplicationReview>
  } catch {
    return {}
  }
}

function writeStore(store: Record<string, StoredApplicationReview>) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function loadApplicationReview(
  submissionId: string,
): StoredApplicationReview | null {
  return readStore()[submissionId] ?? null
}

export function loadAllApplicationReviews(): Record<
  string,
  StoredApplicationReview
> {
  return readStore()
}

function ensureReview(
  store: Record<string, StoredApplicationReview>,
  submissionId: string,
): StoredApplicationReview {
  return (
    store[submissionId] ?? {
      decision: 'pending',
      flags: [],
      notes: [],
    }
  )
}

export function saveApplicationReview(
  submissionId: string,
  patch: Partial<StoredApplicationReview>,
): StoredApplicationReview {
  const store = readStore()
  const next = { ...ensureReview(store, submissionId), ...patch }
  store[submissionId] = next
  writeStore(store)
  return next
}

export function appendApplicationFlag(
  submissionId: string,
  flag: ApplicationFlag,
): StoredApplicationReview {
  const store = readStore()
  const current = ensureReview(store, submissionId)
  const flags = [...current.flags, flag]
  const next: StoredApplicationReview = {
    ...current,
    decision: 'flagged',
    flags,
  }
  store[submissionId] = next
  writeStore(store)
  return next
}

export function clearApplicationFlags(
  submissionId: string,
): StoredApplicationReview {
  const store = readStore()
  const current = ensureReview(store, submissionId)
  const next: StoredApplicationReview = {
    ...current,
    flags: [],
    decision:
      current.decision === 'flagged' ? 'pending' : current.decision,
  }
  store[submissionId] = next
  writeStore(store)
  return next
}

export function appendApplicationNote(
  submissionId: string,
  note: ApplicationNote,
): StoredApplicationReview {
  const store = readStore()
  const current = ensureReview(store, submissionId)
  const next: StoredApplicationReview = {
    ...current,
    notes: [...current.notes, note],
  }
  store[submissionId] = next
  writeStore(store)
  return next
}

export function buildActivityTimeline(
  review: StoredApplicationReview | null,
): ApplicationActivityItem[] {
  if (!review) return []

  const items: ApplicationActivityItem[] = []

  if (review.decidedAt && review.decidedByName && review.decision !== 'pending') {
    const verb =
      review.decision === 'accepted'
        ? 'Accepted'
        : review.decision === 'rejected'
          ? 'Rejected'
          : review.decision === 'flagged'
            ? 'Flagged for discussion'
            : 'Updated'
    items.push({
      id: `decision-${review.decidedAt}`,
      kind: 'decision',
      label: `${verb} by ${review.decidedByName}`,
      createdAt: review.decidedAt,
      adminName: review.decidedByName,
    })
  }

  for (const flag of review.flags) {
    items.push({
      id: flag.id,
      kind: 'flag',
      label: flag.reason
        ? `Flagged by ${flag.adminName}: ${flag.reason}`
        : `Flagged by ${flag.adminName}`,
      createdAt: flag.createdAt,
      adminName: flag.adminName,
    })
  }

  for (const note of review.notes) {
    items.push({
      id: note.id,
      kind: 'note',
      label: note.body,
      createdAt: note.createdAt,
      adminName: note.adminName,
    })
  }

  if (review.reviewedAt && review.reviewedByName) {
    items.push({
      id: `reviewed-${review.reviewedAt}`,
      kind: 'reviewed',
      label: `Marked as reviewed by ${review.reviewedByName}`,
      createdAt: review.reviewedAt,
      adminName: review.reviewedByName,
    })
  }

  return items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}
