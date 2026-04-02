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
CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_processes_updated_at
    BEFORE UPDATE ON processes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.2 Log admin actions automatically
-- =====================================================
CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
DECLARE
    v_admin_id UUID;
    v_action TEXT;
    v_category admin_log_category;
    v_target_type admin_log_target_type;
    v_target_id UUID;
    v_public_note TEXT;
BEGIN
    -- Get current user
    v_admin_id := auth.uid();
    
    -- Determine based on table
    IF TG_TABLE_NAME = 'reports' THEN
        IF TG_OP = 'UPDATE' THEN
            v_action := 'Report ' || NEW.status;
            v_category := 'report_handling';
            v_target_type := 'report';
            v_target_id := NEW.id;
            v_public_note := 'Report ' || NEW.status || ' by moderator';
        END IF;
    ELSIF TG_TABLE_NAME = 'moderation_actions' AND TG_OP = 'INSERT' THEN
        v_action := NEW.action_type::text || ' on ' || NEW.target_type::text;
        v_category := 'content_moderation';
        v_target_type := CASE 
            WHEN NEW.target_type = 'user' THEN 'user'
            WHEN NEW.target_type IN ('post', 'comment', 'reply') THEN 'product'
            ELSE 'system'
        END;
        v_target_id := NEW.target_id;
        v_public_note := NEW.action_type::text || ' applied';
    ELSIF TG_TABLE_NAME = 'applications' AND TG_OP = 'UPDATE' THEN
        IF NEW.status != OLD.status THEN
            v_action := 'Application ' || NEW.status;
            v_category := 'verification';
            v_target_type := CASE 
                WHEN NEW.application_type = 'creator' THEN 'creator'
                WHEN NEW.application_type = 'vendor' THEN 'vendor'
                ELSE 'user'
            END;
            v_target_id := NEW.user_id;
            v_public_note := 'Application ' || NEW.status;
        END IF;
    END IF;
    
    -- Insert log if we have an action
    IF v_action IS NOT NULL THEN
        INSERT INTO admin_logs (
            admin_id, action, action_category, target_type, target_id,
            public_note, is_public, success
        ) VALUES (
            v_admin_id, v_action, v_category, v_target_type, v_target_id,
            v_public_note, TRUE, TRUE
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for admin logging
CREATE TRIGGER tr_log_report_updates
    AFTER UPDATE ON reports
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER tr_log_moderation_actions
    AFTER INSERT ON moderation_actions
    FOR EACH ROW
    EXECUTE FUNCTION log_admin_action();

CREATE TRIGGER tr_log_application_updates
    AFTER UPDATE ON applications
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION log_admin_action();

-- =====================================================
-- 4.3 Clean up old rate limits
-- =====================================================
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS void AS $$
BEGIN
    DELETE FROM rate_limits 
    WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a cron job (if pg_cron is available)
-- SELECT cron.schedule('cleanup-rate-limits', '*/30 * * * *', 'SELECT cleanup_rate_limits();');

-- =====================================================
-- 4.4 Auto-create application on role request
-- =====================================================
-- This function would be called from application code
-- when a user applies to become a creator or vendor
CREATE OR REPLACE FUNCTION submit_application(
    p_user_id UUID,
    p_application_type application_type,
    p_form_data JSONB
)
RETURNS UUID AS $$
DECLARE
    v_application_id UUID;
BEGIN
    INSERT INTO applications (user_id, application_type, form_data)
    VALUES (p_user_id, p_application_type, p_form_data)
    RETURNING id INTO v_application_id;
    
    RETURN v_application_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4.5 Approve application and update role
-- =====================================================
CREATE OR REPLACE FUNCTION approve_application(
    p_application_id UUID,
    p_admin_id UUID,
    p_review_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_application applications%ROWTYPE;
    v_user_id UUID;
    v_application_type application_type;
BEGIN
    -- Get application
    SELECT * INTO v_application
    FROM applications
    WHERE id = p_application_id
    AND status = 'pending';
    
    IF NOT FOUND THEN
        RETURN FALSE;
    END IF;
    
    v_user_id := v_application.user_id;
    v_application_type := v_application.application_type;
    
    -- Update application status
    UPDATE applications
    SET status = 'approved',
        reviewed_by = p_admin_id,
        reviewed_at = NOW(),
        review_notes = p_review_notes
    WHERE id = p_application_id;
    
    -- Update user profile based on application type
    IF v_application_type = 'creator' THEN
        UPDATE profiles SET is_creator = TRUE WHERE id = v_user_id;
    ELSIF v_application_type = 'vendor' THEN
        UPDATE profiles SET is_vendor = TRUE WHERE id = v_user_id;
    ELSIF v_application_type = 'moderator' THEN
        UPDATE profiles SET is_moderator = TRUE WHERE id = v_user_id;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;