-- =====================================================
-- ENUMS for Social Engagement
-- =====================================================

-- Content type for posts
CREATE TYPE content_type AS ENUM ('text', 'image', 'audio', 'video', 'mixed');

-- Post visibility levels
CREATE TYPE post_visibility AS ENUM (
    'public',
    'subscribers',
    'tier_community',
    'tier_ally',
    'tier_corporate',
    'private'
);

-- Reaction types
CREATE TYPE reaction_type AS ENUM (
    'resonate',    -- Deep connection
    'support',     -- Solidarity
    'appreciate',  -- Gratitude
    'empathy',     -- Shared feeling
    'celebrate'    -- Joy
);

-- Action types for activity feed
CREATE TYPE action_type AS ENUM (
    'post',
    'comment',
    'reaction',
    'emerald',
    'follow',
    'subscribe',
    'purchase',
    'join_house',
    'complete_quest',
    'earn_badge'
);

-- Target types for activity feed
CREATE TYPE target_type AS ENUM (
    'post',
    'comment',
    'product',
    'user',
    'channel',
    'quest',
    'badge'
);

-- Activity visibility
CREATE TYPE activity_visibility AS ENUM ('public', 'followers', 'private');

-- Emerald status
CREATE TYPE emerald_status AS ENUM ('active', 'refunded', 'failed');

-- Notification types
CREATE TYPE notification_type AS ENUM (
    'comment_reply',
    'emerald_received',
    'subscription_renewal',
    'product_purchased',
    'application_approved',
    'application_rejected',
    'report_resolved',
    'report_rejected',
    'system_announcement',
    'quest_completed',
    'badge_earned',
    'house_promotion',
    'mentor_assigned'
);

-- Message status (for tracking)
CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read', 'deleted');