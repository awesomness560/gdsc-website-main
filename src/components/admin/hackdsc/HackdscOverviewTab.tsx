import { Link } from '@tanstack/react-router'
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  Mail,
} from 'lucide-react'
import { useMemo } from 'react'
import { useHackdscAdminConfig } from '#/contexts/HackdscAdminConfigContext'
import {
  computeAttentionItems,
  computeOverviewMetrics,
  daysUntil,
  daysUntilLabel,
  fridaySchedulePreview,
  getStatusBannerContent,
  lifecycleVisual,
} from '#/lib/hackdsc-admin-utils'
import { pendingApplications } from '#/lib/admin-application-utils'
import { hasHackdscHackathonId } from '#/lib/hackathon-config'
import { useAdminApplicationsQuery } from '#/queries/admin-applications'
import type { HackdscAttentionItem } from '#/types/admin-hackdsc'
import { cn } from '#/lib/cn'

const attentionIcons: Record<
  HackdscAttentionItem['icon'],
  typeof Clock3
> = {
  clock: Clock3,
  flag: Flag,
  calendar: CalendarDays,
  alert: AlertTriangle,
  mail: Mail,
}

function MetricCard({
  label,
  value,
  context,
  href,
}: {
  label: string
  value: string
  context?: string
  href: string
}) {
  return (
    <Link
      to={href}
      className="group rounded-xl border border-border-subtle bg-bg-elevated/40 px-4 py-4 transition-colors hover:border-border-default hover:bg-bg-elevated/70"
    >
      <p className="text-xs font-medium text-fg-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-fg">
        {value}
      </p>
      {context ? (
        <p className="mt-1.5 text-xs text-fg-secondary">{context}</p>
      ) : null}
    </Link>
  )
}

export function HackdscOverviewTab() {
  const { config } = useHackdscAdminConfig()
  const applicationsQuery = useAdminApplicationsQuery()
  const apps = hasHackdscHackathonId() ? (applicationsQuery.data ?? []) : []
  const pendingCount = pendingApplications(apps).length

  const metrics = useMemo(
    () => computeOverviewMetrics(apps, config),
    [apps, config],
  )
  const banner = useMemo(
    () => getStatusBannerContent(config, apps),
    [config, apps],
  )
  const attentionItems = useMemo(
    () => computeAttentionItems(apps, config),
    [apps, config],
  )
  const friday = fridaySchedulePreview()
  const visual = lifecycleVisual(config.status)

  const timeCardValue =
    metrics.timeTarget != null
      ? `${Math.max(daysUntil(metrics.timeTarget), 0)}d`
      : '—'
  const timeCardContext =
    metrics.timeTarget != null
      ? daysUntilLabel(metrics.timeTarget, metrics.timeTargetLabel)
      : config.status === 'completed'
        ? 'Event finished'
        : 'No upcoming deadline'

  const acceptanceContext =
    metrics.reviewedCount > 0
      ? `${metrics.acceptedCount} accepted / ${metrics.reviewedCount} reviewed = ${metrics.acceptanceRate}%`
      : 'No decisions yet'

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-10">
      <section
        className={cn(
          'rounded-2xl border border-border-subtle bg-surface/40 px-6 py-7 sm:px-8 sm:py-8',
          'border-l-4',
          visual.bannerAccentClass,
        )}
      >
        <p className="text-base font-medium text-fg sm:text-lg">{banner.message}</p>
        {banner.actionLabel && banner.actionHref ? (
          <Link
            to={banner.actionHref}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            {banner.actionLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
      </section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total applications"
          value={String(metrics.totalApplications)}
          context={
            metrics.totalApplicationsDelta > 0
              ? `+${metrics.totalApplicationsDelta} this week`
              : 'No new submissions this week'
          }
          href="/admin/hackdsc/applications"
        />
        <MetricCard
          label="Pending review"
          value={String(metrics.pendingReview)}
          context={
            pendingCount > 0
              ? `${pendingCount} need a decision`
              : 'Queue is clear'
          }
          href="/admin/hackdsc/applications"
        />
        <MetricCard
          label="Acceptance rate"
          value={
            metrics.acceptanceRate != null ? `${metrics.acceptanceRate}%` : '—'
          }
          context={acceptanceContext}
          href="/admin/hackdsc/applications"
        />
        <MetricCard
          label={metrics.timeTargetLabel}
          value={timeCardValue}
          context={timeCardContext}
          href="/admin/hackdsc/configuration"
        />
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-semibold tracking-tight text-fg">
          Needs your attention
        </h2>
        {attentionItems.length === 0 ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-border-subtle bg-bg-elevated/30 px-4 py-4 text-sm text-fg-muted">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-google-green" aria-hidden />
            All clear — nothing needs your attention right now.
          </div>
        ) : (
          <ul className="mt-4 divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated/30">
            {attentionItems.map((item) => {
              const Icon = attentionIcons[item.icon]
              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-google-yellow"
                      aria-hidden
                    />
                    <p className="text-sm text-fg-secondary">{item.message}</p>
                  </div>
                  <Link
                    to={item.href}
                    className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl border border-border-default px-3 text-xs font-semibold text-fg-secondary transition-colors hover:bg-white/5 hover:text-fg sm:text-sm"
                  >
                    {item.actionLabel}
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight text-fg">
            Schedule snapshot
          </h2>
          <Link
            to="/admin/hackdsc/schedule"
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            View / edit schedule →
          </Link>
        </div>
        {friday ? (
          <div className="mt-4 rounded-xl border border-border-subtle bg-bg-elevated/30 px-4 py-4 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
              {friday.title} · {friday.date}
            </p>
            <ul className="mt-3 space-y-2.5">
              {friday.events.map((event) => (
                <li
                  key={event.id}
                  className="flex items-baseline gap-3 text-sm"
                >
                  <span className="w-16 shrink-0 tabular-nums text-fg-muted">
                    {event.time}
                  </span>
                  <span className="min-w-0 text-fg-secondary">{event.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4 text-sm text-fg-muted">No schedule configured yet.</p>
        )}
      </section>
    </div>
  )
}
