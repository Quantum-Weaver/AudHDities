-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'continents', 'regions', 'languages', 'localization',
    'culturalization', 'translations', 'personas', 'customs',
    'contact_submissions', 'email_communications', 'surveys', 'survey_responses'
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
    'contact_status', 'contact_direction', 'email_status',
    'date_format_type', 'time_format_type', 'currency_position_type',
    'measurement_system_type', 'text_direction_type', 'translatable_type',
    'custom_category_type', 'survey_audience_type'
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
    'ensure_single_default_language',
    'update_survey_response_count',
    'set_contact_thread_id',
    'get_localized_text'
)
ORDER BY proname;

-- =====================================================
-- 5.6 Seed default languages
-- =====================================================
INSERT INTO languages (code, name, native_name, is_active, is_default) VALUES
    ('en', 'English', 'English', TRUE, TRUE),
    ('es', 'Spanish', 'Español', TRUE, FALSE),
    ('fr', 'French', 'Français', TRUE, FALSE),
    ('de', 'German', 'Deutsch', TRUE, FALSE),
    ('zh', 'Chinese', '中文', TRUE, FALSE)
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 5.7 Seed default continents
-- =====================================================
INSERT INTO continents (code, name) VALUES
    ('AF', 'Africa'),
    ('AN', 'Antarctica'),
    ('AS', 'Asia'),
    ('EU', 'Europe'),
    ('NA', 'North America'),
    ('OC', 'Oceania'),
    ('SA', 'South America')
ON CONFLICT (code) DO NOTHING;

-- =====================================================
-- 5.8 Check for orphaned records
-- =====================================================
SELECT 'contact_submissions without user' as issue,
       COUNT(*) as count
FROM contact_submissions cs
LEFT JOIN profiles p ON cs.user_id = p.id
WHERE cs.user_id IS NOT NULL AND p.id IS NULL
UNION ALL
SELECT 'survey_responses without user' as issue,
       COUNT(*)
FROM survey_responses sr
LEFT JOIN profiles p ON sr.user_id = p.id
WHERE p.id IS NULL
UNION ALL
SELECT 'translations without language' as issue,
       COUNT(*)
FROM translations t
LEFT JOIN languages l ON t.language_id = l.id
WHERE l.id IS NULL;