export const aboutKeys = {
  all: ['about'] as const,
  page: () => [...aboutKeys.all, 'page'] as const,
}
