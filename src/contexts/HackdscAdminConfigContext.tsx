import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { defaultHackdscAdminConfig } from '#/data/dummy-hackdsc-admin'
import type { HackdscAdminConfig } from '#/types/admin-hackdsc'

const STORAGE_KEY = 'gdsc-hackdsc-admin-config'

type HackdscAdminConfigContextValue = {
  config: HackdscAdminConfig
  savedConfig: HackdscAdminConfig
  isDirty: boolean
  updateConfig: (patch: Partial<HackdscAdminConfig>) => void
  saveConfig: (adminName: string) => void
  discardChanges: () => void
}

const HackdscAdminConfigContext =
  createContext<HackdscAdminConfigContextValue | null>(null)

function loadStoredConfig(): HackdscAdminConfig {
  if (typeof window === 'undefined') return defaultHackdscAdminConfig
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultHackdscAdminConfig
    return { ...defaultHackdscAdminConfig, ...JSON.parse(raw) } as HackdscAdminConfig
  } catch {
    return defaultHackdscAdminConfig
  }
}

function persistConfig(config: HackdscAdminConfig) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

function configsEqual(a: HackdscAdminConfig, b: HackdscAdminConfig): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

export function HackdscAdminConfigProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [savedConfig, setSavedConfig] = useState<HackdscAdminConfig>(loadStoredConfig)
  const [draftConfig, setDraftConfig] = useState<HackdscAdminConfig>(savedConfig)

  const updateConfig = useCallback((patch: Partial<HackdscAdminConfig>) => {
    setDraftConfig((current) => ({ ...current, ...patch }))
  }, [])

  const saveConfig = useCallback(
    (adminName: string) => {
      const next: HackdscAdminConfig = {
        ...draftConfig,
        updatedAt: new Date().toISOString(),
        updatedByName: adminName,
      }
      persistConfig(next)
      setSavedConfig(next)
      setDraftConfig(next)
    },
    [draftConfig],
  )

  const discardChanges = useCallback(() => {
    setDraftConfig(savedConfig)
  }, [savedConfig])

  const value = useMemo(
    () => ({
      config: draftConfig,
      savedConfig,
      isDirty: !configsEqual(draftConfig, savedConfig),
      updateConfig,
      saveConfig,
      discardChanges,
    }),
    [discardChanges, draftConfig, saveConfig, savedConfig, updateConfig],
  )

  return (
    <HackdscAdminConfigContext.Provider value={value}>
      {children}
    </HackdscAdminConfigContext.Provider>
  )
}

export function useHackdscAdminConfig() {
  const context = useContext(HackdscAdminConfigContext)
  if (!context) {
    throw new Error('useHackdscAdminConfig must be used within HackdscAdminConfigProvider')
  }
  return context
}
