# PromptVault + Supabase (Starter)

Open prompt library with **Supabase** (Postgres) backend.
- Server-rendered feed reads from `prompts` table
- `/api/prompts` route for GET/POST
- Submit page posts to API
- Language + category filters, copy button

## Setup
1. Create a Supabase project → copy:
   - Project URL
   - `anon` public key
   - `service_role` key
2. In Supabase SQL editor, run: `supabase.sql` (this creates `public.prompts` + RLS policies)
3. Copy `.env.example` → `.env.local` and fill values:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE=...
```
4. Install & run:
```
npm i
npm run dev
```
5. Deploy on Vercel and set the same env vars there.

## Notes
- RLS allows **public read + public insert** (MVP). For production add rate-limiting, captcha, or require Auth.
- Server uses `SUPABASE_SERVICE_ROLE` inside route handlers to insert/select safely.

## Extending
- Add likes endpoint (`PATCH /api/prompts/:id`)
- Add Auth (Supabase Auth) to attribute submissions to users
- Add moderation queue before publishing

---
© PromptVault — Supabase starter by ChatGPT
