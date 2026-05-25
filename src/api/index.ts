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
  fetchHackathonRegistrationStatus,
  fetchMyHackathonSubmission,
  mapHackathonSubmissionError,
  saveHackathonSubmissionDraft,
  submitHackathonApplication,
} from '#/api/hackathon-submissions'
