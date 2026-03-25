-- ============================================================================
-- UGC Logistics — Initial Schema
-- Source of truth: /docs/15_TECHNICAL_ARCHITECTURE.md
-- ============================================================================

-- ─── Helper: updated_at trigger function ───

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================================
-- TABLES
-- ============================================================================

-- ─── Quote form submissions ───

create table quote_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text not null,
  service_type text,
  origin text,
  destination text,
  direction text,
  cargo_weight numeric,
  cargo_dimensions text,
  cargo_description text,
  special_requirements text[] default '{}',
  contact_name text not null,
  contact_company text,
  contact_email text not null,
  contact_phone text not null,
  contact_method text not null default 'whatsapp',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer_url text,
  landing_page text,
  device_type text,
  session_pages_viewed integer,
  status text not null default 'new'
);

-- ─── Contact form submissions ───

create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text not null,
  phone text,
  message text not null,
  locale text,
  status text not null default 'new'
);

-- ─── Insight articles (Supabase-as-CMS) ───

create table articles (
  id uuid primary key default gen_random_uuid(),
  slug_id text unique not null,
  slug_en text unique not null,
  title_id text not null,
  title_en text not null,
  excerpt_id text,
  excerpt_en text,
  body_id text not null,
  body_en text not null,
  category text not null,
  tags text[] default '{}',
  seo_title_id text,
  seo_title_en text,
  seo_description_id text,
  seo_description_en text,
  og_image_url text,
  featured boolean not null default false,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Anonymized client stories ───

create table client_stories (
  id uuid primary key default gen_random_uuid(),
  industry_id text not null,
  industry_en text not null,
  challenge_id text not null,
  challenge_en text not null,
  solution_id text not null,
  solution_en text not null,
  result_id text not null,
  result_en text not null,
  display_quote_id text,
  display_quote_en text,
  service_tags text[] default '{}',
  featured boolean not null default false,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── SEO metadata overrides ───

create table seo_metadata (
  id uuid primary key default gen_random_uuid(),
  page_key text unique not null,
  title_id text,
  title_en text,
  description_id text,
  description_en text,
  og_image_url text,
  updated_at timestamptz not null default now()
);

-- ─── Site settings (key-value store) ───

create table site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ─── File uploads ───

create table files (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  file_url text not null,
  file_type text,
  public boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─── Tracking queries log ───

create table tracking_queries (
  id uuid primary key default gen_random_uuid(),
  tracking_number_hash text not null,
  result_found boolean,
  locale text,
  device_type text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- UPDATED_AT TRIGGERS
-- ============================================================================

create trigger articles_updated_at
  before update on articles
  for each row execute function update_updated_at();

create trigger client_stories_updated_at
  before update on client_stories
  for each row execute function update_updated_at();

create trigger seo_metadata_updated_at
  before update on seo_metadata
  for each row execute function update_updated_at();

create trigger site_settings_updated_at
  before update on site_settings
  for each row execute function update_updated_at();

-- ============================================================================
-- INDEXES
-- ============================================================================

create index idx_quote_submissions_status on quote_submissions (status);
create index idx_quote_submissions_locale on quote_submissions (locale);
create index idx_quote_submissions_created_at on quote_submissions (created_at desc);

create index idx_contact_submissions_status on contact_submissions (status);
create index idx_contact_submissions_created_at on contact_submissions (created_at desc);

create index idx_articles_status on articles (status);
create index idx_articles_featured on articles (featured) where featured = true;
create index idx_articles_category on articles (category);
create index idx_articles_published_at on articles (published_at desc);
create index idx_articles_slug_id on articles (slug_id);
create index idx_articles_slug_en on articles (slug_en);

create index idx_client_stories_status on client_stories (status);
create index idx_client_stories_featured on client_stories (featured) where featured = true;
create index idx_client_stories_service_tags on client_stories using gin (service_tags);

create index idx_seo_metadata_page_key on seo_metadata (page_key);

create index idx_files_public on files (public) where public = true;

create index idx_tracking_queries_created_at on tracking_queries (created_at desc);
create index idx_tracking_queries_locale on tracking_queries (locale);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

alter table quote_submissions enable row level security;
alter table contact_submissions enable row level security;
alter table articles enable row level security;
alter table client_stories enable row level security;
alter table seo_metadata enable row level security;
alter table site_settings enable row level security;
alter table files enable row level security;
alter table tracking_queries enable row level security;

-- ─── Anon policies: INSERT on form tables ───

create policy "anon_insert_quote"
  on quote_submissions for insert
  to anon
  with check (true);

create policy "anon_insert_contact"
  on contact_submissions for insert
  to anon
  with check (true);

create policy "anon_insert_tracking"
  on tracking_queries for insert
  to anon
  with check (true);

-- ─── Anon policies: SELECT on published content ───

create policy "anon_select_published_articles"
  on articles for select
  to anon
  using (status = 'published');

create policy "anon_select_published_stories"
  on client_stories for select
  to anon
  using (status = 'published');

create policy "anon_select_seo_metadata"
  on seo_metadata for select
  to anon
  using (true);

create policy "anon_select_site_settings"
  on site_settings for select
  to anon
  using (true);

create policy "anon_select_public_files"
  on files for select
  to anon
  using (public = true);

-- ─── Authenticated policies: full CRUD on all tables ───

create policy "auth_all_quote_submissions"
  on quote_submissions for all
  to authenticated
  using (true)
  with check (true);

create policy "auth_all_contact_submissions"
  on contact_submissions for all
  to authenticated
  using (true)
  with check (true);

create policy "auth_all_articles"
  on articles for all
  to authenticated
  using (true)
  with check (true);

create policy "auth_all_client_stories"
  on client_stories for all
  to authenticated
  using (true)
  with check (true);

create policy "auth_all_seo_metadata"
  on seo_metadata for all
  to authenticated
  using (true)
  with check (true);

create policy "auth_all_site_settings"
  on site_settings for all
  to authenticated
  using (true)
  with check (true);

create policy "auth_all_files"
  on files for all
  to authenticated
  using (true)
  with check (true);

create policy "auth_all_tracking_queries"
  on tracking_queries for all
  to authenticated
  using (true)
  with check (true);
