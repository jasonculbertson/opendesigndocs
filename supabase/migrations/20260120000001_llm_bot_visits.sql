-- LLM Bot Visits Tracking
-- Tracks when AI/LLM bots crawl the site

CREATE TABLE IF NOT EXISTS llm_bot_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bot_name TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  ip_address TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_llm_bot_visits_bot_name ON llm_bot_visits(bot_name);
CREATE INDEX idx_llm_bot_visits_created_at ON llm_bot_visits(created_at DESC);
CREATE INDEX idx_llm_bot_visits_path ON llm_bot_visits(path);

-- Enable RLS
ALTER TABLE llm_bot_visits ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from service role (server-side)
CREATE POLICY "Service role can insert bot visits"
  ON llm_bot_visits
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service role to read all visits
CREATE POLICY "Service role can read bot visits"
  ON llm_bot_visits
  FOR SELECT
  TO service_role
  USING (true);
