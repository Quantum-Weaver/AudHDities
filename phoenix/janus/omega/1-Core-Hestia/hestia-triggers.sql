-- =====================================================
-- 4.1 AUTO-CREATE PROFILE ON SIGNUP
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        email,
        username,
        display_name,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', SPLIT_PART(NEW.email, '@', 1)),
        NOW(),
        NOW()
    );
    
    -- Also create community profile (always present)
    INSERT INTO public.community_profiles (id, username)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1))
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 4.2 UPDATE TIMESTAMP FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_private_updated_at
    BEFORE UPDATE ON user_private
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_financial_updated_at
    BEFORE UPDATE ON user_financial
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creator_profiles_updated_at
    BEFORE UPDATE ON creator_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_profiles_updated_at
    BEFORE UPDATE ON vendor_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_profiles_updated_at
    BEFORE UPDATE ON community_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_channels_updated_at
    BEFORE UPDATE ON channels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.3 UPDATE LAST_ACTIVE ON LOGIN
-- =====================================================
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles 
    SET last_active = NOW() 
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users login (requires auth schema access)
-- Note: This may need to be called from application layer instead
-- as triggers on auth.users require special permissions

-- =====================================================
-- 4.4 SYNC USERNAME TO EXTENDED PROFILES
-- =====================================================
CREATE OR REPLACE FUNCTION sync_username_to_extended()
RETURNS TRIGGER AS $$
BEGIN
    -- Sync to creator_profiles if exists
    UPDATE creator_profiles 
    SET username = NEW.username 
    WHERE id = NEW.id;
    
    -- Sync to vendor_profiles if exists
    UPDATE vendor_profiles 
    SET username = NEW.username 
    WHERE id = NEW.id;
    
    -- Sync to community_profiles
    UPDATE community_profiles 
    SET username = NEW.username 
    WHERE id = NEW.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on profiles username change
CREATE TRIGGER sync_username_on_profile_update
    AFTER UPDATE OF username ON profiles
    FOR EACH ROW
    WHEN (OLD.username IS DISTINCT FROM NEW.username)
    EXECUTE FUNCTION sync_username_to_extended();

-- =====================================================
-- 4.5 CREATE EXTENDED PROFILES ON DEMAND
-- =====================================================
-- Function to create creator profile when user applies
CREATE OR REPLACE FUNCTION create_creator_profile(
    p_user_id UUID,
    p_creator_moniker TEXT,
    p_creative_categories TEXT[] DEFAULT '{}',
    p_creative_description TEXT DEFAULT NULL,
    p_portfolio_url TEXT DEFAULT NULL,
    p_default_residual_pool INTEGER DEFAULT 30
)
RETURNS UUID AS $$
DECLARE
    v_username TEXT;
BEGIN
    -- Get username from profiles
    SELECT username INTO v_username FROM profiles WHERE id = p_user_id;
    
    INSERT INTO creator_profiles (
        id, username, creator_moniker, creative_categories,
        creative_description, portfolio_url, default_residual_pool,
        verification_status
    ) VALUES (
        p_user_id, v_username, p_creator_moniker, p_creative_categories,
        p_creative_description, p_portfolio_url, p_default_residual_pool,
        'pending'
    );
    
    -- Update profile role flag
    UPDATE profiles SET is_creator = TRUE WHERE id = p_user_id;
    
    RETURN p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create vendor profile when user applies
CREATE OR REPLACE FUNCTION create_vendor_profile(
    p_user_id UUID,
    p_business_name TEXT,
    p_business_type business_type DEFAULT NULL,
    p_business_description TEXT DEFAULT NULL,
    p_website_url TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_username TEXT;
BEGIN
    -- Get username from profiles
    SELECT username INTO v_username FROM profiles WHERE id = p_user_id;
    
    INSERT INTO vendor_profiles (
        id, username, business_name, business_type,
        business_description, website_url, verification_status
    ) VALUES (
        p_user_id, v_username, p_business_name, p_business_type,
        p_business_description, p_website_url, 'pending'
    );
    
    -- Update profile role flag
    UPDATE profiles SET is_vendor = TRUE WHERE id = p_user_id;
    
    RETURN p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;