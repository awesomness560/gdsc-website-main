import { getHackdscHackathonId } from '#/lib/hackathon-config'

export const adminApplicationKeys = {
  all: ['admin-applications'] as const,
  list: (hackathonId = getHackdscHackathonId()) =>
    [...adminApplicationKeys.all, 'list', hackathonId] as const,
}
