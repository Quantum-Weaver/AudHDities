-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'reports', 'moderation_actions', 'admin_logs',
    'applications', 'processes', 'rate_limits'
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
    'report_target_type', 'report_type', 'report_status',
    'moderation_action_type', 'moderation_target_type',
    'admin_log_category', 'admin_log_target_type',
    'application_type', 'application_status',
    'process_type', 'escalation_target'
)
ORDER BY typname;

-- =====================================================
-- 5.3 Verify all policies exist
-- =====================================================
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN (
    'reports', 'moderation_actions', 'admin_logs',
    'applications', 'processes', 'rate_limits'
)
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
    'log_admin_action', 'cleanup_rate_limits',
    'submit_application', 'approve_application'
)
ORDER BY proname;

-- =====================================================
-- 5.6 Verify view exists
-- =====================================================
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public'
AND table_name = 'public_transparency';

-- =====================================================
-- 5.7 Check for orphaned records
-- =====================================================
SELECT 'reports without reporter' as issue,
       COUNT(*) as count
FROM reports r
LEFT JOIN profiles p ON r.reporter_id = p.id
WHERE p.id IS NULL
UNION ALL
SELECT 'moderation_actions without moderator' as issue,
       COUNT(*)
FROM moderation_actions ma
LEFT JOIN profiles p ON ma.moderator_id = p.id
WHERE p.id IS NULL
UNION ALL
SELECT 'applications without user' as issue,
       COUNT(*)
FROM applications a
LEFT JOIN profiles p ON a.user_id = p.id
WHERE p.id IS NULL;