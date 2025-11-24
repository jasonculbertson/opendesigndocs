CREATE TABLE IF NOT exists bookmarks (
  id SERIAL PRIMARY KEY,
  clerk_user_id TEXT NOT NULL,
  path TEXT NOT NULL,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clerk_user_id, path)
);

CREATE INDEX IF NOT exists idx_bookmarks_user ON bookmarks(clerk_user_id);

-- Enable RLS
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- We don't need to add policies right now as we will access this table
-- via the service role key from the server-side API.
