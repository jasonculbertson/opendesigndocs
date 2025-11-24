CREATE TABLE IF NOT exists comments (
  id SERIAL PRIMARY KEY,
  clerk_user_id TEXT NOT NULL,
  path TEXT NOT NULL,
  content TEXT NOT NULL,
  user_name TEXT,
  user_avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT exists idx_comments_path ON comments(path);
CREATE INDEX IF NOT exists idx_comments_user ON comments(clerk_user_id);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- No policies needed as we access via service role key
