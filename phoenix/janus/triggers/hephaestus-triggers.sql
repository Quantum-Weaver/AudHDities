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
CREATE TRIGGER update_file_type_standards_updated_at
    BEFORE UPDATE ON file_type_standards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_file_registry_updated_at
    BEFORE UPDATE ON file_registry
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduling_updated_at
    BEFORE UPDATE ON scheduling
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_updated_at
    BEFORE UPDATE ON calendar
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at
    BEFORE UPDATE ON maintenance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_systems_updated_at
    BEFORE UPDATE ON systems
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scripts_updated_at
    BEFORE UPDATE ON scripts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_protocols_updated_at
    BEFORE UPDATE ON protocols
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.2 Update next_run for scheduled jobs
-- =====================================================
CREATE OR REPLACE FUNCTION update_next_run_time()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.job_type = 'cron' AND NEW.schedule IS NOT NULL AND NEW.status = 'active' THEN
        -- Calculate next run time based on cron schedule
        -- This is simplified; in production, use a cron parsing library
        NEW.next_run := NOW() + INTERVAL '1 day';
    ELSIF NEW.job_type = 'interval' AND NEW.schedule IS NOT NULL THEN
        NEW.next_run := NOW() + (NEW.schedule || ' seconds')::INTERVAL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_next_run
    BEFORE INSERT OR UPDATE OF schedule, job_type, status ON scheduling
    FOR EACH ROW
    EXECUTE FUNCTION update_next_run_time();

-- =====================================================
-- 4.3 Log script execution
-- =====================================================
CREATE OR REPLACE FUNCTION log_script_execution(
    p_script_id UUID,
    p_executed_by UUID,
    p_parameters JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO script_execution_logs (script_id, executed_by, status, started_at, parameters_used)
    VALUES (p_script_id, p_executed_by, 'started', NOW(), p_parameters)
    RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4.4 Complete script execution
-- =====================================================
CREATE OR REPLACE FUNCTION complete_script_execution(
    p_log_id UUID,
    p_status TEXT,
    p_output TEXT DEFAULT NULL,
    p_error TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    UPDATE script_execution_logs
    SET status = p_status,
        completed_at = NOW(),
        output = p_output,
        error_message = p_error
    WHERE id = p_log_id;
    
    -- Update script run count
    UPDATE scripts
    SET run_count = run_count + 1,
        last_run = NOW(),
        last_result = p_status
    WHERE id = (SELECT script_id FROM script_execution_logs WHERE id = p_log_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 4.5 System health check trigger
-- =====================================================
CREATE OR REPLACE FUNCTION record_system_health()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO system_health_logs (system_id, status, checked_at)
    VALUES (NEW.id, NEW.status, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_record_system_health
    AFTER UPDATE OF status ON systems
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION record_system_health();

-- =====================================================
-- 4.6 Function to get setting value
-- =====================================================
CREATE OR REPLACE FUNCTION get_setting(
    p_key TEXT,
    p_user_id UUID DEFAULT NULL,
    p_default JSONB DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_value JSONB;
    v_scope setting_scope;
    v_scope_id UUID;
BEGIN
    -- Try user-specific setting first
    IF p_user_id IS NOT NULL THEN
        SELECT value INTO v_value
        FROM settings
        WHERE key = p_key AND scope = 'user' AND scope_id = p_user_id;
        
        IF v_value IS NOT NULL THEN
            RETURN v_value;
        END IF;
    END IF;
    
    -- Try global setting
    SELECT value INTO v_value
    FROM settings
    WHERE key = p_key AND scope = 'global';
    
    RETURN COALESCE(v_value, p_default);
END;
$$ LANGUAGE plpgsql STABLE;