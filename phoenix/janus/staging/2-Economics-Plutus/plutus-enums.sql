-- =====================================================
-- ENUMS for Economic Engine
-- =====================================================

-- Product types
CREATE TYPE product_type AS ENUM (
    'digital_course',
    'digital_download',
    'digital_membership',
    'digital_subscription',
    'digital_bundle',
    'physical_product',
    'physical_handmade',
    'physical_manufactured',
    'physical_custom',
    'audio',
    'video',
    'podcast',
    'music',
    'livestream',
    'event_live',
    'event_virtual',
    'workshop',
    'class',
    'consultation',
    'service',
    'commission',
    'contract',
    'sponsorship',
    'mutual_aid',
    'crowdfunding',
    'tip',
    'donation',
    'clothing',
    'accessory',
    'fabric',
    'pattern',
    'bundle',
    'kit',
    'subscription_box'
);

-- Owner type
CREATE TYPE owner_type AS ENUM ('creator', 'vendor');

-- Payment status
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'refunded', 'failed');

-- Payout status
CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Transaction type
CREATE TYPE transaction_type AS ENUM ('sale', 'residual', 'disbursement', 'payout', 'refund');

-- Source pool type
CREATE TYPE source_pool_type AS ENUM ('residual', 'covenant', 'platform');

-- Entry type for ledger
CREATE TYPE ledger_entry_type AS ENUM ('sale', 'residual', 'platform_fee', 'payout');

-- Entity type for ledger
CREATE TYPE ledger_entity AS ENUM ('buyer', 'platform', 'creator', 'contributor');

-- Bid type for advertising
CREATE TYPE bid_type AS ENUM ('cpm', 'cpc', 'cpa');

-- Campaign status
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'paused', 'completed');

-- Contribution type (if not already created)
CREATE TYPE contribution_type AS ENUM (
    'concept',
    'code',
    'design',
    'content',
    'testing',
    'promotion',
    'infrastructure'
);

-- Recurring interval
CREATE TYPE recurring_interval AS ENUM ('month', 'year');

-- Subscription status
CREATE TYPE subscription_status AS ENUM ('active', 'paused', 'cancelled', 'expired');