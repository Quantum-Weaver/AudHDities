-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 REPORTS Policies
-- =====================================================
-- Users can view reports they submitted
CREATE POLICY "Users can view own reports"
    ON reports FOR SELECT
    USING (auth.uid() = reporter_id);

-- Users can submit reports
CREATE POLICY "Users can submit reports"
    ON reports FOR INSERT
    WITH CHECK (auth.uid() = reporter_id);

-- Moderators can view all pending reports
CREATE POLICY "Moderators can view pending reports"
    ON reports FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND (is_admin = TRUE OR is_moderator = TRUE)
        )
    );

-- Moderators can update reports
CREATE POLICY "Moderators can update reports"
    ON reports FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND (is_admin = TRUE OR is_moderator = TRUE)
        )
    );

-- Admins have full access
CREATE POLICY "Admins have full access to reports"
    ON reports FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 MODERATION_ACTIONS Policies
-- =====================================================
-- Public can view non-reverted actions (transparency)
CREATE POLICY "Public can view moderation actions"
    ON moderation_actions FOR SELECT
    USING (is_reverted = FALSE);

-- Moderators can view all actions
CREATE POLICY "Moderators can view all actions"
    ON moderation_actions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND (is_admin = TRUE OR is_moderator = TRUE)
        )
    );

-- Moderators can insert actions
CREATE POLICY "Moderators can insert actions"
    ON moderation_actions FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND (is_admin = TRUE OR is_moderator = TRUE)
        )
    );

-- Admins have full access
CREATE POLICY "Admins have full access to moderation actions"
    ON moderation_actions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 ADMIN_LOGS Policies
-- =====================================================
-- Public can view public logs
CREATE POLICY "Public can view public admin logs"
    ON admin_logs FOR SELECT
    USING (is_public = TRUE);

-- Admins can view all logs
CREATE POLICY "Admins can view all admin logs"
    ON admin_logs FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- System can insert logs
CREATE POLICY "System can insert admin logs"
    ON admin_logs FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- 3.5 APPLICATIONS Policies
-- =====================================================
-- Users can view their own applications
CREATE POLICY "Users can view own applications"
    ON applications FOR SELECT
    USING (auth.uid() = user_id);

-- Users can submit applications
CREATE POLICY "Users can submit applications"
    ON applications FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending applications
CREATE POLICY "Users can update own pending applications"
    ON applications FOR UPDATE
    USING (auth.uid() = user_id AND status = 'pending');

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
    ON applications FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- Admins can update applications
CREATE POLICY "Admins can update applications"
    ON applications FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 PROCESSES Policies
-- =====================================================
-- Public can view active processes
CREATE POLICY "Public can view active processes"
    ON processes FOR SELECT
    USING (is_active = TRUE);

-- Admins can manage processes
CREATE POLICY "Admins can manage processes"
    ON processes FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 RATE_LIMITS Policies (System only)
-- =====================================================
-- No user policies - system manages directly
-- Only admins can view
CREATE POLICY "Admins can view rate limits"
    ON rate_limits FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));