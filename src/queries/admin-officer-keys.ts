export const adminOfficerKeys = {
  all: ['admin-officers'] as const,
  list: () => [...adminOfficerKeys.all, 'list'] as const,
}
