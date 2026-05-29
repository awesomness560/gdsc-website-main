/** Parsed roster CSV ready for preview / apply. */
export type ParsedRosterCsv = {
  fileName: string
  emails: string[]
}

/** Row returned by `public.verify_users_by_email` RPC. */
export type VerifyUsersByEmailRpcResult = {
  newly_verified: number
  total_verified: number
  total_users: number
}

export type RosterSyncApplyResult = {
  emailCount: number
  appliedAt: string
  rpc: VerifyUsersByEmailRpcResult
}
