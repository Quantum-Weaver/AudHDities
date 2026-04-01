-- =====================================================
-- ENUMS for Communications
-- =====================================================

-- Contact submission status
CREATE TYPE contact_status AS ENUM (
    'new',
    'read',
    'replied',
    'resolved',
    'spam'
);

-- Contact direction
CREATE TYPE contact_direction AS ENUM (
    'inbound',
    'outbound'
);

-- Email status
CREATE TYPE email_status AS ENUM (
    'queued',
    'sent',
    'delivered',
    'opened',
    'clicked',
    'bounced',
    'failed'
);

-- Date format
CREATE TYPE date_format_type AS ENUM (
    'YYYY-MM-DD',
    'MM/DD/YYYY',
    'DD/MM/YYYY'
);

-- Time format
CREATE TYPE time_format_type AS ENUM (
    '12h',
    '24h'
);

-- Currency position
CREATE TYPE currency_position_type AS ENUM (
    'before',
    'after'
);

-- Measurement system
CREATE TYPE measurement_system_type AS ENUM (
    'metric',
    'imperial',
    'us_customary'
);

-- Text direction
CREATE TYPE text_direction_type AS ENUM (
    'ltr',
    'rtl'
);

-- Translatable content types
CREATE TYPE translatable_type AS ENUM (
    'post',
    'product',
    'quest',
    'myth',
    'lesson',
    'page'
);

-- Custom categories
CREATE TYPE custom_category_type AS ENUM (
    'greeting',
    'communication',
    'gift',
    'taboo',
    'celebration',
    'business',
    'family'
);

-- Survey audience targets
CREATE TYPE survey_audience_type AS ENUM (
    'all',
    'creators',
    'vendors',
    'subscribers',
    'council'
);