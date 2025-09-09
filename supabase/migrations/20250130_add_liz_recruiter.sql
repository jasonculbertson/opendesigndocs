-- Add profile_completed column if it doesn't exist
ALTER TABLE recruiters 
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT false;

-- Update existing recruiters to have completed profiles
UPDATE recruiters 
SET profile_completed = true 
WHERE profile_completed IS NULL OR profile_completed = false;

-- Add Liz Luce as a new recruiter with incomplete profile status
INSERT INTO recruiters (
  name,
  email,
  linkedin_url,
  slug,
  display_order,
  profile_completed,
  created_at,
  updated_at
) VALUES (
  'Liz Luce',
  'liz@off.site',
  'https://www.linkedin.com/in/liz-luce-3531aa39/',
  'liz-luce',
  5, -- After MJ (who is 4)
  false, -- Profile not completed yet
  NOW(),
  NOW()
);
