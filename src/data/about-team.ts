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
 * 2. `roleId` picks the badge color + default label. Pass `roleLabel` to
 *    override the text. Ids: 'president', 'vice_president',
 *    'administrative_director', 'tech_director', 'tech_officer',
 *    'marketing_director', 'marketing_officer', 'industry_director',
 *    'industry_officer', 'finance_director', 'finance_officer',
 *    'sprint_director', 'sprint_officer', 'events_officer'.
 * 3. `bio` shows in the pop-up card when someone clicks the person. Optional.
 * 4. Optional links: `linkedInUrl`, `githubUrl`, `websiteUrl`.
 *
 * NOTES:
 * - Some names were best-guessed from handles and need confirming: Divya
 *   (divya2977), Nathan, Sahithi (sαнıтнı / sahithi), Sobi (sobisuri); "Aeleph"
 *   and "Rome" are left verbatim.
 * - There are two people named Siri: "Siri A." (Appalaneni, Industry Director)
 *   and "Siri" (Technical + Events officer). Rahul and Sahithi each sit on two
 *   teams, so they appear in two sections with the same photo.
 * - Still need photos + bios: Jaideep, Tanish, Sanchia, Indra, Ritikha, Aeleph,
 *   Rome, Sobi, Ayesha.
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
    id: 'fabrina',
    name: 'Fabrina',
    roleId: 'president',
    imageUrl: '/team/fabrina.webp',
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
        imageUrl: '/team/meet.webp',
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
        imageUrl: '/team/sharad.webp',
      }),
      officers: [
        officer({
          id: 'jalen',
          name: 'Jalen',
          roleId: 'tech_officer',
          imageUrl: '/team/jalen.webp',
        }),
        officer({
          id: 'khushi',
          name: 'Khushi',
          roleId: 'tech_officer',
          imageUrl: '/team/khushi.webp',
        }),
        officer({
          id: 'lavanya',
          name: 'Lavanya',
          roleId: 'tech_officer',
          imageUrl: '/team/lavanya.webp',
        }),
        officer({
          id: 'pranathi',
          name: 'Pranathi',
          roleId: 'tech_officer',
          imageUrl: '/team/pranathi.webp',
        }),
        officer({
          id: 'siri-tech',
          name: 'Siri',
          roleId: 'tech_officer',
          imageUrl: '/team/siri.webp',
        }),
      ],
    },
    {
      id: 'marketing',
      title: 'Marketing',
      director: officer({
        id: 'jiya',
        name: 'Jiya',
        roleId: 'marketing_director',
        roleLabel: 'Marketing & Events Director',
        imageUrl: '/team/jiya.webp',
      }),
      officers: [
        officer({
          id: 'rahul-marketing',
          name: 'Rahul',
          roleId: 'marketing_officer',
          imageUrl: '/team/rahul.webp',
        }),
        officer({ id: 'sobi', name: 'Sobi', roleId: 'marketing_officer' }),
      ],
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
        officer({
          id: 'divya',
          name: 'Divya',
          roleId: 'events_officer',
          imageUrl: '/team/divya.webp',
        }),
        officer({ id: 'indra', name: 'Indra', roleId: 'events_officer' }),
        officer({
          id: 'siri-events',
          name: 'Siri',
          roleId: 'events_officer',
          imageUrl: '/team/siri.webp',
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
        imageUrl: '/team/siri-a.webp',
      }),
      officers: [
        officer({
          id: 'arjun',
          name: 'Arjun',
          roleId: 'industry_officer',
          imageUrl: '/team/arjun.webp',
        }),
        officer({
          id: 'nathan',
          name: 'Nathan',
          roleId: 'industry_officer',
          imageUrl: '/team/nathan.webp',
        }),
        officer({ id: 'ritikha', name: 'Ritikha', roleId: 'industry_officer' }),
        officer({
          id: 'sahithi-industry',
          name: 'Sahithi',
          roleId: 'industry_officer',
          imageUrl: '/team/sahithi.webp',
        }),
      ],
    },
    {
      id: 'finance',
      title: 'Finance',
      director: officer({
        id: 'tanish',
        name: 'Tanish',
        roleId: 'finance_director',
      }),
      officers: [
        officer({ id: 'aeleph', name: 'Aeleph', roleId: 'finance_officer' }),
        officer({ id: 'rome', name: 'Rome', roleId: 'finance_officer' }),
        officer({
          id: 'zoya',
          name: 'Zoya',
          roleId: 'finance_officer',
          imageUrl: '/team/zoya.webp',
        }),
      ],
    },
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
          id: 'ayesha',
          name: 'Ayesha',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
        }),
        officer({
          id: 'gourav',
          name: 'Gourav',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/gourav.webp',
        }),
        officer({
          id: 'leela',
          name: 'Leela',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/leela.webp',
        }),
        officer({
          id: 'niket',
          name: 'Niket',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/niket.webp',
        }),
        officer({
          id: 'rahul-sprints',
          name: 'Rahul',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/rahul.webp',
        }),
        officer({
          id: 'sourish',
          name: 'Sourish',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/sourish.webp',
        }),
        officer({
          id: 'sahithi-sprints',
          name: 'Sahithi',
          roleId: 'sprint_officer',
          roleLabel: SPRINTS_OFFICER_LABEL,
          imageUrl: '/team/sahithi.webp',
        }),
      ],
    },
  ],

  pastOfficers: [],
}
