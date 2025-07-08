-- Team Management System Database Schema
-- Migration: 20250116_create_team_management_schema.sql

-- Create team_members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_clerk_id TEXT NOT NULL,
  employee_clerk_id TEXT, -- Optional if employee hasn't signed up yet
  employee_name TEXT NOT NULL,
  employee_email TEXT NOT NULL,
  job_title TEXT NOT NULL,
  level TEXT NOT NULL,
  department TEXT DEFAULT 'Design',
  start_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'on_leave', 'former')),
  profile_photo_url TEXT,
  custom_fields JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_email CHECK (employee_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT valid_level CHECK (level IN ('Designer I', 'Designer II', 'Senior Designer', 'Lead Designer', 'Principal Designer', 'Staff Designer'))
);

-- Create growth_conversations table
CREATE TABLE growth_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  conversation_type TEXT NOT NULL CHECK (conversation_type IN ('one_on_one', 'feedback', 'career', 'review', 'informal', 'goal_setting')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  ai_analysis JSONB DEFAULT '{}', -- AI-generated insights, sentiment, topics
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_clerk_id TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create growth_goals table
CREATE TABLE growth_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  goal_title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('technical_skill', 'soft_skill', 'project', 'career', 'leadership')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  target_date DATE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  ai_suggestions JSONB DEFAULT '{}', -- AI-generated suggestions and recommendations
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_clerk_id TEXT NOT NULL
);

-- Create goal_updates table for tracking progress
CREATE TABLE goal_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES growth_goals(id) ON DELETE CASCADE,
  update_content TEXT NOT NULL,
  progress_percentage INTEGER NOT NULL CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_clerk_id TEXT NOT NULL
);

-- Create competency_assessments table
CREATE TABLE competency_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_member_id UUID REFERENCES team_members(id) ON DELETE CASCADE,
  competency_area TEXT NOT NULL,
  current_level TEXT NOT NULL,
  target_level TEXT NOT NULL,
  evidence TEXT,
  ai_recommendations JSONB DEFAULT '{}', -- AI-generated development recommendations
  assessment_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by_clerk_id TEXT NOT NULL,
  
  -- Ensure valid competency levels
  CONSTRAINT valid_current_level CHECK (current_level IN ('not_meeting', 'meeting', 'exceeding')),
  CONSTRAINT valid_target_level CHECK (target_level IN ('not_meeting', 'meeting', 'exceeding'))
);

