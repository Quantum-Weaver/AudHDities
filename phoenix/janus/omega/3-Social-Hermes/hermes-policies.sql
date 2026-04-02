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