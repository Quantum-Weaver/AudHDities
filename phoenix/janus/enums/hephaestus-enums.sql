-- =====================================================
-- ENUMS for Infrastructure & Tools
-- =====================================================

-- Setting scope types
CREATE TYPE setting_scope AS ENUM (
    'global',
    'user',
    'role',
    'house'
);

-- Job scheduling types
CREATE TYPE job_type AS ENUM (
    'cron',
    'one_time',
    'interval'
);

-- Job status
CREATE TYPE job_status AS ENUM (
    'active',
    'paused',
    'completed',
    'failed'
);

-- Calendar event types
CREATE TYPE calendar_event_type AS ENUM (
    'holiday',
    'ritual',
    'milestone',
    'maintenance',
    'release'
);

-- Calendar visibility
CREATE TYPE calendar_visibility AS ENUM (
    'public',
    'house',
    'admin'
);

-- Analytics event categories
CREATE TYPE analytics_category AS ENUM (
    'page_view',
    'user_action',
    'system',
    'error',
    'performance'
);

-- Maintenance types
CREATE TYPE maintenance_type AS ENUM (
    'upgrade',
    'backup',
    'repair',
    'cleanup',
    'migration'
);

-- Maintenance status
CREATE TYPE maintenance_status AS ENUM (
    'scheduled',
    'in_progress',
    'completed',
    'failed',
    'cancelled'
);

-- System types
CREATE TYPE system_type AS ENUM (
    'database',
    'api',
    'storage',
    'auth',
    'queue',
    'cache'
);

-- System status
CREATE TYPE system_status AS ENUM (
    'operational',
    'degraded',
    'outage',
    'maintenance'
);

-- Script types
CREATE TYPE script_type AS ENUM (
    'deploy',
    'seed',
    'migration',
    'cleanup',
    'backup',
    'test'
);

-- Protocol types
CREATE TYPE protocol_type AS ENUM (
    'security',
    'incident',
    'escalation',
    'onboarding',
    'offboarding',
    'emergency'
);