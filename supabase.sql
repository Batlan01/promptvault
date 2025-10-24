-- Table
create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  prompt text not null,
  category text not null default 'General',
  language text not null default 'en',
  author text,
  tags text[] default '{}',
  likes int not null default 0,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_prompts_created_at on public.prompts (created_at desc);
create index if not exists idx_prompts_category on public.prompts (category);
create index if not exists idx_prompts_language on public.prompts (language);
create index if not exists idx_prompts_search on public.prompts using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(prompt,'')));

-- Enable RLS
alter table public.prompts enable row level security;

-- Policies: allow read to anon
create policy "Allow read to anon" on public.prompts
for select using (true);

-- Allow insert to anon (MVP - public submissions)
create policy "Allow insert to anon" on public.prompts
for insert with check (true);

-- Optional: like updates (anon)
create policy "Allow likes update to anon" on public.prompts
for update using (true) with check (true);
