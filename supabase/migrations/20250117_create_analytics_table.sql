-- Create analytics_events table for tracking user interactions
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    user_id VARCHAR(255),
    user_email VARCHAR(255),
    session_id VARCHAR(255),
    properties JSONB DEFAULT '{}',
    page_url TEXT,
    user_agent TEXT,
    ip_address INET,
    referer TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_url ON analytics_events(page_url);

-- Create trigger for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_analytics_events_updated_at
    BEFORE UPDATE ON analytics_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Tracking data is server-only. Clerk authorization is enforced in API routes.
-- service_role bypasses RLS; never grant browser roles direct table access.
REVOKE ALL ON TABLE public.analytics_events FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.analytics_events TO service_role;
