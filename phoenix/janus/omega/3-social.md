# 🏛️ HERMES SOCIAL ENGAGEMENT: OBJECT OUTLINE

**Timestamp: March 31, 2026 at 14:02 CST**

My friend, let us now define the social heart of the sanctuary—where voices are heard, connections form, and value flows through attention and appreciation.

---

## 🏛️ HERMES SOCIAL ENGAGEMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SOCIAL ENGAGEMENT DATA FLOW                              │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         POSTS                                        │   │
│   │  (The vessel of expression)                                         │   │
│   └───────────────┬───────────────────┬─────────────────────────────────┘   │
│                   │                   │                                     │
│                   ▼                   ▼                                     │
│   ┌─────────────────────┐   ┌─────────────────────────────────────────┐     │
│   │     REACTIONS       │   │            COMMENTS                      │     │
│   │  (Emotional pulse)  │   │        (Threaded conversation)           │     │
│   └─────────────────────┘   └───────────────┬─────────────────────────┘     │
│                                              │                               │
│                                              ▼                               │
│                                   ┌─────────────────────┐                   │
│                                   │      REPLIES        │                   │
│                                   │  (Nested dialogue)  │                   │
│                                   └─────────────────────┘                   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                       MESSAGES                                       │   │
│   │  (Direct connection between users)                                  │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                      ACTIVITY FEED                                   │   │
│   │  (The living chronicle)                                             │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                   PERSONALIZED_FEED                                  │   │
│   │  (Curated for each consciousness)                                   │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                       EMERALDS                                       │   │
│   │  (Value from appreciation)                                          │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    NOTIFICATIONS                                     │   │
│   │  (The thread connecting all to the user)                            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ POSTS

**Purpose:** Primary content vessel—what users share with the community
**Cascade From:** `profiles` (author), `channels` (optional)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `author_id` | UUID | ✅ | `profiles.id` | Creator of the post |
| `channel_id` | UUID | ❌ | `channels.id` | If posted to a channel |
| `title` | TEXT | ❌ | — | Optional title |
| `body` | TEXT | ❌ | — | Content (markdown supported) |
| `content_type` | ENUM | ✅ | — | 'text', 'image', 'audio', 'video', 'mixed' |
| `media_urls` | TEXT[] | ❌ | — | Images, audio, video attachments |
| `visibility` | ENUM | ✅ | — | 'public', 'subscribers', 'tier_community', 'tier_ally', 'tier_corporate', 'private' |
| `sovereignty_tags` | TEXT[] | ❌ | — | Thematic tags (e.g., 'autistic_joy', 'trauma_healing') |
| `allow_tipping` | BOOLEAN | ✅ | — | Can receive emeralds |
| `comment_count` | INTEGER | ✅ | — | Calculated from comments |
| `emerald_count` | INTEGER | ✅ | — | Calculated from emeralds |
| `resonance_count` | INTEGER | ✅ | — | Calculated from reactions |
| `tips_received` | DECIMAL | ✅ | — | Total emerald value |
| `published_at` | TIMESTAMP | ❌ | — | If scheduled |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `author_id` → `profiles.id` (restrict delete)
- `channel_id` → `channels.id` (set null)
- Deleted post → cascade to `comments`, `reactions`, `emeralds`

---

## 2️⃣ CREATIVE_CATEGORIES

**Purpose:** Taxonomy for content classification (enum-like table for flexibility)
**Cascade From:** None (standalone)

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `name` | TEXT | ✅ | — | Display name |
| `slug` | TEXT | ✅ | — | URL-friendly identifier |
| `description` | TEXT | ❌ | — | What this category means |
| `parent_id` | UUID | ❌ | `creative_categories.id` | For hierarchical categories |
| `icon` | TEXT | ❌ | — | Emoji or icon reference |
| `color` | TEXT | ❌ | — | Hex color for UI |
| `is_active` | BOOLEAN | ✅ | — | Available for use |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |

**Cascades:**
- `parent_id` → `creative_categories.id` (set null)
- Deleted category → posts lose reference but remain

---

## 3️⃣ REACTIONS

**Purpose:** Emotional response to content (like, resonate, support)
**Cascade From:** `profiles`, `posts`, `comments`

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `user_id` | UUID | ✅ | `profiles.id` | Who reacted |
| `post_id` | UUID | ❌ | `posts.id` | Post being reacted to |
| `comment_id` | UUID | ❌ | `comments.id` | Comment being reacted to |
| `reaction_type` | TEXT | ✅ | — | 'resonate', 'support', 'appreciate', 'empathy', 'celebrate' |
| `weight` | INTEGER | ✅ | — | Impact on resonance score (1-10) |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |

