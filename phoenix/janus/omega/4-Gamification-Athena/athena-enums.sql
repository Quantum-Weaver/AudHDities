-- =====================================================
-- ENUMS for Gamification
-- =====================================================

-- Quest submission types
CREATE TYPE submission_type AS ENUM (
    'text',
    'image',
    'file',
    'audio',
    'video',
    'link',
    'auto'
);

-- Quest status
CREATE TYPE quest_status AS ENUM (
    'locked',
    'available',
    'in_progress',
    'completed',
    'mastered'
);

-- Badge rarity levels
CREATE TYPE badge_rarity AS ENUM (
    'common',
    'rare',
    'epic',
    'legendary',
    'mythic'
);

-- Badge tiers for house progression
CREATE TYPE badge_tier AS ENUM (
    'initiate',
    'adept',
    'master'
);

-- Lesson content types
CREATE TYPE lesson_content_type AS ENUM (
    'text',
    'video',
    'audio',
    'interactive',
    'quiz',
    'exercise'
);

-- Learning path difficulty
CREATE TYPE difficulty_level AS ENUM (
    'beginner',
    'intermediate',
    'advanced',
    'master'
);

-- Progress status
CREATE TYPE progress_status AS ENUM (
    'not_started',
    'in_progress',
    'completed',
    'mastered'
);

-- Life cycle phases (the seasons of being)
CREATE TYPE life_cycle_phase AS ENUM (
    'seedling',    -- New, exploring
    'sprout',      -- Growing, learning
    'bloom',       -- Contributing, creating
    'harvest',     -- Mentoring, leading
    'dormant',     -- Resting, integrating
    'renewal'      -- Returning, transformed
);

-- Mythology types
CREATE TYPE myth_type AS ENUM (
    'origin',
    'parable',
    'ritual',
    'prophecy',
    'chronicle'
);

-- Timeline event types
CREATE TYPE timeline_event_type AS ENUM (
    'quest_completed',
    'badge_earned',
    'path_completed',
    'milestone_reached',
    'house_joined',
    'ritual_performed',
    'scene_witnessed'
);

-- Scene types
CREATE TYPE scene_type AS ENUM (
    'ritual',
    'ceremony',
    'celebration',
    'initiation',
    'council',
    'vision_quest'
);