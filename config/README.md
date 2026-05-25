# Site config

`site.toml` holds **non-secret** settings for the whole site (HackDSC event id, public URLs, copy).

- Safe to commit and share when cloning the repo.
- Edit `hackathon_id` to match your row in `public.hackathons`.
- Keep Supabase URL and anon key in `.env` only (see `.env.example`).