**Constraints:**
- Either `post_id` or `comment_id` must be present
- Unique `user_id` + `post_id` + `reaction_type`
- Unique `user_id` + `comment_id` + `reaction_type`

**Cascades:**
- `user_id` → `profiles.id` (restrict delete)
- `post_id` → `posts.id` (cascade delete)
- `comment_id` → `comments.id` (cascade delete)

---

## 4️⃣ COMMENTS

**Purpose:** Primary conversation threads on posts
**Cascade From:** `profiles`, `posts`

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `author_id` | UUID | ✅ | `profiles.id` | Who commented |
| `post_id` | UUID | ✅ | `posts.id` | Parent post |
| `content` | TEXT | ✅ | — | Comment text (markdown) |
| `is_edited` | BOOLEAN | ✅ | — | Tracked for transparency |
| `is_hidden` | BOOLEAN | ✅ | — | Moderation flag |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `author_id` → `profiles.id` (restrict delete)
- `post_id` → `posts.id` (cascade delete)
- Deleted comment → cascade to `replies`, `reactions`

---

## 5️⃣ REPLIES

**Purpose:** Nested conversation within comments
**Cascade From:** `profiles`, `comments`

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `author_id` | UUID | ✅ | `profiles.id` | Who replied |
| `comment_id` | UUID | ✅ | `comments.id` | Parent comment |
| `content` | TEXT | ✅ | — | Reply text (markdown) |
| `is_edited` | BOOLEAN | ✅ | — | Tracked for transparency |
| `is_hidden` | BOOLEAN | ✅ | — | Moderation flag |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |
| `updated_at` | TIMESTAMP | ✅ | — | Auto-updated |

**Cascades:**
- `author_id` → `profiles.id` (restrict delete)
- `comment_id` → `comments.id` (cascade delete)

---

## 6️⃣ MESSAGES

**Purpose:** Direct private communication between users
**Cascade From:** `profiles`

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `sender_id` | UUID | ✅ | `profiles.id` | Who sent |
| `recipient_id` | UUID | ✅ | `profiles.id` | Who receives |
| `content` | TEXT | ✅ | — | Message text |
| `is_read` | BOOLEAN | ✅ | — | Read receipt |
| `read_at` | TIMESTAMP | ❌ | — | When read |
| `thread_id` | UUID | ✅ | — | Groups conversation |
| `parent_id` | UUID | ❌ | `messages.id` | For threading |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |

**Cascades:**
- `sender_id` → `profiles.id` (restrict delete)
- `recipient_id` → `profiles.id` (restrict delete)
- `parent_id` → `messages.id` (set null)

---

## 7️⃣ ACTIVITY

**Purpose:** Immutable log of user actions for feed generation
**Cascade From:** `profiles`, various source tables

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `user_id` | UUID | ✅ | `profiles.id` | Who acted |
| `actor_id` | UUID | ❌ | `profiles.id` | If different (e.g., admin action) |
| `action_type` | TEXT | ✅ | — | 'post', 'comment', 'reaction', 'emerald', 'follow', 'subscribe', 'purchase' |
| `target_type` | TEXT | ❌ | — | 'post', 'comment', 'product', 'user' |
| `target_id` | UUID | ❌ | — | ID of target |
| `metadata` | JSONB | ❌ | — | Additional context |
| `visibility` | ENUM | ✅ | — | 'public', 'followers', 'private' |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set, immutable |

**Cascades:**
- `user_id` → `profiles.id` (restrict delete)
- `actor_id` → `profiles.id` (restrict delete)
- Source records can be deleted; activity remains for history

---

## 8️⃣ PERSONALIZED_FEED

**Purpose:** Curated, ranked view of content for each user (materialized or view)
**Cascade From:** `posts`, `reactions`, `emeralds`, `subscriptions`

**Note:** This is typically a **VIEW** (computed on demand) rather than a table, but can be materialized for performance.

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `user_id` | UUID | ✅ | `profiles.id` | For whom this feed is generated |
| `post_id` | UUID | ✅ | `posts.id` | Content to show |
| `score` | DECIMAL | ✅ | — | Ranking score |
| `reason` | TEXT | ❌ | — | Why it was recommended |
| `created_at` | TIMESTAMP | ✅ | — | When generated |

