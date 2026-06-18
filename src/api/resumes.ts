import { supabase } from '#/lib/supabase'

const RESUMES_BUCKET = 'resumes'

export function hackathonResumeStoragePath(
  userId: string,
  hackathonId: string,
): string {
  return `${userId}/${hackathonId}/resume.pdf`
}

export async function uploadHackathonResume(
  path: string,
  file: Blob,
): Promise<void> {
  const { error } = await supabase.storage
    .from(RESUMES_BUCKET)
    .upload(path, file, { upsert: true, contentType: 'application/pdf' })

  if (error) throw error
}

export async function createResumeSignedUrl(
  storagePath: string,
  expiresIn = 3600,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(RESUMES_BUCKET)
    .createSignedUrl(storagePath, expiresIn)

  if (error) throw error
  if (!data?.signedUrl) throw new Error('Could not create resume link')

  return data.signedUrl
}
