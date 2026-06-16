export {
  buildAuthUser,
  completeAuthFromUrl,
  fetchAuthSession,
  mapAuthUser,
  mapSupabaseAuthUser,
  resolveAuthUser,
  signInWithEmailPassword,
  signInWithGoogle,
  signOut,
  signUpWithEmailPassword,
  type AuthUserMetadata,
  type SignUpResult,
} from '#/api/auth'
export { mapAuthApiError } from '#/api/map-auth-error'
export { fetchUserProfile, upsertUserProfile } from '#/api/users'
export {
  computeAdminMembersSummary,
  fetchAdminMembers,
  mapAdminUsersError,
  setAdminMemberPrimaryRole,
  setAdminMemberVerified,
  setAdminMembersPrimaryRole,
  setAdminMembersVerified,
  updateAdminMember,
} from '#/api/admin-users'
export {
  addApplicationNote,
  fetchAdminApplications,
  flagApplication,
  mapAdminApplicationsError,
  markApplicationReviewed,
  setApplicationDecision,
  unflagApplication,
} from '#/api/admin-applications'
export {
  applyRosterSync,
  buildRosterSyncPreview,
  mapRosterSyncError,
  parseRosterCsvUpload,
} from '#/api/roster-sync'
export {
  createAdminOfficer,
  deactivateAdminOfficer,
  fetchAdminOfficers,
  mapAdminOfficersError,
  reactivateAdminOfficer,
  updateAdminOfficer,
  uploadOfficerPhoto,
} from '#/api/admin-officers'
export {
  fetchHackathonRegistrationStatus,
  fetchMyHackathonSubmission,
  mapHackathonSubmissionError,
  saveHackathonSubmissionDraft,
  submitHackathonApplication,
} from '#/api/hackathon-submissions'
