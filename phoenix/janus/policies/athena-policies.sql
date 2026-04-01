-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE path_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE life_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE mythology ENABLE ROW LEVEL SECURITY;
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE scene_participants ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 QUESTS Policies
-- =====================================================
-- Public can view active quests
CREATE POLICY "Public can view active quests"
    ON quests FOR SELECT
    USING (is_active = true);

-- Users can view all quests they have started
CREATE POLICY "Users can view own quest progress"
    ON user_quests FOR SELECT
    USING (auth.uid() = user_id);

-- Users can start available quests
CREATE POLICY "Users can start available quests"
    ON user_quests FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own quest progress
CREATE POLICY "Users can update own quests"
    ON user_quests FOR UPDATE
    USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to quests"
    ON quests FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 BADGES Policies
-- =====================================================
-- Public can view badges
CREATE POLICY "Public can view badges"
    ON badges FOR SELECT
    USING (true);

-- Users can view their own earned badges
CREATE POLICY "Users can view own badges"
    ON user_badges FOR SELECT
    USING (auth.uid() = user_id);

-- Users can display badges on profile
CREATE POLICY "Users can update badge display"
    ON user_badges FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (display_on_profile IS NOT NULL);

-- Admins have full access
CREATE POLICY "Admins have full access to badges"
    ON badges FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 LESSONS & LEARNING_PATHS Policies
-- =====================================================
-- Public can view published lessons
CREATE POLICY "Public can view published lessons"
    ON lessons FOR SELECT
    USING (is_published = true);

-- Public can view published paths
CREATE POLICY "Public can view published paths"
    ON learning_paths FOR SELECT
    USING (is_published = true);

-- Public can view path-lesson relationships
CREATE POLICY "Public can view path lessons"
    ON path_lessons FOR SELECT
    USING (true);

-- Creators can manage own lessons
CREATE POLICY "Creators can manage own lessons"
    ON lessons FOR ALL
    USING (auth.uid() = creator_id);

-- Creators can manage own paths
CREATE POLICY "Creators can manage own paths"
    ON learning_paths FOR ALL
    USING (auth.uid() = creator_id);

-- Admins have full access
CREATE POLICY "Admins have full access to lessons"
    ON lessons FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.5 PROGRESS Policies
-- =====================================================
-- Users can view their own progress
CREATE POLICY "Users can view own progress"
    ON progress FOR SELECT
    USING (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update own progress"
    ON progress FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can insert own progress
CREATE POLICY "Users can insert own progress"
    ON progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to progress"
    ON progress FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 LIFE_CYCLES Policies
-- =====================================================
-- Users can view own life cycles
CREATE POLICY "Users can view own life cycles"
    ON life_cycles FOR SELECT
    USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to life cycles"
    ON life_cycles FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 MYTHOLOGY Policies
-- =====================================================
-- Public can view published myths
CREATE POLICY "Public can view published mythology"
    ON mythology FOR SELECT
    USING (is_published = true);

-- Authors can manage own myths
CREATE POLICY "Authors can manage own myths"
    ON mythology FOR ALL
    USING (auth.uid() = author_id);

-- Admins have full access
CREATE POLICY "Admins have full access to mythology"
    ON mythology FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.8 TIMELINES Policies
-- =====================================================
-- Users can view own timeline
CREATE POLICY "Users can view own timeline"
    ON timelines FOR SELECT
    USING (auth.uid() = user_id);

-- System can insert timeline events
CREATE POLICY "System can insert timeline events"
    ON timelines FOR INSERT
    WITH CHECK (true);

-- Admins have full access
CREATE POLICY "Admins have full access to timelines"
    ON timelines FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.9 SCENES Policies
-- =====================================================
-- Public can view active scenes
CREATE POLICY "Public can view active scenes"
    ON scenes FOR SELECT
    USING (is_active = true);

-- Scene participants can view scenes they joined
CREATE POLICY "Participants can view joined scenes"
    ON scene_participants FOR SELECT
    USING (auth.uid() = user_id);

-- Users can join scenes
CREATE POLICY "Users can join scenes"
    ON scene_participants FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can leave scenes
CREATE POLICY "Users can leave scenes"
    ON scene_participants FOR DELETE
    USING (auth.uid() = user_id);

-- Scene creators can manage their scenes
CREATE POLICY "Creators can manage own scenes"
    ON scenes FOR ALL
    USING (auth.uid() = creator_id);

-- Admins have full access
CREATE POLICY "Admins have full access to scenes"
    ON scenes FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));