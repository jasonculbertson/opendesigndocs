-- Fix recruiter login emails to match their actual email addresses
-- Migration: 20250120_fix_recruiter_login_emails.sql

-- Update login_email to match each recruiter's actual email so they can edit their own profiles
UPDATE recruiters SET login_email = email WHERE id = 1; -- Laura Hunting: laura@foundby.co
UPDATE recruiters SET login_email = email WHERE id = 2; -- Garrett Fowler: garrett@off.site  
UPDATE recruiters SET login_email = email WHERE id = 4; -- Dirk Cleveland: dirk@fusiontalent.com
UPDATE recruiters SET login_email = email WHERE id = 6; -- Jared Tredly: jared@bamboocrowd.com
UPDATE recruiters SET login_email = email WHERE id = 7; -- Monica (MJ) Jin: mj@off.site

-- Verify the changes
-- SELECT id, name, email, login_email FROM recruiters ORDER BY id;
