-- Update Liz Luce's image to use local image file (download from LinkedIn)
UPDATE recruiters 
SET image = '/images/liz.jpg' 
WHERE slug = 'liz-luce';
