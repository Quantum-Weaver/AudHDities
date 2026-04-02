-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'file_type_standards', 'file_registry', 'settings', 'scheduling',
    'calendar', 'analytics', 'maintenance', 'systems', 'scripts',
    'protocols', 'system_health_logs', 'script_execution_logs'
)
ORDER BY table_name;

-- =====================================================
-- 5.2 Verify all enums exist
-- =====================================================
SELECT typname 
FROM pg_type 
WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND typtype = 'e'
AND typname IN (
    'setting_scope', 'job_type', 'job_status', 'calendar_event_type',
    'calendar_visibility', 'analytics_category', 'maintenance_type',
    'maintenance_status', 'system_type', 'system_status', 'script_type',
    'protocol_type'
)
ORDER BY typname;

-- =====================================================
-- 5.3 Verify all policies exist
-- =====================================================
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =====================================================
-- 5.4 Verify triggers exist
-- =====================================================
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

-- =====================================================
-- 5.5 Verify functions exist
-- =====================================================
SELECT proname, pronargs 
FROM pg_proc 
WHERE pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND proname IN (
    'update_next_run_time', 'log_script_execution', 'complete_script_execution',
    'record_system_health', 'get_setting'
)
ORDER BY proname;

-- =====================================================
-- 5.6 Seed default file type standards
-- =====================================================
INSERT INTO file_type_standards (emoji, file_type, display_name, description) VALUES
    ('📄', 'page', 'Next.js Page', 'Page component with metadata export'),
    ('🧩', 'component', 'React Component', 'Reusable UI component'),
    ('🔧', 'utility', 'Utility Function', 'Pure helper function'),
    ('🪝', 'hook', 'Custom Hook', 'Reusable React hook'),
    ('🌐', 'api', 'API Route', 'Backend API endpoint'),
    ('📚', 'doc', 'Documentation', 'Markdown documentation file'),
    ('🗄️', 'database', 'Database Migration', 'SQL schema file')
ON CONFLICT (file_type) DO NOTHING;

-- =====================================================
-- 5.7 Seed default system entries
-- =====================================================
INSERT INTO systems (name, slug, type, status) VALUES
    ('Supabase Database', 'supabase-db', 'database', 'operational'),
    ('Supabase Auth', 'supabase-auth', 'auth', 'operational'),
    ('Supabase Storage', 'supabase-storage', 'storage', 'operational'),
    ('Vercel Hosting', 'vercel-hosting', 'api', 'operational'),
    ('Stripe Payments', 'stripe-payments', 'api', 'operational')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 5.8 Check for orphaned records
-- =====================================================
SELECT 'file_registry without standard' as issue,
       COUNT(*) as count
FROM file_registry fr
LEFT JOIN file_type_standards fts ON fr.file_type = fts.file_type
WHERE fts.file_type IS NULL
UNION ALL
SELECT 'scheduling without creator' as issue,
       COUNT(*)
FROM scheduling s
LEFT JOIN profiles p ON s.created_by = p.id
WHERE s.created_by IS NOT NULL AND p.id IS NULL
UNION ALL
SELECT 'protocols without reviewer' as issue,
       COUNT(*)
FROM protocols p
LEFT JOIN profiles pr ON p.reviewed_by = pr.id
WHERE p.reviewed_by IS NOT NULL AND pr.id IS NULL;