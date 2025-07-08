-- Create user_usage_tracking table for tracking word usage per user
CREATE TABLE IF NOT EXISTS user_usage_tracking (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_email VARCHAR(255),
    session_id VARCHAR(255),
    words_used INTEGER NOT NULL DEFAULT 0,
    daily_words_used INTEGER NOT NULL DEFAULT 0,
    monthly_words_used INTEGER NOT NULL DEFAULT 0,
    last_usage_date DATE DEFAULT CURRENT_DATE,
    reset_date DATE DEFAULT CURRENT_DATE,
    tier VARCHAR(50) DEFAULT 'free', -- 'free', 'premium', etc.
    daily_limit INTEGER DEFAULT 3000,
    monthly_limit INTEGER DEFAULT 90000, -- 30 days * 3000 words
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_usage_user_id ON user_usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_user_usage_user_email ON user_usage_tracking(user_email);
CREATE INDEX IF NOT EXISTS idx_user_usage_session_id ON user_usage_tracking(session_id);
CREATE INDEX IF NOT EXISTS idx_user_usage_last_usage_date ON user_usage_tracking(last_usage_date);
CREATE INDEX IF NOT EXISTS idx_user_usage_reset_date ON user_usage_tracking(reset_date);

-- Create unique constraint on user_id to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_usage_unique_user_id ON user_usage_tracking(user_id);

-- Create trigger for updating updated_at timestamp
CREATE TRIGGER update_user_usage_tracking_updated_at 
    BEFORE UPDATE ON user_usage_tracking 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add RLS (Row Level Security) policies
ALTER TABLE user_usage_tracking ENABLE ROW LEVEL SECURITY;

-- Allow users to read/update their own usage data
CREATE POLICY "Users can view their own usage" ON user_usage_tracking
    FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update their own usage" ON user_usage_tracking
    FOR UPDATE USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Allow service role to manage all usage data
CREATE POLICY "Service role can manage all usage data" ON user_usage_tracking
    FOR ALL USING (current_setting('role') = 'service_role');

-- Grant permissions
GRANT ALL ON user_usage_tracking TO authenticated;
GRANT ALL ON user_usage_tracking TO service_role;

-- Create function to reset daily usage counts
CREATE OR REPLACE FUNCTION reset_daily_usage()
RETURNS void AS $$
BEGIN
    UPDATE user_usage_tracking 
    SET daily_words_used = 0, 
        last_usage_date = CURRENT_DATE
    WHERE last_usage_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Create function to reset monthly usage counts (run monthly)
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void AS $$
BEGIN
    UPDATE user_usage_tracking 
    SET monthly_words_used = 0, 
        reset_date = CURRENT_DATE
    WHERE reset_date < CURRENT_DATE - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Create function to get or create user usage record
CREATE OR REPLACE FUNCTION get_or_create_user_usage(
    p_user_id VARCHAR(255),
    p_user_email VARCHAR(255) DEFAULT NULL,
    p_session_id VARCHAR(255) DEFAULT NULL
)
RETURNS user_usage_tracking AS $$
DECLARE
    usage_record user_usage_tracking;
BEGIN
    -- Try to get existing record
    SELECT * INTO usage_record 
    FROM user_usage_tracking 
    WHERE user_id = p_user_id;
    
    -- If no record exists, create one
    IF NOT FOUND THEN
        INSERT INTO user_usage_tracking (user_id, user_email, session_id)
        VALUES (p_user_id, p_user_email, p_session_id)
        RETURNING * INTO usage_record;
    ELSE
        -- Update session_id if provided
        IF p_session_id IS NOT NULL THEN
            UPDATE user_usage_tracking 
            SET session_id = p_session_id, updated_at = NOW()
            WHERE user_id = p_user_id
            RETURNING * INTO usage_record;
        END IF;
    END IF;
    
    RETURN usage_record;
END;
$$ LANGUAGE plpgsql;

-- Create function to update user usage
CREATE OR REPLACE FUNCTION update_user_usage(
    p_user_id VARCHAR(255),
    p_words_used INTEGER,
    p_user_email VARCHAR(255) DEFAULT NULL,
    p_session_id VARCHAR(255) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    usage_record user_usage_tracking;
    current_date_val DATE := CURRENT_DATE;
BEGIN
    -- Get or create user usage record
    SELECT * INTO usage_record FROM get_or_create_user_usage(p_user_id, p_user_email, p_session_id);
    
    -- Reset daily usage if it's a new day
    IF usage_record.last_usage_date < current_date_val THEN
        UPDATE user_usage_tracking 
        SET daily_words_used = 0, 
            last_usage_date = current_date_val
        WHERE user_id = p_user_id;
        usage_record.daily_words_used := 0;
    END IF;
    
    -- Check if adding these words would exceed daily limit
    IF (usage_record.daily_words_used + p_words_used) > usage_record.daily_limit THEN
        RETURN FALSE; -- Usage would exceed limit
    END IF;
    
    -- Update usage counts
    UPDATE user_usage_tracking 
    SET 
        words_used = words_used + p_words_used,
        daily_words_used = daily_words_used + p_words_used,
        monthly_words_used = monthly_words_used + p_words_used,
        last_usage_date = current_date_val,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    RETURN TRUE; -- Usage updated successfully
END;
$$ LANGUAGE plpgsql;

-- Create function to check if user can use words
CREATE OR REPLACE FUNCTION can_user_use_words(
    p_user_id VARCHAR(255),
    p_words_to_use INTEGER,
    p_user_email VARCHAR(255) DEFAULT NULL,
    p_session_id VARCHAR(255) DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    usage_record user_usage_tracking;
    current_date_val DATE := CURRENT_DATE;
BEGIN
    -- Get or create user usage record
    SELECT * INTO usage_record FROM get_or_create_user_usage(p_user_id, p_user_email, p_session_id);
    
    -- Reset daily usage if it's a new day
    IF usage_record.last_usage_date < current_date_val THEN
        usage_record.daily_words_used := 0;
    END IF;
    
    -- Check if adding these words would exceed daily limit
    RETURN (usage_record.daily_words_used + p_words_to_use) <= usage_record.daily_limit;
END;
$$ LANGUAGE plpgsql; 