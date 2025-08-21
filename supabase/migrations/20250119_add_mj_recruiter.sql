-- Add MJ to recruiters table
-- Migration: 20250119_add_mj_recruiter.sql

INSERT INTO recruiters (
  id, name, agency, title, image, linkedin, website, email, login_email,
  about, specialties, philosophy, approach, notable_clients
) VALUES (
  7, 'Monica (MJ) Jin', 'Offsite', 'Talent Director', '/images/mj.jpeg', 
  'https://www.linkedin.com/in/monjin/', 'https://www.off.site', 'mj@off.site', 'jculbertson@gmail.com',
  'Monica (MJ) Jin is the Talent Director at Offsite, a creative talent community focused on the intersection of career and creative practice. With expertise in talent acquisition and team building across multiple design disciplines, Monica helps connect exceptional design professionals with opportunities that align with their creative vision and career goals.',
  'Design Talent Acquisition, Team Building, Creative Recruiting, Design Leadership',
  'I believe in empowering design professionals across all disciplines to find their ideal career paths. Great design happens when talented individuals are matched with the right opportunities and teams.',
  'My approach is holistic, considering not just design skills but also career aspirations, creative growth, and cultural fit. I work closely with both candidates and companies to ensure sustainable, long-term placements that benefit everyone involved.',
  'Various SaaS, FinTech, E-commerce, and Enterprise Software companies'
);
