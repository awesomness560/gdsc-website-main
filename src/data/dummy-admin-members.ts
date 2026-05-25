import type { RosterSyncPreview } from '#/types/admin-member'

/** Placeholder until roster sync is backed by the database. */
export const dummyRosterSyncPreview: RosterSyncPreview = {
  added: [
    { name: 'Priya Shah', email: 'priya.shah@university.edu' },
    { name: 'Noah Williams', email: 'noah.w@university.edu' },
    { name: 'Elena Vasquez', email: 'elena.v@university.edu' },
  ],
  removed: [
    { name: 'Old Account', email: 'alumni@university.edu' },
  ],
  unchangedCount: 380,
  pendingSignups: [
    { email: 'new1@university.edu' },
    { email: 'new2@university.edu' },
  ],
}