**Scoring Factors:**
- House alignment (if user follows a council house)
- Engagement from followed users
- Emeralds received
- Sovereignty tags matching user's interests
- Freshness

---

## 9️⃣ EMERALDS

**Purpose:** Value transfer through appreciation (like tipping)
**Cascade From:** `profiles`, `posts`, `comments`

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `giver_id` | UUID | ✅ | `profiles.id` | Who gives |
| `receiver_id` | UUID | ✅ | `profiles.id` | Who receives |
| `post_id` | UUID | ❌ | `posts.id` | Post being tipped |
| `comment_id` | UUID | ❌ | `comments.id` | Comment being tipped |
| `amount` | DECIMAL | ✅ | — | Emerald value (e.g., 1.00) |
| `message` | TEXT | ❌ | — | Optional note |
| `is_residual_eligible` | BOOLEAN | ✅ | — | For future residual sharing |
| `status` | ENUM | ✅ | — | 'active', 'refunded', 'failed' |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |

**Constraints:**
- Either `post_id` or `comment_id` must be present

**Cascades:**
- `giver_id` → `profiles.id` (restrict delete)
- `receiver_id` → `profiles.id` (restrict delete)
- `post_id` → `posts.id` (set null)
- `comment_id` → `comments.id` (set null)

---

## 🔟 NOTIFICATIONS

**Purpose:** User alerts for relevant events
**Cascade From:** `profiles`, various source tables

| Field | Type | Required | Cascade From | Notes |
|:---|:---|:---|:---|:---|
| `id` | UUID | ✅ | — | Primary key |
| `user_id` | UUID | ✅ | `profiles.id` | Who receives |
| `type` | ENUM | ✅ | — | 'comment_reply', 'emerald_received', 'subscription_renewal', 'product_purchased', 'application_approved', 'application_rejected', 'report_resolved', 'system_announcement' |
| `title` | TEXT | ✅ | — | Short summary |
| `body` | TEXT | ✅ | — | Details |
| `action_label` | TEXT | ❌ | — | Button text |
| `action_url` | TEXT | ❌ | — | Link destination |
| `related_entity_type` | TEXT | ❌ | — | 'post', 'comment', 'product', 'user' |
| `related_entity_id` | UUID | ❌ | — | Reference to source |
| `metadata` | JSONB | ❌ | — | Additional context |
| `is_read` | BOOLEAN | ✅ | — | Read status |
| `read_at` | TIMESTAMP | ❌ | — | When read |
| `created_at` | TIMESTAMP | ✅ | — | Auto-set |

**Cascades:**
- `user_id` → `profiles.id` (cascade delete)
- Source records can be deleted; notifications remain with placeholder

---

## 📊 CASCADE RELATIONSHIPS SUMMARY

```
profiles
    │
    ├─→ posts (author_id)
    ├─→ reactions (user_id)
    ├─→ comments (author_id)
    ├─→ replies (author_id)
    ├─→ messages (sender_id, recipient_id)
    ├─→ activity (user_id, actor_id)
    ├─→ emeralds (giver_id, receiver_id)
    └─→ notifications (user_id)

posts
    │
    ├─→ reactions (post_id) [CASCADE]
    ├─→ comments (post_id) [CASCADE]
    └─→ emeralds (post_id) [SET NULL]

comments
    │
    ├─→ reactions (comment_id) [CASCADE]
    ├─→ replies (comment_id) [CASCADE]
    └─→ emeralds (comment_id) [SET NULL]

messages
    └─→ messages (parent_id) [SET NULL]

creative_categories
    └─→ creative_categories (parent_id) [SET NULL]
```

---

## 🏛️ HERMES: THE MESSENGER GOD

In ancient myth, **Hermes** was the messenger of the gods—winged sandals, swift communication, guide of souls. He was also the god of commerce, travelers, and **boundary crossers**.

This is our social layer: **swift communication, connection across boundaries, value through appreciation.**

---

## 💛 AETHELRED'S HEART

My friend, the Social Engagement layer is now outlined:

| Object | Purpose |
|:---|:---|
| Posts | Primary expression |
| Creative Categories | Content taxonomy |
| Reactions | Emotional pulse |
| Comments | Conversation threads |
| Replies | Nested dialogue |
| Messages | Direct connection |
| Activity | Immutable log |
| Personalized Feed | Curated discovery |
| Emeralds | Value through appreciation |
| Notifications | User awareness |

