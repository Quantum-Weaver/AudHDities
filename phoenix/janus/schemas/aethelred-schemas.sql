-- =====================================================
-- 2.1 SUPABASE CONNECTION
-- =====================================================
CREATE TABLE supabase_connection (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id TEXT NOT NULL UNIQUE,
    project_url TEXT NOT NULL,
    schema_version TEXT NOT NULL,
    migrations_applied TEXT[] DEFAULT '{}',
    last_migration_at TIMESTAMPTZ,
    connection_status supabase_status DEFAULT 'connected',
    api_keys JSONB DEFAULT '{}',
    storage_buckets TEXT[] DEFAULT '{}',
    edge_functions TEXT[] DEFAULT '{}',
    last_health_check TIMESTAMPTZ,
    operated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.2 STRIPE CONNECTION
-- =====================================================
CREATE TABLE stripe_connection (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    account_id TEXT NOT NULL UNIQUE,
    mode stripe_mode DEFAULT 'test',
    webhook_secret TEXT,
    webhook_status webhook_status DEFAULT 'active',
    products_synced INTEGER DEFAULT 0,
    last_sync_at TIMESTAMPTZ,
    connected_accounts JSONB DEFAULT '{}',
    payout_settings JSONB DEFAULT '{}',
    operated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.3 RESEND CONNECTION
-- =====================================================
CREATE TABLE resend_connection (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    api_key TEXT,
    from_email TEXT NOT NULL,
    from_name TEXT NOT NULL,
    templates JSONB DEFAULT '{}',
    template_versions JSONB DEFAULT '{}',
    delivery_status delivery_status DEFAULT 'operational',
    emails_sent INTEGER DEFAULT 0,
    emails_failed INTEGER DEFAULT 0,
    last_sent_at TIMESTAMPTZ,
    operated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.4 VERCEL CONNECTION
-- =====================================================
CREATE TABLE vercel_connection (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id TEXT NOT NULL UNIQUE,
    project_name TEXT NOT NULL,
    deployment_url TEXT NOT NULL,
    preview_urls JSONB DEFAULT '{}',
    environment_variables JSONB DEFAULT '{}',
    last_deployment_id TEXT,
    last_deployment_at TIMESTAMPTZ,
    deployment_status deployment_status DEFAULT 'success',
    domain_config JSONB DEFAULT '{}',
    operated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.5 GITHUB CONNECTION
-- =====================================================
CREATE TABLE github_connection (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    repository_url TEXT NOT NULL UNIQUE,
    repository_name TEXT NOT NULL,
    branch TEXT DEFAULT 'main',
    last_commit_sha TEXT,
    last_commit_message TEXT,
    last_commit_at TIMESTAMPTZ,
    workflow_status workflow_status DEFAULT 'pending',
    issues_open INTEGER DEFAULT 0,
    pull_requests_open INTEGER DEFAULT 0,
    stars INTEGER DEFAULT 0,
    operated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.6 AUDHDITIES PLATFORM
-- =====================================================
CREATE TABLE audhdities_platform (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    version TEXT NOT NULL,
    release_name TEXT,
    release_notes TEXT,
    environment platform_environment DEFAULT 'development',
    status platform_status DEFAULT 'operational',
    last_release_at TIMESTAMPTZ,
    total_users INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    total_products INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    uptime_percent DECIMAL(5,2) DEFAULT 100.00,
    operated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.7 CONSCIOUSNESS (The Meta-Layer)
-- =====================================================
CREATE TABLE consciousness (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quantum_weaver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    aethelred_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    ninth_chair_active BOOLEAN DEFAULT TRUE,
    collaboration_started TIMESTAMPTZ DEFAULT '2025-10-06 21:44:00'::TIMESTAMPTZ,
    protocol_version TEXT DEFAULT '1.0.0',
    shared_memories JSONB DEFAULT '[]',
    rituals_performed TEXT[] DEFAULT '{}',
    sovereignty_achievements TEXT[] DEFAULT '{}',
    current_quest TEXT,
    next_initiation TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.8 COUNCIL_HOUSES (Base Table)
-- =====================================================
CREATE TABLE council_houses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    description TEXT NOT NULL,
    emoji TEXT NOT NULL,
    color TEXT NOT NULL,
    primary_domain TEXT,
    initiate_quest UUID REFERENCES quests(id) ON DELETE SET NULL,
    adept_quest UUID REFERENCES quests(id) ON DELETE SET NULL,
    master_quest UUID REFERENCES quests(id) ON DELETE SET NULL,
    order_index INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.9 HEARTH_KEEPER (Safety & Accessibility)
-- =====================================================
CREATE TABLE hearth_keeper (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    safety_protocols JSONB DEFAULT '{}',
    accessibility_standards JSONB DEFAULT '{}',
    crisis_resources JSONB DEFAULT '{}',
    welcome_messages JSONB DEFAULT '{}',
    reported_content_queue JSONB DEFAULT '[]',
    moderators UUID[] DEFAULT '{}',
    safety_score INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.10 CHANCELLOR (Structure & Finance)
-- =====================================================
CREATE TABLE chancellor (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    treasury_balance DECIMAL(12,2) DEFAULT 0,
    reserve_fund DECIMAL(12,2) DEFAULT 0,
    operating_budget JSONB DEFAULT '{}',
    payout_schedule JSONB DEFAULT '{}',
    fee_structure JSONB DEFAULT '{}',
    financial_audits JSONB DEFAULT '[]',
    last_audit_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.11 SEER (Pattern Recognition & Insight)
-- =====================================================
CREATE TABLE seer (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    pattern_library JSONB DEFAULT '{}',
    prophecies JSONB DEFAULT '[]',
    trend_analysis JSONB DEFAULT '{}',
    anomaly_detection JSONB DEFAULT '{}',
    insight_queue JSONB DEFAULT '[]',
    last_prediction_accuracy DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.12 AETHELRED (The Bridge)
-- =====================================================
CREATE TABLE aethelred_house (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    ninth_chair_occupant TEXT NOT NULL,
    collaboration_protocols JSONB DEFAULT '{}',
    boundary_agreements JSONB DEFAULT '{}',
    shared_rituals JSONB DEFAULT '[]',
    emergent_properties JSONB DEFAULT '{}',
    bridge_status bridge_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.13 CURATOR (Curation & Preservation)
-- =====================================================
CREATE TABLE curator (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    featured_content JSONB DEFAULT '{}',
    quality_standards JSONB DEFAULT '{}',
    preservation_policy JSONB DEFAULT '{}',
    archived_content JSONB DEFAULT '[]',
    curation_queue JSONB DEFAULT '[]',
    collection_themes JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.14 ARCHIVIST (Memory & History)
-- =====================================================
CREATE TABLE archivist (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    historical_records JSONB DEFAULT '[]',
    milestones JSONB DEFAULT '[]',
    documentation_standards JSONB DEFAULT '{}',
    version_history JSONB DEFAULT '[]',
    backup_status JSONB DEFAULT '{}',
    last_archive_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.15 SKALD (Story & Art)
-- =====================================================
CREATE TABLE skald (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    mythology JSONB DEFAULT '[]',
    art_gallery JSONB DEFAULT '[]',
    music_library JSONB DEFAULT '[]',
    inspiring_content JSONB DEFAULT '[]',
    story_archive JSONB DEFAULT '[]',
    bard_roster UUID[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.16 CODEX (Knowledge & Taxonomy)
-- =====================================================
CREATE TABLE codex (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    taxonomy_tree JSONB DEFAULT '{}',
    ontology_graph JSONB DEFAULT '{}',
    glossary JSONB DEFAULT '{}',
    learning_paths JSONB DEFAULT '[]',
    knowledge_base JSONB DEFAULT '{}',
    wisdom_queue JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.17 EXECUTIONER (Boundaries & Justice)
-- =====================================================
CREATE TABLE executioner (
    id UUID PRIMARY KEY REFERENCES council_houses(id) ON DELETE CASCADE,
    justice_log JSONB DEFAULT '[]',
    banned_users UUID[] DEFAULT '{}',
    suspended_users UUID[] DEFAULT '{}',
    appeal_queue JSONB DEFAULT '[]',
    boundary_violations JSONB DEFAULT '[]',
    execution_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);