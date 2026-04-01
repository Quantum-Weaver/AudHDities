-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE continents ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE localization ENABLE ROW LEVEL SECURITY;
ALTER TABLE culturalization ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE customs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 CONTINENTS Policies
-- =====================================================
CREATE POLICY "Public can view continents"
    ON continents FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage continents"
    ON continents FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 REGIONS Policies
-- =====================================================
CREATE POLICY "Public can view active regions"
    ON regions FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage regions"
    ON regions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 LANGUAGES Policies
-- =====================================================
CREATE POLICY "Public can view active languages"
    ON languages FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage languages"
    ON languages FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.5 LOCALIZATION Policies
-- =====================================================
CREATE POLICY "Public can view approved localizations"
    ON localization FOR SELECT
    USING (is_approved = true);

CREATE POLICY "Admins can manage localizations"
    ON localization FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 CULTURALIZATION Policies
-- =====================================================
CREATE POLICY "Public can view culturalization"
    ON culturalization FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage culturalization"
    ON culturalization FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 TRANSLATIONS Policies
-- =====================================================
CREATE POLICY "Public can view approved translations"
    ON translations FOR SELECT
    USING (is_approved = true);

CREATE POLICY "Admins can manage translations"
    ON translations FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.8 PERSONAS Policies
-- =====================================================
CREATE POLICY "Public can view active personas"
    ON personas FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage personas"
    ON personas FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.9 CUSTOMS Policies
-- =====================================================
CREATE POLICY "Public can view active customs"
    ON customs FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can manage customs"
    ON customs FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.10 CONTACT_SUBMISSIONS Policies
-- =====================================================
-- Users can view their own submissions
CREATE POLICY "Users can view own contact submissions"
    ON contact_submissions FOR SELECT
    USING (auth.uid() = user_id);

-- Authenticated users can create submissions
CREATE POLICY "Authenticated users can create submissions"
    ON contact_submissions FOR INSERT
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'anon');

-- Admins can view all submissions
CREATE POLICY "Admins can view all contact submissions"
    ON contact_submissions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- Admins can update submissions
CREATE POLICY "Admins can update contact submissions"
    ON contact_submissions FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.11 EMAIL_COMMUNICATIONS Policies
-- =====================================================
-- Users can view emails sent to them
CREATE POLICY "Users can view own emails"
    ON email_communications FOR SELECT
    USING (auth.uid() = recipient_id);

-- Admins can view all emails
CREATE POLICY "Admins can view all emails"
    ON email_communications FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- System can insert emails
CREATE POLICY "System can insert emails"
    ON email_communications FOR INSERT
    WITH CHECK (true);

-- =====================================================
-- 3.12 SURVEYS Policies
-- =====================================================
-- Public can view active surveys
CREATE POLICY "Public can view active surveys"
    ON surveys FOR SELECT
    USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Survey creators can manage their surveys
CREATE POLICY "Creators can manage own surveys"
    ON surveys FOR ALL
    USING (auth.uid() = created_by);

-- Admins have full access
CREATE POLICY "Admins have full access to surveys"
    ON surveys FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.13 SURVEY_RESPONSES Policies
-- =====================================================
-- Users can view their own responses
CREATE POLICY "Users can view own survey responses"
    ON survey_responses FOR SELECT
    USING (auth.uid() = user_id);

-- Users can submit responses
CREATE POLICY "Users can submit survey responses"
    ON survey_responses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Survey creators can view responses to their surveys
CREATE POLICY "Creators can view responses"
    ON survey_responses FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM surveys 
        WHERE surveys.id = survey_responses.survey_id 
        AND surveys.created_by = auth.uid()
    ));

-- Admins have full access
CREATE POLICY "Admins have full access to survey responses"
    ON survey_responses FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));