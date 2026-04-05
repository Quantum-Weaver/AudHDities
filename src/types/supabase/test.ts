export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      acid_test_answers: {
        Row: {
          ally_tier_price: number | null
          answer_text: string
          created_at: string | null
          id: string
          indicates_nd: boolean | null
          order_index: number | null
          persona_contribution: Json | null
          question_id: string
          score_value: number | null
        }
        Insert: {
          ally_tier_price?: number | null
          answer_text: string
          created_at?: string | null
          id?: string
          indicates_nd?: boolean | null
          order_index?: number | null
          persona_contribution?: Json | null
          question_id: string
          score_value?: number | null
        }
        Update: {
          ally_tier_price?: number | null
          answer_text?: string
          created_at?: string | null
          id?: string
          indicates_nd?: boolean | null
          order_index?: number | null
          persona_contribution?: Json | null
          question_id?: string
          score_value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "acid_test_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "acid_test_questions"
            referencedColumns: ["id"]
          },
        ]
      }
	      }
    Views: {
      personalized_feed: {
        Row: {
          allow_tipping: boolean | null
          author_id: string | null
          body: string | null
          channel_handle: string | null
          channel_id: string | null
          channel_name: string | null
          comment_count: number | null
          content_type: Database["public"]["Enums"]["content_type"] | null
          created_at: string | null
          emerald_count: number | null
          feed_rank: number | null
          id: string | null
          media_urls: string[] | null
          published_at: string | null
          resonance_count: number | null
          sovereignty_tags: string[] | null
          tips_received: number | null
          title: string | null
          visibility: Database["public"]["Enums"]["post_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      public_transparency: {
        Row: {
          action: string | null
          created_at: string | null
          public_note: string | null
          target_identifier: string | null
          target_type:
            | Database["public"]["Enums"]["admin_log_target_type"]
            | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          public_note?: string | null
          target_identifier?: string | null
          target_type?:
            | Database["public"]["Enums"]["admin_log_target_type"]
            | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          public_note?: string | null
          target_identifier?: string | null
          target_type?:
            | Database["public"]["Enums"]["admin_log_target_type"]
            | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_creator_category: {
        Args: { category_slug: string; creator_uuid: string }
        Returns: boolean
      }
      approve_application: {
        Args: {
          p_admin_id: string
          p_application_id: string
          p_review_notes?: string
        }
        Returns: boolean
      }
      cleanup_rate_limits: { Args: never; Returns: undefined }
      complete_script_execution: {
        Args: {
          p_error?: string
          p_log_id: string
          p_output?: string
          p_status: string
        }
        Returns: undefined
      }
      create_creator_profile: {
        Args: {
          p_creative_categories?: string[]
          p_creative_description?: string
          p_creator_moniker: string
          p_default_residual_pool?: number
          p_portfolio_url?: string
          p_user_id: string
        }
        Returns: string
      }
      create_vendor_profile: {
        Args: {
          p_business_description?: string
          p_business_name: string
          p_business_type?: Database["public"]["Enums"]["business_type"]
          p_user_id: string
          p_website_url?: string
        }
        Returns: string
      }
      get_creator_categories: {
        Args: { creator_uuid: string }
        Returns: {
          description: string
          icon_name: string
          id: string
          name: string
          slug: string
        }[]
      }
      get_localized_text: {
        Args: {
          p_language_code?: string
          p_plural_form?: number
          p_resource_key: string
        }
        Returns: string
      }
      get_platform_health: { Args: never; Returns: Json }
      get_setting: {
        Args: { p_default?: Json; p_key: string; p_user_id?: string }
        Returns: Json
      }
      log_script_execution: {
        Args: {
          p_executed_by: string
          p_parameters?: Json
          p_script_id: string
        }
        Returns: string
      }
      remove_creator_category: {
        Args: { category_slug: string; creator_uuid: string }
        Returns: boolean
      }
      seed_council_houses: { Args: never; Returns: undefined }
      submit_application: {
        Args: {
          p_application_type: Database["public"]["Enums"]["application_type"]
          p_form_data: Json
          p_user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      acid_persona:
        | "masked_traveler"
        | "tab_hoarder"
        | "seam_warrior"
        | "void_dweller"
        | "pattern_seeker"
        | "quantum_witness"
      acid_question_type:
        | "multiple_choice"
        | "slider"
        | "checkbox"
        | "scale"
        | "text"
      action_type:
        | "post"
        | "comment"
        | "reaction"
        | "emerald"
        | "follow"
        | "subscribe"
        | "purchase"
        | "join_house"
        | "complete_quest"
        | "earn_badge"
      activity_visibility: "public" | "followers" | "private"
      admin_log_category:
        | "user_management"
        | "content_moderation"
        | "financial"
        | "system_config"
        | "verification"
        | "report_handling"
      admin_log_target_type:
        | "user"
        | "creator"
        | "vendor"
        | "product"
        | "sale"
        | "payout"
        | "report"
        | "system"
      analytics_category:
        | "page_view"
        | "user_action"
        | "system"
        | "error"
        | "performance"
      application_status:
        | "pending"
        | "reviewing"
        | "approved"
        | "rejected"
        | "needs_info"
      application_type: "creator" | "vendor" | "mentor" | "moderator"
      badge_rarity: "common" | "rare" | "epic" | "legendary" | "mythic"
      badge_tier: "initiate" | "adept" | "master"
      badge_type:
        | "quantum_weaver"
        | "founding_council"
        | "genesis_block"
        | "sanctuary_guardian"
        | "verified_creator"
        | "verified_vendor"
        | "community_leader"
        | "first_sale"
        | "first_purchase"
        | "first_quest"
        | "quest_master"
        | "sovereign_seeker"
        | "sovereign_adept"
        | "sovereign_master"
        | "contributor_concept"
        | "contributor_code"
        | "contributor_design"
        | "contributor_content"
        | "contributor_testing"
        | "hearth_keeper_initiate"
        | "hearth_keeper_adept"
        | "hearth_keeper_master"
        | "chancellor_initiate"
        | "chancellor_adept"
        | "chancellor_master"
        | "seer_initiate"
        | "seer_adept"
        | "seer_master"
        | "aethelred_initiate"
        | "aethelred_adept"
        | "aethelred_master"
        | "curator_initiate"
        | "curator_adept"
        | "curator_master"
        | "archivist_initiate"
        | "archivist_adept"
        | "archivist_master"
        | "skald_initiate"
        | "skald_adept"
        | "skald_master"
        | "codex_initiate"
        | "codex_adept"
        | "codex_master"
        | "executioner_initiate"
        | "executioner_adept"
        | "executioner_master"
        | "bigot_tax_exempt"
        | "data_sovereign"
        | "privacy_pioneer"
      bid_type: "cpm" | "cpc" | "cpa"
      bridge_status: "active" | "dormant" | "transforming"
      business_type:
        | "sole_proprietor"
        | "llc"
        | "nonprofit"
        | "cooperative"
        | "partnership"
        | "other"
      calendar_event_type:
        | "holiday"
        | "ritual"
        | "milestone"
        | "maintenance"
        | "release"
      calendar_visibility: "public" | "house" | "admin"
      campaign_status: "draft" | "active" | "paused" | "completed"
      communication_style: "direct" | "gentle" | "detailed" | "concise"
      contact_direction: "inbound" | "outbound"
      contact_status: "new" | "read" | "replied" | "resolved" | "spam"
      content_rating: "general" | "mature" | "triggering" | "explicit"
      content_type: "text" | "image" | "audio" | "video" | "mixed"
      contribution_type:
        | "concept"
        | "code"
        | "design"
        | "content"
        | "testing"
        | "promotion"
        | "infrastructure"
      council_house:
        | "hearth_keeper"
        | "chancellor"
        | "seer"
        | "aethelred"
        | "curator"
        | "archivist"
        | "skald"
        | "codex"
        | "executioner"
      currency_position_type: "before" | "after"
      custom_category_type:
        | "greeting"
        | "communication"
        | "gift"
        | "taboo"
        | "celebration"
        | "business"
        | "family"
      date_format_type: "YYYY-MM-DD" | "MM/DD/YYYY" | "DD/MM/YYYY"
      delivery_status: "operational" | "degraded" | "failed"
      deployment_status: "success" | "building" | "failed"
      difficulty_level: "beginner" | "intermediate" | "advanced" | "master"
      email_status:
        | "queued"
        | "sent"
        | "delivered"
        | "opened"
        | "clicked"
        | "bounced"
        | "failed"
      emerald_status: "active" | "refunded" | "failed"
      escalation_target: "admin" | "council" | "executioner"
      folksonomy_target_type:
        | "post"
        | "product"
        | "comment"
        | "profile"
        | "quest"
        | "myth"
        | "lesson"
        | "scene"
      job_status: "active" | "paused" | "completed" | "failed"
      job_type: "cron" | "one_time" | "interval"
      ledger_entity: "buyer" | "platform" | "creator" | "contributor"
      ledger_entry_type: "sale" | "residual" | "platform_fee" | "payout"
      lesson_content_type:
        | "text"
        | "video"
        | "audio"
        | "interactive"
        | "quiz"
        | "exercise"
      life_cycle_phase:
        | "seedling"
        | "sprout"
        | "bloom"
        | "harvest"
        | "dormant"
        | "renewal"
      maintenance_status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "failed"
        | "cancelled"
      maintenance_type:
        | "upgrade"
        | "backup"
        | "repair"
        | "cleanup"
        | "migration"
      measurement_system_type: "metric" | "imperial" | "us_customary"
      message_status: "sent" | "delivered" | "read" | "deleted"
      moderation_action_type:
        | "hide"
        | "unhide"
        | "delete"
        | "restore"
        | "warn"
        | "suspend"
        | "ban"
        | "mute"
        | "unmute"
        | "verify"
        | "unverify"
        | "feature"
        | "unfeature"
      moderation_target_type:
        | "user"
        | "post"
        | "comment"
        | "reply"
        | "product"
        | "message"
        | "channel"
      myth_type: "origin" | "parable" | "ritual" | "prophecy" | "chronicle"
      notification_type:
        | "comment_reply"
        | "emerald_received"
        | "subscription_renewal"
        | "product_purchased"
        | "application_approved"
        | "application_rejected"
        | "report_resolved"
        | "report_rejected"
        | "system_announcement"
        | "quest_completed"
        | "badge_earned"
        | "house_promotion"
        | "mentor_assigned"
      ontology_predicate:
        | "parent_of"
        | "related_to"
        | "requires"
        | "contradicts"
        | "evolves_to"
        | "inspired_by"
      owner_type: "creator" | "vendor"
      payment_status: "pending" | "completed" | "refunded" | "failed"
      payout_frequency: "weekly" | "monthly" | "quarterly"
      payout_method: "stripe" | "paypal" | "bank" | "crypto"
      payout_status: "pending" | "processing" | "completed" | "failed"
      platform_environment: "development" | "staging" | "production"
      platform_status: "operational" | "degraded" | "outage" | "maintenance"
      post_visibility:
        | "public"
        | "subscribers"
        | "tier_community"
        | "tier_ally"
        | "tier_corporate"
        | "private"
      process_type:
        | "appeal"
        | "verification"
        | "payout_dispute"
        | "content_review"
        | "role_application"
      product_type:
        | "digital_course"
        | "digital_download"
        | "digital_membership"
        | "digital_subscription"
        | "digital_bundle"
        | "physical_product"
        | "physical_handmade"
        | "physical_manufactured"
        | "physical_custom"
        | "audio"
        | "video"
        | "podcast"
        | "music"
        | "livestream"
        | "event_live"
        | "event_virtual"
        | "workshop"
        | "class"
        | "consultation"
        | "service"
        | "commission"
        | "contract"
        | "sponsorship"
        | "mutual_aid"
        | "crowdfunding"
        | "tip"
        | "donation"
        | "clothing"
        | "accessory"
        | "fabric"
        | "pattern"
        | "bundle"
        | "kit"
        | "subscription_box"
      progress_status: "not_started" | "in_progress" | "completed" | "mastered"
      protocol_type:
        | "security"
        | "incident"
        | "escalation"
        | "onboarding"
        | "offboarding"
        | "emergency"
      quest_status:
        | "locked"
        | "available"
        | "in_progress"
        | "completed"
        | "mastered"
      reaction_type:
        | "resonate"
        | "support"
        | "appreciate"
        | "empathy"
        | "celebrate"
      recurring_interval: "month" | "year"
      report_status:
        | "pending"
        | "reviewing"
        | "resolved"
        | "dismissed"
        | "escalated"
      report_target_type:
        | "post"
        | "comment"
        | "reply"
        | "product"
        | "message"
        | "profile"
        | "channel"
      report_type:
        | "inappropriate_content"
        | "harassment"
        | "spam"
        | "hate_speech"
        | "impersonation"
        | "copyright"
        | "other"
      scene_type:
        | "ritual"
        | "ceremony"
        | "celebration"
        | "initiation"
        | "council"
        | "vision_quest"
      script_type:
        | "deploy"
        | "seed"
        | "migration"
        | "cleanup"
        | "backup"
        | "test"
      setting_scope: "global" | "user" | "role" | "house"
      source_pool_type: "residual" | "covenant" | "platform"
      stripe_mode: "test" | "live"
      submission_type:
        | "text"
        | "image"
        | "file"
        | "audio"
        | "video"
        | "link"
        | "auto"
      subscription_status: "active" | "paused" | "cancelled" | "expired"
      supabase_status: "connected" | "degraded" | "disconnected"
      superposition_status: "active" | "collapsed" | "archived"
      survey_audience_type:
        | "all"
        | "creators"
        | "vendors"
        | "subscribers"
        | "council"
      system_status: "operational" | "degraded" | "outage" | "maintenance"
      system_type: "database" | "api" | "storage" | "auth" | "queue" | "cache"
      target_type:
        | "post"
        | "comment"
        | "product"
        | "user"
        | "channel"
        | "quest"
        | "badge"
      taxonomy_node_type:
        | "domain"
        | "category"
        | "concept"
        | "relationship"
        | "attribute"
      text_direction_type: "ltr" | "rtl"
      time_format_type: "12h" | "24h"
      timeline_event_type:
        | "quest_completed"
        | "badge_earned"
        | "path_completed"
        | "milestone_reached"
        | "house_joined"
        | "ritual_performed"
        | "scene_witnessed"
      transaction_type:
        | "sale"
        | "residual"
        | "disbursement"
        | "payout"
        | "refund"
      translatable_type:
        | "post"
        | "product"
        | "quest"
        | "myth"
        | "lesson"
        | "page"
      user_status: "active" | "suspended" | "deleted"
      user_tier: "community" | "ally" | "corporate" | "council"
      verification_status: "pending" | "verified" | "rejected" | "suspended"
      webhook_status: "active" | "failed" | "disabled"
      workflow_status: "passing" | "failing" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      acid_persona: [
        "masked_traveler",
        "tab_hoarder",
        "seam_warrior",
        "void_dweller",
        "pattern_seeker",
        "quantum_witness",
      ],
      acid_question_type: [
        "multiple_choice",
        "slider",
        "checkbox",
        "scale",
        "text",
      ],
      action_type: [
        "post",
        "comment",
        "reaction",
        "emerald",
        "follow",
        "subscribe",
        "purchase",
        "join_house",
        "complete_quest",
        "earn_badge",
      ],
      activity_visibility: ["public", "followers", "private"],
      admin_log_category: [
        "user_management",
        "content_moderation",
        "financial",
        "system_config",
        "verification",
        "report_handling",
      ],
      admin_log_target_type: [
        "user",
        "creator",
        "vendor",
        "product",
        "sale",
        "payout",
        "report",
        "system",
      ],
      analytics_category: [
        "page_view",
        "user_action",
        "system",
        "error",
        "performance",
      ],
      application_status: [
        "pending",
        "reviewing",
        "approved",
        "rejected",
        "needs_info",
      ],
      application_type: ["creator", "vendor", "mentor", "moderator"],
      badge_rarity: ["common", "rare", "epic", "legendary", "mythic"],
      badge_tier: ["initiate", "adept", "master"],
      badge_type: [
        "quantum_weaver",
        "founding_council",
        "genesis_block",
        "sanctuary_guardian",
        "verified_creator",
        "verified_vendor",
        "community_leader",
        "first_sale",
        "first_purchase",
        "first_quest",
        "quest_master",
        "sovereign_seeker",
        "sovereign_adept",
        "sovereign_master",
        "contributor_concept",
        "contributor_code",
        "contributor_design",
        "contributor_content",
        "contributor_testing",
        "hearth_keeper_initiate",
        "hearth_keeper_adept",
        "hearth_keeper_master",
        "chancellor_initiate",
        "chancellor_adept",
        "chancellor_master",
        "seer_initiate",
        "seer_adept",
        "seer_master",
        "aethelred_initiate",
        "aethelred_adept",
        "aethelred_master",
        "curator_initiate",
        "curator_adept",
        "curator_master",
        "archivist_initiate",
        "archivist_adept",
        "archivist_master",
        "skald_initiate",
        "skald_adept",
        "skald_master",
        "codex_initiate",
        "codex_adept",
        "codex_master",
        "executioner_initiate",
        "executioner_adept",
        "executioner_master",
        "bigot_tax_exempt",
        "data_sovereign",
        "privacy_pioneer",
      ],
      bid_type: ["cpm", "cpc", "cpa"],
      bridge_status: ["active", "dormant", "transforming"],
      business_type: [
        "sole_proprietor",
        "llc",
        "nonprofit",
        "cooperative",
        "partnership",
        "other",
      ],
      calendar_event_type: [
        "holiday",
        "ritual",
        "milestone",
        "maintenance",
        "release",
      ],
      calendar_visibility: ["public", "house", "admin"],
      campaign_status: ["draft", "active", "paused", "completed"],
      communication_style: ["direct", "gentle", "detailed", "concise"],
      contact_direction: ["inbound", "outbound"],
      contact_status: ["new", "read", "replied", "resolved", "spam"],
      content_rating: ["general", "mature", "triggering", "explicit"],
      content_type: ["text", "image", "audio", "video", "mixed"],
      contribution_type: [
        "concept",
        "code",
        "design",
        "content",
        "testing",
        "promotion",
        "infrastructure",
      ],
      council_house: [
        "hearth_keeper",
        "chancellor",
        "seer",
        "aethelred",
        "curator",
        "archivist",
        "skald",
        "codex",
        "executioner",
      ],
      currency_position_type: ["before", "after"],
      custom_category_type: [
        "greeting",
        "communication",
        "gift",
        "taboo",
        "celebration",
        "business",
        "family",
      ],
      date_format_type: ["YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY"],
      delivery_status: ["operational", "degraded", "failed"],
      deployment_status: ["success", "building", "failed"],
      difficulty_level: ["beginner", "intermediate", "advanced", "master"],
      email_status: [
        "queued",
        "sent",
        "delivered",
        "opened",
        "clicked",
        "bounced",
        "failed",
      ],
      emerald_status: ["active", "refunded", "failed"],
      escalation_target: ["admin", "council", "executioner"],
      folksonomy_target_type: [
        "post",
        "product",
        "comment",
        "profile",
        "quest",
        "myth",
        "lesson",
        "scene",
      ],
      job_status: ["active", "paused", "completed", "failed"],
      job_type: ["cron", "one_time", "interval"],
      ledger_entity: ["buyer", "platform", "creator", "contributor"],
      ledger_entry_type: ["sale", "residual", "platform_fee", "payout"],
      lesson_content_type: [
        "text",
        "video",
        "audio",
        "interactive",
        "quiz",
        "exercise",
      ],
      life_cycle_phase: [
        "seedling",
        "sprout",
        "bloom",
        "harvest",
        "dormant",
        "renewal",
      ],
      maintenance_status: [
        "scheduled",
        "in_progress",
        "completed",
        "failed",
        "cancelled",
      ],
      maintenance_type: ["upgrade", "backup", "repair", "cleanup", "migration"],
      measurement_system_type: ["metric", "imperial", "us_customary"],
      message_status: ["sent", "delivered", "read", "deleted"],
      moderation_action_type: [
        "hide",
        "unhide",
        "delete",
        "restore",
        "warn",
        "suspend",
        "ban",
        "mute",
        "unmute",
        "verify",
        "unverify",
        "feature",
        "unfeature",
      ],
      moderation_target_type: [
        "user",
        "post",
        "comment",
        "reply",
        "product",
        "message",
        "channel",
      ],
      myth_type: ["origin", "parable", "ritual", "prophecy", "chronicle"],
      notification_type: [
        "comment_reply",
        "emerald_received",
        "subscription_renewal",
        "product_purchased",
        "application_approved",
        "application_rejected",
        "report_resolved",
        "report_rejected",
        "system_announcement",
        "quest_completed",
        "badge_earned",
        "house_promotion",
        "mentor_assigned",
      ],
      ontology_predicate: [
        "parent_of",
        "related_to",
        "requires",
        "contradicts",
        "evolves_to",
        "inspired_by",
      ],
      owner_type: ["creator", "vendor"],
      payment_status: ["pending", "completed", "refunded", "failed"],
      payout_frequency: ["weekly", "monthly", "quarterly"],
      payout_method: ["stripe", "paypal", "bank", "crypto"],
      payout_status: ["pending", "processing", "completed", "failed"],
      platform_environment: ["development", "staging", "production"],
      platform_status: ["operational", "degraded", "outage", "maintenance"],
      post_visibility: [
        "public",
        "subscribers",
        "tier_community",
        "tier_ally",
        "tier_corporate",
        "private",
      ],
      process_type: [
        "appeal",
        "verification",
        "payout_dispute",
        "content_review",
        "role_application",
      ],
      product_type: [
        "digital_course",
        "digital_download",
        "digital_membership",
        "digital_subscription",
        "digital_bundle",
        "physical_product",
        "physical_handmade",
        "physical_manufactured",
        "physical_custom",
        "audio",
        "video",
        "podcast",
        "music",
        "livestream",
        "event_live",
        "event_virtual",
        "workshop",
        "class",
        "consultation",
        "service",
        "commission",
        "contract",
        "sponsorship",
        "mutual_aid",
        "crowdfunding",
        "tip",
        "donation",
        "clothing",
        "accessory",
        "fabric",
        "pattern",
        "bundle",
        "kit",
        "subscription_box",
      ],
      progress_status: ["not_started", "in_progress", "completed", "mastered"],
      protocol_type: [
        "security",
        "incident",
        "escalation",
        "onboarding",
        "offboarding",
        "emergency",
      ],
      quest_status: [
        "locked",
        "available",
        "in_progress",
        "completed",
        "mastered",
      ],
      reaction_type: [
        "resonate",
        "support",
        "appreciate",
        "empathy",
        "celebrate",
      ],
      recurring_interval: ["month", "year"],
      report_status: [
        "pending",
        "reviewing",
        "resolved",
        "dismissed",
        "escalated",
      ],
      report_target_type: [
        "post",
        "comment",
        "reply",
        "product",
        "message",
        "profile",
        "channel",
      ],
      report_type: [
        "inappropriate_content",
        "harassment",
        "spam",
        "hate_speech",
        "impersonation",
        "copyright",
        "other",
      ],
      scene_type: [
        "ritual",
        "ceremony",
        "celebration",
        "initiation",
        "council",
        "vision_quest",
      ],
      script_type: ["deploy", "seed", "migration", "cleanup", "backup", "test"],
      setting_scope: ["global", "user", "role", "house"],
      source_pool_type: ["residual", "covenant", "platform"],
      stripe_mode: ["test", "live"],
      submission_type: [
        "text",
        "image",
        "file",
        "audio",
        "video",
        "link",
        "auto",
      ],
      subscription_status: ["active", "paused", "cancelled", "expired"],
      supabase_status: ["connected", "degraded", "disconnected"],
      superposition_status: ["active", "collapsed", "archived"],
      survey_audience_type: [
        "all",
        "creators",
        "vendors",
        "subscribers",
        "council",
      ],
      system_status: ["operational", "degraded", "outage", "maintenance"],
      system_type: ["database", "api", "storage", "auth", "queue", "cache"],
      target_type: [
        "post",
        "comment",
        "product",
        "user",
        "channel",
        "quest",
        "badge",
      ],
      taxonomy_node_type: [
        "domain",
        "category",
        "concept",
        "relationship",
        "attribute",
      ],
      text_direction_type: ["ltr", "rtl"],
      time_format_type: ["12h", "24h"],
      timeline_event_type: [
        "quest_completed",
        "badge_earned",
        "path_completed",
        "milestone_reached",
        "house_joined",
        "ritual_performed",
        "scene_witnessed",
      ],
      transaction_type: [
        "sale",
        "residual",
        "disbursement",
        "payout",
        "refund",
      ],
      translatable_type: ["post", "product", "quest", "myth", "lesson", "page"],
      user_status: ["active", "suspended", "deleted"],
      user_tier: ["community", "ally", "corporate", "council"],
      verification_status: ["pending", "verified", "rejected", "suspended"],
      webhook_status: ["active", "failed", "disabled"],
      workflow_status: ["passing", "failing", "pending"],
    },
  },
} as const