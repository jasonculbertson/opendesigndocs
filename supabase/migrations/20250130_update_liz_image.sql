-- Update Liz Luce's image to use local image file (download from LinkedIn)
UPDATE recruiters 
SET image = '/images/liz.jpeg' 
WHERE slug = 'liz-luce';
