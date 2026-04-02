-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'acid_test_questions', 'acid_test_answers', 'acid_test_results',
    'etymology', 'taxonomy', 'ontology', 'folksonomy',
    'superposition', 'quantum_superposition'
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
    'acid_question_type', 'acid_persona', 'taxonomy_node_type',
    'ontology_predicate', 'folksonomy_target_type', 'superposition_status'
)
ORDER BY typname;

-- =====================================================
-- 5.3 Verify all policies exist
-- =====================================================
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN (
    'acid_test_questions', 'acid_test_results', 'etymology',
    'taxonomy', 'ontology', 'folksonomy', 'superposition',
    'quantum_superposition'
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
-- 5.5 Verify taxonomy path generation
-- =====================================================
-- Test taxonomy insertion (will fail if constraints violated)
-- INSERT INTO taxonomy (name, slug, node_type) VALUES ('Test', 'test', 'domain');
-- DELETE FROM taxonomy WHERE slug = 'test';

-- =====================================================
-- 5.6 Check for any orphaned records
-- =====================================================
SELECT 'acid_test_answers without question' as issue,
       COUNT(*) as count
FROM acid_test_answers a
LEFT JOIN acid_test_questions q ON a.question_id = q.id
WHERE q.id IS NULL
UNION ALL
SELECT 'ontology with missing subject' as issue,
       COUNT(*)
FROM ontology o
LEFT JOIN taxonomy t ON o.subject_id = t.id
WHERE t.id IS NULL
UNION ALL
SELECT 'ontology with missing object' as issue,
       COUNT(*)
FROM ontology o
LEFT JOIN taxonomy t ON o.object_id = t.id
WHERE t.id IS NULL;