-- Create email tracking table for recruiter engagement monitoring
CREATE TABLE IF NOT EXISTS email_tracking (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  recruiter_email TEXT NOT NULL,
  recruiter_name TEXT,
  tracking_id TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  user_agent TEXT,
  ip_address TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_tracking_recruiter_email ON email_tracking(recruiter_email);
CREATE INDEX IF NOT EXISTS idx_email_tracking_event_type ON email_tracking(event_type);
CREATE INDEX IF NOT EXISTS idx_email_tracking_tracking_id ON email_tracking(tracking_id);
CREATE INDEX IF NOT EXISTS idx_email_tracking_timestamp ON email_tracking(timestamp);

-- Add RLS (Row Level Security) if needed
ALTER TABLE email_tracking ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated access (adjust as needed for your security model)
CREATE POLICY "Allow authenticated read access" ON email_tracking
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role full access" ON email_tracking
  FOR ALL USING (auth.role() = 'service_role');

-- Insert comment for documentation
COMMENT ON TABLE email_tracking IS 'Tracks email engagement events for recruiter invitations and follow-ups';
COMMENT ON COLUMN email_tracking.event_type IS 'Type of event: email_sent, email_opened, link_clicked, page_visited, signup_started, profile_accessed, profile_edited';
COMMENT ON COLUMN email_tracking.tracking_id IS 'Unique tracking identifier for linking events to specific email campaigns';
COMMENT ON COLUMN email_tracking.metadata IS 'Additional event data stored as JSON';
