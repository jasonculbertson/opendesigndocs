-- Add Ashley Friedman-Damasco as a new recruiter
-- Migration: 20250131_add_ashley_recruiter.sql

-- Add Ashley Friedman-Damasco as a new recruiter (only if not already exists)
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
  'Ashley Friedman-Damasco',
  'ashley@example.com', -- TODO: Update with actual email
  'ashley@example.com', -- TODO: Update with actual email
  'Google', -- Ashley works at Google
  'Recruiter',
  'https://www.linkedin.com/in/ashley-friedman-damasco/',
  'Ashley is a design recruiter focused on connecting talented professionals with opportunities that align with their career goals. Profile details will be updated once onboarding is complete.',
  'Design, UX, Product, Leadership', -- Default specialties
  'I believe in building meaningful connections between talented professionals and companies that value great design and user experience.',
  'My approach focuses on understanding both the technical requirements and cultural fit to ensure long-term success for both candidates and companies.', 
  'Various design-focused companies across SaaS, FinTech, and Enterprise sectors', -- Default notable clients
  '/images/ashley.jpeg', -- You mentioned you already added her photo
  'ashley-friedman-damasco',
  6, -- After Liz (who is 5)
  false, -- Profile not completed yet
  true, -- Active recruiter
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM recruiters WHERE slug = 'ashley-friedman-damasco'
);

-- Verify the addition
-- SELECT id, name, email, slug, display_order FROM recruiters WHERE slug = 'ashley-friedman-damasco';
