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