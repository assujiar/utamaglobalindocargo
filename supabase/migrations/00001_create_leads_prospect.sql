-- Migrasi: Pembuatan tabel leads_prospect
-- Tabel CRM internal untuk manajemen prospek logistik B2B
-- Kolom utm_attribution bertipe JSONB untuk menyerap telemetri pemasaran asinkron

CREATE TABLE IF NOT EXISTS leads_prospect (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  executive_email TEXT NOT NULL,
  operational_volume TEXT,
  utm_attribution JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index pada email untuk pencarian cepat
CREATE INDEX IF NOT EXISTS idx_leads_prospect_email ON leads_prospect (executive_email);

-- Index GIN pada kolom JSONB untuk query telemetri pemasaran
CREATE INDEX IF NOT EXISTS idx_leads_prospect_utm ON leads_prospect USING GIN (utm_attribution);

COMMENT ON TABLE leads_prospect IS 'Tabel CRM internal untuk manajemen prospek logistik tingkat eksekutif';
COMMENT ON COLUMN leads_prospect.utm_attribution IS 'Objek JSONB untuk menyerap data UTM attribution tanpa merusak skema relasional';
