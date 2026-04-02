-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE file_type_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduling ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE script_execution_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 FILE_TYPE_STANDARDS Policies
-- =====================================================
CREATE POLICY "Public can view file type standards"
    ON file_type_standards FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage file type standards"
    ON file_type_standards FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 FILE_REGISTRY Policies
-- =====================================================
CREATE POLICY "Public can view file registry"
    ON file_registry FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage file registry"
    ON file_registry FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 SETTINGS Policies
-- =====================================================
-- Public can view public settings
CREATE POLICY "Public can view public settings"
    ON settings FOR SELECT
    USING (is_public = true);

-- Users can view their own settings
CREATE POLICY "Users can view own settings"
    ON settings FOR SELECT
    USING (scope = 'user' AND scope_id = auth.uid());

-- Users can update their own settings
CREATE POLICY "Users can update own settings"
    ON settings FOR UPDATE
    USING (scope = 'user' AND scope_id = auth.uid());

-- Admins have full access
CREATE POLICY "Admins have full access to settings"
    ON settings FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.5 SCHEDULING Policies
-- =====================================================
-- Admins can view all scheduled jobs
CREATE POLICY "Admins can view scheduling"
    ON scheduling FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- Admins can manage scheduling
CREATE POLICY "Admins can manage scheduling"
    ON scheduling FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 CALENDAR Policies
-- =====================================================
-- Public can view public calendar events
CREATE POLICY "Public can view public calendar events"
    ON calendar FOR SELECT
    USING (visibility = 'public');

-- Users can view house calendar events for their house
CREATE POLICY "Users can view house calendar events"
    ON calendar FOR SELECT
    USING (
        visibility = 'house' AND 
        primary_house = (SELECT primary_house FROM profiles WHERE id = auth.uid())
    );

-- Admins can view all calendar events
CREATE POLICY "Admins can view all calendar events"
    ON calendar FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 ANALYTICS Policies
-- =====================================================
-- Admins can view analytics
CREATE POLICY "Admins can view analytics"
    ON analytics FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- System can insert analytics
CREATE POLICY "System can insert analytics"
    ON analytics FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- 3.8 MAINTENANCE Policies
-- =====================================================
-- Public can view scheduled maintenance
CREATE POLICY "Public can view maintenance"
    ON maintenance FOR SELECT
    USING (status IN ('scheduled', 'in_progress'));

-- Admins can manage maintenance
CREATE POLICY "Admins can manage maintenance"
    ON maintenance FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.9 SYSTEMS Policies
-- =====================================================
-- Public can view system status
CREATE POLICY "Public can view systems"
    ON systems FOR SELECT
    USING (true);

-- Admins can manage systems
CREATE POLICY "Admins can manage systems"
    ON systems FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.10 SCRIPTS Policies
-- =====================================================
-- Public can view scripts (for transparency)
CREATE POLICY "Public can view scripts"
    ON scripts FOR SELECT
    USING (true);

-- Admins can manage scripts
CREATE POLICY "Admins can manage scripts"
    ON scripts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.11 PROTOCOLS Policies
-- =====================================================
-- Public can view active protocols
CREATE POLICY "Public can view protocols"
    ON protocols FOR SELECT
    USING (is_active = true);

-- Admins can manage protocols
CREATE POLICY "Admins can manage protocols"
    ON protocols FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.12 SYSTEM_HEALTH_LOGS Policies
-- =====================================================
-- Admins can view health logs
CREATE POLICY "Admins can view health logs"
    ON system_health_logs FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- System can insert health logs
CREATE POLICY "System can insert health logs"
    ON system_health_logs FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- 3.13 SCRIPT_EXECUTION_LOGS Policies
-- =====================================================
-- Admins can view script logs
CREATE POLICY "Admins can view script logs"
    ON script_execution_logs FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- System can insert script logs
CREATE POLICY "System can insert script logs"
    ON script_execution_logs FOR INSERT
    WITH CHECK (true);