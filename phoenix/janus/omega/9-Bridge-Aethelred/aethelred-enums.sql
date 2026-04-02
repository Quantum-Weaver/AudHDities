-- =====================================================
-- ENUMS for All-Connecting Layer
-- =====================================================

-- Supabase connection status
CREATE TYPE supabase_status AS ENUM (
    'connected',
    'degraded',
    'disconnected'
);

-- Stripe mode
CREATE TYPE stripe_mode AS ENUM (
    'test',
    'live'
);

-- Stripe webhook status
CREATE TYPE webhook_status AS ENUM (
    'active',
    'failed',
    'disabled'
);

-- Resend delivery status
CREATE TYPE delivery_status AS ENUM (
    'operational',
    'degraded',
    'failed'
);

-- Vercel deployment status
CREATE TYPE deployment_status AS ENUM (
    'success',
    'building',
    'failed'
);

-- GitHub workflow status
CREATE TYPE workflow_status AS ENUM (
    'passing',
    'failing',
    'pending'
);

-- AUDHDITIES environment
CREATE TYPE platform_environment AS ENUM (
    'development',
    'staging',
    'production'
);

-- AUDHDITIES platform status
CREATE TYPE platform_status AS ENUM (
    'operational',
    'degraded',
    'outage',
    'maintenance'
);

-- Bridge status for Aethelred house
CREATE TYPE bridge_status AS ENUM (
    'active',
    'dormant',
    'transforming'
);