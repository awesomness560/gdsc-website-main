import { ArrowLeft } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ApplicationDecisionBar } from '#/components/admin/applications/ApplicationDecisionBar'
import { ApplicationNotesSection } from '#/components/admin/applications/ApplicationNotesSection'
import { ApplicationReader } from '#/components/admin/applications/ApplicationReader'
import { ApplicationsEmptyState } from '#/components/admin/applications/ApplicationsEmptyState'
import { ApplicationsQueue } from '#/components/admin/applications/ApplicationsQueue'
import { useAuth } from '#/contexts/AuthContext'
import {
  filterApplications,
  findNextPending,
  pendingApplications,
  sortApplicationsForQueue,
} from '#/lib/admin-application-utils'
import { useIsMobileLayout } from '#/lib/use-media-query'
import {
  getAdminApplicationsMutationError,
  useAddApplicationNoteMutation,
  useAdminApplicationsQuery,
  useFlagApplicationMutation,
  useMarkApplicationReviewedMutation,
  useSetApplicationDecisionMutation,
  useUnflagApplicationMutation,
} from '#/queries/admin-applications'
import {
  defaultApplicationFilters,
  type ApplicationListFilters,
} from '#/types/admin-application'

export function AdminApplicationsPage() {
  const { user } = useAuth()
  const isMobile = useIsMobileLayout()
  const applicationsQuery = useAdminApplicationsQuery()
  const decisionMutation = useSetApplicationDecisionMutation()
  const flagMutation = useFlagApplicationMutation()
  const unflagMutation = useUnflagApplicationMutation()
  const reviewedMutation = useMarkApplicationReviewedMutation()
  const noteMutation = useAddApplicationNoteMutation()

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mobileShowDetail, setMobileShowDetail] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] =
    useState<ApplicationListFilters>(defaultApplicationFilters)
  const [autoAdvance, setAutoAdvance] = useState(true)
  const [flagPromptToken, setFlagPromptToken] = useState(0)
  const [actionError, setActionError] = useState<string | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const allApps = applicationsQuery.data ?? []

  const queueApps = useMemo(
    () => sortApplicationsForQueue(filterApplications(allApps, search, filters)),
    [allApps, search, filters],
  )

  const pending = useMemo(() => pendingApplications(allApps), [allApps])

  const selectedApp =
    queueApps.find((a) => a.id === selectedId) ??
    allApps.find((a) => a.id === selectedId) ??
    null

  const queueIndex = selectedApp
    ? pending.findIndex((a) => a.id === selectedApp.id)
    : -1
  const queuePosition = queueIndex >= 0 ? queueIndex + 1 : null

  const listIndex = selectedId
    ? queueApps.findIndex((a) => a.id === selectedId)
    : -1

  const adminId = user?.auth.id ?? ''
  const adminName = user?.name ?? 'Admin'

  const isMutating =
    decisionMutation.isPending ||
    flagMutation.isPending ||
    unflagMutation.isPending ||
    reviewedMutation.isPending ||
    noteMutation.isPending

  useEffect(() => {
    if (selectedId || queueApps.length === 0) return
    const firstPending = queueApps.find((a) => a.decision === 'pending')
    const initial = firstPending ?? queueApps[0]
    setSelectedId(initial.id)
  }, [queueApps, selectedId])

  const selectApplication = useCallback(
    (id: string) => {
      setSelectedId(id)
      if (isMobile) setMobileShowDetail(true)
    },
    [isMobile],
  )

  const advanceAfterDecision = useCallback(
    (fromId: string) => {
      if (!autoAdvance) return
      const next = findNextPending(allApps, fromId)
      if (next) selectApplication(next.id)
    },
    [allApps, autoAdvance, selectApplication],
  )

  const runDecision = useCallback(
    async (decision: 'accepted' | 'rejected', fromId: string) => {
      setActionError(null)
      try {
        await decisionMutation.mutateAsync({
          submissionId: fromId,
          decision,
          adminId,
          adminName,
        })
        advanceAfterDecision(fromId)
      } catch (error) {
        setActionError(getAdminApplicationsMutationError(error))
      }
    },
    [adminId, adminName, advanceAfterDecision, decisionMutation],
  )

  const handleAccept = useCallback(() => {
    if (!selectedId) return
    void runDecision('accepted', selectedId)
  }, [runDecision, selectedId])

  const handleReject = useCallback(() => {
    if (!selectedId) return
    if (
      !window.confirm(
        'Reject this application? The applicant will not be admitted.',
      )
    ) {
      return
    }
    void runDecision('rejected', selectedId)
  }, [runDecision, selectedId])

  const handleFlag = useCallback(
    async (reason?: string) => {
      if (!selectedId) return
      setActionError(null)
      try {
        await flagMutation.mutateAsync({
          submissionId: selectedId,
          adminId,
          adminName,
          reason,
        })
      } catch (error) {
        setActionError(getAdminApplicationsMutationError(error))
      }
    },
    [adminId, adminName, flagMutation, selectedId],
  )

  const handleUnflag = useCallback(async () => {
    if (!selectedId) return
    setActionError(null)
    try {
      await unflagMutation.mutateAsync({ submissionId: selectedId })
    } catch (error) {
      setActionError(getAdminApplicationsMutationError(error))
    }
  }, [selectedId, unflagMutation])

  const handleMarkReviewed = useCallback(async () => {
    if (!selectedId) return
    setActionError(null)
    try {
      await reviewedMutation.mutateAsync({
        submissionId: selectedId,
        adminId,
        adminName,
      })
    } catch (error) {
      setActionError(getAdminApplicationsMutationError(error))
    }
  }, [adminId, adminName, reviewedMutation, selectedId])

  const handleAddNote = useCallback(
    async (body: string) => {
      if (!selectedId) return
      setActionError(null)
      try {
        await noteMutation.mutateAsync({
          submissionId: selectedId,
          adminId,
          adminName,
          body,
        })
      } catch (error) {
        setActionError(getAdminApplicationsMutationError(error))
      }
    },
    [adminId, adminName, noteMutation, selectedId],
  )

  const goRelative = useCallback(
    (delta: number) => {
      if (queueApps.length === 0) return
      const idx = listIndex < 0 ? 0 : listIndex + delta
      const wrapped =
        ((idx % queueApps.length) + queueApps.length) % queueApps.length
      selectApplication(queueApps[wrapped].id)
    },
    [listIndex, queueApps, selectApplication],
  )

  useEffect(() => {
    if (isMobile) return

    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        if (e.key === 'Escape') {
          target.blur()
        }
        return
      }

      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        searchInputRef.current?.focus()
        return
      }

      if (!selectedId) return

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault()
        goRelative(1)
        return
      }
      if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault()
        goRelative(-1)
        return
      }
      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        handleAccept()
        return
      }
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        handleReject()
        return
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        setFlagPromptToken((t) => t + 1)
        return
      }
      if (e.key === 'u' || e.key === 'U') {
        e.preventDefault()
        void handleUnflag()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    goRelative,
    handleAccept,
    handleFlag,
    handleReject,
    handleUnflag,
    isMobile,
    selectedId,
  ])

  if (applicationsQuery.isPending) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-sm text-fg-muted">
        Loading applications…
      </div>
    )
  }

  if (applicationsQuery.isError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-sm text-fg-secondary">
        <p>{getAdminApplicationsMutationError(applicationsQuery.error)}</p>
        <button
          type="button"
          className="rounded-xl border border-border-default px-4 py-2 text-sm font-medium hover:bg-white/5"
          onClick={() => void applicationsQuery.refetch()}
        >
          Retry
        </button>
      </div>
    )
  }

  if (allApps.length === 0) {
    return <ApplicationsEmptyState />
  }

  const showList = !isMobile || !mobileShowDetail
  const showDetail = !isMobile || mobileShowDetail

  return (
    <div className="flex h-full min-h-0 flex-col">
      {actionError ? (
        <div
          className="shrink-0 border-b border-google-red/30 bg-google-red/10 px-4 py-2 text-sm text-fg-secondary"
          role="alert"
        >
          {actionError}
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {showList ? (
          <ApplicationsQueue
            apps={queueApps}
            selectedId={selectedId}
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFiltersChange={setFilters}
            pendingCount={pending.length}
            queuePosition={queuePosition}
            onSelect={selectApplication}
            searchInputRef={searchInputRef}
          />
        ) : null}

        {showDetail ? (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-bg-elevated/30">
            {isMobile ? (
              <div className="shrink-0 border-b border-border-subtle px-4 py-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-medium text-fg-secondary hover:text-fg"
                  onClick={() => setMobileShowDetail(false)}
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back to list
                </button>
              </div>
            ) : null}

            {selectedApp ? (
              <div className="min-h-0 flex-1 overflow-y-auto">
                <ApplicationReader app={selectedApp} />
                <ApplicationDecisionBar
                  app={selectedApp}
                  autoAdvance={autoAdvance}
                  onAutoAdvanceChange={setAutoAdvance}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onFlag={(reason) => void handleFlag(reason)}
                  onUnflag={() => void handleUnflag()}
                  onMarkReviewed={() => void handleMarkReviewed()}
                  onPrevious={() => goRelative(-1)}
                  onNext={() => goRelative(1)}
                  hasPrevious={queueApps.length > 1}
                  hasNext={queueApps.length > 1}
                  disabled={isMutating}
                  flagPromptToken={flagPromptToken}
                />
                <ApplicationNotesSection
                  app={selectedApp}
                  onAddNote={(body) => void handleAddNote(body)}
                  disabled={isMutating}
                  collapsed={isMobile}
                />
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-fg-muted">
                Select an application to review
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}
