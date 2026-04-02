-- =====================================================
-- 4.1 Update timestamp functions
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_regions_updated_at
    BEFORE UPDATE ON regions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_languages_updated_at
    BEFORE UPDATE ON languages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_localization_updated_at
    BEFORE UPDATE ON localization
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_culturalization_updated_at
    BEFORE UPDATE ON culturalization
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_translations_updated_at
    BEFORE UPDATE ON translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_personas_updated_at
    BEFORE UPDATE ON personas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customs_updated_at
    BEFORE UPDATE ON customs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_surveys_updated_at
    BEFORE UPDATE ON surveys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.2 Auto-set default language as default
-- =====================================================
CREATE OR REPLACE FUNCTION ensure_single_default_language()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default = TRUE THEN
        UPDATE languages SET is_default = FALSE WHERE is_default = TRUE AND id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_ensure_single_default_language
    BEFORE INSERT OR UPDATE OF is_default ON languages
    FOR EACH ROW
    EXECUTE FUNCTION ensure_single_default_language();

-- =====================================================
-- 4.3 Auto-update survey response count
-- =====================================================
CREATE OR REPLACE FUNCTION update_survey_response_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE surveys 
    SET response_count = response_count + 1
    WHERE id = NEW.survey_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_survey_response_count
    AFTER INSERT ON survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_survey_response_count();

-- =====================================================
-- 4.4 Set thread ID for contact submissions
-- =====================================================
CREATE OR REPLACE FUNCTION set_contact_thread_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.parent_id IS NOT NULL THEN
        SELECT thread_id INTO NEW.thread_id 
        FROM contact_submissions 
        WHERE id = NEW.parent_id;
    ELSIF NEW.thread_id IS NULL THEN
        NEW.thread_id = gen_random_uuid();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_set_contact_thread_id
    BEFORE INSERT ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION set_contact_thread_id();

-- =====================================================
-- 4.5 Function to get localized content
-- =====================================================
CREATE OR REPLACE FUNCTION get_localized_text(
    p_resource_key TEXT,
    p_language_code TEXT DEFAULT NULL,
    p_plural_form INTEGER DEFAULT 0
)
RETURNS TEXT AS $$
DECLARE
    v_language_code TEXT;
    v_translation TEXT;
BEGIN
    -- Use provided language or user's preferred language
    IF p_language_code IS NULL THEN
        SELECT COALESCE(
            (SELECT language_preference FROM profiles WHERE id = auth.uid()),
            (SELECT code FROM languages WHERE is_default = TRUE LIMIT 1)
        ) INTO v_language_code;
    ELSE
        v_language_code := p_language_code;
    END IF;
    
    -- Try to get translation
    SELECT translation INTO v_translation
    FROM localization
    WHERE resource_key = p_resource_key
    AND language_code = v_language_code
    AND plural_form = p_plural_form
    AND is_approved = TRUE;
    
    -- Fallback to default language if not found
    IF v_translation IS NULL THEN
        SELECT translation INTO v_translation
        FROM localization
        WHERE resource_key = p_resource_key
        AND language_code = (SELECT code FROM languages WHERE is_default = TRUE LIMIT 1)
        AND plural_form = p_plural_form;
    END IF;
    
    -- Return key if still not found
    RETURN COALESCE(v_translation, p_resource_key);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;