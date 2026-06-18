export const PRIVACY_POLICY_LAST_UPDATED = 'June 16, 2026'

export type PrivacyPolicySection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    id: 'overview',
    title: 'Overview',
    paragraphs: [
      'GDG on Campus at The University of Texas at Dallas ("GDG at UTD," "we," "us," or "our") operates this website for our student developer community. This Privacy Policy explains what information we collect, how we use it, and the choices you have.',
      'We are a student-run organization. This site is not an official Google product, and Google does not operate this website on our behalf. UT Dallas may have its own policies that apply to activities on campus.',
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    bullets: [
      'Account information: name, email address, and authentication credentials when you create an account or sign in with Google.',
      'Profile information: display name, profile photo, and membership verification status stored in our database.',
      'Hackathon applications: registration details you submit for HackDSC, which may include school, major, contact information, team preferences, dietary needs, emergency contact, essays, optional resume files, and profile links you choose to share.',
      'Event participation: information related to workshops, project nights, and other club events when you register or check in.',
      'Technical data: basic device and browser information, IP address, and cookies or similar technologies needed to keep you signed in and secure the site.',
      'Communications: messages you send us by email or through club channels.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    bullets: [
      'Create and manage your account.',
      'Process HackDSC applications and event registrations.',
      'Verify membership through periodic roster sync with the official GDG chapter page.',
      'Communicate with you about events, deadlines, and club updates.',
      'Review applications and administer club operations.',
      'Improve our website, services, and security.',
      'Comply with university policies and applicable law.',
    ],
  },
  {
    id: 'sharing',
    title: 'How we share information',
    paragraphs: [
      'We do not sell your personal information. We may share information only in the following situations:',
    ],
    bullets: [
      'With authorized GDG officers and volunteers who need access to run events, review applications, or support members.',
      'With hackathon sponsors when you opt in to share your resume or recruiting profile during registration.',
      'With service providers that help us operate the site, such as Supabase (hosting, database, and file storage) and Google (authentication and the official GDG chapter platform).',
      'With Major League Hacking (MLH) or other partners when required for sanctioned hackathon participation and you agree to their terms.',
      'When required by law, university policy, or to protect the rights and safety of our members and community.',
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep information',
    paragraphs: [
      'We keep information for as long as needed to operate the club, administer events, and meet reasonable record-keeping requirements. Application data may be retained for a period after an event ends for review, reporting, and historical club records. You may request deletion as described below.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      'We use reasonable technical and organizational measures to protect your information, including encrypted connections and access controls on our systems. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your choices and rights',
    bullets: [
      'You can update some account information from your account settings.',
      'You can choose whether to share optional recruiting information during HackDSC registration.',
      'You may request access to, correction of, or deletion of your personal information by contacting us.',
      'You may stop using the site and request account deletion, subject to information we must retain for legal or operational reasons.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and similar technologies',
    paragraphs: [
      'We use cookies and local storage as needed to maintain your sign-in session, remember preferences, and keep the site working. You can control cookies through your browser settings, but some features may not work if cookies are disabled.',
    ],
  },
  {
    id: 'third-party-links',
    title: 'Third-party links and services',
    paragraphs: [
      'Our site may link to external services such as Google, GitHub, LinkedIn, Discord, or sponsor websites. Those services have their own privacy policies, and we are not responsible for their practices.',
    ],
  },
  {
    id: 'children',
    title: 'Children\'s privacy',
    paragraphs: [
      'Our services are intended for university students and other participants in our events. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us so we can delete it.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. Continued use of the site after changes are posted means you accept the updated policy.',
    ],
  },
]
