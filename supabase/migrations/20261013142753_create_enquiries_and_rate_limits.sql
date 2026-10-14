/*
# Create enquiries and rate_limits tables for Ethixweb India

1. New Tables
- `enquiries`: Stores lead/enquiry submissions from the contact form.
  - id (uuid, PK)
  - name (text, not null) — contact name
  - email (text, not null) — contact email
  - phone (text, not null) — contact phone number
  - company (text, nullable) — optional company name
  - service (text, not null) — service interest category
  - budget (text, nullable) — budget range selection
  - message (text, not null) — enquiry message body
  - status (text, not null, default 'new') — lead status for admin workflow
  - notes (text, nullable) — admin notes on the lead
  - created_at (timestamptz, default now()) — submission timestamp
  - updated_at (timestamptz, default now()) — last modification timestamp

- `rate_limits`: Persistent rate limiting for enquiry submissions and login attempts.
  - id (uuid, PK)
  - identifier (text, unique, not null) — IP address or email used as rate-limit key
  - count (bigint, not null, default 0) — request count within window
  - window_start (bigint, not null) — epoch ms when window started
  - created_at (timestamptz, default now())
  - updated_at (timestamptz, default now())

2. Security
- Enable RLS on both tables.
- `enquiries`: Allow anon INSERT (public contact form) but no anon SELECT/UPDATE/DELETE.
  All read/write management is done server-side with the service role key (bypasses RLS).
- `rate_limits`: Allow anon INSERT and UPDATE (rate-limit checks happen server-side with service key).
  No sensitive data is stored — only IP/email identifier and counts.

3. Indexes
- `enquiries_created_at_idx` — for chronological sorting in admin dashboard
- `enquiries_status_idx` — for filtering by status
- `enquiries_email_idx` — for searching by email
- `rate_limits_identifier_idx` — for fast lookups
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  service text NOT NULL,
  budget text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Allow public (anon) to insert enquiries from the contact form
DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries"
ON enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No anon SELECT/UPDATE/DELETE — admin operations use the service role key which bypasses RLS
DROP POLICY IF EXISTS "anon_select_enquiries" ON enquiries;
DROP POLICY IF EXISTS "anon_update_enquiries" ON enquiries;
DROP POLICY IF EXISTS "anon_delete_enquiries" ON enquiries;

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);
CREATE INDEX IF NOT EXISTS enquiries_email_idx ON enquiries (email);

-- Rate limits table
CREATE TABLE IF NOT EXISTS rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text UNIQUE NOT NULL,
  count bigint NOT NULL DEFAULT 0,
  window_start bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow anon insert (for rate-limit record creation)
DROP POLICY IF EXISTS "anon_insert_rate_limits" ON rate_limits;
CREATE POLICY "anon_insert_rate_limits"
ON rate_limits FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anon update (for incrementing counts)
DROP POLICY IF EXISTS "anon_update_rate_limits" ON rate_limits;
CREATE POLICY "anon_update_rate_limits"
ON rate_limits FOR UPDATE
TO anon, authenticated
USING (true) WITH CHECK (true);

-- Allow anon select (needed for rate-limit lookups via anon key)
DROP POLICY IF EXISTS "anon_select_rate_limits" ON rate_limits;
CREATE POLICY "anon_select_rate_limits"
ON rate_limits FOR SELECT
TO anon, authenticated
USING (true);

-- Allow anon delete (for rate-limit resets)
DROP POLICY IF EXISTS "anon_delete_rate_limits" ON rate_limits;
CREATE POLICY "anon_delete_rate_limits"
ON rate_limits FOR DELETE
TO anon, authenticated
USING (true);

CREATE INDEX IF NOT EXISTS rate_limits_identifier_idx ON rate_limits (identifier);
