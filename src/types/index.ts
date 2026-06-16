export type { SiteConfig } from '#/types/site-config'

export type {
  DbDietaryRestriction,
  DbExperienceLevel,
  DbTeamStatus,
  HackathonRegistrationStatus,
  HackathonSubmission,
  HackathonSubmissionRow,
  SubmissionStatus,
} from '#/types/hackathon-submission'

export type {
  HackdscExperienceLevel,
  HackdscRegistrationData,
  HackdscRegistrationErrors,
  HackdscRegistrationFormState,
  HackdscRegistrationStep,
  HackdscRegistrationStepId,
  HackdscTeamSize,
} from '#/types/hackdsc-registration'

export type {
  CountdownTime,
  HackdscPageData,
  HackFaqItem,
  HackHero,
  HackSponsor,
  HackStat,
  HackTrack,
  HackTrackIcon,
} from '#/types/hackdsc'

export type {
  NavGroup,
  NavLink as SiteNavLink,
  SiteNavItem,
} from '#/types/navigation'

export type {
  ScheduleDay,
  ScheduleEvent,
  ScheduleHero,
  SchedulePageData,
} from '#/types/schedule'

export type {
  AboutHero,
  AboutPageData,
  Division,
  LeadershipTeam,
  TeamMember,
} from '#/types/about'

export type {
  ClubEventDetail,
  EventType,
  EventTypeColors,
  EventPresenter,
  EventRegistration,
  EventRegistrationState,
  EventResource,
  EventResourceKind,
  EventsPageData,
  EventsPageHero,
  EventsSearch,
  EventLocation,
  EventStatusPill,
} from '#/types/events'

export type {
  AdminApplication,
  ApplicationActivityItem,
  ApplicationDecisionStatus,
  ApplicationFlag,
  ApplicationListFilters,
  ApplicationNote,
} from '#/types/admin-application'

export type {
  HackdscAdminConfig,
  HackdscAttentionItem,
  HackdscLifecycleStatus,
  HackdscOverviewMetrics,
} from '#/types/admin-hackdsc'

export type {
  AdminScheduleDayMeta,
  AdminScheduleEntry,
  ScheduleDayId,
  ScheduleEntryCategory,
  ScheduleEntryDraft,
} from '#/types/admin-schedule'

export type {
  ParsedRosterCsv,
  RosterSyncApplyResult,
  VerifyUsersByEmailRpcResult,
} from '#/types/roster-sync'

export type {
  AdminMember,
  AdminMemberActivity,
  AdminMembersSummary,
  MemberFilter,
  MemberSort,
  RosterSyncPreview,
} from '#/types/admin-member'

export type {
  AdminOfficer,
  AdminOfficerDraft,
  MemberSearchResult,
  OfficerDisplaySection,
  OfficerRoleId,
  OfficerRoleOption,
  OfficerSectionId,
} from '#/types/admin-team'

export type {
  CreateOfficerInput,
  OfficersRow,
  UpdateOfficerInput,
} from '#/types/officers'

export type { UsersRow, UpdateUserProfileInput } from '#/types/users'

export type {
  AuthErrorCode,
  AuthFieldErrors,
  AuthProvider,
  AuthStatus,
  AuthUser,
  AuthUserMetadata,
  SignInCredentials,
  SignUpCredentials,
  SupabaseAuthUser,
  UserProfile,
  UserRole,
} from '#/types/auth'

export type {
  CtaLink,
  GoogleAccent,
  HeroContent,
  HeroMetaIcon,
  HeroMetaItem,
  LandingPageData,
  NavLink,
  Program,
  ProgramAccent,
  SectionCopy,
  Stat,
} from '#/types/landing'
