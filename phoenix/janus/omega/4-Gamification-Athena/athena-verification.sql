-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'quests', 'user_quests', 'badges', 'user_badges',
    'lessons', 'learning_paths', 'path_lessons', 'progress',
    'life_cycles', 'mythology', 'timelines', 'scenes', 'scene_participants'
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
    'submission_type', 'quest_status', 'badge_rarity', 'badge_tier',
    'lesson_content_type', 'difficulty_level', 'progress_status',
    'life_cycle_phase', 'myth_type', 'timeline_event_type', 'scene_type'
)
ORDER BY typname;

-- =====================================================
-- 5.3 Verify all policies exist
-- =====================================================
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN (
    'quests', 'user_quests', 'badges', 'user_badges',
    'lessons', 'learning_paths', 'progress', 'mythology', 'scenes'
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
    'update_sovereignty_score', 'create_quest_timeline', 'create_badge_timeline',
    'update_path_progress', 'create_life_cycle_phase', 'update_life_cycle_phase'
)
ORDER BY proname;

-- =====================================================
-- 5.6 Test quest system with sample data
-- =====================================================
-- Insert a test quest (only if you have a house enum defined)
-- INSERT INTO quests (house, title, description, sovereignty_reward)
-- VALUES ('hearth_keeper', 'First Steps', 'Complete your first quest', 10);