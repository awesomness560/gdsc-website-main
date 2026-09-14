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
 * 1. Photos live in `public/team/`, cropped to 400×400 WebP. To add/replace:
 *    magick "IN" -auto-orient -resize 400x400^ -gravity center -extent 400x400 \
 *      -strip -quality 82 -define webp:method=6 "public/team/<id>.webp"
 *    Then set `imageUrl: '/team/<id>.webp'`. No `imageUrl` = initials fallback.
 *
 * 2. `roleId` picks the badge color + default label. Pass `roleLabel` to
 *    override the text.
 *
 * 3. `bio` shows in the pop-up card when someone clicks the person. Optional.
 *
 * 4. Optional links: `linkedInUrl`, `githubUrl`, `websiteUrl`.
 *
 * NOTES:
 * - Jiya serves as both Marketing and Events Director.
 * - Some officers serve on more than one team. They use unique IDs in each
 *   division while sharing the same photo.
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

const SPRINTS_OFFICER_LABEL = 'GDG Sprints Officer'

export const aboutTeamData: AboutPageData = {
  hero: ABOUT_HERO,

  president: officer({
    id: 'frabina',
    name: 'Frabina',
    roleId: 'president',
    imageUrl: '/team/frabina.webp',
  }),

  vicePresident: officer({
    id: 'jaideep',
    name: 'Jaideep',
    roleId: 'vice_president',
  }),

  divisions: [
    // ─────────────────────────────────────────────
    // Administrative
    // ─────────────────────────────────────────────
    {
      id: 'administrative',
      title: 'Administrative',

      director: officer({
        id: 'meet',
        name: 'Meet',
        roleId: 'administrative_director',
        imageUrl: '/team/meet.webp',
      }),

      officers: [],
    },

    // ─────────────────────────────────────────────
    // Technical
    // ─────────────────────────────────────────────
    {
      id: 'technical',
      title: 'Technical',

      director: officer({
        id: 'sharad',
        name: 'Sharad',
        roleId: 'tech_director',
        imageUrl: '/team/sharad.webp',
      }),

      officers: [
        officer({
          id: 'leela-tech',
          name: 'Leela',
          roleId: 'tech_officer',
          imageUrl: '/team/leela.webp',
        }),

        officer({
          id: 'sahithi-tech',
          name: 'Sahithi',
          roleId: 'tech_officer',
          imageUrl: '/team/sahithi.webp',
        }),

        officer({
          id: 'gourav-tech',
          name: 'Gourav',
          roleId: 'tech_officer',
          imageUrl: '/team/gourav.webp',
        }),

        officer({
          id: 'ayesha-tech',
          name: 'Ayesha',
          roleId: 'tech_officer',
        }),

        officer({
          id: 'niket-tech',
          name: 'Niket',
          roleId: 'tech_officer',
          imageUrl: '/team/niket.webp',
        }),

        officer({
          id: 'sourish-tech',
          name: 'Sourish',
          roleId: 'tech_officer',
          imageUrl: '/team/sourish.webp',
        }),

        officer({
          id: 'siri-tech',
          name: 'Siri',
          roleId: 'tech_officer',
          imageUrl: '/team/siri.webp',
        }),

        officer({
          id: 'rahul-tech',
          name: 'Rahul',
          roleId: 'tech_officer',
          imageUrl: '/team/rahul.webp',
        }),
      ],
    },

    // ─────────────────────────────────────────────
    // Marketing
    // ─────────────────────────────────────────────
    {
      id: 'marketing',
      title: 'Marketing',

      director: officer({
        id: 'jiya-marketing',
        name: 'Jiya',
        roleId: 'marketing_director',
        roleLabel: 'Marketing & Events Director',
        imageUrl: '/team/jiya.webp',
      }),

      officers: [
        officer({
          id: 'zoya-marketing',
          name: 'Zoya',
          roleId: 'marketing_officer',
          imageUrl: '/team/zoya.webp',
        }),

        officer({
          id: 'aeleph-marketing',
          name: 'Aeleph',
          roleId: 'marketing_officer',
        }),

        officer({
          id: 'roman-marketing',
          name: 'Roman',
          roleId: 'marketing_officer',
        }),
      ],
    },

    // ─────────────────────────────────────────────
    // Events
    // ─────────────────────────────────────────────
    {
      id: 'events',
      title: 'Events',

      director: officer({
        id: 'jiya-events',
        name: 'Jiya',
        roleId: 'marketing_director',
        roleLabel: 'Marketing & Events Director',
        imageUrl: '/team/jiya.webp',
      }),

      officers: [
        officer({
          id: 'sahithi-events',
          name: 'Sahithi',
          roleId: 'events_officer',
          roleLabel: 'Events',
          imageUrl: '/team/sahithi.webp',
        }),

        officer({
          id: 'rithika-events',
          name: 'Rithika',
          roleId: 'events_officer',
          roleLabel: 'Events',
        }),

        officer({
          id: 'nathan-events',
          name: 'Nathan',
          roleId: 'events_officer',
          roleLabel: 'Events',
          imageUrl: '/team/nathan.webp',
        }),

        officer({
          id: 'sanchia-events',
          name: 'Sanchia',
          roleId: 'events_officer',
          roleLabel: 'Events',
        }),

        officer({
          id: 'arjun-events',
          name: 'Arjun',
          roleId: 'events_officer',
          roleLabel: 'Events',
          imageUrl: '/team/arjun.webp',
        }),
      ],
    },

    // ─────────────────────────────────────────────
    // Industry
    // ─────────────────────────────────────────────
    {
      id: 'industry',
      title: 'Industry',

      director: officer({
        id: 'siri-a',
        name: 'Siri A.',
        roleId: 'industry_director',
        imageUrl: '/team/siri-a.webp',
      }),

      officers: [
        officer({
          id: 'indra-industry',
          name: 'Indra',
          roleId: 'industry_officer',
        }),

        officer({
          id: 'siri-industry',
          name: 'Siri',
          roleId: 'industry_officer',
          imageUrl: '/team/siri.webp',
        }),

        officer({
          id: 'divya-industry',
          name: 'Divya',
          roleId: 'industry_officer',
          imageUrl: '/team/divya.webp',
        }),
      ],
    },

    // ─────────────────────────────────────────────
    // Finance
    // ─────────────────────────────────────────────
    {
      id: 'finance',
      title: 'Finance',

      director: officer({
        id: 'tanish',
        name: 'Tanish',
        roleId: 'finance_director',
      }),

      officers: [
        officer({
          id: 'sobi-finance',
          name: 'Sobi',
          roleId: 'finance_officer',
        }),

        officer({
          id: 'akhil-finance',
          name: 'Akhil',
          roleId: 'finance_officer',
        }),

        officer({
          id: 'rahul-finance',
          name: 'Rahul',
          roleId: 'finance_officer',
          imageUrl: '/team/rahul.webp',
        }),
      ],
    },

    // ─────────────────────────────────────────────
    // GDG Sprints
    // ─────────────────────────────────────────────
    {
      id: 'sprints',
      title: 'GDG Sprints',

      directors: [
        officer({
          id: 'pranav',
          name: 'Pranav',
          roleId: 'sprint_director',
          roleLabel: 'GDG Sprints Director',
          imageUrl: '/team/pranav.webp',
        }),

        officer({
          id: 'monish',
          name: 'Monish',
          roleId: 'sprint_director',
          roleLabel: 'GDG Sprints Director',
          imageUrl: '/team/monish.webp',
        }),
      ],

      officers: [
        officer({
          id: 'baba-sprints',
          name: 'Baba',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
        }),

        officer({
          id: 'urmi-sprints',
          name: 'Urmi',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
        }),

        officer({
          id: 'siri-sprints',
          name: 'Siri',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/siri.webp',
        }),

        officer({
          id: 'jalen-sprints',
          name: 'Jalen',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/jalen.webp',
        }),

        officer({
          id: 'khushi-sprints',
          name: 'Khushi',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/khushi.webp',
        }),

        officer({
          id: 'divya-sprints',
          name: 'Divya',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/divya.webp',
        }),

        officer({
          id: 'ved-sprints',
          name: 'Ved',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
        }),

        officer({
          id: 'polina-sprints',
          name: 'Polina',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
        }),

        officer({
          id: 'rithika-sprints',
          name: 'Rithika',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
        }),

        officer({
          id: 'pranathi-sprints',
          name: 'Pranathi',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/pranathi.webp',
        }),

        officer({
          id: 'lavanya-sprints',
          name: 'Lavanya',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/lavanya.webp',
        }),

        officer({
          id: 'naavya-sprints',
          name: 'Naavya',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
        }),
      ],
    },
  ],

  pastOfficers: [],
}