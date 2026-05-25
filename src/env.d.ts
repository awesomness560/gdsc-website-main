/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

/** Injected from `config/site.toml` via vite.config.ts */
declare const __SITE_CONFIG__: import('#/types/site-config').SiteConfig

interface ImportMeta {
  readonly env: ImportMetaEnv
}
