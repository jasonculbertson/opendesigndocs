ALTER TABLE comments ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE;

-- Create index for parent_id to speed up nested lookups
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);
