export const officerKeys = {
  all: ['officers'] as const,
  my: (userId: string) => [...officerKeys.all, 'my', userId] as const,
}