-- Create indexes for performance
CREATE INDEX idx_team_members_manager ON team_members(manager_clerk_id);
CREATE INDEX idx_team_members_employee ON team_members(employee_clerk_id);
CREATE INDEX idx_team_members_status ON team_members(status);
CREATE INDEX idx_growth_conversations_team_member ON growth_conversations(team_member_id);
CREATE INDEX idx_growth_conversations_created_at ON growth_conversations(created_at DESC);
CREATE INDEX idx_growth_goals_team_member ON growth_goals(team_member_id);
CREATE INDEX idx_growth_goals_status ON growth_goals(status);
CREATE INDEX idx_goal_updates_goal ON goal_updates(goal_id);
CREATE INDEX idx_competency_assessments_team_member ON competency_assessments(team_member_id);
CREATE INDEX idx_competency_assessments_date ON competency_assessments(assessment_date DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_team_members_updated_at 
  BEFORE UPDATE ON team_members 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_growth_conversations_updated_at 
  BEFORE UPDATE ON growth_conversations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_growth_goals_updated_at 
  BEFORE UPDATE ON growth_goals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_assessments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Team Members policies
CREATE POLICY "Managers can manage their team members" ON team_members
  FOR ALL USING (
    auth.jwt() ->> 'sub' = manager_clerk_id
  );

-- Growth Conversations policies
CREATE POLICY "Access conversations for own team members" ON growth_conversations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.id = growth_conversations.team_member_id 
      AND team_members.manager_clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- Growth Goals policies
CREATE POLICY "Access goals for own team members" ON growth_goals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.id = growth_goals.team_member_id 
      AND team_members.manager_clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- Goal Updates policies
CREATE POLICY "Access goal updates for own team members" ON goal_updates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM growth_goals 
      JOIN team_members ON team_members.id = growth_goals.team_member_id
      WHERE growth_goals.id = goal_updates.goal_id 
      AND team_members.manager_clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- Competency Assessments policies
CREATE POLICY "Access assessments for own team members" ON competency_assessments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM team_members 
      WHERE team_members.id = competency_assessments.team_member_id 
      AND team_members.manager_clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- Create helpful views for common queries

-- Team member summary view
CREATE VIEW team_member_summary AS
SELECT 
  tm.id,
  tm.manager_clerk_id,
  tm.employee_name,
  tm.employee_email,
  tm.job_title,
  tm.level,
  tm.department,
  tm.status,
  tm.profile_photo_url,
  tm.created_at,
  tm.updated_at,
  -- Count related records
  COALESCE(conv_count.count, 0) as conversation_count,
  COALESCE(goal_count.count, 0) as active_goals_count,
  COALESCE(assessment_count.count, 0) as assessment_count,
  -- Latest activity
  latest_conv.created_at as last_conversation_date,
  latest_goal.updated_at as last_goal_update
FROM team_members tm
LEFT JOIN (
  SELECT team_member_id, COUNT(*) as count
  FROM growth_conversations 
  WHERE status = 'active'
  GROUP BY team_member_id
) conv_count ON tm.id = conv_count.team_member_id
LEFT JOIN (
  SELECT team_member_id, COUNT(*) as count
  FROM growth_goals 
  WHERE status = 'active'
  GROUP BY team_member_id
) goal_count ON tm.id = goal_count.team_member_id
LEFT JOIN (
  SELECT team_member_id, COUNT(*) as count
  FROM competency_assessments
  GROUP BY team_member_id
) assessment_count ON tm.id = assessment_count.team_member_id
LEFT JOIN (
  SELECT DISTINCT ON (team_member_id) team_member_id, created_at
  FROM growth_conversations
  ORDER BY team_member_id, created_at DESC
) latest_conv ON tm.id = latest_conv.team_member_id
LEFT JOIN (
  SELECT DISTINCT ON (team_member_id) team_member_id, updated_at
  FROM growth_goals
  ORDER BY team_member_id, updated_at DESC
) latest_goal ON tm.id = latest_goal.team_member_id;

-- Team analytics view
CREATE VIEW team_analytics AS
SELECT 
  manager_clerk_id,
  COUNT(*) as total_team_members,
  COUNT(CASE WHEN status = 'active' THEN 1 END) as active_members,
  COUNT(CASE WHEN status = 'on_leave' THEN 1 END) as on_leave_members,
  COUNT(CASE WHEN status = 'former' THEN 1 END) as former_members,
  -- Department breakdown
  jsonb_object_agg(department, dept_count) as department_breakdown,
  -- Level breakdown
  jsonb_object_agg(level, level_count) as level_breakdown
FROM (
  SELECT 
    manager_clerk_id,
    status,
    department,
    level,
    COUNT(*) OVER (PARTITION BY manager_clerk_id, department) as dept_count,
    COUNT(*) OVER (PARTITION BY manager_clerk_id, level) as level_count
  FROM team_members
) subquery
GROUP BY manager_clerk_id;

-- Grant access to views
GRANT SELECT ON team_member_summary TO authenticated;
GRANT SELECT ON team_analytics TO authenticated;

-- Create RLS policies for views
CREATE POLICY "Managers can view their team summary" ON team_member_summary
  FOR SELECT USING (auth.jwt() ->> 'sub' = manager_clerk_id);

CREATE POLICY "Managers can view their team analytics" ON team_analytics
  FOR SELECT USING (auth.jwt() ->> 'sub' = manager_clerk_id);

-- Enable RLS on views
ALTER VIEW team_member_summary ENABLE ROW LEVEL SECURITY;
ALTER VIEW team_analytics ENABLE ROW LEVEL SECURITY; 