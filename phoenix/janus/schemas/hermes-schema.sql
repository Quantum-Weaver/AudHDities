-- =====================================================
-- 2.1 CREATIVE_CATEGORIES (Taxonomy)
-- =====================================================
CREATE TABLE creative_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES creative_categories(id) ON DELETE SET NULL,
    icon TEXT,
    color TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.2 POSTS
-- =====================================================
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    channel_id UUID REFERENCES channels(id) ON DELETE SET NULL,
    title TEXT,
    body TEXT,
    content_type content_type NOT NULL DEFAULT 'text',
    media_urls TEXT[] DEFAULT '{}',
    visibility post_visibility NOT NULL DEFAULT 'public',
    sovereignty_tags TEXT[] DEFAULT '{}',
    allow_tipping BOOLEAN DEFAULT TRUE,
    comment_count INTEGER DEFAULT 0,
    emerald_count INTEGER DEFAULT 0,
    resonance_count INTEGER DEFAULT 0,
    tips_received DECIMAL(10,2) DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_post_content CHECK (
        (title IS NOT NULL) OR (body IS NOT NULL) OR (array_length(media_urls, 1) > 0)
    )
);

-- =====================================================
-- 2.3 COMMENTS
-- =====================================================
CREATE TABLE comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.4 REPLIES
-- =====================================================
CREATE TABLE replies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT FALSE,
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2.5 REACTIONS
-- =====================================================
CREATE TABLE reactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    reply_id UUID REFERENCES replies(id) ON DELETE CASCADE,
    reaction_type reaction_type NOT NULL,
    weight INTEGER DEFAULT 1 CHECK (weight BETWEEN 1 AND 10),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT reaction_target_check CHECK (
        (post_id IS NOT NULL AND comment_id IS NULL AND reply_id IS NULL) OR
        (post_id IS NULL AND comment_id IS NOT NULL AND reply_id IS NULL) OR
        (post_id IS NULL AND comment_id IS NULL AND reply_id IS NOT NULL)
    ),
    CONSTRAINT unique_user_reaction UNIQUE (user_id, post_id, reaction_type) 
        WHERE post_id IS NOT NULL,
    CONSTRAINT unique_user_comment_reaction UNIQUE (user_id, comment_id, reaction_type)
        WHERE comment_id IS NOT NULL,
    CONSTRAINT unique_user_reply_reaction UNIQUE (user_id, reply_id, reaction_type)
        WHERE reply_id IS NOT NULL
);

-- =====================================================
-- 2.6 MESSAGES
-- =====================================================
CREATE TABLE messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    thread_id UUID DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES messages(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    status message_status DEFAULT 'sent',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT different_users CHECK (sender_id != recipient_id)
);

-- Create index for thread grouping
CREATE INDEX idx_messages_thread_id ON messages(thread_id);
CREATE INDEX idx_messages_participants ON messages(sender_id, recipient_id);

-- =====================================================
-- 2.7 ACTIVITY (Immutable Log)
-- =====================================================
CREATE TABLE activity (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    actor_id UUID REFERENCES profiles(id) ON DELETE RESTRICT,
    action_type action_type NOT NULL,
    target_type target_type,
    target_id UUID,
    metadata JSONB DEFAULT '{}',
    visibility activity_visibility DEFAULT 'public',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for activity feed queries
CREATE INDEX idx_activity_user_id ON activity(user_id);
CREATE INDEX idx_activity_created_at ON activity(created_at DESC);
CREATE INDEX idx_activity_action ON activity(action_type);

-- =====================================================
-- 2.8 EMERALDS (Value from Appreciation)
-- =====================================================
CREATE TABLE emeralds (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    giver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
    comment_id UUID REFERENCES comments(id) ON DELETE SET NULL,
    reply_id UUID REFERENCES replies(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    message TEXT,
    is_residual_eligible BOOLEAN DEFAULT TRUE,
    status emerald_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT emerald_target_check CHECK (
        (post_id IS NOT NULL AND comment_id IS NULL AND reply_id IS NULL) OR
        (post_id IS NULL AND comment_id IS NOT NULL AND reply_id IS NULL) OR
        (post_id IS NULL AND comment_id IS NULL AND reply_id IS NOT NULL)
    )
);

-- =====================================================
-- 2.9 NOTIFICATIONS
-- =====================================================
CREATE TABLE notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    action_label TEXT,
    action_url TEXT,
    related_entity_type TEXT,
    related_entity_id UUID,
    metadata JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for notifications
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- =====================================================
-- 2.10 PERSONALIZED_FEED (View - Computed)
-- =====================================================
-- This is a VIEW, not a table
CREATE VIEW personalized_feed AS
WITH feed_rank AS (
    SELECT 
        p.id,
        p.author_id,
        p.channel_id,
        p.title,
        p.body,
        p.content_type,
        p.media_urls,
        p.visibility,
        p.sovereignty_tags,
        p.allow_tipping,
        p.comment_count,
        p.emerald_count,
        p.resonance_count,
        p.tips_received,
        p.published_at,
        p.created_at,
        c.handle as channel_handle,
        c.display_name as channel_name,
        -- Ranking factors
        (p.resonance_count * 0.3) + 
        (p.emerald_count * 0.4) + 
        (EXTRACT(EPOCH FROM (NOW() - p.created_at)) / 86400 * -0.1) as feed_rank
    FROM posts p
    LEFT JOIN channels c ON p.channel_id = c.id
    WHERE p.visibility = 'public'
    AND (p.published_at IS NULL OR p.published_at <= NOW())
)
SELECT * FROM feed_rank
ORDER BY feed_rank DESC;