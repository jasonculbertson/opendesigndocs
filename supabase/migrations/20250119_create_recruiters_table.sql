-- Recruiters Database Schema
-- Migration: 20250119_create_recruiters_table.sql

-- Create recruiters table
CREATE TABLE recruiters (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  agency TEXT NOT NULL,
  title TEXT,
  image TEXT,
  linkedin TEXT NOT NULL,
  website TEXT,
  email TEXT NOT NULL,
  login_email TEXT NOT NULL, -- Email used for login/authentication
  about TEXT NOT NULL,
  specialties TEXT, -- Comma-separated string
  philosophy TEXT NOT NULL,
  approach TEXT NOT NULL,
  notable_clients TEXT, -- Comma-separated string
  slug TEXT UNIQUE NOT NULL, -- URL-friendly version of name
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_login_email CHECK (login_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_linkedin CHECK (linkedin ~* '^https?://.*linkedin\.com.*'),
  CONSTRAINT valid_website CHECK (website IS NULL OR website ~* '^https?://.*')
);

-- Create function to generate slug from name
CREATE OR REPLACE FUNCTION generate_slug(input_name TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(input_name, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate slug
CREATE OR REPLACE FUNCTION update_recruiter_slug()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update slug if name changed or it's a new record
  IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.name != NEW.name) THEN
    NEW.slug = generate_slug(NEW.name);
  END IF;
  
  -- Always update the updated_at timestamp
  NEW.updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_recruiter_slug_and_timestamp
  BEFORE INSERT OR UPDATE ON recruiters
  FOR EACH ROW EXECUTE FUNCTION update_recruiter_slug();

-- Insert initial recruiter data
INSERT INTO recruiters (
  id, name, agency, title, image, linkedin, website, email, login_email,
  about, specialties, philosophy, approach, notable_clients
) VALUES 
(1, 'Laura Hunting', 'Found By', 'Founding Partner', '/images/laura.jpeg',
 'https://www.linkedin.com/in/laurahunting/', 'https://www.foundby.co/', 'laura@foundby.co', 'jculbertson@gmail.com',
 'Laura is a founding partner at Found By, a boutique talent agency and executive search firm specialized in design. With over a decade of experience building design leadership teams, Found By has placed talent at industry leaders including Airbnb, Zillow, Square, Yahoo, Nike, Calendly, GoodRx, Pinterest, Duolingo, and Squarespace.',
 'Design Leadership, Executive Search, UX Design, Product Design',
 'I focus on building diverse teams thoughtfully and effectively, understanding that great design teams are built on a foundation of varied perspectives and complementary skills.',
 'My approach involves deep discovery sessions with both clients and candidates to understand cultural fit, growth trajectory, and long-term career goals. I believe in transparent communication and building lasting relationships rather than just filling positions.',
 'Airbnb, Zillow, Square, Yahoo, Nike, Calendly, GoodRx, Pinterest, Duolingo, Squarespace'),

(2, 'Garrett Fowler', 'Offsite', 'Founder', '/images/garrett.jpeg',
 'https://www.linkedin.com/in/garrettfowler/', 'https://www.off.site', 'garrett@off.site', 'jculbertson@gmail.com',
 'Garrett is the Founder of Offsite, a new kind of creative talent community focused on the intersection of career and creative practice. As a Design & Executive Talent Agent, he specializes in connecting exceptional design professionals with opportunities that align with their creative vision and career goals.',
 'Product Design, UX Design, Design Leadership',
 'I believe in going beyond traditional recruiting to build meaningful relationships within the creative community. Design talent deserves more than just job placement—they deserve career partnership.',
 'My approach centers on understanding both the creative and business sides of design roles. I focus on long-term career trajectory matching rather than quick placements, ensuring both candidates and companies find the right cultural and skill alignment.',
 'Various SaaS, FinTech, E-commerce, and Enterprise Software companies'),

(4, 'Dirk Cleveland', 'Fusion', 'Executive Recruiter', '/images/dirk.jpeg',
 'https://www.linkedin.com/in/dirkcleveland/', 'https://www.fusiontalent.com', 'dirk@fusiontalent.com', 'jculbertson@gmail.com',
 'Dirk specializes in Design Leadership Recruiting at Fusion, a 100% referral-based executive search firm focused exclusively on Engineering, Product, and Design leadership roles. With extensive experience placing executives at companies like Uber, Airbnb, Atlassian, and many more, Dirk focuses on long-term career growth and cultural alignment for senior design positions.',
 'UX Design, Product Design, Design Systems, Design Leadership',
 'I believe in the power of referral-based recruiting and building long-term relationships. Great design leaders aren''t just found—they''re cultivated through trust and understanding of their career aspirations.',
 'My approach is exclusively referral-based, focusing on quality over quantity. I invest time in understanding both the cultural dynamics of client organizations and the career motivations of design leaders to ensure sustainable, long-term placements.',
 'Uber, Airbnb, Atlassian, and other leading SaaS, Enterprise Software, FinTech, and Healthcare Tech companies'),

(6, 'Jared Tredly', 'Bamboo X', 'Design Recruiter', '/images/jared.jpeg',
 'https://www.linkedin.com/in/jaredtredly/', 'https://bamboo-x.com', 'jared@bamboocrowd.com', 'jculbertson@gmail.com',
 'Jared is a Design Recruiter at Bamboo X, a recruiting partner for disruptive startups and companies building what''s next. Since 2013, Bamboo X has been supporting VC-backed startups from pre-seed to IPO in acquiring top design talent. They specialize in recruiting for AI, fintech, health-tech, and other innovative sectors.',
 'Product Design, UX Design, UI Design, Design Leadership',
 'I believe in supporting disruptive startups and innovative companies that are building the future. Great design talent thrives in environments where they can make meaningful impact and drive product innovation.',
 'I focus on understanding the unique challenges and opportunities that come with startup environments. My approach involves matching design talent not just with roles, but with companies where they can grow alongside revolutionary products and teams.',
 '200+ VC-backed startups across AI & Machine Learning, FinTech, HealthTech, B2B SaaS, and Consumer Tech sectors');

-- Create indexes for performance
CREATE INDEX idx_recruiters_slug ON recruiters(slug);
CREATE INDEX idx_recruiters_login_email ON recruiters(login_email);
CREATE INDEX idx_recruiters_is_active ON recruiters(is_active);
CREATE INDEX idx_recruiters_updated_at ON recruiters(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Allow read access to all active recruiters
CREATE POLICY "Public read access to active recruiters" ON recruiters
  FOR SELECT USING (is_active = true);

-- Allow updates only by matching login_email (for now, we'll enhance this with proper auth later)
CREATE POLICY "Recruiters can update their own profiles" ON recruiters
  FOR UPDATE USING (
    login_email = current_setting('app.current_user_email', true)
  );

-- Allow admin users to update any recruiter
CREATE POLICY "Admin users can update any recruiter" ON recruiters
  FOR UPDATE USING (
    current_setting('app.current_user_email', true) = 'jculbertson@gmail.com' 
    OR current_setting('app.current_user_email', true) = 'jason@opendesigndocs.com'
  );

-- Grant permissions
GRANT SELECT ON recruiters TO anon;
GRANT SELECT, UPDATE ON recruiters TO authenticated;
