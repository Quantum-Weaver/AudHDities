-- =====================================================
-- 2.1 REPORTS
-- =====================================================
CREATE TABLE reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    reported_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    target_type report_target_type NOT NULL,
    target_id UUID NOT NULL,
    report_type report_type NOT NULL,
    reason TEXT NOT NULL,
    reported_content TEXT,
    reported_url TEXT,
    status report_status DEFAULT 'pending',
    moderator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    moderation_notes TEXT,
    resolution TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for report queries
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_target ON reports(target_type, target_id);
CREATE INDEX idx_reports_reporter ON reports(reporter_id);
CREATE INDEX idx_reports_created ON reports(created_at DESC);

-- =====================================================
-- 2.2 MODERATION_ACTIONS
-- =====================================================
CREATE TABLE moderation_actions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    moderator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    action_type moderation_action_type NOT NULL,
    target_type moderation_target_type NOT NULL,
    target_id UUID NOT NULL,
    reason TEXT,
    duration INTERVAL,
    metadata JSONB DEFAULT '{}',
    is_reverted BOOLEAN DEFAULT FALSE,
    revert_reason TEXT,
    reverted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reverted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for moderation queries
CREATE INDEX idx_moderation_actions_target ON moderation_actions(target_type, target_id);
CREATE INDEX idx_moderation_actions_moderator ON moderation_actions(moderator_id);
CREATE INDEX idx_moderation_actions_created ON moderation_actions(created_at DESC);
CREATE INDEX idx_moderation_actions_unreverted ON moderation_actions(is_reverted) WHERE is_reverted = FALSE;

-- =====================================================
-- 2.3 ADMIN_LOGS (Immutable Audit Trail)
-- =====================================================
CREATE TABLE admin_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    action TEXT NOT NULL,
    action_category admin_log_category NOT NULL,
    target_type admin_log_target_type,
    target_id UUID,
    target_identifier TEXT,
    previous_state JSONB,
    new_state JSONB,
    metadata JSONB DEFAULT '{}',
    reason TEXT,
    public_note TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    ip_address INET,
    user_agent TEXT,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for admin log queries
CREATE INDEX idx_admin_logs_admin ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_category ON admin_logs(action_category);
CREATE INDEX idx_admin_logs_target ON admin_logs(target_type, target_id);
CREATE INDEX idx_admin_logs_created ON admin_logs(created_at DESC);
CREATE INDEX idx_admin_logs_public ON admin_logs(is_public) WHERE is_public = TRUE;

-- =====================================================
-- 2.4 APPLICATIONS
-- =====================================================
CREATE TABLE applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    application_type application_type NOT NULL,
    status application_status DEFAULT 'pending',
    form_data JSONB NOT NULL,
    admin_notes TEXT,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT,
    onboarding_version TEXT,
    onboarding_doc_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for application queries
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_type ON applications(application_type);
CREATE INDEX idx_applications_created ON applications(created_at DESC);

-- =====================================================
-- 2.5 PROCESSES
-- =====================================================
CREATE TABLE processes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    process_type process_type NOT NULL,
    steps JSONB NOT NULL,
    timeout_days INTEGER,
    escalation_target escalation_target,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for process queries
CREATE INDEX idx_processes_type ON processes(process_type);
CREATE INDEX idx_processes_active ON processes(is_active) WHERE is_active = TRUE;

-- =====================================================
-- 2.6 RATE_LIMITS
-- =====================================================
CREATE TABLE rate_limits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    identifier TEXT NOT NULL,
    endpoint TEXT NOT NULL,
    request_count INTEGER DEFAULT 1,
    window_start TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(identifier, endpoint, window_start)
);

-- Index for cleanup queries
CREATE INDEX idx_rate_limits_window ON rate_limits(window_start);

-- =====================================================
-- 2.7 PUBLIC TRANSPARENCY VIEW (from admin_logs)
-- =====================================================
CREATE VIEW public_transparency AS
SELECT 
    created_at,
    action,
    target_type,
    target_identifier,
    public_note
FROM admin_logs
WHERE is_public = TRUE
ORDER BY created_at DESC;