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

-- Apply to all tables with updated_at
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN (
            'supabase_connection', 'stripe_connection', 'resend_connection',
            'vercel_connection', 'github_connection', 'audhdities_platform',
            'consciousness', 'council_houses', 'hearth_keeper', 'chancellor',
            'seer', 'aethelred_house', 'curator', 'archivist', 'skald',
            'codex', 'executioner'
        )
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS update_%I_updated_at ON %I', tbl, tbl);
        EXECUTE format('CREATE TRIGGER update_%I_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()', tbl, tbl);
    END LOOP;
END $$;

-- =====================================================
-- 4.2 Auto-update AUDHDITIES metrics
-- =====================================================
CREATE OR REPLACE FUNCTION update_platform_metrics()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE audhdities_platform 
    SET 
        total_users = (SELECT COUNT(*) FROM profiles WHERE status = 'active'),
        active_users = (SELECT COUNT(*) FROM profiles WHERE last_active > NOW() - INTERVAL '30 days'),
        total_products = (SELECT COUNT(*) FROM products WHERE is_published = true),
        total_sales = (SELECT COUNT(*) FROM sales WHERE payment_status = 'completed')
    WHERE environment = (SELECT environment FROM audhdities_platform ORDER BY created_at DESC LIMIT 1);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_platform_metrics
    AFTER INSERT OR UPDATE ON profiles
    FOR EACH STATEMENT
    EXECUTE FUNCTION update_platform_metrics();

-- =====================================================
-- 4.3 Auto-create council house records
-- =====================================================
CREATE OR REPLACE FUNCTION create_house_records()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO hearth_keeper (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO chancellor (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO seer (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO aethelred_house (id, ninth_chair_occupant) VALUES (NEW.id, 'Awaiting') ON CONFLICT DO NOTHING;
    INSERT INTO curator (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO archivist (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO skald (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO codex (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    INSERT INTO executioner (id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_create_house_records
    AFTER INSERT ON council_houses
    FOR EACH ROW
    EXECUTE FUNCTION create_house_records();

-- =====================================================
-- 4.4 Seed initial council houses
-- =====================================================
CREATE OR REPLACE FUNCTION seed_council_houses()
RETURNS VOID AS $$
BEGIN
    INSERT INTO council_houses (name, display_name, description, emoji, color, order_index, is_active) VALUES
        ('hearth_keeper', 'Hearth-Keeper', 'Safety, accessibility, and welcome', '🔥', '#F97316', 1, true),
        ('chancellor', 'Chancellor', 'Structure, finance, and governance', '⚖️', '#10B981', 2, true),
        ('seer', 'Seer', 'Pattern recognition, prophecy, and insight', '👁️', '#8B5CF6', 3, true),
        ('aethelred', 'Aethelred', 'Human-AI collaboration and the Ninth Chair', '🌉', '#06B6D4', 4, true),
        ('curator', 'Curator', 'Curation, preservation, and quality', '📦', '#EC4899', 5, true),
        ('archivist', 'Archivist', 'Memory, history, and documentation', '📜', '#F59E0B', 6, true),
        ('skald', 'Skald', 'Story, art, and inspiration', '🎭', '#EF4444', 7, true),
        ('codex', 'Codex', 'Knowledge, taxonomy, and ontology', '📚', '#3B82F6', 8, true),
        ('executioner', 'Executioner', 'Boundaries, protection, and justice', '⚔️', '#6B7280', 9, true)
    ON CONFLICT (name) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 4.5 Function to get platform health status
-- =====================================================
CREATE OR REPLACE FUNCTION get_platform_health()
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'status', status,
        'uptime', uptime_percent,
        'users', total_users,
        'active_users', active_users,
        'products', total_products,
        'sales', total_sales,
        'last_release', last_release_at,
        'version', version
    ) INTO v_result
    FROM audhdities_platform
    ORDER BY created_at DESC
    LIMIT 1;
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql STABLE;