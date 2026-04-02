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
CREATE TRIGGER update_quests_updated_at
    BEFORE UPDATE ON quests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_quests_updated_at
    BEFORE UPDATE ON user_quests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at
    BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at
    BEFORE UPDATE ON learning_paths
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at
    BEFORE UPDATE ON progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mythology_updated_at
    BEFORE UPDATE ON mythology
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenes_updated_at
    BEFORE UPDATE ON scenes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.2 Update sovereignty score on quest completion
-- =====================================================
CREATE OR REPLACE FUNCTION update_sovereignty_score()
RETURNS TRIGGER AS $$
DECLARE
    v_reward INTEGER;
    v_residual_bonus DECIMAL;
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        SELECT sovereignty_reward, residual_multiplier_bonus 
        INTO v_reward, v_residual_bonus
        FROM quests WHERE id = NEW.quest_id;
        
        UPDATE profiles 
        SET sovereignty_score = sovereignty_score + v_reward
        WHERE id = NEW.user_id;
        
        -- Apply residual multiplier bonus to user's future residuals
        IF v_residual_bonus IS NOT NULL AND v_residual_bonus > 1 THEN
            UPDATE user_financial 
            SET residual_multiplier = COALESCE(residual_multiplier, 1) * v_residual_bonus
            WHERE id = NEW.user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_sovereignty
    AFTER UPDATE ON user_quests
    FOR EACH ROW
    EXECUTE FUNCTION update_sovereignty_score();

-- =====================================================
-- 4.3 Create timeline entry on quest completion
-- =====================================================
CREATE OR REPLACE FUNCTION create_quest_timeline()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        INSERT INTO timelines (
            user_id, event_type, event_id, title, description, 
            significance_score, occurred_at
        )
        SELECT 
            NEW.user_id,
            'quest_completed',
            NEW.quest_id,
            q.title,
            q.description,
            10,
            NEW.completed_at
        FROM quests q
        WHERE q.id = NEW.quest_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_create_quest_timeline
    AFTER UPDATE ON user_quests
    FOR EACH ROW
    EXECUTE FUNCTION create_quest_timeline();

-- =====================================================
-- 4.4 Create timeline entry on badge earning
-- =====================================================
CREATE OR REPLACE FUNCTION create_badge_timeline()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO timelines (
        user_id, event_type, event_id, title, description, 
        significance_score, occurred_at
    )
    SELECT 
        NEW.user_id,
        'badge_earned',
        NEW.badge_id,
        b.name,
        b.description,
        CASE b.rarity
            WHEN 'common' THEN 5
            WHEN 'rare' THEN 15
            WHEN 'epic' THEN 30
            WHEN 'legendary' THEN 50
            WHEN 'mythic' THEN 100
        END,
        NEW.earned_at
    FROM badges b
    WHERE b.id = NEW.badge_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_create_badge_timeline
    AFTER INSERT ON user_badges
    FOR EACH ROW
    EXECUTE FUNCTION create_badge_timeline();

-- =====================================================
-- 4.5 Update path progress when lessons complete
-- =====================================================
CREATE OR REPLACE FUNCTION update_path_progress()
RETURNS TRIGGER AS $$
DECLARE
    v_total_lessons INTEGER;
    v_completed_lessons INTEGER;
    v_path_id UUID;
BEGIN
    -- Get the path this lesson belongs to
    SELECT path_id INTO v_path_id
    FROM path_lessons
    WHERE lesson_id = NEW.lesson_id;
    
    IF v_path_id IS NOT NULL AND NEW.status = 'completed' THEN
        -- Count total lessons in path
        SELECT COUNT(*) INTO v_total_lessons
        FROM path_lessons
        WHERE path_id = v_path_id;
        
        -- Count completed lessons by user in this path
        SELECT COUNT(*) INTO v_completed_lessons
        FROM progress p
        JOIN path_lessons pl ON pl.lesson_id = p.lesson_id
        WHERE p.user_id = NEW.user_id
        AND pl.path_id = v_path_id
        AND p.status = 'completed';
        
        -- Update path progress
        UPDATE progress
        SET 
            progress_percent = (v_completed_lessons * 100 / v_total_lessons),
            status = CASE 
                WHEN v_completed_lessons = v_total_lessons THEN 'completed'
                WHEN v_completed_lessons > 0 THEN 'in_progress'
                ELSE 'not_started'
            END,
            completed_at = CASE 
                WHEN v_completed_lessons = v_total_lessons THEN NOW()
                ELSE completed_at
            END
        WHERE user_id = NEW.user_id 
        AND path_id = v_path_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_path_progress
    AFTER UPDATE ON progress
    FOR EACH ROW
    WHEN (NEW.status = 'completed')
    EXECUTE FUNCTION update_path_progress();

-- =====================================================
-- 4.6 Auto-create life cycle phases
-- =====================================================
CREATE OR REPLACE FUNCTION create_life_cycle_phase()
RETURNS TRIGGER AS $$
BEGIN
    -- Create initial life cycle phase for new users
    INSERT INTO life_cycles (user_id, phase, started_at)
    VALUES (NEW.id, 'seedling', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_create_life_cycle_phase
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_life_cycle_phase();

-- =====================================================
-- 4.7 Update life cycle based on sovereignty score
-- =====================================================
CREATE OR REPLACE FUNCTION update_life_cycle_phase()
RETURNS TRIGGER AS $$
DECLARE
    v_current_phase life_cycle_phase;
    v_new_phase life_cycle_phase;
BEGIN
    -- Get current phase
    SELECT phase INTO v_current_phase
    FROM life_cycles
    WHERE user_id = NEW.id
    ORDER BY started_at DESC
    LIMIT 1;
    
    -- Determine new phase based on sovereignty score
    IF NEW.sovereignty_score >= 1000 THEN
        v_new_phase := 'renewal';
    ELSIF NEW.sovereignty_score >= 500 THEN
        v_new_phase := 'harvest';
    ELSIF NEW.sovereignty_score >= 250 THEN
        v_new_phase := 'bloom';
    ELSIF NEW.sovereignty_score >= 50 THEN
        v_new_phase := 'sprout';
    ELSE
        v_new_phase := 'seedling';
    END IF;
    
    -- If phase changed, end current and start new
    IF v_new_phase != v_current_phase THEN
        UPDATE life_cycles 
        SET ended_at = NOW()
        WHERE user_id = NEW.id AND ended_at IS NULL;
        
        INSERT INTO life_cycles (user_id, phase, started_at, trigger_event)
        VALUES (NEW.id, v_new_phase, NOW(), 'sovereignty_milestone');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_life_cycle_phase
    AFTER UPDATE OF sovereignty_score ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_life_cycle_phase();