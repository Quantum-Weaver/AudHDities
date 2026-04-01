-- =====================================================
-- 2.1 FILE_TYPE_STANDARDS (Reference)
-- =====================================================
CREATE TABLE file_type_standards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    emoji TEXT NOT NULL,
    file_type TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    description TEXT,
    required_patterns TEXT[],
    prohibited_patterns TEXT[],
    required_imports TEXT[],
    must_have_interfaces BOOLEAN DEFAULT FALSE,
    must_have_props BOOLEAN DEFAULT FALSE,
    must_handle_errors BOOLEAN DEFAULT FALSE,
    must_have_loading_state BOOLEAN DEFAULT FALSE,
    validation_query TEXT,
    validation_description TEXT,
    example_path TEXT,
    example_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.2 FILE_REGISTRY
-- =====================================================
CREATE TABLE file_registry (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_path TEXT NOT NULL UNIQUE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    emoji TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    purpose TEXT,
    standards TEXT,
    dependencies TEXT[] DEFAULT '{}',
    used_by TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    needs_review BOOLEAN DEFAULT FALSE,
    review_notes TEXT,
    warning TEXT,
    example_usage TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    last_validated TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.3 SETTINGS
-- =====================================================
CREATE TABLE settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL,
    value JSONB NOT NULL,
    scope setting_scope NOT NULL DEFAULT 'global',
    scope_id UUID,
    type TEXT NOT NULL CHECK (type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(key, scope, scope_id)
);

-- =====================================================
-- 2.4 SCHEDULING
-- =====================================================
CREATE TABLE scheduling (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    job_type job_type NOT NULL,
    schedule TEXT,
    run_at TIMESTAMPTZ,
    function_name TEXT NOT NULL,
    parameters JSONB DEFAULT '{}',
    status job_status DEFAULT 'active',
    last_run TIMESTAMPTZ,
    next_run TIMESTAMPTZ,
    last_result TEXT,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.5 CALENDAR
-- =====================================================
CREATE TABLE calendar (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type calendar_event_type NOT NULL,
    house council_house,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    all_day BOOLEAN DEFAULT FALSE,
    recurrence JSONB,
    visibility calendar_visibility DEFAULT 'public',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.6 ANALYTICS
-- =====================================================
CREATE TABLE analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_name TEXT NOT NULL,
    event_category analytics_category NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    session_id TEXT,
    metadata JSONB DEFAULT '{}',
    value DECIMAL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.7 MAINTENANCE
-- =====================================================
CREATE TABLE maintenance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type maintenance_type NOT NULL,
    status maintenance_status DEFAULT 'scheduled',
    scheduled_start TIMESTAMPTZ,
    scheduled_end TIMESTAMPTZ,
    actual_start TIMESTAMPTZ,
    actual_end TIMESTAMPTZ,
    performed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    error_log TEXT,
    affected_systems TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.8 SYSTEMS
-- =====================================================
CREATE TABLE systems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    type system_type NOT NULL,
    status system_status DEFAULT 'operational',
    health_check_url TEXT,
    dependencies UUID[] DEFAULT '{}',
    version TEXT,
    last_health_check TIMESTAMPTZ,
    last_incident TIMESTAMPTZ,
    uptime_percent DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.9 SCRIPTS
-- =====================================================
CREATE TABLE scripts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    path TEXT NOT NULL UNIQUE,
    description TEXT,
    type script_type NOT NULL,
    parameters JSONB DEFAULT '{}',
    run_count INTEGER DEFAULT 0,
    last_run TIMESTAMPTZ,
    last_result TEXT,
    is_production_safe BOOLEAN DEFAULT FALSE,
    requires_approval BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.10 PROTOCOLS
-- =====================================================
CREATE TABLE protocols (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type protocol_type NOT NULL,
    version INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    steps JSONB NOT NULL,
    owners UUID[] DEFAULT '{}',
    review_frequency_days INTEGER,
    last_reviewed TIMESTAMPTZ,
    next_review TIMESTAMPTZ,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.11 SYSTEM_HEALTH_LOGS (Audit trail for system status)
-- =====================================================
CREATE TABLE system_health_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    system_id UUID NOT NULL REFERENCES systems(id) ON DELETE CASCADE,
    status system_status NOT NULL,
    response_time_ms INTEGER,
    error_message TEXT,
    checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.12 SCRIPT_EXECUTION_LOGS
-- =====================================================
CREATE TABLE script_execution_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    script_id UUID NOT NULL REFERENCES scripts(id) ON DELETE CASCADE,
    executed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('started', 'completed', 'failed')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    output TEXT,
    error_message TEXT,
    parameters_used JSONB
);