-- Add display_order column to control recruiter ordering
-- Migration: 20250129_add_display_order_to_recruiters.sql

-- Add display_order column
ALTER TABLE recruiters ADD COLUMN display_order INTEGER;

-- Set initial display order (Laura after Dirk)
-- Current order should be: Dirk, Laura, Garrett, MJ
UPDATE recruiters SET display_order = 1 WHERE name = 'Dirk Cleveland';
UPDATE recruiters SET display_order = 2 WHERE name = 'Laura Hunting';  
UPDATE recruiters SET display_order = 3 WHERE name = 'Garrett Fowler';
UPDATE recruiters SET display_order = 4 WHERE name = 'Monica (MJ) Jin';

-- Set default display_order for any future recruiters
ALTER TABLE recruiters ALTER COLUMN display_order SET DEFAULT 999;

-- Create index for performance
CREATE INDEX idx_recruiters_display_order ON recruiters(display_order);
