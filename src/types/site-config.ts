/** Shape of `config/site.toml` (injected at build time). */
export type SiteConfig = {
  hackdsc: {
    hackathon_id: string
    name: string
    tagline: string
  }
  membership: {
    gdg_chapter_url: string
    contact_email: string
  }
}
