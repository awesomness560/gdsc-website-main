/** Predefined officer roles shown on the About Us page. */
export type OfficerRoleId =
  | 'president'
  | 'vice_president'
  | 'administrative_director'
  | 'tech_director'
  | 'marketing_director'
  | 'industry_director'
  | 'finance_director'
  | 'sprint_director'
  | 'tech_officer'
  | 'marketing_officer'
  | 'industry_officer'
  | 'finance_officer'
  | 'sprint_officer'
  | 'events_officer'

export type OfficerSectionId = 'leadership' | 'directors' | 'officers'

export type OfficerRoleOption = {
  id: OfficerRoleId
  label: string
  section: OfficerSectionId
  /** Global sort index — matches About Us page ordering. */
  sortIndex: number
  dotClass: string
  badgeClass: string
}

/** Officer profile managed in the Team admin tab. */
export type AdminOfficer = {
  id: string
  memberId: string
  name: string
  email: string
  /** Public headshot for the About Us page. */
  officerImageUrl?: string
  roleId: OfficerRoleId
  bio: string
  active: boolean
}

/** Self-service officer profile edits (account tab). */
export type OfficerProfileDraft = {
  displayName: string
  bio: string
  officerImageUrl?: string
  pendingPhoto?: Blob
  removePhoto?: boolean
}

/** Form payload for creating or updating an officer profile. */
export type AdminOfficerDraft = {
  roleId: OfficerRoleId
  /** Existing remote photo URL (from storage). */
  officerImageUrl?: string
  /** Cropped JPEG ready to upload on save. */
  pendingPhoto?: Blob
  /** When true, clears the stored photo on save. */
  removePhoto?: boolean
  bio: string
}

/** Member account surfaced in the add-officer search step. */
export type MemberSearchResult = {
  id: string
  name: string
  email: string
}

export type OfficerDisplaySection = {
  id: OfficerSectionId | 'deactivated'
  label: string
  officers: AdminOfficer[]
}
