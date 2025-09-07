-- Designer Network Database Schema
-- Migration: 20250128_create_designer_network_schema.sql
-- Exclusive invite-only network for design leaders

-- Create designer_applications table (for pending approvals)
CREATE TABLE designer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT, -- May be null if they haven't signed up yet
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  current_company TEXT NOT NULL,
  current_title TEXT NOT NULL,
  years_experience INTEGER,
  why_join TEXT, -- Optional: why they want to join
  invited_by_designer_id UUID REFERENCES designer_profiles(id), -- NULL if direct application
  invitation_code TEXT, -- Unique code for tracking invitations
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT, -- Your notes during review
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT, -- Admin who reviewed
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_linkedin CHECK (linkedin_url ~* '^https?://.*linkedin\.com.*'),
  CONSTRAINT valid_experience CHECK (years_experience IS NULL OR years_experience >= 0)
);

-- Create designer_profiles table (for approved members)
CREATE TABLE designer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  current_company TEXT NOT NULL,
  current_title TEXT NOT NULL,
  years_experience INTEGER,
  bio TEXT,
  profile_photo_url TEXT,
  location TEXT, -- City, State format
  specialties TEXT[], -- Array of specialties
  portfolio_url TEXT,
  website_url TEXT,
  
  -- Invitation tracking
  invitations_sent INTEGER DEFAULT 0,
  invitations_remaining INTEGER DEFAULT 3,
  invited_by_designer_id UUID REFERENCES designer_profiles(id),
  
  -- Status and metadata
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false, -- For highlighting certain members
  slug TEXT UNIQUE NOT NULL,
  approved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_linkedin CHECK (linkedin_url ~* '^https?://.*linkedin\.com.*'),
  CONSTRAINT valid_portfolio CHECK (portfolio_url IS NULL OR portfolio_url ~* '^https?://.*'),
  CONSTRAINT valid_website CHECK (website_url IS NULL OR website_url ~* '^https?://.*'),
  CONSTRAINT valid_invitations CHECK (invitations_remaining >= 0 AND invitations_remaining <= 3)
);

-- Create designer_invitations table (for tracking invitation usage)
CREATE TABLE designer_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id UUID NOT NULL REFERENCES designer_profiles(id),
  invitee_email TEXT NOT NULL,
  invitation_code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'accepted', 'expired')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
  
  CONSTRAINT valid_invitee_email CHECK (invitee_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Function to generate slug from name
CREATE OR REPLACE FUNCTION generate_designer_slug(input_name TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(input_name, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique invitation codes
CREATE OR REPLACE FUNCTION generate_invitation_code()
RETURNS TEXT AS $$
BEGIN
  RETURN upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug for designer profiles
CREATE OR REPLACE FUNCTION update_designer_profile_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update slug if name changed or it's a new record
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.full_name != NEW.full_name) THEN
    NEW.slug = generate_designer_slug(NEW.full_name);
  END IF;
  
  -- Always update the updated_at timestamp
  NEW.updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_designer_profile_slug_and_timestamp
  BEFORE INSERT OR UPDATE ON designer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_designer_profile_slug();

-- Trigger to auto-generate invitation codes
CREATE OR REPLACE FUNCTION set_invitation_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invitation_code IS NULL THEN
    NEW.invitation_code = generate_invitation_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_designer_invitation_code
  BEFORE INSERT ON designer_invitations
  FOR EACH ROW EXECUTE FUNCTION set_invitation_code();

CREATE TRIGGER set_application_invitation_code
  BEFORE INSERT ON designer_applications
  FOR EACH ROW EXECUTE FUNCTION set_invitation_code();

-- Create indexes for better performance
CREATE INDEX idx_designer_applications_status ON designer_applications(status);
CREATE INDEX idx_designer_applications_invited_by ON designer_applications(invited_by_designer_id);
CREATE INDEX idx_designer_applications_email ON designer_applications(email);

CREATE INDEX idx_designer_profiles_clerk_user_id ON designer_profiles(clerk_user_id);
CREATE INDEX idx_designer_profiles_email ON designer_profiles(email);
CREATE INDEX idx_designer_profiles_company ON designer_profiles(current_company);
CREATE INDEX idx_designer_profiles_active ON designer_profiles(is_active);
CREATE INDEX idx_designer_profiles_slug ON designer_profiles(slug);

CREATE INDEX idx_designer_invitations_inviter ON designer_invitations(inviter_id);
CREATE INDEX idx_designer_invitations_code ON designer_invitations(invitation_code);
CREATE INDEX idx_designer_invitations_status ON designer_invitations(status);

-- Enable RLS
ALTER TABLE designer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE designer_invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for designer_applications
CREATE POLICY "Users can view their own applications" ON designer_applications
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can create applications" ON designer_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view all applications" ON designer_applications
  FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'email' = 'jculbertson@gmail.com');

-- RLS Policies for designer_profiles  
CREATE POLICY "Approved designers can view all profiles" ON designer_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM designer_profiles dp 
      WHERE dp.clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      AND dp.is_active = true
    )
  );

CREATE POLICY "Users can update their own profile" ON designer_profiles
  FOR UPDATE USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Admin can manage all profiles" ON designer_profiles
  FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'email' = 'jculbertson@gmail.com');

-- RLS Policies for designer_invitations
CREATE POLICY "Designers can view their own invitations" ON designer_invitations
  FOR SELECT USING (
    inviter_id IN (
      SELECT id FROM designer_profiles 
      WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

CREATE POLICY "Designers can create invitations" ON designer_invitations
  FOR INSERT WITH CHECK (
    inviter_id IN (
      SELECT id FROM designer_profiles 
      WHERE clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      AND invitations_remaining > 0
    )
  );

CREATE POLICY "Admin can manage all invitations" ON designer_invitations
  FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'email' = 'jculbertson@gmail.com');

-- Grant permissions
GRANT ALL ON designer_applications TO authenticated;
GRANT ALL ON designer_profiles TO authenticated;
GRANT ALL ON designer_invitations TO authenticated;

-- Comments for documentation
COMMENT ON TABLE designer_applications IS 'Pending applications for designer network membership';
COMMENT ON TABLE designer_profiles IS 'Approved designer network members';
COMMENT ON TABLE designer_invitations IS 'Tracks invitation usage and limits';
COMMENT ON COLUMN designer_profiles.invitations_remaining IS 'Number of invitations left (max 3 lifetime)';
COMMENT ON COLUMN designer_applications.invitation_code IS 'Unique code linking application to invitation';

