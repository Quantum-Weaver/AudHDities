-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'creative_categories', 'posts', 'comments', 'replies', 'reactions',
    'messages', 'activity', 'emeralds', 'notifications'
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
    'content_type', 'post_visibility', 'reaction_type', 'action_type',
    'target_type', 'activity_visibility', 'emerald_status', 'notification_type',
    'message_status'
)
ORDER BY typname;

-- =====================================================
-- 5.3 Verify all policies exist
-- =====================================================
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN (
    'creative_categories', 'posts', 'comments', 'replies', 'reactions',
    'messages', 'activity', 'emeralds', 'notifications'
)
ORDER BY tablename, policyname;

-- =====================================================
-- 5.4 Verify triggers exist
-- =====================================================
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND event_object_table IN (
    'posts', 'comments', 'replies', 'emeralds'
)
ORDER BY event_object_table, trigger_name;

-- =====================================================
-- 5.5 Verify view exists
-- =====================================================
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public'
AND table_name = 'personalized_feed';

-- =====================================================
-- 5.6 Test the personalized feed view
-- =====================================================
SELECT COUNT(*) FROM personalized_feed;