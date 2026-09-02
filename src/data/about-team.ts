import { ABOUT_HERO } from '#/data/about-divisions'
import { getOfficerRoleLabel } from '#/data/officer-roles'
import type { AboutOfficer, AboutPageData } from '#/types/about'
import type { OfficerRoleId } from '#/types/admin-team'

/**
 * Hand-maintained team roster for the public About page.
 *
 * This replaces the live Supabase `officers` query for launch. The database
 * path is still wired up (`src/queries/about.ts`, `src/api/about.ts`,
 * `src/components/admin/team/*`) — to switch back, restore `useAboutPageQuery()`
 * in `src/routes/about.tsx`.
 *
 * ── How to edit ──────────────────────────────────────────────────────────────
 * 1. Add a square photo (JPG/PNG, ~400×400) to `public/team/` — e.g.
 *    `public/team/sharad.jpg` — and set `imageUrl: '/team/sharad.jpg'`.
 *    Leave `imageUrl` off to fall back to initials.
 * 2. `roleId` picks the badge label + color. Ids: 'president', 'vice_president',
 *    'administrative_director', 'tech_director', 'tech_officer',
 *    'marketing_director', 'marketing_officer', 'industry_director',
 *    'industry_officer', 'finance_director', 'finance_officer',
 *    'sprint_director', 'sprint_officer', 'events_officer'.
 *    Pass `roleLabel` to override the text shown on the badge.
 * 3. `bio` shows in the pop-up card when someone clicks the person. Optional.
 * 4. Optional links: `linkedInUrl`, `githubUrl`, `websiteUrl`.
 *
 * TODO(team): add profile photos to `public/team/` and fill in bios.
 */

type OfficerInput = {
  id: string
  name: string
  roleId: OfficerRoleId
  roleLabel?: string
  bio?: string
  imageUrl?: string
  linkedInUrl?: string
  githubUrl?: string
  websiteUrl?: string
}

function officer(input: OfficerInput): AboutOfficer {
  return {
    bio: '',
    ...input,
    roleLabel: input.roleLabel ?? getOfficerRoleLabel(input.roleId),
  }
}

export const aboutTeamData: AboutPageData = {
  hero: ABOUT_HERO,

  president: officer({
    id: 'frabina',
    name: 'Frabina',
    roleId: 'president',
  }),

  vicePresident: officer({
    id: 'jaideep',
    name: 'Jaideep',
    roleId: 'vice_president',
  }),

  divisions: [
    {
      id: 'administrative',
      title: 'Administrative',
      director: officer({
        id: 'meet',
        name: 'Meet',
        roleId: 'administrative_director',
      }),
      officers: [],
    },
    {
      id: 'technical',
      title: 'Technical',
      director: officer({
        id: 'sharad',
        name: 'Sharad',
        roleId: 'tech_director',
      }),
      officers: [],
    },
    {
      id: 'marketing',
      title: 'Marketing',
      director: officer({
        id: 'jiya',
        name: 'Jiya',
        roleId: 'marketing_director',
        roleLabel: 'Marketing & Events Director',
      }),
      officers: [],
    },
    {
      id: 'events',
      title: 'Events',
      officers: [
        officer({
          id: 'sanchia',
          name: 'Sanchia',
          roleId: 'events_officer',
          roleLabel: 'Events',
        }),
      ],
    },
    {
      id: 'industry',
      title: 'Industry',
      director: officer({
        id: 'siri-a',
        name: 'Siri A.',
        roleId: 'industry_director',
      }),
      officers: [],
    },
    {
      id: 'finance',
      title: 'Finance',
      director: officer({
        id: 'tanish',
        name: 'Tanish',
        roleId: 'finance_director',
      }),
      officers: [],
    },
    {
      id: 'sprints',
      title: 'GDG Sprints',
      officers: [
        officer({
          id: 'pranav',
          name: 'Pranav',
          roleId: 'sprint_director',
          roleLabel: 'GDG Sprints Director',
        }),
        officer({
          id: 'monish',
          name: 'Monish',
          roleId: 'sprint_director',
          roleLabel: 'GDG Sprints Director',
        }),
      ],
    },
  ],

  pastOfficers: [],
}
