-- =====================================================
-- 4.1 Update timestamp function
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contributions_updated_at
    BEFORE UPDATE ON contributions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_covenant_pool_updated_at
    BEFORE UPDATE ON covenant_pool
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_residual_pool_updated_at
    BEFORE UPDATE ON residual_pool
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_advertising_updated_at
    BEFORE UPDATE ON advertising
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.2 Calculate sale splits on insert
-- =====================================================
CREATE OR REPLACE FUNCTION calculate_sale_splits()
RETURNS TRIGGER AS $$
DECLARE
    v_residual_percent INTEGER;
    v_infra_percent INTEGER;
    v_net DECIMAL;
BEGIN
    -- Get product config
    SELECT residual_pool_percent, sanctuary_infrastructure_percent 
    INTO v_residual_percent, v_infra_percent
    FROM products WHERE id = NEW.product_id;
    
    v_net := NEW.gross_amount - COALESCE(NEW.payment_processor_fee, 0);
    
    NEW.net_amount := v_net;
    NEW.to_residual_pool := v_net * (v_residual_percent / 100.0);
    NEW.to_infrastructure := v_net * (v_infra_percent / 100.0);
    NEW.to_creator_immediate := v_net - NEW.to_residual_pool - NEW.to_infrastructure;
    NEW.platform_fee_cents := (NEW.to_infrastructure + NEW.to_residual_pool) * 100;
    NEW.creator_earnings_cents := NEW.to_creator_immediate * 100;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_calculate_sale_splits
    BEFORE INSERT ON sales
    FOR EACH ROW
    EXECUTE FUNCTION calculate_sale_splits();

-- =====================================================
-- 4.3 Generate residual payouts on sale completion
-- =====================================================
CREATE OR REPLACE FUNCTION generate_residual_payouts()
RETURNS TRIGGER AS $$
DECLARE
    contrib RECORD;
    v_pool_amount DECIMAL;
    v_total_share DECIMAL;
BEGIN
    IF NEW.payment_status = 'completed' THEN
        v_pool_amount := NEW.to_residual_pool;
        
        -- Get total percentage shares for this product
        SELECT COALESCE(SUM(percent_share), 0) 
        INTO v_total_share
        FROM contributions 
        WHERE product_id = NEW.product_id 
        AND is_residual_eligible = true;
        
        -- Generate payouts for each contributor
        FOR contrib IN 
            SELECT contributor_id, percent_share 
            FROM contributions 
            WHERE product_id = NEW.product_id 
            AND is_residual_eligible = true
        LOOP
            INSERT INTO residual_payouts (
                sale_id,
                contributor_id,
                product_id,
                amount,
                status,
                calculation_note
            ) VALUES (
                NEW.id,
                contrib.contributor_id,
                NEW.product_id,
                v_pool_amount * (contrib.percent_share / 100.0),
                'pending',
                contrib.percent_share || '% share of ' || v_pool_amount || ' residual pool'
            );
        END LOOP;
        
        -- Add to residual pool table
        INSERT INTO residual_pool (product_id, sale_id, total_amount_cents)
        VALUES (NEW.product_id, NEW.id, v_pool_amount * 100);
        
        -- Add to ledger
        INSERT INTO ledger (
            entry_type, reference_id, description, amount_cents,
            from_entity, to_entity, from_profile_id, to_profile_id, public_note
        ) VALUES (
            'sale', NEW.id, 'Sale of product', NEW.amount_cents,
            'buyer', 'platform', NEW.buyer_id, NULL, 'Product purchase'
        );
        
        INSERT INTO ledger (
            entry_type, reference_id, description, amount_cents,
            from_entity, to_entity, from_profile_id, to_profile_id, public_note
        ) VALUES (
            'platform_fee', NEW.id, 'Platform infrastructure fee', NEW.platform_fee_cents,
            'platform', 'platform', NULL, NULL, 'Platform operations'
        );
        
        INSERT INTO ledger (
            entry_type, reference_id, description, amount_cents,
            from_entity, to_entity, from_profile_id, to_profile_id, public_note
        ) VALUES (
            'platform_fee', NEW.id, 'Residual pool', NEW.to_residual_pool * 100,
            'platform', 'contributor', NULL, NULL, 'Contributor pool'
        );
        
        INSERT INTO ledger (
            entry_type, reference_id, description, amount_cents,
            from_entity, to_entity, from_profile_id, to_profile_id, public_note
        ) VALUES (
            'sale', NEW.id, 'Creator earnings', NEW.creator_earnings_cents,
            'platform', 'creator', NULL, NEW.product_creator_id, 'Creator payment'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_generate_residual_payouts
    AFTER UPDATE OF payment_status ON sales
    FOR EACH ROW
    WHEN (NEW.payment_status = 'completed')
    EXECUTE FUNCTION generate_residual_payouts();

-- =====================================================
-- 4.4 Update creator/vendor stats on sale
-- =====================================================
CREATE OR REPLACE FUNCTION update_creator_stats()
RETURNS TRIGGER AS $$
DECLARE
    v_owner_type TEXT;
    v_creator_id UUID;
BEGIN
    -- Get product owner info
    SELECT owner_type, creator_id INTO v_owner_type, v_creator_id
    FROM products WHERE id = NEW.product_id;
    
    IF v_owner_type = 'creator' THEN
        UPDATE creator_profiles 
        SET 
            total_sales = total_sales + 1,
            total_earnings = total_earnings + (NEW.creator_earnings_cents / 100.0)
        WHERE id = v_creator_id;
    ELSE
        UPDATE vendor_profiles 
        SET 
            total_sales = total_sales + 1,
            total_earnings = total_earnings + (NEW.creator_earnings_cents / 100.0)
        WHERE id = v_creator_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_creator_stats
    AFTER INSERT ON sales
    FOR EACH ROW
    WHEN (NEW.payment_status = 'completed')
    EXECUTE FUNCTION update_creator_stats();

-- =====================================================
-- 4.5 Auto-create covenant pool on profile creation
-- =====================================================
CREATE OR REPLACE FUNCTION create_covenant_pool()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO covenant_pool (user_id, pledge_percent)
    VALUES (NEW.id, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_create_covenant_pool
    AFTER INSERT ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION create_covenant_pool();

-- =====================================================
-- 4.6 Update product count on creator/vendor profiles
-- =====================================================
CREATE OR REPLACE FUNCTION update_product_count()
RETURNS TRIGGER AS $$
DECLARE
    v_owner_type TEXT;
BEGIN
    SELECT owner_type INTO v_owner_type FROM products WHERE id = NEW.product_id;
    
    IF TG_OP = 'INSERT' THEN
        IF v_owner_type = 'creator' THEN
            UPDATE creator_profiles 
            SET total_products = total_products + 1 
            WHERE id = NEW.creator_id;
        ELSE
            UPDATE vendor_profiles 
            SET total_products = total_products + 1 
            WHERE id = NEW.creator_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF v_owner_type = 'creator' THEN
            UPDATE creator_profiles 
            SET total_products = total_products - 1 
            WHERE id = OLD.creator_id;
        ELSE
            UPDATE vendor_profiles 
            SET total_products = total_products - 1 
            WHERE id = OLD.creator_id;
        END IF;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_product_count_insert
    AFTER INSERT ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_product_count();

CREATE TRIGGER tr_update_product_count_delete
    AFTER DELETE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_product_count();