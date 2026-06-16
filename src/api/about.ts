import { supabase } from '#/lib/supabase'
import { buildAboutPageData } from '#/lib/about-page-mapper'
import type { AboutPageData } from '#/types/about'
import { OFFICER_COLUMNS, type OfficersRow } from '#/types/officers'

export async function fetchAboutPageData(): Promise<AboutPageData> {
  const { data, error } = await supabase
    .from('officers')
    .select(OFFICER_COLUMNS)
    .order('created_at', { ascending: true })

  if (error) throw error

  return buildAboutPageData((data ?? []) as OfficersRow[])
}

export function mapAboutPageError(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'Could not load the team page.'
  }

  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message
      : ''

  return message || 'Could not load the team page.'
}
