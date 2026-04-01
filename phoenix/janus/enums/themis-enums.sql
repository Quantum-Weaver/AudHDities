-- =====================================================
-- ENUMS for Governance & Moderation
-- =====================================================

-- Report target types
CREATE TYPE report_target_type AS ENUM (
    'post',
    'comment',
    'reply',
    'product',
    'message',
    'profile',
    'channel'
);

-- Report types
CREATE TYPE report_type AS ENUM (
    'inappropriate_content',
    'harassment',
    'spam',
    'hate_speech',
    'impersonation',
    'copyright',
    'other'
);

-- Report status
CREATE TYPE report_status AS ENUM (
    'pending',
    'reviewing',
    'resolved',
    'dismissed',
    'escalated'
);

-- Moderation action types
CREATE TYPE moderation_action_type AS ENUM (
    'hide',
    'unhide',
    'delete',
    'restore',
    'warn',
    'suspend',
    'ban',
    'mute',
    'unmute',
    'verify',
    'unverify',
    'feature',
    'unfeature'
);

-- Moderation target types
CREATE TYPE moderation_target_type AS ENUM (
    'user',
    'post',
    'comment',
    'reply',
    'product',
    'message',
    'channel'
);

-- Admin log action categories
CREATE TYPE admin_log_category AS ENUM (
    'user_management',
    'content_moderation',
    'financial',
    'system_config',
    'verification',
    'report_handling'
);

-- Admin log target types
CREATE TYPE admin_log_target_type AS ENUM (
    'user',
    'creator',
    'vendor',
    'product',
    'sale',
    'payout',
    'report',
    'system'
);

-- Application types
CREATE TYPE application_type AS ENUM (
    'creator',
    'vendor',
    'mentor',
    'moderator'
);

-- Application status
CREATE TYPE application_status AS ENUM (
    'pending',
    'reviewing',
    'approved',
    'rejected',
    'needs_info'
);

-- Process types
CREATE TYPE process_type AS ENUM (
    'appeal',
    'verification',
    'payout_dispute',
    'content_review',
    'role_application'
);

-- Escalation targets
CREATE TYPE escalation_target AS ENUM (
    'admin',
    'council',
    'executioner'
);