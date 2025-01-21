-- Create the content_subscribers table
CREATE TABLE IF NOT EXISTS public.content_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create the marketing_subscribers table
CREATE TABLE IF NOT EXISTS public.marketing_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migrate existing data
INSERT INTO content_subscribers (email, subscribed_at, created_at)
SELECT email, subscribed_at, created_at
FROM subscribers;

INSERT INTO marketing_subscribers (email, subscribed_at, created_at)
SELECT email, subscribed_at, created_at
FROM subscribers
WHERE marketing_opt_in = true;

-- Drop the old table (optional - you might want to keep it for a while)
-- DROP TABLE public.subscribers;
