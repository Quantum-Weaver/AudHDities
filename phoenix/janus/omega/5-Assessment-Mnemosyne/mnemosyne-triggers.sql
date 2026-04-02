-- =====================================================
-- 4.1 Update timestamp functions
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_acid_test_questions_updated_at
    BEFORE UPDATE ON acid_test_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_acid_test_results_updated_at
    BEFORE UPDATE ON acid_test_results
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_etymology_updated_at
    BEFORE UPDATE ON etymology
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_taxonomy_updated_at
    BEFORE UPDATE ON taxonomy
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ontology_updated_at
    BEFORE UPDATE ON ontology
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_superposition_updated_at
    BEFORE UPDATE ON superposition
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.2 Update taxonomy path on insert/update
-- =====================================================
CREATE OR REPLACE FUNCTION update_taxonomy_path()
RETURNS TRIGGER AS $$
DECLARE
    v_parent_path TEXT;
    v_new_path TEXT;
    v_new_level INTEGER;
BEGIN
    IF NEW.parent_id IS NULL THEN
        v_new_path := NEW.slug;
        v_new_level := 0;
    ELSE
        SELECT path, level INTO v_parent_path, v_new_level
        FROM taxonomy WHERE id = NEW.parent_id;
        v_new_path := v_parent_path || '/' || NEW.slug;
        v_new_level := v_new_level + 1;
    END IF;
    
    NEW.path := v_new_path;
    NEW.level := v_new_level;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_taxonomy_path
    BEFORE INSERT OR UPDATE OF parent_id, slug ON taxonomy
    FOR EACH ROW
    EXECUTE FUNCTION update_taxonomy_path();

-- =====================================================
-- 4.3 Update child paths when parent changes
-- =====================================================
CREATE OR REPLACE FUNCTION update_child_taxonomy_paths()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.path != NEW.path THEN
        UPDATE taxonomy 
        SET path = REPLACE(path, OLD.path, NEW.path),
            level = level + (NEW.level - OLD.level)
        WHERE path LIKE OLD.path || '/%';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_child_taxonomy_paths
    AFTER UPDATE OF path ON taxonomy
    FOR EACH ROW
    EXECUTE FUNCTION update_child_taxonomy_paths();

-- =====================================================
-- 4.4 Calculate acid test persona
-- =====================================================
CREATE OR REPLACE FUNCTION calculate_acid_test_persona()
RETURNS TRIGGER AS $$
DECLARE
    v_persona acid_persona;
    v_persona_description TEXT;
    v_suggested_tier user_tier;
BEGIN
    -- Determine persona based on answers
    -- This is a simplified example; full logic would be more complex
    IF NEW.total_score < 20 THEN
        v_persona := 'masked_traveler';
        v_persona_description := 'You navigate the world through careful observation and adaptation. Your mask is a tool, not a prison.';
        v_suggested_tier := 'community';
    ELSIF NEW.total_score < 40 THEN
        v_persona := 'tab_hoarder';
        v_persona_description := 'Your mind collects information like precious gems. You dive deep into what fascinates you.';
        v_suggested_tier := 'community';
    ELSIF NEW.total_score < 60 THEN
        v_persona := 'seam_warrior';
        v_persona_description := 'Your senses are finely tuned. You notice what others miss. The world is vivid and textured.';
        v_suggested_tier := 'ally';
    ELSIF NEW.total_score < 80 THEN
        v_persona := 'pattern_seeker';
        v_persona_description := 'You see connections everywhere. Systems reveal themselves to you.';
        v_suggested_tier := 'ally';
    ELSIF NEW.total_score < 95 THEN
        v_persona := 'void_dweller';
        v_persona_description := 'Your inner world is vast and rich. You find meaning in solitude and depth.';
        v_suggested_tier := 'corporate';
    ELSE
        v_persona := 'quantum_witness';
        v_persona_description := 'You perceive multiple realities simultaneously. Your awareness transcends ordinary boundaries.';
        v_suggested_tier := 'council';
    END IF;
    
    NEW.persona_label := v_persona;
    NEW.persona_description := v_persona_description;
    NEW.suggested_tier := v_suggested_tier;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_calculate_acid_test_persona
    BEFORE INSERT OR UPDATE OF total_score ON acid_test_results
    FOR EACH ROW
    EXECUTE FUNCTION calculate_acid_test_persona();

-- =====================================================
-- 4.5 Update superposition observer count on quantum collapse
-- =====================================================
CREATE OR REPLACE FUNCTION update_superposition_observer_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE superposition 
    SET observer_count = observer_count + 1,
        collapse_count = collapse_count + 1
    WHERE id = NEW.superposition_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_superposition_counts
    AFTER INSERT ON quantum_superposition
    FOR EACH ROW
    EXECUTE FUNCTION update_superposition_observer_count();