-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_private ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_financial ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 PROFILES Policies
-- =====================================================
-- Public can view active profiles
CREATE POLICY "Public can view active profiles"
    ON profiles FOR SELECT
    USING (status = 'active');

-- Users can view their own full profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins have full access
CREATE POLICY "Admins have full access"
    ON profiles FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 USER_PRIVATE Policies (Highly Restricted)
-- =====================================================
-- Users can view their own private data
CREATE POLICY "Users can view own private data"
    ON user_private FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own private data
CREATE POLICY "Users can update own private data"
    ON user_private FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins have full access
CREATE POLICY "Admins have full access to private data"
    ON user_private FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 USER_FINANCIAL Policies (Highly Restricted)
-- =====================================================
-- Users can view their own financial data
CREATE POLICY "Users can view own financial data"
    ON user_financial FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own financial data
CREATE POLICY "Users can update own financial data"
    ON user_financial FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins have full access
CREATE POLICY "Admins have full access to financial data"
    ON user_financial FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.5 CREATOR_PROFILES Policies
-- =====================================================
-- Public can view creator profiles
CREATE POLICY "Public can view creator profiles"
    ON creator_profiles FOR SELECT
    USING (true);

-- Creators can update their own profile
CREATE POLICY "Creators can update own profile"
    ON creator_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Admins have full access
CREATE POLICY "Admins have full access to creator profiles"
    ON creator_profiles FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 VENDOR_PROFILES Policies
-- =====================================================
-- Public can view vendor profiles
CREATE POLICY "Public can view vendor profiles"
    ON vendor_profiles FOR SELECT
    USING (true);

-- Vendors can update their own profile
CREATE POLICY "Vendors can update own profile"
    ON vendor_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Admins have full access
CREATE POLICY "Admins have full access to vendor profiles"
    ON vendor_profiles FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 COMMUNITY_PROFILES Policies
-- =====================================================
-- Public can view community profiles
CREATE POLICY "Public can view community profiles"
    ON community_profiles FOR SELECT
    USING (true);

-- Users can update their own community profile
CREATE POLICY "Users can update own community profile"
    ON community_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Admins have full access
CREATE POLICY "Admins have full access to community profiles"
    ON community_profiles FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.8 CHANNELS Policies
-- =====================================================
-- Public can view channels
CREATE POLICY "Public can view channels"
    ON channels FOR SELECT
    USING (true);

-- Owners can update their channels
CREATE POLICY "Owners can update own channels"
    ON channels FOR UPDATE
    USING (auth.uid() = owner_id);

-- Owners can insert channels
CREATE POLICY "Owners can create channels"
    ON channels FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Owners can delete their channels
CREATE POLICY "Owners can delete own channels"
    ON channels FOR DELETE
    USING (auth.uid() = owner_id);

-- Admins have full access
CREATE POLICY "Admins have full access to channels"
    ON channels FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));