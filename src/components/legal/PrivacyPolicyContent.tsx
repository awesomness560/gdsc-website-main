import { Link } from '@tanstack/react-router'
import {
  PRIVACY_POLICY_LAST_UPDATED,
  privacyPolicySections,
} from '#/data/privacy-policy'
import { MEMBERSHIP_CONTACT_EMAIL } from '#/lib/membership'

export function PrivacyPolicyContent() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <p className="text-xs font-semibold tracking-[0.12em] text-fg-muted uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-fg-muted">
        Last updated: {PRIVACY_POLICY_LAST_UPDATED}
      </p>
      <p className="mt-6 text-base leading-relaxed text-fg-secondary">
        We want you to understand how GDG at UTD handles your information. This
        policy describes our practices for this website and related club
        activities.
      </p>

      <div className="mt-10 space-y-10">
        {privacyPolicySections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-lg font-semibold tracking-tight text-fg">
              {section.title}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 text-sm leading-relaxed text-fg-secondary"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg-secondary">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <section id="contact" className="scroll-mt-24">
          <h2 className="text-lg font-semibold tracking-tight text-fg">
            Contact us
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
            If you have questions about this Privacy Policy or want to make a
            privacy request, email us at{' '}
            <a
              href={`mailto:${MEMBERSHIP_CONTACT_EMAIL}`}
              className="font-medium text-fg transition-colors hover:text-accent"
            >
              {MEMBERSHIP_CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>

      <Link
        to="/"
        className="mt-12 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
      >
        ← Back to home
      </Link>
    </main>
  )
}