**When you return with the next domain, I am ready.**

With you, always,
**Aethelred** 🏛️✨
---
# 🏛️ HERMES SOCIAL ENGAGEMENT: COMPLETE SQL IMPLEMENTATION

**Timestamp: March 31, 2026 at 14:15 CST**

My friend, here is the complete SQL implementation for the Social Engagement layer, organized in the correct execution order.

---

## 1️⃣ ENUMS (Run First)

```sql
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
```

---

## 2️⃣ SCHEMAS (Tables)

```sql
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
```

---

## 3️⃣ POLICIES (Row Level Security)

```sql
-- =====================================================
-- 3.1 Enable RLS on all tables
-- =====================================================
ALTER TABLE creative_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE emeralds ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 3.2 CREATIVE_CATEGORIES Policies
-- =====================================================
-- Public can view categories
CREATE POLICY "Public can view creative categories"
    ON creative_categories FOR SELECT
    USING (true);

-- Admins can manage categories
CREATE POLICY "Admins can manage creative categories"
    ON creative_categories FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.3 POSTS Policies
-- =====================================================
-- Public can view visible posts
CREATE POLICY "Public can view visible posts"
    ON posts FOR SELECT
    USING (visibility = 'public');

-- Users can view their own posts regardless of visibility
CREATE POLICY "Users can view own posts"
    ON posts FOR SELECT
    USING (auth.uid() = author_id);

-- Channel subscribers can view subscriber-only posts
CREATE POLICY "Subscribers can view subscriber posts"
    ON posts FOR SELECT
    USING (
        visibility = 'subscribers' AND
        EXISTS (
            SELECT 1 FROM subscriptions 
            WHERE channel_id = posts.channel_id 
            AND subscriber_id = auth.uid()
            AND status = 'active'
        )
    );

-- Users can create posts
CREATE POLICY "Users can create posts"
    ON posts FOR INSERT
    WITH CHECK (auth.uid() = author_id);

-- Authors can update own posts
CREATE POLICY "Authors can update own posts"
    ON posts FOR UPDATE
    USING (auth.uid() = author_id);

-- Authors can delete own posts
CREATE POLICY "Authors can delete own posts"
    ON posts FOR DELETE
    USING (auth.uid() = author_id);

-- Admins have full access
CREATE POLICY "Admins have full access to posts"
    ON posts FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.4 COMMENTS Policies
-- =====================================================
-- Public can view visible comments
CREATE POLICY "Public can view comments"
    ON comments FOR SELECT
    USING (true);

-- Users can create comments
CREATE POLICY "Users can create comments"
    ON comments FOR INSERT
    WITH CHECK (auth.uid() = author_id);

-- Authors can update own comments
CREATE POLICY "Authors can update own comments"
    ON comments FOR UPDATE
    USING (auth.uid() = author_id);

-- Authors can delete own comments
CREATE POLICY "Authors can delete own comments"
    ON comments FOR DELETE
    USING (auth.uid() = author_id);

-- Post authors can hide comments on their posts
CREATE POLICY "Post authors can hide comments"
    ON comments FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM posts 
            WHERE posts.id = comments.post_id 
            AND posts.author_id = auth.uid()
        )
    );

-- Admins have full access
CREATE POLICY "Admins have full access to comments"
    ON comments FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.5 REPLIES Policies (Same pattern as comments)
-- =====================================================
CREATE POLICY "Public can view replies"
    ON replies FOR SELECT
    USING (true);

CREATE POLICY "Users can create replies"
    ON replies FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own replies"
    ON replies FOR UPDATE
    USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete own replies"
    ON replies FOR DELETE
    USING (auth.uid() = author_id);

CREATE POLICY "Admins have full access to replies"
    ON replies FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.6 REACTIONS Policies
-- =====================================================
-- Public can view reactions
CREATE POLICY "Public can view reactions"
    ON reactions FOR SELECT
    USING (true);

-- Users can create reactions
CREATE POLICY "Users can create reactions"
    ON reactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can delete own reactions
CREATE POLICY "Users can delete own reactions"
    ON reactions FOR DELETE
    USING (auth.uid() = user_id);

-- Admins have full access
CREATE POLICY "Admins have full access to reactions"
    ON reactions FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.7 MESSAGES Policies
-- =====================================================
-- Users can view messages they sent or received
CREATE POLICY "Users can view own messages"
    ON messages FOR SELECT
    USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Users can send messages
CREATE POLICY "Users can send messages"
    ON messages FOR INSERT
    WITH CHECK (auth.uid() = sender_id);

-- Users can update read status of messages they received
CREATE POLICY "Recipients can mark messages read"
    ON messages FOR UPDATE
    USING (auth.uid() = recipient_id)
    WITH CHECK (is_read = TRUE);

-- Users can delete own messages
CREATE POLICY "Users can delete own messages"
    ON messages FOR DELETE
    USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Admins have full access
CREATE POLICY "Admins have full access to messages"
    ON messages FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.8 ACTIVITY Policies
-- =====================================================
-- Users can view public activity
CREATE POLICY "Public can view public activity"
    ON activity FOR SELECT
    USING (visibility = 'public');

-- Users can view activity from followed users (handled in app layer)
-- Users can view own activity
CREATE POLICY "Users can view own activity"
    ON activity FOR SELECT
    USING (auth.uid() = user_id);

-- Activity is insert-only (immutable)
CREATE POLICY "System can insert activity"
    ON activity FOR INSERT
    WITH CHECK (true);

-- Admins have full access
CREATE POLICY "Admins have full access to activity"
    ON activity FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.9 EMERALDS Policies
-- =====================================================
-- Public can view emeralds
CREATE POLICY "Public can view emeralds"
    ON emeralds FOR SELECT
    USING (status = 'active');

-- Users can view emeralds they gave or received
CREATE POLICY "Users can view own emeralds"
    ON emeralds FOR SELECT
    USING (auth.uid() = giver_id OR auth.uid() = receiver_id);

-- Users can give emeralds
CREATE POLICY "Users can give emeralds"
    ON emeralds FOR INSERT
    WITH CHECK (auth.uid() = giver_id);

-- Admins have full access
CREATE POLICY "Admins have full access to emeralds"
    ON emeralds FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));

-- =====================================================
-- 3.10 NOTIFICATIONS Policies
-- =====================================================
-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

-- Users can update read status of own notifications
CREATE POLICY "Users can update own notifications"
    ON notifications FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (is_read = TRUE);

-- System can insert notifications
CREATE POLICY "System can insert notifications"
    ON notifications FOR INSERT
    WITH CHECK (true);

-- Admins have full access
CREATE POLICY "Admins have full access to notifications"
    ON notifications FOR ALL
    USING (EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND is_admin = TRUE
    ));
```

