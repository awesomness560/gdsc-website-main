import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'smol-toml'
import type { SiteConfig } from '#/types/site-config'

const configDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../config')

/** Read `config/site.toml` (used by Vite at build time). */
export function loadSiteConfig(): SiteConfig {
  const raw = readFileSync(resolve(configDir, 'site.toml'), 'utf-8')
  return parse(raw) as SiteConfig
}
