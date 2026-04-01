-- =====================================================
-- 2.1 PRODUCTS
-- =====================================================
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    channel_id UUID REFERENCES channels(id) ON DELETE SET NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    product_type product_type NOT NULL,
    owner_type owner_type NOT NULL DEFAULT 'creator',
    price_community DECIMAL(10,2),
    price_ally DECIMAL(10,2),
    price_corporate DECIMAL(10,2),
    bigot_tax_cents INTEGER DEFAULT 0,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_interval recurring_interval,
    residual_pool_percent INTEGER DEFAULT 30 CHECK (residual_pool_percent BETWEEN 0 AND 100),
    sanctuary_infrastructure_percent INTEGER DEFAULT 10 CHECK (sanctuary_infrastructure_percent BETWEEN 0 AND 100),
    platform_fee_percent INTEGER GENERATED ALWAYS AS (residual_pool_percent + sanctuary_infrastructure_percent) STORED,
    is_published BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    media_urls TEXT[] DEFAULT '{}',
    download_url TEXT,
    stripe_product_id TEXT,
    stripe_price_id TEXT,
    category TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    collaborators UUID[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_price CHECK (
        (price_community IS NOT NULL) OR 
        (price_ally IS NOT NULL) OR 
        (price_corporate IS NOT NULL)
    )
);

-- =====================================================
-- 2.2 SALES
-- =====================================================
CREATE TABLE sales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    tier_applied user_tier NOT NULL,
    amount_cents INTEGER NOT NULL,
    gross_amount DECIMAL(10,2) NOT NULL,
    payment_processor_fee DECIMAL(10,2),
    net_amount DECIMAL(10,2) GENERATED ALWAYS AS (gross_amount - COALESCE(payment_processor_fee, 0)) STORED,
    platform_fee_cents INTEGER NOT NULL,
    creator_earnings_cents INTEGER NOT NULL,
    to_residual_pool DECIMAL(10,2),
    to_infrastructure DECIMAL(10,2),
    to_creator_immediate DECIMAL(10,2),
    nd_price_applied BOOLEAN DEFAULT FALSE,
    bigot_tax_applied BOOLEAN DEFAULT FALSE,
    payment_status payment_status DEFAULT 'pending',
    stripe_session_id TEXT,
    stripe_payment_intent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT positive_amount CHECK (amount_cents >= 0)
);

-- =====================================================
-- 2.3 CONTRIBUTIONS
-- =====================================================
CREATE TABLE contributions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    contributor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    contribution_type contribution_type NOT NULL,
    description TEXT,
    percent_share DECIMAL(5,2) NOT NULL CHECK (percent_share BETWEEN 0 AND 100),
    is_residual_eligible BOOLEAN DEFAULT TRUE,
    is_one_time BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, contributor_id, contribution_type)
);

-- =====================================================
-- 2.4 RESIDUAL_PAYOUTS
-- =====================================================
CREATE TABLE residual_payouts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE RESTRICT,
    contributor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    amount DECIMAL(10,2) NOT NULL,
    calculation_note TEXT,
    status payout_status DEFAULT 'pending',
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.5 SUBSCRIPTIONS
-- =====================================================
CREATE TABLE subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subscriber_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE RESTRICT,
    tier_applied TEXT NOT NULL CHECK (tier_applied IN ('community', 'ally')),
    monthly_amount DECIMAL(10,2) NOT NULL,
    status subscription_status DEFAULT 'active',
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.6 TRANSACTIONS
-- =====================================================
CREATE TABLE transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    transaction_type transaction_type NOT NULL,
    source_id UUID NOT NULL,
    from_id UUID REFERENCES profiles(id) ON DELETE RESTRICT,
    to_id UUID REFERENCES profiles(id) ON DELETE RESTRICT,
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    status payment_status DEFAULT 'pending',
    stripe_transfer_id TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.7 COVENANT_POOL
-- =====================================================
CREATE TABLE covenant_pool (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    pledge_percent INTEGER NOT NULL CHECK (pledge_percent BETWEEN 0 AND 50),
    total_pledged_cents INTEGER DEFAULT 0,
    current_balance_cents INTEGER DEFAULT 0,
    last_distribution_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- =====================================================
-- 2.8 RESIDUAL_POOL
-- =====================================================
CREATE TABLE residual_pool (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE RESTRICT,
    total_amount_cents INTEGER NOT NULL,
    distributed_amount_cents INTEGER DEFAULT 0,
    remaining_amount_cents INTEGER GENERATED ALWAYS AS (total_amount_cents - distributed_amount_cents) STORED,
    distributed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.9 LEDGER (Public Immutable Record)
-- =====================================================
CREATE TABLE ledger (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    entry_type ledger_entry_type NOT NULL,
    reference_id UUID NOT NULL,
    description TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    from_entity ledger_entity NOT NULL,
    to_entity ledger_entity NOT NULL,
    from_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    to_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    public_note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.10 DISBURSEMENTS
-- =====================================================
CREATE TABLE disbursements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source_pool source_pool_type NOT NULL,
    source_id UUID NOT NULL,
    total_amount_cents INTEGER NOT NULL,
    recipient_count INTEGER NOT NULL,
    status payout_status DEFAULT 'pending',
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.11 PAYOUTS
-- =====================================================
CREATE TABLE payouts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    disbursement_id UUID NOT NULL REFERENCES disbursements(id) ON DELETE CASCADE,
    recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    amount_cents INTEGER NOT NULL,
    payout_method payout_method NOT NULL,
    destination TEXT,
    status payout_status DEFAULT 'pending',
    stripe_transfer_id TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.12 ADVERTISING
-- =====================================================
CREATE TABLE advertising (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    advertiser_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    campaign_name TEXT NOT NULL,
    budget_cents INTEGER NOT NULL,
    spent_cents INTEGER DEFAULT 0,
    bid_type bid_type NOT NULL,
    bid_amount_cents INTEGER NOT NULL,
    targeting_criteria JSONB DEFAULT '{}',
    user_share_percent INTEGER DEFAULT 50 CHECK (user_share_percent BETWEEN 0 AND 100),
    status campaign_status DEFAULT 'draft',
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);