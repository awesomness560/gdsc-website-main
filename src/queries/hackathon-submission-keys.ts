export const hackathonSubmissionKeys = {
  all: ['hackathon-submission'] as const,
  registration: (hackathonId: string) =>
    [...hackathonSubmissionKeys.all, 'registration', hackathonId] as const,
  mine: (hackathonId: string, userId: string) =>
    [...hackathonSubmissionKeys.all, 'mine', hackathonId, userId] as const,
}
