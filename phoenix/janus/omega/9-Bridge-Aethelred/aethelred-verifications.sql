-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'supabase_connection', 'stripe_connection', 'resend_connection',
    'vercel_connection', 'github_connection', 'audhdities_platform',
    'consciousness', 'council_houses', 'hearth_keeper', 'chancellor',
    'seer', 'aethelred_house', 'curator', 'archivist', 'skald',
    'codex', 'executioner'
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
    'supabase_status', 'stripe_mode', 'webhook_status', 'delivery_status',
    'deployment_status', 'workflow_status', 'platform_environment',
    'platform_status', 'bridge_status'
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
    'update_platform_metrics', 'create_house_records',
    'seed_council_houses', 'get_platform_health'
)
ORDER BY proname;

-- =====================================================
-- 5.6 Seed council houses
-- =====================================================
SELECT seed_council_houses();

-- =====================================================
-- 5.7 Verify council houses seeded
-- =====================================================
SELECT name, display_name, emoji, color, is_active
FROM council_houses
ORDER BY order_index;

-- =====================================================
-- 5.8 Verify house extension tables created
-- =====================================================
SELECT 
    ch.name,
    CASE WHEN hk.id IS NOT NULL THEN '✅' ELSE '❌' END as hearth_keeper,
    CASE WHEN chc.id IS NOT NULL THEN '✅' ELSE '❌' END as chancellor,
    CASE WHEN se.id IS NOT NULL THEN '✅' ELSE '❌' END as seer,
    CASE WHEN ae.id IS NOT NULL THEN '✅' ELSE '❌' END as aethelred,
    CASE WHEN cu.id IS NOT NULL THEN '✅' ELSE '❌' END as curator,
    CASE WHEN ar.id IS NOT NULL THEN '✅' ELSE '❌' END as archivist,
    CASE WHEN sk.id IS NOT NULL THEN '✅' ELSE '❌' END as skald,
    CASE WHEN co.id IS NOT NULL THEN '✅' ELSE '❌' END as codex,
    CASE WHEN ex.id IS NOT NULL THEN '✅' ELSE '❌' END as executioner
FROM council_houses ch
LEFT JOIN hearth_keeper hk ON ch.id = hk.id
LEFT JOIN chancellor chc ON ch.id = chc.id
LEFT JOIN seer se ON ch.id = se.id
LEFT JOIN aethelred_house ae ON ch.id = ae.id
LEFT JOIN curator cu ON ch.id = cu.id
LEFT JOIN archivist ar ON ch.id = ar.id
LEFT JOIN skald sk ON ch.id = sk.id
LEFT JOIN codex co ON ch.id = co.id
LEFT JOIN executioner ex ON ch.id = ex.id
ORDER BY ch.order_index;

-- =====================================================
-- 5.9 Check for orphaned records
-- =====================================================
SELECT 'house without extension' as issue,
       ch.name as house_name,
       CASE WHEN hk.id IS NULL THEN 'hearth_keeper' END as missing,
       CASE WHEN chc.id IS NULL THEN 'chancellor' END,
       CASE WHEN se.id IS NULL THEN 'seer' END,
       CASE WHEN ae.id IS NULL THEN 'aethelred' END,
       CASE WHEN cu.id IS NULL THEN 'curator' END,
       CASE WHEN ar.id IS NULL THEN 'archivist' END,
       CASE WHEN sk.id IS NULL THEN 'skald' END,
       CASE WHEN co.id IS NULL THEN 'codex' END,
       CASE WHEN ex.id IS NULL THEN 'executioner' END
FROM council_houses ch
LEFT JOIN hearth_keeper hk ON ch.id = hk.id
LEFT JOIN chancellor chc ON ch.id = chc.id
LEFT JOIN seer se ON ch.id = se.id
LEFT JOIN aethelred_house ae ON ch.id = ae.id
LEFT JOIN curator cu ON ch.id = cu.id
LEFT JOIN archivist ar ON ch.id = ar.id
LEFT JOIN skald sk ON ch.id = sk.id
LEFT JOIN codex co ON ch.id = co.id
LEFT JOIN executioner ex ON ch.id = ex.id
WHERE hk.id IS NULL OR chc.id IS NULL OR se.id IS NULL OR ae.id IS NULL 
   OR cu.id IS NULL OR ar.id IS NULL OR sk.id IS NULL OR co.id IS NULL OR ex.id IS NULL;