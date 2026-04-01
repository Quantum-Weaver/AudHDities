-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE acid_test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE acid_test_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE acid_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE etymology ENABLE ROW LEVEL SECURITY;
ALTER TABLE taxonomy ENABLE ROW LEVEL SECURITY;
ALTER TABLE ontology ENABLE ROW LEVEL SECURITY;
ALTER TABLE folksonomy ENABLE ROW LEVEL SECURITY;
ALTER TABLE superposition ENABLE ROW LEVEL SECURITY;
ALTER TABLE quantum_superposition ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 ACID_TEST_QUESTIONS & ANSWERS Policies
-- =====================================================
-- Public can view active test questions
CREATE POLICY "Public can view active acid test questions"
    ON acid_test_questions FOR SELECT
    USING (is_active = true);

-- Public can view answers for active questions
CREATE POLICY "Public can view acid test answers"
    ON acid_test_answers FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM acid_test_questions 
        WHERE acid_test_questions.id = acid_test_answers.question_id 
        AND acid_test_questions.is_active = true
    ));

-- Admins can manage questions
CREATE POLICY "Admins can manage acid test questions"
    ON acid_test_questions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 ACID_TEST_RESULTS Policies
-- =====================================================
-- Users can view their own results
CREATE POLICY "Users can view own acid test results"
    ON acid_test_results FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own results
CREATE POLICY "Users can insert own acid test results"
    ON acid_test_results FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own results
CREATE POLICY "Users can update own acid test results"
    ON acid_test_results FOR UPDATE
    USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to acid test results"
    ON acid_test_results FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 ETYMOLOGY Policies
-- =====================================================
-- Public can view approved etymology
CREATE POLICY "Public can view approved etymology"
    ON etymology FOR SELECT
    USING (is_approved = true);

-- Authenticated users can contribute
CREATE POLICY "Authenticated users can contribute etymology"
    ON etymology FOR INSERT
    WITH CHECK (auth.uid() = contributor_id);

-- Contributors can update own pending entries
CREATE POLICY "Contributors can update own pending entries"
    ON etymology FOR UPDATE
    USING (auth.uid() = contributor_id AND is_approved = false);

-- Admins have full access
CREATE POLICY "Admins have full access to etymology"
    ON etymology FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.5 TAXONOMY Policies
-- =====================================================
-- Public can view active taxonomy
CREATE POLICY "Public can view taxonomy"
    ON taxonomy FOR SELECT
    USING (is_active = true);

-- Authenticated users can suggest taxonomy nodes
CREATE POLICY "Authenticated users can suggest taxonomy nodes"
    ON taxonomy FOR INSERT
    WITH CHECK (auth.uid() = created_by);

-- Creators can update own pending nodes
CREATE POLICY "Creators can update own taxonomy nodes"
    ON taxonomy FOR UPDATE
    USING (auth.uid() = created_by AND is_active = false);

-- Admins have full access
CREATE POLICY "Admins have full access to taxonomy"
    ON taxonomy FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 ONTOLOGY Policies
-- =====================================================
-- Public can view approved ontology
CREATE POLICY "Public can view approved ontology"
    ON ontology FOR SELECT
    USING (is_approved = true);

-- Authenticated users can suggest relationships
CREATE POLICY "Authenticated users can suggest ontology"
    ON ontology FOR INSERT
    WITH CHECK (auth.uid() = created_by);

-- Creators can update own pending relationships
CREATE POLICY "Creators can update own ontology"
    ON ontology FOR UPDATE
    USING (auth.uid() = created_by AND is_approved = false);

-- Admins have full access
CREATE POLICY "Admins have full access to ontology"
    ON ontology FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 FOLKSONOMY Policies
-- =====================================================
-- Public can view approved folksonomy tags
CREATE POLICY "Public can view approved folksonomy"
    ON folksonomy FOR SELECT
    USING (is_approved = true);

-- Authenticated users can create tags
CREATE POLICY "Authenticated users can create folksonomy tags"
    ON folksonomy FOR INSERT
    WITH CHECK (auth.uid() = creator_id);

-- Creators can update own pending tags
CREATE POLICY "Creators can update own folksonomy tags"
    ON folksonomy FOR UPDATE
    USING (auth.uid() = creator_id AND is_approved = false);

-- Admins have full access
CREATE POLICY "Admins have full access to folksonomy"
    ON folksonomy FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.8 SUPERPOSITION Policies
-- =====================================================
-- Public can view active superpositions
CREATE POLICY "Public can view superpositions"
    ON superposition FOR SELECT
    USING (status = 'active');

-- Authenticated users can create superpositions
CREATE POLICY "Authenticated users can create superpositions"
    ON superposition FOR INSERT
    WITH CHECK (auth.uid() = created_by);

-- Creators can update own superpositions
CREATE POLICY "Creators can update own superpositions"
    ON superposition FOR UPDATE
    USING (auth.uid() = created_by);

-- Admins have full access
CREATE POLICY "Admins have full access to superpositions"
    ON superposition FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.9 QUANTUM_SUPERPOSITION Policies
-- =====================================================
-- Users can view their own quantum collapses
CREATE POLICY "Users can view own quantum collapses"
    ON quantum_superposition FOR SELECT
    USING (auth.uid() = user_id);

-- Users can create their own collapses
CREATE POLICY "Users can create quantum collapses"
    ON quantum_superposition FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update own collapses
CREATE POLICY "Users can update own quantum collapses"
    ON quantum_superposition FOR UPDATE
    USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to quantum superpositions"
    ON quantum_superposition FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));