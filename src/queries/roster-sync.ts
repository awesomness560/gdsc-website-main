import { useMutation } from '@tanstack/react-query'
import {
  applyRosterSync,
  buildRosterSyncPreview,
  mapRosterSyncError,
  parseRosterCsvUpload,
} from '#/api/roster-sync'

export function useParseRosterCsvMutation() {
  return useMutation({
    mutationFn: async (file: File) => {
      const parsed = await parseRosterCsvUpload(file)
      return buildRosterSyncPreview(parsed)
    },
  })
}

export function useApplyRosterSyncMutation() {
  return useMutation({
    mutationFn: (emails: string[]) => applyRosterSync(emails),
  })
}

export function getRosterSyncMutationError(error: unknown) {
  return mapRosterSyncError(error)
}
