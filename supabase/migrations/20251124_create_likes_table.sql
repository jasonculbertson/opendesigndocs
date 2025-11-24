CREATE TABLE IF NOT exists likes (
  id SERIAL PRIMARY KEY,
  clerk_user_id TEXT NOT NULL,
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(clerk_user_id, path)
);

CREATE INDEX IF NOT exists idx_likes_path ON likes(path);
CREATE INDEX IF NOT exists idx_likes_user ON likes(clerk_user_id);

-- Enable RLS
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- No policies needed as we access via service role key
