import type { SchedulePageData } from '#/types/schedule'

export const dummyScheduleData = {
  hero: {
    kicker: 'Schedule',
    title: '24 hours,',
    titleGradient: 'minute by',
    titleGradientLine2: 'minute.',
    subtitle: 'A rough map — room for workshops, meals, and side quests.',
  },
  days: [
    {
      id: 'friday',
      title: 'Friday',
      date: 'Sep 12',
      events: [
        {
          id: 'fri-checkin',
          time: '5:00 PM',
          title: 'Check-in opens',
          description: 'Badges, swag, and team meetups.',
          accent: 'blue',
          icon: 'flag',
        },
        {
          id: 'fri-opening',
          time: '7:00 PM',
          title: 'Opening ceremony',
          description: 'Keynote and track reveal.',
          accent: 'red',
          icon: 'mic',
        },
        {
          id: 'fri-hacking',
          time: '8:30 PM',
          title: 'Hacking begins',
          description: '24 hours on the clock. Mentors on standby.',
          accent: 'yellow',
          icon: 'code',
        },
        {
          id: 'fri-dinner',
          time: '10:00 PM',
          title: 'Late night dinner',
          description: 'Food break before the grind.',
          accent: 'green',
          icon: 'utensils',
        },
      ],
    },
    {
      id: 'saturday',
      title: 'Saturday',
      date: 'Sep 13',
      events: [
        {
          id: 'sat-breakfast',
          time: '8:00 AM',
          title: 'Breakfast',
          description: 'Coffee and fuel for the day.',
          accent: 'yellow',
          icon: 'coffee',
        },
        {
          id: 'sat-workshops',
          time: '11:00 AM',
          title: 'Workshop block',
          description: 'Hands-on sessions across tracks.',
          accent: 'blue',
          icon: 'code',
        },
        {
          id: 'sat-lunch',
          time: '1:00 PM',
          title: 'Lunch + sponsor fair',
          description: 'Food, recruiters, and swag.',
          accent: 'red',
          icon: 'users',
        },
        {
          id: 'sat-games',
          time: '9:00 PM',
          title: 'Midnight games',
          description: 'Wind down or keep building.',
          accent: 'green',
          icon: 'moon',
        },
      ],
    },
  ],
} satisfies SchedulePageData
