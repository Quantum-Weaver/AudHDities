-- =====================================================
-- 2.1 CONTINENTS
-- =====================================================
CREATE TABLE continents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE CHECK (code IN ('AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA')),
    name TEXT NOT NULL,
    name_localized JSONB DEFAULT '{}',
    population_estimate BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.2 REGIONS
-- =====================================================
CREATE TABLE regions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    continent_id UUID NOT NULL REFERENCES continents(id) ON DELETE RESTRICT,
    country_code TEXT NOT NULL UNIQUE,
    country_code_3 TEXT,
    name TEXT NOT NULL,
    name_localized JSONB DEFAULT '{}',
    flag_emoji TEXT,
    phone_code TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.3 LANGUAGES
-- =====================================================
CREATE TABLE languages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code TEXT NOT NULL UNIQUE CHECK (code ~ '^[a-z]{2,3}$'),
    code_3 TEXT,
    name TEXT NOT NULL,
    native_name TEXT,
    direction text_direction_type DEFAULT 'ltr',
    script TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.4 LOCALIZATION (Key-Value Translation Store)
-- =====================================================
CREATE TABLE localization (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_key TEXT NOT NULL,
    language_code TEXT NOT NULL REFERENCES languages(code) ON DELETE RESTRICT,
    translation TEXT NOT NULL,
    context TEXT,
    plural_form INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(resource_key, language_code, plural_form)
);

-- =====================================================
-- 2.5 CULTURALIZATION
-- =====================================================
CREATE TABLE culturalization (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
    date_format date_format_type DEFAULT 'YYYY-MM-DD',
    time_format time_format_type DEFAULT '12h',
    first_day_of_week INTEGER DEFAULT 0 CHECK (first_day_of_week BETWEEN 0 AND 6),
    currency_code TEXT DEFAULT 'USD',
    currency_symbol TEXT DEFAULT '$',
    currency_position currency_position_type DEFAULT 'before',
    decimal_separator TEXT DEFAULT '.',
    thousands_separator TEXT DEFAULT ',',
    measurement_system measurement_system_type DEFAULT 'metric',
    timezone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(region_id)
);

-- =====================================================
-- 2.6 TRANSLATIONS (Dynamic Content Translation)
-- =====================================================
CREATE TABLE translations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    language_id UUID NOT NULL REFERENCES languages(id) ON DELETE RESTRICT,
    translatable_type translatable_type NOT NULL,
    translatable_id UUID NOT NULL,
    field_name TEXT NOT NULL,
    translation TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    translator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(language_id, translatable_type, translatable_id, field_name)
);

-- =====================================================
-- 2.7 PERSONAS
-- =====================================================
CREATE TABLE personas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    characteristics JSONB DEFAULT '{}',
    avatar_url TEXT,
    color TEXT,
    created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.8 CUSTOMS
-- =====================================================
CREATE TABLE customs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category custom_category_type NOT NULL,
    description TEXT NOT NULL,
    region_id UUID REFERENCES regions(id) ON DELETE SET NULL,
    persona_id UUID REFERENCES personas(id) ON DELETE SET NULL,
    guidance TEXT,
    is_sensitive BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.9 CONTACT_SUBMISSIONS
-- =====================================================
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status contact_status DEFAULT 'new',
    direction contact_direction DEFAULT 'inbound',
    parent_id UUID REFERENCES contact_submissions(id) ON DELETE SET NULL,
    thread_id UUID DEFAULT gen_random_uuid(),
    message_id TEXT,
    notes TEXT,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for contact submissions
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_assigned ON contact_submissions(assigned_to);
CREATE INDEX idx_contact_submissions_thread ON contact_submissions(thread_id);

-- =====================================================
-- 2.10 EMAIL_COMMUNICATIONS
-- =====================================================
CREATE TABLE email_communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recipient_email TEXT NOT NULL,
    recipient_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    template_id TEXT,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    status email_status DEFAULT 'queued',
    provider_message_id TEXT,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for email communications
CREATE INDEX idx_email_communications_recipient ON email_communications(recipient_id);
CREATE INDEX idx_email_communications_status ON email_communications(status);
CREATE INDEX idx_email_communications_created ON email_communications(created_at DESC);

-- =====================================================
-- 2.11 SURVEYS
-- =====================================================
CREATE TABLE surveys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    questions JSONB NOT NULL,
    target_audience survey_audience_type DEFAULT 'all',
    target_house council_house,
    starts_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    response_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for surveys
CREATE INDEX idx_surveys_active ON surveys(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_surveys_target ON surveys(target_audience);

-- =====================================================
-- 2.12 SURVEY_RESPONSES
-- =====================================================
CREATE TABLE survey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    survey_id UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    duration_seconds INTEGER,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(survey_id, user_id)
);

-- Indexes for survey responses
CREATE INDEX idx_survey_responses_survey ON survey_responses(survey_id);
CREATE INDEX idx_survey_responses_user ON survey_responses(user_id);