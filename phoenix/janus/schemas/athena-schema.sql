-- =====================================================
-- 2.1 QUESTS
-- =====================================================
CREATE TABLE quests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    house council_house NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT,
    submission_type submission_type NOT NULL DEFAULT 'text',
    required_sovereignty_score INTEGER DEFAULT 0,
    prerequisite_quest_id UUID REFERENCES quests(id) ON DELETE SET NULL,
    sovereignty_reward INTEGER DEFAULT 10,
    residual_multiplier_bonus DECIMAL(3,2),
    order_index INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.2 USER_QUESTS
-- =====================================================
CREATE TABLE user_quests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    status quest_status DEFAULT 'locked',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    submitted_content TEXT,
    submission_metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, quest_id)
);

-- =====================================================
-- 2.3 BADGES
-- =====================================================
CREATE TABLE badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    badge_type badge_type NOT NULL,
    description TEXT NOT NULL,
    house council_house,
    tier badge_tier,
    icon TEXT,
    color TEXT,
    rarity badge_rarity NOT NULL DEFAULT 'common',
    earn_condition JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.4 USER_BADGES
-- =====================================================
CREATE TABLE user_badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_reason TEXT,
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    display_on_profile BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- =====================================================
-- 2.5 LESSONS
-- =====================================================
CREATE TABLE lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    content_type lesson_content_type NOT NULL DEFAULT 'text',
    content_url TEXT,
    content_body TEXT,
    duration_minutes INTEGER,
    order_index INTEGER,
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.6 LEARNING_PATHS
-- =====================================================
CREATE TABLE learning_paths (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    house council_house,
    difficulty difficulty_level NOT NULL DEFAULT 'beginner',
    estimated_duration_hours INTEGER,
    prerequisite_path_id UUID REFERENCES learning_paths(id) ON DELETE SET NULL,
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    is_published BOOLEAN DEFAULT FALSE,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.7 PATH_LESSONS (Junction Table)
-- =====================================================
CREATE TABLE path_lessons (
    path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (path_id, lesson_id)
);

-- =====================================================
-- 2.8 PROGRESS
-- =====================================================
CREATE TABLE progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    path_id UUID REFERENCES learning_paths(id) ON DELETE SET NULL,
    lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
    status progress_status NOT NULL DEFAULT 'not_started',
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    started_at TIMESTAMPTZ,
    last_activity_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    score INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT progress_target_check CHECK (
        (path_id IS NOT NULL) OR (lesson_id IS NOT NULL)
    ),
    UNIQUE(user_id, path_id, lesson_id)
);

-- =====================================================
-- 2.9 LIFE_CYCLES
-- =====================================================
CREATE TABLE life_cycles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    phase life_cycle_phase NOT NULL,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    trigger_event TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.10 MYTHOLOGY
-- =====================================================
CREATE TABLE mythology (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    house council_house,
    type myth_type NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    is_published BOOLEAN DEFAULT FALSE,
    order_index INTEGER,
    series_id UUID REFERENCES mythology(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.11 TIMELINES
-- =====================================================
CREATE TABLE timelines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    event_type timeline_event_type NOT NULL,
    event_id UUID,
    title TEXT NOT NULL,
    description TEXT,
    significance_score INTEGER CHECK (significance_score BETWEEN 1 AND 100),
    occurred_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.12 SCENES
-- =====================================================
CREATE TABLE scenes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type scene_type NOT NULL,
    house council_house,
    mythology_id UUID REFERENCES mythology(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    instructions TEXT,
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    is_active BOOLEAN DEFAULT TRUE,
    scheduled_for TIMESTAMPTZ,
    participant_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.13 SCENE_PARTICIPANTS
-- =====================================================
CREATE TABLE scene_participants (
    scene_id UUID NOT NULL REFERENCES scenes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (scene_id, user_id)
);