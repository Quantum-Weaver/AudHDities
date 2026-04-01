-- =====================================================
-- 2.1 PROFILES (Core Public Identity)
-- =====================================================
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    bio TEXT,
    status user_status DEFAULT 'active',
    last_active TIMESTAMPTZ,
    
    -- Role flags
    is_creator BOOLEAN DEFAULT FALSE,
    is_vendor BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    is_quantum_weaver BOOLEAN DEFAULT FALSE,
    
    -- Tier and council
    user_tier user_tier DEFAULT 'community',
    primary_house council_house,
    sovereignty_score INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.2 USER_PRIVATE (Sensitive Data - Separate Table)
-- =====================================================
CREATE TABLE user_private (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    legal_name TEXT,
    date_of_birth DATE,
    phone_number TEXT,
    address JSONB,
    government_id TEXT,
    emergency_contact JSONB,
    crisis_plan TEXT,
    notes TEXT,  -- Admin-only internal notes
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.3 USER_FINANCIAL (Payment Methods)
-- =====================================================
CREATE TABLE user_financial (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    default_payout_method payout_method DEFAULT 'stripe',
    stripe_account_id TEXT,
    paypal_email TEXT,
    bank_account_last4 TEXT,
    bank_account_type TEXT,
    bank_routing_last4 TEXT,
    crypto_addresses JSONB DEFAULT '{}',
    minimum_payout DECIMAL(10,2) DEFAULT 10.00,
    payout_frequency payout_frequency DEFAULT 'monthly',
    residual_pledge_percent INTEGER DEFAULT 0 CHECK (residual_pledge_percent BETWEEN 0 AND 50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.4 CREATOR_PROFILES
-- =====================================================
CREATE TABLE creator_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    username TEXT,
    creator_moniker TEXT NOT NULL,
    creative_categories TEXT[] DEFAULT '{}',
    creative_description TEXT,
    portfolio_url TEXT,
    creator_logo_url TEXT,
    default_residual_pool INTEGER DEFAULT 30,
    total_products INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0,
    verification_status verification_status DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES profiles(id),
    verified_badge BOOLEAN DEFAULT FALSE,
    stripe_account_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.5 VENDOR_PROFILES
-- =====================================================
CREATE TABLE vendor_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    username TEXT,
    business_name TEXT NOT NULL,
    business_type business_type,
    business_description TEXT,
    product_categories TEXT[] DEFAULT '{}',
    business_logo_url TEXT,
    website_url TEXT,
    total_products INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_earnings DECIMAL(10,2) DEFAULT 0,
    verification_status verification_status DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES profiles(id),
    verified_badge BOOLEAN DEFAULT FALSE,
    stripe_account_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.6 COMMUNITY_PROFILES
-- =====================================================
CREATE TABLE community_profiles (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    username TEXT,
    nd_identity TEXT[] DEFAULT '{}',
    sensory_accommodations TEXT[] DEFAULT '{}',
    support_needs TEXT[] DEFAULT '{}',
    communication_style communication_style DEFAULT 'direct',
    joined_house council_house,
    house_initiate BOOLEAN DEFAULT FALSE,
    house_adept BOOLEAN DEFAULT FALSE,
    house_master BOOLEAN DEFAULT FALSE,
    house_joined_at TIMESTAMPTZ,
    is_mentor BOOLEAN DEFAULT FALSE,
    mentor_since TIMESTAMPTZ,
    mentee_count INTEGER DEFAULT 0,
    peer_endorsements INTEGER DEFAULT 0,
    crisis_contact_name TEXT,
    crisis_contact_phone TEXT,
    crisis_contact_email TEXT,
    crisis_instructions TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.7 CHANNELS
-- =====================================================
CREATE TABLE channels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    handle TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT,
    avatar_url TEXT,
    banner_url TEXT,
    allow_subscriptions BOOLEAN DEFAULT FALSE,
    subscription_price_community DECIMAL(10,2),
    subscription_price_ally DECIMAL(10,2),
    subscriber_count INTEGER DEFAULT 0,
    total_emeralds INTEGER DEFAULT 0,
    content_rating content_rating DEFAULT 'general',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);