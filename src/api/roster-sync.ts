import { parseRosterCsvFile } from '#/lib/roster-csv-parser'
import { supabase } from '#/lib/supabase'
import type {
  ParsedRosterCsv,
  RosterSyncApplyResult,
  VerifyUsersByEmailRpcResult,
} from '#/types/roster-sync'
import type { RosterSyncPreview } from '#/types/admin-member'

export async function parseRosterCsvUpload(file: File): Promise<ParsedRosterCsv> {
  const emails = await parseRosterCsvFile(file)
  return {
    fileName: file.name,
    emails,
  }
}

/** Build preview payload from extracted roster emails (diff RPC coming later). */
export function buildRosterSyncPreview(
  parsed: ParsedRosterCsv,
): RosterSyncPreview {
  return {
    fileName: parsed.fileName,
    emails: parsed.emails,
    emailCount: parsed.emails.length,
    added: [],
    removed: [],
    unchangedCount: 0,
    pendingSignups: parsed.emails.map((email) => ({ email })),
  }
}

function toNonNegInt(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
    return Math.floor(value)
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value)
    if (Number.isFinite(n) && n >= 0) return Math.floor(n)
  }
  return null
}

function normalizeRpcData(
  data: unknown,
): VerifyUsersByEmailRpcResult | null {
  if (data == null) return null
  const row = Array.isArray(data) ? data[0] : data
  if (!row || typeof row !== 'object') return null
  const o = row as Record<string, unknown>
  const newly = toNonNegInt(o.newly_verified)
  const totalV = toNonNegInt(o.total_verified)
  const totalU = toNonNegInt(o.total_users)
  if (newly === null || totalV === null || totalU === null) {
    return null
  }
  return {
    newly_verified: newly,
    total_verified: totalV,
    total_users: totalU,
  }
}

/**
 * Calls `verify_users_by_email` with roster emails and returns counts.
 */
export async function applyRosterSync(
  emails: string[],
): Promise<RosterSyncApplyResult> {
  const { data, error } = await supabase.rpc('verify_users_by_email', {
    emails,
  })

  if (error) throw error

  const rpc = normalizeRpcData(data)
  if (!rpc) {
    throw new Error(
      'Unexpected response from verify_users_by_email. Expected newly_verified, total_verified, total_users.',
    )
  }

  return {
    emailCount: emails.length,
    appliedAt: new Date().toISOString(),
    rpc,
  }
}

export function mapRosterSyncError(error: unknown): string {
  if (error instanceof Error && error.message) {
    const msg = error.message
    if (msg.includes('row-level security') || msg.includes('RLS')) {
      return 'You do not have permission to run roster sync.'
    }
    return msg
  }
  if (error && typeof error === 'object' && 'message' in error) {
    const message = error.message
    if (typeof message === 'string' && message) {
      if (message.includes('row-level security') || message.includes('RLS')) {
        return 'You do not have permission to run roster sync.'
      }
      return message
    }
  }
  return 'Could not process the roster file. Please try again.'
}
