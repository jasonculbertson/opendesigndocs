-- Add profile_completed column if it doesn't exist
ALTER TABLE recruiters 
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT false;

-- Update existing recruiters to have completed profiles
UPDATE recruiters 
SET profile_completed = true 
WHERE profile_completed IS NULL OR profile_completed = false;

-- Add Liz Luce as a new recruiter with incomplete profile status (only if not already exists)
INSERT INTO recruiters (
  name,
  email,
  login_email,
  agency,
  title,
  linkedin,
  about,
  specialties,
  philosophy,
  approach,
  notable_clients,
  image,
  slug,
  display_order,
  profile_completed,
  is_active,
  created_at,
  updated_at
) 
SELECT 
  'Liz Luce',
  'liz@off.site',
  'liz@off.site',
  'Offsite',
  'Recruiter',
  'https://www.linkedin.com/in/liz-luce-3531aa39/',
  'Profile in progress - please complete your information.',
  'To be updated',
  'To be updated',
  'To be updated', 
  'To be updated',
  '/images/default-avatar.png',
  'liz-luce',
  5, -- After MJ (who is 4)
  false, -- Profile not completed yet
  true, -- Active recruiter
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM recruiters WHERE email = 'liz@off.site' OR slug = 'liz-luce'
);