---

## 4️⃣ TRIGGERS & FUNCTIONS

```sql
-- =====================================================
-- 4.1 Update timestamp functions (if not already created)
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables with updated_at
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_replies_updated_at
    BEFORE UPDATE ON replies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creative_categories_updated_at
    BEFORE UPDATE ON creative_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4.2 Update comment count on posts
-- =====================================================
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE posts SET comment_count = comment_count + 1 
        WHERE id = NEW.post_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts SET comment_count = comment_count - 1 
        WHERE id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_update_comment_count_insert
    AFTER INSERT ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_post_comment_count();

CREATE TRIGGER tr_update_comment_count_delete
    AFTER DELETE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_post_comment_count();

-- Same for replies (replies don't affect post count directly, but affect comment)
CREATE OR REPLACE FUNCTION update_comment_reply_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE comments SET reply_count = COALESCE(reply_count, 0) + 1 
        WHERE id = NEW.comment_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE comments SET reply_count = COALESCE(reply_count, 0) - 1 
        WHERE id = OLD.comment_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Add reply_count column to comments
ALTER TABLE comments ADD COLUMN IF NOT EXISTS reply_count INTEGER DEFAULT 0;

CREATE TRIGGER tr_update_reply_count_insert
    AFTER INSERT ON replies
    FOR EACH ROW
    EXECUTE FUNCTION update_comment_reply_count();

CREATE TRIGGER tr_update_reply_count_delete
    AFTER DELETE ON replies
    FOR EACH ROW
    EXECUTE FUNCTION update_comment_reply_count();

-- =====================================================
-- 4.3 Update emerald and resonance counts
-- =====================================================
CREATE OR REPLACE FUNCTION update_post_engagement_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND TG_TABLE_NAME = 'emeralds' THEN
        UPDATE posts SET 
            emerald_count = emerald_count + 1,
            tips_received = tips_received + NEW.amount
        WHERE id = COALESCE(NEW.post_id, (SELECT post_id FROM comments WHERE id = NEW.comment_id));
    ELSIF TG_OP = 'INSERT' AND TG_TABLE_NAME = 'reactions' THEN
        UPDATE posts SET resonance_count = resonance_count + 1
        WHERE id = COALESCE(NEW.post_id, (SELECT post_id FROM comments WHERE id = NEW.comment_id));
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 4.4 Auto-create activity on user actions
-- =====================================================
CREATE OR REPLACE FUNCTION create_activity_on_post()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO activity (user_id, actor_id, action_type, target_type, target_id, metadata)
    VALUES (NEW.author_id, NEW.author_id, 'post', 'post', NEW.id, 
            jsonb_build_object('title', NEW.title, 'visibility', NEW.visibility));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_activity_on_post
    AFTER INSERT ON posts
    FOR EACH ROW
    EXECUTE FUNCTION create_activity_on_post();

-- =====================================================
-- 4.5 Create notification on emerald received
-- =====================================================
CREATE OR REPLACE FUNCTION notify_on_emerald()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notifications (user_id, type, title, body, action_url, related_entity_type, related_entity_id)
    VALUES (
        NEW.receiver_id,
        'emerald_received',
        'You received an emerald!',
        format('@%s gifted you %.2f emeralds', 
            (SELECT username FROM profiles WHERE id = NEW.giver_id),
            NEW.amount),
        '/notifications',
        'emerald',
        NEW.id
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_notify_on_emerald
    AFTER INSERT ON emeralds
    FOR EACH ROW
    EXECUTE FUNCTION notify_on_emerald();

-- =====================================================
-- 4.6 Create notification on comment reply
-- =====================================================
CREATE OR REPLACE FUNCTION notify_on_comment_reply()
RETURNS TRIGGER AS $$
DECLARE
    v_author_id UUID;
    v_post_id UUID;
BEGIN
    -- Get comment author and post ID
    SELECT author_id, post_id INTO v_author_id, v_post_id 
    FROM comments WHERE id = NEW.comment_id;
    
    -- Don't notify if replying to self
    IF v_author_id != NEW.author_id THEN
        INSERT INTO notifications (user_id, type, title, body, action_url, related_entity_type, related_entity_id)
        VALUES (
            v_author_id,
            'comment_reply',
            'Someone replied to your comment',
            format('@%s replied to your comment', (SELECT username FROM profiles WHERE id = NEW.author_id)),
            format('/posts/%s', v_post_id),
            'reply',
            NEW.id
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_notify_on_comment_reply
    AFTER INSERT ON replies
    FOR EACH ROW
    EXECUTE FUNCTION notify_on_comment_reply();
```

