-- Migration: Harden leads_prospect table
-- Adds new qualification fields, enables RLS, creates insert-only policy

-- Add new columns for richer lead qualification
ALTER TABLE leads_prospect
  ADD COLUMN IF NOT EXISTS contact_person TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS phone_whatsapp TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS service_interest TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS cargo_description TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS origin_destination TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS timeline TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS privacy_consent BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS lead_status TEXT NOT NULL DEFAULT 'new';

-- Index for lead status filtering
CREATE INDEX IF NOT EXISTS idx_leads_prospect_status ON leads_prospect (lead_status);

-- Enable Row Level Security
ALTER TABLE leads_prospect ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from anon role (public form submissions)
-- No select/update/delete for anon — only service_role can read/manage leads
CREATE POLICY "Allow anonymous lead inserts"
  ON leads_prospect
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Service role has full access (for admin/API operations)
CREATE POLICY "Service role full access"
  ON leads_prospect
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
