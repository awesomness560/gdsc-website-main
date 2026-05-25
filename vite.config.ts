import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { loadSiteConfig } from './src/lib/load-site-config.ts'

const siteConfig = loadSiteConfig()

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  define: {
    __SITE_CONFIG__: JSON.stringify(siteConfig),
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
  ],
})

export default config
