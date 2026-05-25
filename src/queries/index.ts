export { createAppQueryClient } from '#/queries/query-client'
export { authKeys } from '#/queries/auth-keys'
export {
  useAuthSessionListener,
  useAuthSessionQuery,
  useGoogleSignInMutation,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} from '#/queries/auth'
export { hackathonSubmissionKeys } from '#/queries/hackathon-submission-keys'
export {
  getHackathonMutationError,
  useHackathonRegistrationQuery,
  useMyHackathonSubmissionQuery,
  useSaveHackathonDraftMutation,
  useSubmitHackathonApplicationMutation,
} from '#/queries/hackathon-submissions'