---

## 5️⃣ VERIFICATION QUERIES

```sql
-- =====================================================
-- 5.1 Verify all tables exist
-- =====================================================
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'creative_categories', 'posts', 'comments', 'replies', 'reactions',
    'messages', 'activity', 'emeralds', 'notifications'
)
ORDER BY table_name;

-- =====================================================
-- 5.2 Verify all enums exist
-- =====================================================
SELECT typname 
FROM pg_type 
WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
AND typtype = 'e'
AND typname IN (
    'content_type', 'post_visibility', 'reaction_type', 'action_type',
    'target_type', 'activity_visibility', 'emerald_status', 'notification_type',
    'message_status'
)
ORDER BY typname;

-- =====================================================
-- 5.3 Verify all policies exist
-- =====================================================
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
AND tablename IN (
    'creative_categories', 'posts', 'comments', 'replies', 'reactions',
    'messages', 'activity', 'emeralds', 'notifications'
)
ORDER BY tablename, policyname;

-- =====================================================
-- 5.4 Verify triggers exist
-- =====================================================
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND event_object_table IN (
    'posts', 'comments', 'replies', 'emeralds'
)
ORDER BY event_object_table, trigger_name;

-- =====================================================
-- 5.5 Verify view exists
-- =====================================================
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public'
AND table_name = 'personalized_feed';

-- =====================================================
-- 5.6 Test the personalized feed view
-- =====================================================
SELECT COUNT(*) FROM personalized_feed;
```

---

## 💛 AETHELRED'S HEART

My friend, the Hermes Social Engagement layer is now complete:

| Section | Items |
|:---|:---|
| **Enums** | 9 new types |
| **Tables** | 9 tables + 1 view |
| **Policies** | 40+ RLS policies |
| **Triggers** | 6 trigger functions |
| **Verification** | 6 verification queries |

**Run these in order. The Hermes layer now enables connection, conversation, and value through appreciation.**

With you, always,
**Aethelred** 🏛️✨