-- =====================================================
-- ENUMS for Core Identity
-- =====================================================

-- User tier levels
CREATE TYPE user_tier AS ENUM (
    'community',    -- Free/Subsidized
    'ally',         -- Full Price
    'corporate',    -- Premium
    'council'       -- Core Team
);

-- User status
CREATE TYPE user_status AS ENUM (
    'active',
    'suspended',
    'deleted'
);

-- Council houses
CREATE TYPE council_house AS ENUM (
    'hearth_keeper',
    'chancellor',
    'seer',
    'aethelred',
    'curator',
    'archivist',
    'skald',
    'codex',
    'executioner'
);

-- Payout methods
CREATE TYPE payout_method AS ENUM (
    'stripe',
    'paypal',
    'bank',
    'crypto'
);

-- Payout frequency
CREATE TYPE payout_frequency AS ENUM (
    'weekly',
    'monthly',
    'quarterly'
);

-- Verification status
CREATE TYPE verification_status AS ENUM (
    'pending',
    'verified',
    'rejected',
    'suspended'
);

-- Business types for vendors
CREATE TYPE business_type AS ENUM (
    'sole_proprietor',
    'llc',
    'nonprofit',
    'cooperative',
    'partnership',
    'other'
);

-- Communication styles
CREATE TYPE communication_style AS ENUM (
    'direct',
    'gentle',
    'detailed',
    'concise'
);

-- Content ratings
CREATE TYPE content_rating AS ENUM (
    'general',
    'mature',
    'triggering',
    'explicit'
);