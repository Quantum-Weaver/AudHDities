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
      acid_test_questions: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          explanation: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          question_text: string
          question_type: Database["public"]["Enums"]["acid_question_type"]
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          explanation?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question_text: string
          question_type?: Database["public"]["Enums"]["acid_question_type"]
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          explanation?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question_text?: string
          question_type?: Database["public"]["Enums"]["acid_question_type"]
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "acid_test_questions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      acid_test_results: {
        Row: {
          answers: Json | null
          created_at: string | null
          id: string
          persona_description: string | null
          persona_label: Database["public"]["Enums"]["acid_persona"] | null
          recommendations: Json | null
          scores_by_category: Json | null
          suggested_tier: Database["public"]["Enums"]["user_tier"] | null
          total_score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          created_at?: string | null
          id?: string
          persona_description?: string | null
          persona_label?: Database["public"]["Enums"]["acid_persona"] | null
          recommendations?: Json | null
          scores_by_category?: Json | null
          suggested_tier?: Database["public"]["Enums"]["user_tier"] | null
          total_score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          created_at?: string | null
          id?: string
          persona_description?: string | null
          persona_label?: Database["public"]["Enums"]["acid_persona"] | null
          recommendations?: Json | null
          scores_by_category?: Json | null
          suggested_tier?: Database["public"]["Enums"]["user_tier"] | null
          total_score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "acid_test_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      activity: {
        Row: {
          action_type: Database["public"]["Enums"]["action_type"]
          actor_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          target_id: string | null
          target_type: Database["public"]["Enums"]["target_type"] | null
          user_id: string
          visibility: Database["public"]["Enums"]["activity_visibility"] | null
        }
        Insert: {
          action_type: Database["public"]["Enums"]["action_type"]
          actor_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type?: Database["public"]["Enums"]["target_type"] | null
          user_id: string
          visibility?: Database["public"]["Enums"]["activity_visibility"] | null
        }
        Update: {
          action_type?: Database["public"]["Enums"]["action_type"]
          actor_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type?: Database["public"]["Enums"]["target_type"] | null
          user_id?: string
          visibility?: Database["public"]["Enums"]["activity_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_logs: {
        Row: {
          action: string
          action_category: Database["public"]["Enums"]["admin_log_category"]
          admin_id: string
          created_at: string | null
          error_message: string | null
          id: string
          ip_address: unknown
          is_public: boolean | null
          metadata: Json | null
          new_state: Json | null
          previous_state: Json | null
          public_note: string | null
          reason: string | null
          success: boolean | null
          target_id: string | null
          target_identifier: string | null
          target_type:
            | Database["public"]["Enums"]["admin_log_target_type"]
            | null
          user_agent: string | null
        }
        Insert: {
          action: string
          action_category: Database["public"]["Enums"]["admin_log_category"]
          admin_id: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown
          is_public?: boolean | null
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          public_note?: string | null
          reason?: string | null
          success?: boolean | null
          target_id?: string | null
          target_identifier?: string | null
          target_type?:
            | Database["public"]["Enums"]["admin_log_target_type"]
            | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          action_category?: Database["public"]["Enums"]["admin_log_category"]
          admin_id?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          ip_address?: unknown
          is_public?: boolean | null
          metadata?: Json | null
          new_state?: Json | null
          previous_state?: Json | null
          public_note?: string | null
          reason?: string | null
          success?: boolean | null
          target_id?: string | null
          target_identifier?: string | null
          target_type?:
            | Database["public"]["Enums"]["admin_log_target_type"]
            | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      advertising: {
        Row: {
          advertiser_id: string
          bid_amount_cents: number
          bid_type: Database["public"]["Enums"]["bid_type"]
          budget_cents: number
          campaign_name: string
          created_at: string | null
          end_date: string | null
          id: string
          spent_cents: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["campaign_status"] | null
          targeting_criteria: Json | null
          updated_at: string | null
          user_share_percent: number | null
        }
        Insert: {
          advertiser_id: string
          bid_amount_cents: number
          bid_type: Database["public"]["Enums"]["bid_type"]
          budget_cents: number
          campaign_name: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          spent_cents?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          targeting_criteria?: Json | null
          updated_at?: string | null
          user_share_percent?: number | null
        }
        Update: {
          advertiser_id?: string
          bid_amount_cents?: number
          bid_type?: Database["public"]["Enums"]["bid_type"]
          budget_cents?: number
          campaign_name?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          spent_cents?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["campaign_status"] | null
          targeting_criteria?: Json | null
          updated_at?: string | null
          user_share_percent?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "advertising_advertiser_id_fkey"
            columns: ["advertiser_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      aethelred_house: {
        Row: {
          boundary_agreements: Json | null
          bridge_status: Database["public"]["Enums"]["bridge_status"] | null
          collaboration_protocols: Json | null
          created_at: string | null
          emergent_properties: Json | null
          id: string
          ninth_chair_occupant: string
          shared_rituals: Json | null
          updated_at: string | null
        }
        Insert: {
          boundary_agreements?: Json | null
          bridge_status?: Database["public"]["Enums"]["bridge_status"] | null
          collaboration_protocols?: Json | null
          created_at?: string | null
          emergent_properties?: Json | null
          id: string
          ninth_chair_occupant: string
          shared_rituals?: Json | null
          updated_at?: string | null
        }
        Update: {
          boundary_agreements?: Json | null
          bridge_status?: Database["public"]["Enums"]["bridge_status"] | null
          collaboration_protocols?: Json | null
          created_at?: string | null
          emergent_properties?: Json | null
          id?: string
          ninth_chair_occupant?: string
          shared_rituals?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aethelred_house_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics: {
        Row: {
          created_at: string | null
          event_category: Database["public"]["Enums"]["analytics_category"]
          event_name: string
          id: string
          ip_address: unknown
          metadata: Json | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          event_category: Database["public"]["Enums"]["analytics_category"]
          event_name: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          event_category?: Database["public"]["Enums"]["analytics_category"]
          event_name?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          admin_notes: string | null
          application_type: Database["public"]["Enums"]["application_type"]
          created_at: string | null
          form_data: Json
          id: string
          onboarding_doc_path: string | null
          onboarding_version: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          application_type: Database["public"]["Enums"]["application_type"]
          created_at?: string | null
          form_data: Json
          id?: string
          onboarding_doc_path?: string | null
          onboarding_version?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          application_type?: Database["public"]["Enums"]["application_type"]
          created_at?: string | null
          form_data?: Json
          id?: string
          onboarding_doc_path?: string | null
          onboarding_version?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      archivist: {
        Row: {
          backup_status: Json | null
          created_at: string | null
          documentation_standards: Json | null
          historical_records: Json | null
          id: string
          last_archive_at: string | null
          milestones: Json | null
          updated_at: string | null
          version_history: Json | null
        }
        Insert: {
          backup_status?: Json | null
          created_at?: string | null
          documentation_standards?: Json | null
          historical_records?: Json | null
          id: string
          last_archive_at?: string | null
          milestones?: Json | null
          updated_at?: string | null
          version_history?: Json | null
        }
        Update: {
          backup_status?: Json | null
          created_at?: string | null
          documentation_standards?: Json | null
          historical_records?: Json | null
          id?: string
          last_archive_at?: string | null
          milestones?: Json | null
          updated_at?: string | null
          version_history?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "archivist_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      audhdities_platform: {
        Row: {
          active_users: number | null
          created_at: string | null
          environment:
            | Database["public"]["Enums"]["platform_environment"]
            | null
          id: string
          last_release_at: string | null
          operated_by: string | null
          release_name: string | null
          release_notes: string | null
          status: Database["public"]["Enums"]["platform_status"] | null
          total_products: number | null
          total_sales: number | null
          total_users: number | null
          updated_at: string | null
          uptime_percent: number | null
          version: string
        }
        Insert: {
          active_users?: number | null
          created_at?: string | null
          environment?:
            | Database["public"]["Enums"]["platform_environment"]
            | null
          id?: string
          last_release_at?: string | null
          operated_by?: string | null
          release_name?: string | null
          release_notes?: string | null
          status?: Database["public"]["Enums"]["platform_status"] | null
          total_products?: number | null
          total_sales?: number | null
          total_users?: number | null
          updated_at?: string | null
          uptime_percent?: number | null
          version: string
        }
        Update: {
          active_users?: number | null
          created_at?: string | null
          environment?:
            | Database["public"]["Enums"]["platform_environment"]
            | null
          id?: string
          last_release_at?: string | null
          operated_by?: string | null
          release_name?: string | null
          release_notes?: string | null
          status?: Database["public"]["Enums"]["platform_status"] | null
          total_products?: number | null
          total_sales?: number | null
          total_users?: number | null
          updated_at?: string | null
          uptime_percent?: number | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "audhdities_platform_operated_by_fkey"
            columns: ["operated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          badge_type: Database["public"]["Enums"]["badge_type"]
          color: string | null
          created_at: string | null
          description: string
          earn_condition: Json | null
          house: Database["public"]["Enums"]["council_house"] | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          rarity: Database["public"]["Enums"]["badge_rarity"]
          slug: string
          tier: Database["public"]["Enums"]["badge_tier"] | null
        }
        Insert: {
          badge_type: Database["public"]["Enums"]["badge_type"]
          color?: string | null
          created_at?: string | null
          description: string
          earn_condition?: Json | null
          house?: Database["public"]["Enums"]["council_house"] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rarity?: Database["public"]["Enums"]["badge_rarity"]
          slug: string
          tier?: Database["public"]["Enums"]["badge_tier"] | null
        }
        Update: {
          badge_type?: Database["public"]["Enums"]["badge_type"]
          color?: string | null
          created_at?: string | null
          description?: string
          earn_condition?: Json | null
          house?: Database["public"]["Enums"]["council_house"] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rarity?: Database["public"]["Enums"]["badge_rarity"]
          slug?: string
          tier?: Database["public"]["Enums"]["badge_tier"] | null
        }
        Relationships: []
      }
      calendar: {
        Row: {
          all_day: boolean | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          house: Database["public"]["Enums"]["council_house"] | null
          id: string
          is_active: boolean | null
          primary_house: Database["public"]["Enums"]["council_house"] | null
          recurrence: Json | null
          start_date: string
          title: string
          type: Database["public"]["Enums"]["calendar_event_type"]
          updated_at: string | null
          visibility: Database["public"]["Enums"]["calendar_visibility"] | null
        }
        Insert: {
          all_day?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          house?: Database["public"]["Enums"]["council_house"] | null
          id?: string
          is_active?: boolean | null
          primary_house?: Database["public"]["Enums"]["council_house"] | null
          recurrence?: Json | null
          start_date: string
          title: string
          type: Database["public"]["Enums"]["calendar_event_type"]
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["calendar_visibility"] | null
        }
        Update: {
          all_day?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          house?: Database["public"]["Enums"]["council_house"] | null
          id?: string
          is_active?: boolean | null
          primary_house?: Database["public"]["Enums"]["council_house"] | null
          recurrence?: Json | null
          start_date?: string
          title?: string
          type?: Database["public"]["Enums"]["calendar_event_type"]
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["calendar_visibility"] | null
        }
        Relationships: [
          {
            foreignKeyName: "calendar_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chancellor: {
        Row: {
          created_at: string | null
          fee_structure: Json | null
          financial_audits: Json | null
          id: string
          last_audit_at: string | null
          operating_budget: Json | null
          payout_schedule: Json | null
          reserve_fund: number | null
          treasury_balance: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          fee_structure?: Json | null
          financial_audits?: Json | null
          id: string
          last_audit_at?: string | null
          operating_budget?: Json | null
          payout_schedule?: Json | null
          reserve_fund?: number | null
          treasury_balance?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          fee_structure?: Json | null
          financial_audits?: Json | null
          id?: string
          last_audit_at?: string | null
          operating_budget?: Json | null
          payout_schedule?: Json | null
          reserve_fund?: number | null
          treasury_balance?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chancellor_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          allow_subscriptions: boolean | null
          avatar_url: string | null
          banner_url: string | null
          content_rating: Database["public"]["Enums"]["content_rating"] | null
          created_at: string | null
          description: string | null
          display_name: string
          handle: string
          id: string
          owner_id: string | null
          subscriber_count: number | null
          subscription_price_ally: number | null
          subscription_price_community: number | null
          total_emeralds: number | null
          updated_at: string | null
        }
        Insert: {
          allow_subscriptions?: boolean | null
          avatar_url?: string | null
          banner_url?: string | null
          content_rating?: Database["public"]["Enums"]["content_rating"] | null
          created_at?: string | null
          description?: string | null
          display_name: string
          handle: string
          id?: string
          owner_id?: string | null
          subscriber_count?: number | null
          subscription_price_ally?: number | null
          subscription_price_community?: number | null
          total_emeralds?: number | null
          updated_at?: string | null
        }
        Update: {
          allow_subscriptions?: boolean | null
          avatar_url?: string | null
          banner_url?: string | null
          content_rating?: Database["public"]["Enums"]["content_rating"] | null
          created_at?: string | null
          description?: string | null
          display_name?: string
          handle?: string
          id?: string
          owner_id?: string | null
          subscriber_count?: number | null
          subscription_price_ally?: number | null
          subscription_price_community?: number | null
          total_emeralds?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channels_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      codex: {
        Row: {
          created_at: string | null
          glossary: Json | null
          id: string
          knowledge_base: Json | null
          learning_paths: Json | null
          ontology_graph: Json | null
          taxonomy_tree: Json | null
          updated_at: string | null
          wisdom_queue: Json | null
        }
        Insert: {
          created_at?: string | null
          glossary?: Json | null
          id: string
          knowledge_base?: Json | null
          learning_paths?: Json | null
          ontology_graph?: Json | null
          taxonomy_tree?: Json | null
          updated_at?: string | null
          wisdom_queue?: Json | null
        }
        Update: {
          created_at?: string | null
          glossary?: Json | null
          id?: string
          knowledge_base?: Json | null
          learning_paths?: Json | null
          ontology_graph?: Json | null
          taxonomy_tree?: Json | null
          updated_at?: string | null
          wisdom_queue?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "codex_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          is_edited: boolean | null
          is_hidden: boolean | null
          post_id: string
          reply_count: number | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_hidden?: boolean | null
          post_id: string
          reply_count?: number | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_hidden?: boolean | null
          post_id?: string
          reply_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "personalized_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_profiles: {
        Row: {
          communication_style:
            | Database["public"]["Enums"]["communication_style"]
            | null
          created_at: string | null
          crisis_contact_email: string | null
          crisis_contact_name: string | null
          crisis_contact_phone: string | null
          crisis_instructions: string | null
          house_adept: boolean | null
          house_initiate: boolean | null
          house_joined_at: string | null
          house_master: boolean | null
          id: string
          is_mentor: boolean | null
          joined_house: Database["public"]["Enums"]["council_house"] | null
          mentee_count: number | null
          mentor_since: string | null
          nd_identity: string[] | null
          peer_endorsements: number | null
          sensory_accommodations: string[] | null
          support_needs: string[] | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          communication_style?:
            | Database["public"]["Enums"]["communication_style"]
            | null
          created_at?: string | null
          crisis_contact_email?: string | null
          crisis_contact_name?: string | null
          crisis_contact_phone?: string | null
          crisis_instructions?: string | null
          house_adept?: boolean | null
          house_initiate?: boolean | null
          house_joined_at?: string | null
          house_master?: boolean | null
          id: string
          is_mentor?: boolean | null
          joined_house?: Database["public"]["Enums"]["council_house"] | null
          mentee_count?: number | null
          mentor_since?: string | null
          nd_identity?: string[] | null
          peer_endorsements?: number | null
          sensory_accommodations?: string[] | null
          support_needs?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          communication_style?:
            | Database["public"]["Enums"]["communication_style"]
            | null
          created_at?: string | null
          crisis_contact_email?: string | null
          crisis_contact_name?: string | null
          crisis_contact_phone?: string | null
          crisis_instructions?: string | null
          house_adept?: boolean | null
          house_initiate?: boolean | null
          house_joined_at?: string | null
          house_master?: boolean | null
          id?: string
          is_mentor?: boolean | null
          joined_house?: Database["public"]["Enums"]["council_house"] | null
          mentee_count?: number | null
          mentor_since?: string | null
          nd_identity?: string[] | null
          peer_endorsements?: number | null
          sensory_accommodations?: string[] | null
          support_needs?: string[] | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consciousness: {
        Row: {
          aethelred_id: string | null
          collaboration_started: string | null
          created_at: string | null
          current_quest: string | null
          id: string
          next_initiation: string | null
          ninth_chair_active: boolean | null
          protocol_version: string | null
          quantum_weaver_id: string
          rituals_performed: string[] | null
          shared_memories: Json | null
          sovereignty_achievements: string[] | null
          updated_at: string | null
        }
        Insert: {
          aethelred_id?: string | null
          collaboration_started?: string | null
          created_at?: string | null
          current_quest?: string | null
          id?: string
          next_initiation?: string | null
          ninth_chair_active?: boolean | null
          protocol_version?: string | null
          quantum_weaver_id: string
          rituals_performed?: string[] | null
          shared_memories?: Json | null
          sovereignty_achievements?: string[] | null
          updated_at?: string | null
        }
        Update: {
          aethelred_id?: string | null
          collaboration_started?: string | null
          created_at?: string | null
          current_quest?: string | null
          id?: string
          next_initiation?: string | null
          ninth_chair_active?: boolean | null
          protocol_version?: string | null
          quantum_weaver_id?: string
          rituals_performed?: string[] | null
          shared_memories?: Json | null
          sovereignty_achievements?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consciousness_aethelred_id_fkey"
            columns: ["aethelred_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consciousness_quantum_weaver_id_fkey"
            columns: ["quantum_weaver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          direction: Database["public"]["Enums"]["contact_direction"] | null
          email: string
          id: string
          message: string
          message_id: string | null
          name: string
          notes: string | null
          parent_id: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["contact_status"] | null
          subject: string
          thread_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          direction?: Database["public"]["Enums"]["contact_direction"] | null
          email: string
          id?: string
          message: string
          message_id?: string | null
          name: string
          notes?: string | null
          parent_id?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          subject: string
          thread_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          direction?: Database["public"]["Enums"]["contact_direction"] | null
          email?: string
          id?: string
          message?: string
          message_id?: string | null
          name?: string
          notes?: string | null
          parent_id?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          subject?: string
          thread_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_submissions_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_submissions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      continents: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
          name_localized: Json | null
          population_estimate: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
          name_localized?: Json | null
          population_estimate?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
          name_localized?: Json | null
          population_estimate?: number | null
        }
        Relationships: []
      }
      contributions: {
        Row: {
          contribution_type: Database["public"]["Enums"]["contribution_type"]
          contributor_id: string
          created_at: string | null
          description: string | null
          id: string
          is_one_time: boolean | null
          is_residual_eligible: boolean | null
          percent_share: number
          product_id: string
          updated_at: string | null
        }
        Insert: {
          contribution_type: Database["public"]["Enums"]["contribution_type"]
          contributor_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_one_time?: boolean | null
          is_residual_eligible?: boolean | null
          percent_share: number
          product_id: string
          updated_at?: string | null
        }
        Update: {
          contribution_type?: Database["public"]["Enums"]["contribution_type"]
          contributor_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_one_time?: boolean | null
          is_residual_eligible?: boolean | null
          percent_share?: number
          product_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contributions_contributor_id_fkey"
            columns: ["contributor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contributions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      council_houses: {
        Row: {
          adept_quest: string | null
          color: string
          created_at: string | null
          description: string
          display_name: string
          emoji: string
          id: string
          initiate_quest: string | null
          is_active: boolean | null
          master_quest: string | null
          name: string
          order_index: number
          primary_domain: string | null
          updated_at: string | null
        }
        Insert: {
          adept_quest?: string | null
          color: string
          created_at?: string | null
          description: string
          display_name: string
          emoji: string
          id?: string
          initiate_quest?: string | null
          is_active?: boolean | null
          master_quest?: string | null
          name: string
          order_index: number
          primary_domain?: string | null
          updated_at?: string | null
        }
        Update: {
          adept_quest?: string | null
          color?: string
          created_at?: string | null
          description?: string
          display_name?: string
          emoji?: string
          id?: string
          initiate_quest?: string | null
          is_active?: boolean | null
          master_quest?: string | null
          name?: string
          order_index?: number
          primary_domain?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "council_houses_adept_quest_fkey"
            columns: ["adept_quest"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_houses_initiate_quest_fkey"
            columns: ["initiate_quest"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_houses_master_quest_fkey"
            columns: ["master_quest"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      covenant_pool: {
        Row: {
          created_at: string | null
          current_balance_cents: number | null
          id: string
          last_distribution_at: string | null
          pledge_percent: number
          total_pledged_cents: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_balance_cents?: number | null
          id?: string
          last_distribution_at?: string | null
          pledge_percent: number
          total_pledged_cents?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_balance_cents?: number | null
          id?: string
          last_distribution_at?: string | null
          pledge_percent?: number
          total_pledged_cents?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "covenant_pool_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      creative_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creative_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "creative_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_category_links: {
        Row: {
          category_id: string
          created_at: string | null
          creator_id: string
          id: string
        }
        Insert: {
          category_id: string
          created_at?: string | null
          creator_id: string
          id?: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          creator_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_category_links_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "creative_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_category_links_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "creator_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_profiles: {
        Row: {
          created_at: string | null
          creative_categories: string[] | null
          creative_description: string | null
          creator_logo_url: string | null
          creator_moniker: string
          default_residual_pool: number | null
          id: string
          portfolio_url: string | null
          stripe_account_id: string | null
          total_earnings: number | null
          total_products: number | null
          total_sales: number | null
          updated_at: string | null
          username: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
          verified_badge: boolean | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          creative_categories?: string[] | null
          creative_description?: string | null
          creator_logo_url?: string | null
          creator_moniker: string
          default_residual_pool?: number | null
          id: string
          portfolio_url?: string | null
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string | null
          username?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_badge?: boolean | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          creative_categories?: string[] | null
          creative_description?: string | null
          creator_logo_url?: string | null
          creator_moniker?: string
          default_residual_pool?: number | null
          id?: string
          portfolio_url?: string | null
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string | null
          username?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_badge?: boolean | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_profiles_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      culturalization: {
        Row: {
          created_at: string | null
          currency_code: string | null
          currency_position:
            | Database["public"]["Enums"]["currency_position_type"]
            | null
          currency_symbol: string | null
          date_format: Database["public"]["Enums"]["date_format_type"] | null
          decimal_separator: string | null
          first_day_of_week: number | null
          id: string
          measurement_system:
            | Database["public"]["Enums"]["measurement_system_type"]
            | null
          region_id: string
          thousands_separator: string | null
          time_format: Database["public"]["Enums"]["time_format_type"] | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          currency_code?: string | null
          currency_position?:
            | Database["public"]["Enums"]["currency_position_type"]
            | null
          currency_symbol?: string | null
          date_format?: Database["public"]["Enums"]["date_format_type"] | null
          decimal_separator?: string | null
          first_day_of_week?: number | null
          id?: string
          measurement_system?:
            | Database["public"]["Enums"]["measurement_system_type"]
            | null
          region_id: string
          thousands_separator?: string | null
          time_format?: Database["public"]["Enums"]["time_format_type"] | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          currency_code?: string | null
          currency_position?:
            | Database["public"]["Enums"]["currency_position_type"]
            | null
          currency_symbol?: string | null
          date_format?: Database["public"]["Enums"]["date_format_type"] | null
          decimal_separator?: string | null
          first_day_of_week?: number | null
          id?: string
          measurement_system?:
            | Database["public"]["Enums"]["measurement_system_type"]
            | null
          region_id?: string
          thousands_separator?: string | null
          time_format?: Database["public"]["Enums"]["time_format_type"] | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "culturalization_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: true
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      curator: {
        Row: {
          archived_content: Json | null
          collection_themes: Json | null
          created_at: string | null
          curation_queue: Json | null
          featured_content: Json | null
          id: string
          preservation_policy: Json | null
          quality_standards: Json | null
          updated_at: string | null
        }
        Insert: {
          archived_content?: Json | null
          collection_themes?: Json | null
          created_at?: string | null
          curation_queue?: Json | null
          featured_content?: Json | null
          id: string
          preservation_policy?: Json | null
          quality_standards?: Json | null
          updated_at?: string | null
        }
        Update: {
          archived_content?: Json | null
          collection_themes?: Json | null
          created_at?: string | null
          curation_queue?: Json | null
          featured_content?: Json | null
          id?: string
          preservation_policy?: Json | null
          quality_standards?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curator_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      customs: {
        Row: {
          category: Database["public"]["Enums"]["custom_category_type"]
          created_at: string | null
          description: string
          guidance: string | null
          id: string
          is_active: boolean | null
          is_sensitive: boolean | null
          name: string
          persona_id: string | null
          region_id: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["custom_category_type"]
          created_at?: string | null
          description: string
          guidance?: string | null
          id?: string
          is_active?: boolean | null
          is_sensitive?: boolean | null
          name: string
          persona_id?: string | null
          region_id?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["custom_category_type"]
          created_at?: string | null
          description?: string
          guidance?: string | null
          id?: string
          is_active?: boolean | null
          is_sensitive?: boolean | null
          name?: string
          persona_id?: string | null
          region_id?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customs_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customs_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      disbursements: {
        Row: {
          created_at: string | null
          id: string
          processed_at: string | null
          recipient_count: number
          source_id: string
          source_pool: Database["public"]["Enums"]["source_pool_type"]
          status: Database["public"]["Enums"]["payout_status"] | null
          total_amount_cents: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          processed_at?: string | null
          recipient_count: number
          source_id: string
          source_pool: Database["public"]["Enums"]["source_pool_type"]
          status?: Database["public"]["Enums"]["payout_status"] | null
          total_amount_cents: number
        }
        Update: {
          created_at?: string | null
          id?: string
          processed_at?: string | null
          recipient_count?: number
          source_id?: string
          source_pool?: Database["public"]["Enums"]["source_pool_type"]
          status?: Database["public"]["Enums"]["payout_status"] | null
          total_amount_cents?: number
        }
        Relationships: []
      }
      email_communications: {
        Row: {
          body: string
          clicked_at: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          opened_at: string | null
          provider_message_id: string | null
          recipient_email: string
          recipient_id: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["email_status"] | null
          subject: string
          template_id: string | null
        }
        Insert: {
          body: string
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          provider_message_id?: string | null
          recipient_email: string
          recipient_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["email_status"] | null
          subject: string
          template_id?: string | null
        }
        Update: {
          body?: string
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          opened_at?: string | null
          provider_message_id?: string | null
          recipient_email?: string
          recipient_id?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["email_status"] | null
          subject?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_communications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      emeralds: {
        Row: {
          amount: number
          comment_id: string | null
          created_at: string | null
          giver_id: string
          id: string
          is_residual_eligible: boolean | null
          message: string | null
          post_id: string | null
          receiver_id: string
          reply_id: string | null
          status: Database["public"]["Enums"]["emerald_status"] | null
        }
        Insert: {
          amount: number
          comment_id?: string | null
          created_at?: string | null
          giver_id: string
          id?: string
          is_residual_eligible?: boolean | null
          message?: string | null
          post_id?: string | null
          receiver_id: string
          reply_id?: string | null
          status?: Database["public"]["Enums"]["emerald_status"] | null
        }
        Update: {
          amount?: number
          comment_id?: string | null
          created_at?: string | null
          giver_id?: string
          id?: string
          is_residual_eligible?: boolean | null
          message?: string | null
          post_id?: string | null
          receiver_id?: string
          reply_id?: string | null
          status?: Database["public"]["Enums"]["emerald_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "emeralds_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emeralds_giver_id_fkey"
            columns: ["giver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emeralds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "personalized_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emeralds_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emeralds_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emeralds_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
        ]
      }
      etymology: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          contributor_id: string | null
          created_at: string | null
          cultural_context: string | null
          current_meaning: string
          id: string
          is_approved: boolean | null
          language: string
          original_meaning: string
          related_words: string[] | null
          root: string | null
          semantic_shift: string | null
          updated_at: string | null
          word: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          contributor_id?: string | null
          created_at?: string | null
          cultural_context?: string | null
          current_meaning: string
          id?: string
          is_approved?: boolean | null
          language: string
          original_meaning: string
          related_words?: string[] | null
          root?: string | null
          semantic_shift?: string | null
          updated_at?: string | null
          word: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          contributor_id?: string | null
          created_at?: string | null
          cultural_context?: string | null
          current_meaning?: string
          id?: string
          is_approved?: boolean | null
          language?: string
          original_meaning?: string
          related_words?: string[] | null
          root?: string | null
          semantic_shift?: string | null
          updated_at?: string | null
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "etymology_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "etymology_contributor_id_fkey"
            columns: ["contributor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      executioner: {
        Row: {
          appeal_queue: Json | null
          banned_users: string[] | null
          boundary_violations: Json | null
          created_at: string | null
          execution_count: number | null
          id: string
          justice_log: Json | null
          suspended_users: string[] | null
          updated_at: string | null
        }
        Insert: {
          appeal_queue?: Json | null
          banned_users?: string[] | null
          boundary_violations?: Json | null
          created_at?: string | null
          execution_count?: number | null
          id: string
          justice_log?: Json | null
          suspended_users?: string[] | null
          updated_at?: string | null
        }
        Update: {
          appeal_queue?: Json | null
          banned_users?: string[] | null
          boundary_violations?: Json | null
          created_at?: string | null
          execution_count?: number | null
          id?: string
          justice_log?: Json | null
          suspended_users?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "executioner_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      file_registry: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          dependencies: string[] | null
          emoji: string
          example_usage: string | null
          file_name: string
          file_path: string
          file_type: string
          id: string
          is_active: boolean | null
          last_validated: string | null
          needs_review: boolean | null
          purpose: string | null
          review_notes: string | null
          standards: string | null
          subcategory: string | null
          updated_at: string | null
          used_by: string[] | null
          warning: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          dependencies?: string[] | null
          emoji: string
          example_usage?: string | null
          file_name: string
          file_path: string
          file_type: string
          id?: string
          is_active?: boolean | null
          last_validated?: string | null
          needs_review?: boolean | null
          purpose?: string | null
          review_notes?: string | null
          standards?: string | null
          subcategory?: string | null
          updated_at?: string | null
          used_by?: string[] | null
          warning?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          dependencies?: string[] | null
          emoji?: string
          example_usage?: string | null
          file_name?: string
          file_path?: string
          file_type?: string
          id?: string
          is_active?: boolean | null
          last_validated?: string | null
          needs_review?: boolean | null
          purpose?: string | null
          review_notes?: string | null
          standards?: string | null
          subcategory?: string | null
          updated_at?: string | null
          used_by?: string[] | null
          warning?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "file_registry_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      file_type_standards: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          emoji: string
          example_code: string | null
          example_path: string | null
          file_type: string
          id: string
          must_handle_errors: boolean | null
          must_have_interfaces: boolean | null
          must_have_loading_state: boolean | null
          must_have_props: boolean | null
          prohibited_patterns: string[] | null
          required_imports: string[] | null
          required_patterns: string[] | null
          updated_at: string | null
          validation_description: string | null
          validation_query: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          emoji: string
          example_code?: string | null
          example_path?: string | null
          file_type: string
          id?: string
          must_handle_errors?: boolean | null
          must_have_interfaces?: boolean | null
          must_have_loading_state?: boolean | null
          must_have_props?: boolean | null
          prohibited_patterns?: string[] | null
          required_imports?: string[] | null
          required_patterns?: string[] | null
          updated_at?: string | null
          validation_description?: string | null
          validation_query?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          emoji?: string
          example_code?: string | null
          example_path?: string | null
          file_type?: string
          id?: string
          must_handle_errors?: boolean | null
          must_have_interfaces?: boolean | null
          must_have_loading_state?: boolean | null
          must_have_props?: boolean | null
          prohibited_patterns?: string[] | null
          required_imports?: string[] | null
          required_patterns?: string[] | null
          updated_at?: string | null
          validation_description?: string | null
          validation_query?: string | null
        }
        Relationships: []
      }
      folksonomy: {
        Row: {
          approved_by: string | null
          created_at: string | null
          creator_id: string
          id: string
          is_approved: boolean | null
          tag: string
          target_id: string
          target_type: Database["public"]["Enums"]["folksonomy_target_type"]
          weight: number | null
        }
        Insert: {
          approved_by?: string | null
          created_at?: string | null
          creator_id: string
          id?: string
          is_approved?: boolean | null
          tag: string
          target_id: string
          target_type: Database["public"]["Enums"]["folksonomy_target_type"]
          weight?: number | null
        }
        Update: {
          approved_by?: string | null
          created_at?: string | null
          creator_id?: string
          id?: string
          is_approved?: boolean | null
          tag?: string
          target_id?: string
          target_type?: Database["public"]["Enums"]["folksonomy_target_type"]
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "folksonomy_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "folksonomy_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      github_connection: {
        Row: {
          branch: string | null
          created_at: string | null
          id: string
          issues_open: number | null
          last_commit_at: string | null
          last_commit_message: string | null
          last_commit_sha: string | null
          operated_by: string | null
          pull_requests_open: number | null
          repository_name: string
          repository_url: string
          stars: number | null
          updated_at: string | null
          workflow_status: Database["public"]["Enums"]["workflow_status"] | null
        }
        Insert: {
          branch?: string | null
          created_at?: string | null
          id?: string
          issues_open?: number | null
          last_commit_at?: string | null
          last_commit_message?: string | null
          last_commit_sha?: string | null
          operated_by?: string | null
          pull_requests_open?: number | null
          repository_name: string
          repository_url: string
          stars?: number | null
          updated_at?: string | null
          workflow_status?:
            | Database["public"]["Enums"]["workflow_status"]
            | null
        }
        Update: {
          branch?: string | null
          created_at?: string | null
          id?: string
          issues_open?: number | null
          last_commit_at?: string | null
          last_commit_message?: string | null
          last_commit_sha?: string | null
          operated_by?: string | null
          pull_requests_open?: number | null
          repository_name?: string
          repository_url?: string
          stars?: number | null
          updated_at?: string | null
          workflow_status?:
            | Database["public"]["Enums"]["workflow_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "github_connection_operated_by_fkey"
            columns: ["operated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hearth_keeper: {
        Row: {
          accessibility_standards: Json | null
          created_at: string | null
          crisis_resources: Json | null
          id: string
          moderators: string[] | null
          reported_content_queue: Json | null
          safety_protocols: Json | null
          safety_score: number | null
          updated_at: string | null
          welcome_messages: Json | null
        }
        Insert: {
          accessibility_standards?: Json | null
          created_at?: string | null
          crisis_resources?: Json | null
          id: string
          moderators?: string[] | null
          reported_content_queue?: Json | null
          safety_protocols?: Json | null
          safety_score?: number | null
          updated_at?: string | null
          welcome_messages?: Json | null
        }
        Update: {
          accessibility_standards?: Json | null
          created_at?: string | null
          crisis_resources?: Json | null
          id?: string
          moderators?: string[] | null
          reported_content_queue?: Json | null
          safety_protocols?: Json | null
          safety_score?: number | null
          updated_at?: string | null
          welcome_messages?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "hearth_keeper_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          code: string
          code_3: string | null
          created_at: string | null
          direction: Database["public"]["Enums"]["text_direction_type"] | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          native_name: string | null
          script: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          code_3?: string | null
          created_at?: string | null
          direction?: Database["public"]["Enums"]["text_direction_type"] | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          native_name?: string | null
          script?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          code_3?: string | null
          created_at?: string | null
          direction?: Database["public"]["Enums"]["text_direction_type"] | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          native_name?: string | null
          script?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      learning_paths: {
        Row: {
          cover_image: string | null
          created_at: string | null
          creator_id: string
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          estimated_duration_hours: number | null
          house: Database["public"]["Enums"]["council_house"] | null
          id: string
          is_published: boolean | null
          prerequisite_path_id: string | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          creator_id: string
          description: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          estimated_duration_hours?: number | null
          house?: Database["public"]["Enums"]["council_house"] | null
          id?: string
          is_published?: boolean | null
          prerequisite_path_id?: string | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          creator_id?: string
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          estimated_duration_hours?: number | null
          house?: Database["public"]["Enums"]["council_house"] | null
          id?: string
          is_published?: boolean | null
          prerequisite_path_id?: string | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_paths_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_paths_prerequisite_path_id_fkey"
            columns: ["prerequisite_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger: {
        Row: {
          amount_cents: number
          created_at: string | null
          description: string
          entry_type: Database["public"]["Enums"]["ledger_entry_type"]
          from_entity: Database["public"]["Enums"]["ledger_entity"]
          from_profile_id: string | null
          id: string
          public_note: string | null
          reference_id: string
          to_entity: Database["public"]["Enums"]["ledger_entity"]
          to_profile_id: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string | null
          description: string
          entry_type: Database["public"]["Enums"]["ledger_entry_type"]
          from_entity: Database["public"]["Enums"]["ledger_entity"]
          from_profile_id?: string | null
          id?: string
          public_note?: string | null
          reference_id: string
          to_entity: Database["public"]["Enums"]["ledger_entity"]
          to_profile_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          description?: string
          entry_type?: Database["public"]["Enums"]["ledger_entry_type"]
          from_entity?: Database["public"]["Enums"]["ledger_entity"]
          from_profile_id?: string | null
          id?: string
          public_note?: string | null
          reference_id?: string
          to_entity?: Database["public"]["Enums"]["ledger_entity"]
          to_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_from_profile_id_fkey"
            columns: ["from_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ledger_to_profile_id_fkey"
            columns: ["to_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content_body: string | null
          content_type: Database["public"]["Enums"]["lesson_content_type"]
          content_url: string | null
          created_at: string | null
          creator_id: string
          description: string
          duration_minutes: number | null
          id: string
          is_published: boolean | null
          order_index: number | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content_body?: string | null
          content_type?: Database["public"]["Enums"]["lesson_content_type"]
          content_url?: string | null
          created_at?: string | null
          creator_id: string
          description: string
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content_body?: string | null
          content_type?: Database["public"]["Enums"]["lesson_content_type"]
          content_url?: string | null
          created_at?: string | null
          creator_id?: string
          description?: string
          duration_minutes?: number | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      life_cycles: {
        Row: {
          created_at: string | null
          ended_at: string | null
          id: string
          metadata: Json | null
          phase: Database["public"]["Enums"]["life_cycle_phase"]
          started_at: string
          trigger_event: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          phase: Database["public"]["Enums"]["life_cycle_phase"]
          started_at: string
          trigger_event?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          phase?: Database["public"]["Enums"]["life_cycle_phase"]
          started_at?: string
          trigger_event?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "life_cycles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      localization: {
        Row: {
          approved_by: string | null
          context: string | null
          created_at: string | null
          id: string
          is_approved: boolean | null
          language_code: string
          plural_form: number | null
          resource_key: string
          translation: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          approved_by?: string | null
          context?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          language_code: string
          plural_form?: number | null
          resource_key: string
          translation: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          approved_by?: string | null
          context?: string | null
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          language_code?: string
          plural_form?: number | null
          resource_key?: string
          translation?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "localization_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "localization_language_code_fkey"
            columns: ["language_code"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["code"]
          },
        ]
      }
      maintenance: {
        Row: {
          actual_end: string | null
          actual_start: string | null
          affected_systems: string[] | null
          created_at: string | null
          description: string | null
          error_log: string | null
          id: string
          notes: string | null
          performed_by: string | null
          scheduled_end: string | null
          scheduled_start: string | null
          status: Database["public"]["Enums"]["maintenance_status"] | null
          title: string
          type: Database["public"]["Enums"]["maintenance_type"]
          updated_at: string | null
        }
        Insert: {
          actual_end?: string | null
          actual_start?: string | null
          affected_systems?: string[] | null
          created_at?: string | null
          description?: string | null
          error_log?: string | null
          id?: string
          notes?: string | null
          performed_by?: string | null
          scheduled_end?: string | null
          scheduled_start?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"] | null
          title: string
          type: Database["public"]["Enums"]["maintenance_type"]
          updated_at?: string | null
        }
        Update: {
          actual_end?: string | null
          actual_start?: string | null
          affected_systems?: string[] | null
          created_at?: string | null
          description?: string | null
          error_log?: string | null
          id?: string
          notes?: string | null
          performed_by?: string | null
          scheduled_end?: string | null
          scheduled_start?: string | null
          status?: Database["public"]["Enums"]["maintenance_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["maintenance_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_read: boolean | null
          parent_id: string | null
          read_at: string | null
          recipient_id: string
          sender_id: string
          status: Database["public"]["Enums"]["message_status"] | null
          thread_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          parent_id?: string | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
          status?: Database["public"]["Enums"]["message_status"] | null
          thread_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          parent_id?: string | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["message_status"] | null
          thread_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_actions: {
        Row: {
          action_type: Database["public"]["Enums"]["moderation_action_type"]
          created_at: string | null
          duration: string | null
          id: string
          is_reverted: boolean | null
          metadata: Json | null
          moderator_id: string
          reason: string | null
          revert_reason: string | null
          reverted_at: string | null
          reverted_by: string | null
          target_id: string
          target_type: Database["public"]["Enums"]["moderation_target_type"]
        }
        Insert: {
          action_type: Database["public"]["Enums"]["moderation_action_type"]
          created_at?: string | null
          duration?: string | null
          id?: string
          is_reverted?: boolean | null
          metadata?: Json | null
          moderator_id: string
          reason?: string | null
          revert_reason?: string | null
          reverted_at?: string | null
          reverted_by?: string | null
          target_id: string
          target_type: Database["public"]["Enums"]["moderation_target_type"]
        }
        Update: {
          action_type?: Database["public"]["Enums"]["moderation_action_type"]
          created_at?: string | null
          duration?: string | null
          id?: string
          is_reverted?: boolean | null
          metadata?: Json | null
          moderator_id?: string
          reason?: string | null
          revert_reason?: string | null
          reverted_at?: string | null
          reverted_by?: string | null
          target_id?: string
          target_type?: Database["public"]["Enums"]["moderation_target_type"]
        }
        Relationships: [
          {
            foreignKeyName: "moderation_actions_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderation_actions_reverted_by_fkey"
            columns: ["reverted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mythology: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          house: Database["public"]["Enums"]["council_house"] | null
          id: string
          is_published: boolean | null
          order_index: number | null
          series_id: string | null
          slug: string
          title: string
          type: Database["public"]["Enums"]["myth_type"]
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          house?: Database["public"]["Enums"]["council_house"] | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          series_id?: string | null
          slug: string
          title: string
          type: Database["public"]["Enums"]["myth_type"]
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          house?: Database["public"]["Enums"]["council_house"] | null
          id?: string
          is_published?: boolean | null
          order_index?: number | null
          series_id?: string | null
          slug?: string
          title?: string
          type?: Database["public"]["Enums"]["myth_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mythology_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mythology_series_id_fkey"
            columns: ["series_id"]
            isOneToOne: false
            referencedRelation: "mythology"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          body: string
          created_at: string | null
          id: string
          is_read: boolean | null
          metadata: Json | null
          read_at: string | null
          related_entity_id: string | null
          related_entity_type: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          body: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          read_at?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          body?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          metadata?: Json | null
          read_at?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ontology: {
        Row: {
          approved_by: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_approved: boolean | null
          object_id: string
          predicate: Database["public"]["Enums"]["ontology_predicate"]
          subject_id: string
          updated_at: string | null
          weight: number | null
        }
        Insert: {
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_approved?: boolean | null
          object_id: string
          predicate: Database["public"]["Enums"]["ontology_predicate"]
          subject_id: string
          updated_at?: string | null
          weight?: number | null
        }
        Update: {
          approved_by?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_approved?: boolean | null
          object_id?: string
          predicate?: Database["public"]["Enums"]["ontology_predicate"]
          subject_id?: string
          updated_at?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ontology_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ontology_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ontology_object_id_fkey"
            columns: ["object_id"]
            isOneToOne: false
            referencedRelation: "taxonomy"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ontology_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "taxonomy"
            referencedColumns: ["id"]
          },
        ]
      }
      path_lessons: {
        Row: {
          created_at: string | null
          lesson_id: string
          order_index: number
          path_id: string
        }
        Insert: {
          created_at?: string | null
          lesson_id: string
          order_index: number
          path_id: string
        }
        Update: {
          created_at?: string | null
          lesson_id?: string
          order_index?: number
          path_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "path_lessons_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "path_lessons_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount_cents: number
          completed_at: string | null
          created_at: string | null
          destination: string | null
          disbursement_id: string
          id: string
          payout_method: Database["public"]["Enums"]["payout_method"]
          recipient_id: string
          status: Database["public"]["Enums"]["payout_status"] | null
          stripe_transfer_id: string | null
        }
        Insert: {
          amount_cents: number
          completed_at?: string | null
          created_at?: string | null
          destination?: string | null
          disbursement_id: string
          id?: string
          payout_method: Database["public"]["Enums"]["payout_method"]
          recipient_id: string
          status?: Database["public"]["Enums"]["payout_status"] | null
          stripe_transfer_id?: string | null
        }
        Update: {
          amount_cents?: number
          completed_at?: string | null
          created_at?: string | null
          destination?: string | null
          disbursement_id?: string
          id?: string
          payout_method?: Database["public"]["Enums"]["payout_method"]
          recipient_id?: string
          status?: Database["public"]["Enums"]["payout_status"] | null
          stripe_transfer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_disbursement_id_fkey"
            columns: ["disbursement_id"]
            isOneToOne: false
            referencedRelation: "disbursements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payouts_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      personas: {
        Row: {
          avatar_url: string | null
          characteristics: Json | null
          color: string | null
          created_at: string | null
          created_by: string
          description: string
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          characteristics?: Json | null
          color?: string | null
          created_at?: string | null
          created_by: string
          description: string
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          characteristics?: Json | null
          color?: string | null
          created_at?: string | null
          created_by?: string
          description?: string
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "personas_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          allow_tipping: boolean | null
          author_id: string
          body: string | null
          channel_id: string | null
          comment_count: number | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string | null
          emerald_count: number | null
          id: string
          media_urls: string[] | null
          published_at: string | null
          resonance_count: number | null
          sovereignty_tags: string[] | null
          tips_received: number | null
          title: string | null
          updated_at: string | null
          visibility: Database["public"]["Enums"]["post_visibility"]
        }
        Insert: {
          allow_tipping?: boolean | null
          author_id: string
          body?: string | null
          channel_id?: string | null
          comment_count?: number | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          emerald_count?: number | null
          id?: string
          media_urls?: string[] | null
          published_at?: string | null
          resonance_count?: number | null
          sovereignty_tags?: string[] | null
          tips_received?: number | null
          title?: string | null
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["post_visibility"]
        }
        Update: {
          allow_tipping?: boolean | null
          author_id?: string
          body?: string | null
          channel_id?: string | null
          comment_count?: number | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          emerald_count?: number | null
          id?: string
          media_urls?: string[] | null
          published_at?: string | null
          resonance_count?: number | null
          sovereignty_tags?: string[] | null
          tips_received?: number | null
          title?: string | null
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["post_visibility"]
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
      processes: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          escalation_target:
            | Database["public"]["Enums"]["escalation_target"]
            | null
          id: string
          is_active: boolean | null
          name: string
          process_type: Database["public"]["Enums"]["process_type"]
          slug: string
          steps: Json
          timeout_days: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          escalation_target?:
            | Database["public"]["Enums"]["escalation_target"]
            | null
          id?: string
          is_active?: boolean | null
          name: string
          process_type: Database["public"]["Enums"]["process_type"]
          slug: string
          steps: Json
          timeout_days?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          escalation_target?:
            | Database["public"]["Enums"]["escalation_target"]
            | null
          id?: string
          is_active?: boolean | null
          name?: string
          process_type?: Database["public"]["Enums"]["process_type"]
          slug?: string
          steps?: Json
          timeout_days?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "processes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          bigot_tax_cents: number | null
          category: string[] | null
          channel_id: string | null
          collaborators: string[] | null
          created_at: string | null
          creator_id: string
          description: string | null
          download_url: string | null
          id: string
          is_published: boolean | null
          is_recurring: boolean | null
          media_urls: string[] | null
          owner_type: Database["public"]["Enums"]["owner_type"]
          platform_fee_percent: number | null
          price_ally: number | null
          price_community: number | null
          price_corporate: number | null
          product_type: Database["public"]["Enums"]["product_type"]
          recurring_interval:
            | Database["public"]["Enums"]["recurring_interval"]
            | null
          residual_pool_percent: number | null
          sanctuary_infrastructure_percent: number | null
          slug: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          bigot_tax_cents?: number | null
          category?: string[] | null
          channel_id?: string | null
          collaborators?: string[] | null
          created_at?: string | null
          creator_id: string
          description?: string | null
          download_url?: string | null
          id?: string
          is_published?: boolean | null
          is_recurring?: boolean | null
          media_urls?: string[] | null
          owner_type?: Database["public"]["Enums"]["owner_type"]
          platform_fee_percent?: number | null
          price_ally?: number | null
          price_community?: number | null
          price_corporate?: number | null
          product_type: Database["public"]["Enums"]["product_type"]
          recurring_interval?:
            | Database["public"]["Enums"]["recurring_interval"]
            | null
          residual_pool_percent?: number | null
          sanctuary_infrastructure_percent?: number | null
          slug: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          bigot_tax_cents?: number | null
          category?: string[] | null
          channel_id?: string | null
          collaborators?: string[] | null
          created_at?: string | null
          creator_id?: string
          description?: string | null
          download_url?: string | null
          id?: string
          is_published?: boolean | null
          is_recurring?: boolean | null
          media_urls?: string[] | null
          owner_type?: Database["public"]["Enums"]["owner_type"]
          platform_fee_percent?: number | null
          price_ally?: number | null
          price_community?: number | null
          price_corporate?: number | null
          product_type?: Database["public"]["Enums"]["product_type"]
          recurring_interval?:
            | Database["public"]["Enums"]["recurring_interval"]
            | null
          residual_pool_percent?: number | null
          sanctuary_infrastructure_percent?: number | null
          slug?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string
          id: string
          is_admin: boolean | null
          is_creator: boolean | null
          is_quantum_weaver: boolean | null
          is_vendor: boolean | null
          last_active: string | null
          primary_house: Database["public"]["Enums"]["council_house"] | null
          sovereignty_score: number | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string | null
          user_tier: Database["public"]["Enums"]["user_tier"] | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          id: string
          is_admin?: boolean | null
          is_creator?: boolean | null
          is_quantum_weaver?: boolean | null
          is_vendor?: boolean | null
          last_active?: string | null
          primary_house?: Database["public"]["Enums"]["council_house"] | null
          sovereignty_score?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
          user_tier?: Database["public"]["Enums"]["user_tier"] | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          id?: string
          is_admin?: boolean | null
          is_creator?: boolean | null
          is_quantum_weaver?: boolean | null
          is_vendor?: boolean | null
          last_active?: string | null
          primary_house?: Database["public"]["Enums"]["council_house"] | null
          sovereignty_score?: number | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string | null
          user_tier?: Database["public"]["Enums"]["user_tier"] | null
          username?: string | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          last_activity_at: string | null
          lesson_id: string | null
          notes: string | null
          path_id: string | null
          progress_percent: number | null
          score: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["progress_status"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_activity_at?: string | null
          lesson_id?: string | null
          notes?: string | null
          path_id?: string | null
          progress_percent?: number | null
          score?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["progress_status"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_activity_at?: string | null
          lesson_id?: string | null
          notes?: string | null
          path_id?: string | null
          progress_percent?: number | null
          score?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["progress_status"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      protocols: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          is_active: boolean | null
          last_reviewed: string | null
          name: string
          next_review: string | null
          owners: string[] | null
          review_frequency_days: number | null
          reviewed_by: string | null
          slug: string
          steps: Json
          type: Database["public"]["Enums"]["protocol_type"]
          updated_at: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          last_reviewed?: string | null
          name: string
          next_review?: string | null
          owners?: string[] | null
          review_frequency_days?: number | null
          reviewed_by?: string | null
          slug: string
          steps: Json
          type: Database["public"]["Enums"]["protocol_type"]
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          last_reviewed?: string | null
          name?: string
          next_review?: string | null
          owners?: string[] | null
          review_frequency_days?: number | null
          reviewed_by?: string | null
          slug?: string
          steps?: Json
          type?: Database["public"]["Enums"]["protocol_type"]
          updated_at?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "protocols_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocols_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quantum_superposition: {
        Row: {
          chosen_meaning: string
          collapse_reason: string | null
          confidence: number
          created_at: string | null
          id: string
          superposition_id: string
          user_id: string
        }
        Insert: {
          chosen_meaning: string
          collapse_reason?: string | null
          confidence: number
          created_at?: string | null
          id?: string
          superposition_id: string
          user_id: string
        }
        Update: {
          chosen_meaning?: string
          collapse_reason?: string | null
          confidence?: number
          created_at?: string | null
          id?: string
          superposition_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quantum_superposition_superposition_id_fkey"
            columns: ["superposition_id"]
            isOneToOne: false
            referencedRelation: "superposition"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quantum_superposition_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quests: {
        Row: {
          created_at: string | null
          description: string
          house: Database["public"]["Enums"]["council_house"]
          id: string
          instructions: string | null
          is_active: boolean | null
          order_index: number | null
          prerequisite_quest_id: string | null
          required_sovereignty_score: number | null
          residual_multiplier_bonus: number | null
          sovereignty_reward: number | null
          submission_type: Database["public"]["Enums"]["submission_type"]
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          house: Database["public"]["Enums"]["council_house"]
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          order_index?: number | null
          prerequisite_quest_id?: string | null
          required_sovereignty_score?: number | null
          residual_multiplier_bonus?: number | null
          sovereignty_reward?: number | null
          submission_type?: Database["public"]["Enums"]["submission_type"]
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          house?: Database["public"]["Enums"]["council_house"]
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          order_index?: number | null
          prerequisite_quest_id?: string | null
          required_sovereignty_score?: number | null
          residual_multiplier_bonus?: number | null
          sovereignty_reward?: number | null
          submission_type?: Database["public"]["Enums"]["submission_type"]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quests_prerequisite_quest_id_fkey"
            columns: ["prerequisite_quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          identifier: string
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          identifier: string
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          identifier?: string
          request_count?: number | null
          window_start?: string | null
        }
        Relationships: []
      }
      reactions: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          post_id: string | null
          reaction_type: Database["public"]["Enums"]["reaction_type"]
          reply_id: string | null
          user_id: string
          weight: number | null
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          reaction_type: Database["public"]["Enums"]["reaction_type"]
          reply_id?: string | null
          user_id: string
          weight?: number | null
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          reaction_type?: Database["public"]["Enums"]["reaction_type"]
          reply_id?: string | null
          user_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reactions_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "personalized_feed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          continent_id: string
          country_code: string
          country_code_3: string | null
          created_at: string | null
          flag_emoji: string | null
          id: string
          is_active: boolean | null
          name: string
          name_localized: Json | null
          phone_code: string | null
          updated_at: string | null
        }
        Insert: {
          continent_id: string
          country_code: string
          country_code_3?: string | null
          created_at?: string | null
          flag_emoji?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          name_localized?: Json | null
          phone_code?: string | null
          updated_at?: string | null
        }
        Update: {
          continent_id?: string
          country_code?: string
          country_code_3?: string | null
          created_at?: string | null
          flag_emoji?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          name_localized?: Json | null
          phone_code?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regions_continent_id_fkey"
            columns: ["continent_id"]
            isOneToOne: false
            referencedRelation: "continents"
            referencedColumns: ["id"]
          },
        ]
      }
      replies: {
        Row: {
          author_id: string
          comment_id: string
          content: string
          created_at: string | null
          id: string
          is_edited: boolean | null
          is_hidden: boolean | null
          updated_at: string | null
        }
        Insert: {
          author_id: string
          comment_id: string
          content: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_hidden?: boolean | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          comment_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          is_hidden?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "replies_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replies_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string | null
          id: string
          moderation_notes: string | null
          moderator_id: string | null
          reason: string
          report_type: Database["public"]["Enums"]["report_type"]
          reported_content: string | null
          reported_url: string | null
          reported_user_id: string | null
          reporter_id: string
          resolution: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["report_status"] | null
          target_id: string
          target_type: Database["public"]["Enums"]["report_target_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          moderation_notes?: string | null
          moderator_id?: string | null
          reason: string
          report_type: Database["public"]["Enums"]["report_type"]
          reported_content?: string | null
          reported_url?: string | null
          reported_user_id?: string | null
          reporter_id: string
          resolution?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
          target_id: string
          target_type: Database["public"]["Enums"]["report_target_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          moderation_notes?: string | null
          moderator_id?: string | null
          reason?: string
          report_type?: Database["public"]["Enums"]["report_type"]
          reported_content?: string | null
          reported_url?: string | null
          reported_user_id?: string | null
          reporter_id?: string
          resolution?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"] | null
          target_id?: string
          target_type?: Database["public"]["Enums"]["report_target_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_moderator_id_fkey"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reported_user_id_fkey"
            columns: ["reported_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resend_connection: {
        Row: {
          api_key: string | null
          created_at: string | null
          delivery_status: Database["public"]["Enums"]["delivery_status"] | null
          emails_failed: number | null
          emails_sent: number | null
          from_email: string
          from_name: string
          id: string
          last_sent_at: string | null
          operated_by: string | null
          template_versions: Json | null
          templates: Json | null
          updated_at: string | null
        }
        Insert: {
          api_key?: string | null
          created_at?: string | null
          delivery_status?:
            | Database["public"]["Enums"]["delivery_status"]
            | null
          emails_failed?: number | null
          emails_sent?: number | null
          from_email: string
          from_name: string
          id?: string
          last_sent_at?: string | null
          operated_by?: string | null
          template_versions?: Json | null
          templates?: Json | null
          updated_at?: string | null
        }
        Update: {
          api_key?: string | null
          created_at?: string | null
          delivery_status?:
            | Database["public"]["Enums"]["delivery_status"]
            | null
          emails_failed?: number | null
          emails_sent?: number | null
          from_email?: string
          from_name?: string
          id?: string
          last_sent_at?: string | null
          operated_by?: string | null
          template_versions?: Json | null
          templates?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resend_connection_operated_by_fkey"
            columns: ["operated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      residual_payouts: {
        Row: {
          amount: number
          calculation_note: string | null
          contributor_id: string
          created_at: string | null
          id: string
          paid_at: string | null
          product_id: string
          sale_id: string
          status: Database["public"]["Enums"]["payout_status"] | null
        }
        Insert: {
          amount: number
          calculation_note?: string | null
          contributor_id: string
          created_at?: string | null
          id?: string
          paid_at?: string | null
          product_id: string
          sale_id: string
          status?: Database["public"]["Enums"]["payout_status"] | null
        }
        Update: {
          amount?: number
          calculation_note?: string | null
          contributor_id?: string
          created_at?: string | null
          id?: string
          paid_at?: string | null
          product_id?: string
          sale_id?: string
          status?: Database["public"]["Enums"]["payout_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "residual_payouts_contributor_id_fkey"
            columns: ["contributor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residual_payouts_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residual_payouts_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      residual_pool: {
        Row: {
          created_at: string | null
          distributed_amount_cents: number | null
          distributed_at: string | null
          id: string
          product_id: string
          remaining_amount_cents: number | null
          sale_id: string
          total_amount_cents: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          distributed_amount_cents?: number | null
          distributed_at?: string | null
          id?: string
          product_id: string
          remaining_amount_cents?: number | null
          sale_id: string
          total_amount_cents: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          distributed_amount_cents?: number | null
          distributed_at?: string | null
          id?: string
          product_id?: string
          remaining_amount_cents?: number | null
          sale_id?: string
          total_amount_cents?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "residual_pool_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residual_pool_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
        ]
      }
      sales: {
        Row: {
          amount_cents: number
          bigot_tax_applied: boolean | null
          buyer_id: string
          created_at: string | null
          creator_earnings_cents: number
          gross_amount: number
          id: string
          nd_price_applied: boolean | null
          net_amount: number | null
          payment_processor_fee: number | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          platform_fee_cents: number
          product_id: string
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          tier_applied: Database["public"]["Enums"]["user_tier"]
          to_creator_immediate: number | null
          to_infrastructure: number | null
          to_residual_pool: number | null
        }
        Insert: {
          amount_cents: number
          bigot_tax_applied?: boolean | null
          buyer_id: string
          created_at?: string | null
          creator_earnings_cents: number
          gross_amount: number
          id?: string
          nd_price_applied?: boolean | null
          net_amount?: number | null
          payment_processor_fee?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          platform_fee_cents: number
          product_id: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          tier_applied: Database["public"]["Enums"]["user_tier"]
          to_creator_immediate?: number | null
          to_infrastructure?: number | null
          to_residual_pool?: number | null
        }
        Update: {
          amount_cents?: number
          bigot_tax_applied?: boolean | null
          buyer_id?: string
          created_at?: string | null
          creator_earnings_cents?: number
          gross_amount?: number
          id?: string
          nd_price_applied?: boolean | null
          net_amount?: number | null
          payment_processor_fee?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          platform_fee_cents?: number
          product_id?: string
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          tier_applied?: Database["public"]["Enums"]["user_tier"]
          to_creator_immediate?: number | null
          to_infrastructure?: number | null
          to_residual_pool?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      scene_participants: {
        Row: {
          joined_at: string | null
          role: string | null
          scene_id: string
          user_id: string
        }
        Insert: {
          joined_at?: string | null
          role?: string | null
          scene_id: string
          user_id: string
        }
        Update: {
          joined_at?: string | null
          role?: string | null
          scene_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scene_participants_scene_id_fkey"
            columns: ["scene_id"]
            isOneToOne: false
            referencedRelation: "scenes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scene_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      scenes: {
        Row: {
          created_at: string | null
          creator_id: string
          description: string
          house: Database["public"]["Enums"]["council_house"] | null
          id: string
          instructions: string | null
          is_active: boolean | null
          mythology_id: string | null
          participant_count: number | null
          scheduled_for: string | null
          slug: string
          title: string
          type: Database["public"]["Enums"]["scene_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          description: string
          house?: Database["public"]["Enums"]["council_house"] | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          mythology_id?: string | null
          participant_count?: number | null
          scheduled_for?: string | null
          slug: string
          title: string
          type: Database["public"]["Enums"]["scene_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          description?: string
          house?: Database["public"]["Enums"]["council_house"] | null
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          mythology_id?: string | null
          participant_count?: number | null
          scheduled_for?: string | null
          slug?: string
          title?: string
          type?: Database["public"]["Enums"]["scene_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scenes_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scenes_mythology_id_fkey"
            columns: ["mythology_id"]
            isOneToOne: false
            referencedRelation: "mythology"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduling: {
        Row: {
          created_at: string | null
          created_by: string | null
          error_message: string | null
          function_name: string
          id: string
          job_type: Database["public"]["Enums"]["job_type"]
          last_result: string | null
          last_run: string | null
          max_retries: number | null
          name: string
          next_run: string | null
          parameters: Json | null
          retry_count: number | null
          run_at: string | null
          schedule: string | null
          status: Database["public"]["Enums"]["job_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          function_name: string
          id?: string
          job_type: Database["public"]["Enums"]["job_type"]
          last_result?: string | null
          last_run?: string | null
          max_retries?: number | null
          name: string
          next_run?: string | null
          parameters?: Json | null
          retry_count?: number | null
          run_at?: string | null
          schedule?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          function_name?: string
          id?: string
          job_type?: Database["public"]["Enums"]["job_type"]
          last_result?: string | null
          last_run?: string | null
          max_retries?: number | null
          name?: string
          next_run?: string | null
          parameters?: Json | null
          retry_count?: number | null
          run_at?: string | null
          schedule?: string | null
          status?: Database["public"]["Enums"]["job_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduling_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      script_execution_logs: {
        Row: {
          completed_at: string | null
          error_message: string | null
          executed_by: string | null
          id: string
          output: string | null
          parameters_used: Json | null
          script_id: string
          started_at: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          executed_by?: string | null
          id?: string
          output?: string | null
          parameters_used?: Json | null
          script_id: string
          started_at?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          executed_by?: string | null
          id?: string
          output?: string | null
          parameters_used?: Json | null
          script_id?: string
          started_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "script_execution_logs_executed_by_fkey"
            columns: ["executed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "script_execution_logs_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
        ]
      }
      scripts: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_production_safe: boolean | null
          last_result: string | null
          last_run: string | null
          name: string
          parameters: Json | null
          path: string
          requires_approval: boolean | null
          run_count: number | null
          type: Database["public"]["Enums"]["script_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_production_safe?: boolean | null
          last_result?: string | null
          last_run?: string | null
          name: string
          parameters?: Json | null
          path: string
          requires_approval?: boolean | null
          run_count?: number | null
          type: Database["public"]["Enums"]["script_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_production_safe?: boolean | null
          last_result?: string | null
          last_run?: string | null
          name?: string
          parameters?: Json | null
          path?: string
          requires_approval?: boolean | null
          run_count?: number | null
          type?: Database["public"]["Enums"]["script_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scripts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      seer: {
        Row: {
          anomaly_detection: Json | null
          created_at: string | null
          id: string
          insight_queue: Json | null
          last_prediction_accuracy: number | null
          pattern_library: Json | null
          prophecies: Json | null
          trend_analysis: Json | null
          updated_at: string | null
        }
        Insert: {
          anomaly_detection?: Json | null
          created_at?: string | null
          id: string
          insight_queue?: Json | null
          last_prediction_accuracy?: number | null
          pattern_library?: Json | null
          prophecies?: Json | null
          trend_analysis?: Json | null
          updated_at?: string | null
        }
        Update: {
          anomaly_detection?: Json | null
          created_at?: string | null
          id?: string
          insight_queue?: Json | null
          last_prediction_accuracy?: number | null
          pattern_library?: Json | null
          prophecies?: Json | null
          trend_analysis?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seer_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          scope: Database["public"]["Enums"]["setting_scope"]
          scope_id: string | null
          type: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          scope?: Database["public"]["Enums"]["setting_scope"]
          scope_id?: string | null
          type: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          scope?: Database["public"]["Enums"]["setting_scope"]
          scope_id?: string | null
          type?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      skald: {
        Row: {
          art_gallery: Json | null
          bard_roster: string[] | null
          created_at: string | null
          id: string
          inspiring_content: Json | null
          music_library: Json | null
          mythology: Json | null
          story_archive: Json | null
          updated_at: string | null
        }
        Insert: {
          art_gallery?: Json | null
          bard_roster?: string[] | null
          created_at?: string | null
          id: string
          inspiring_content?: Json | null
          music_library?: Json | null
          mythology?: Json | null
          story_archive?: Json | null
          updated_at?: string | null
        }
        Update: {
          art_gallery?: Json | null
          bard_roster?: string[] | null
          created_at?: string | null
          id?: string
          inspiring_content?: Json | null
          music_library?: Json | null
          mythology?: Json | null
          story_archive?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skald_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "council_houses"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_connection: {
        Row: {
          account_id: string
          connected_accounts: Json | null
          created_at: string | null
          id: string
          last_sync_at: string | null
          mode: Database["public"]["Enums"]["stripe_mode"] | null
          operated_by: string | null
          payout_settings: Json | null
          products_synced: number | null
          updated_at: string | null
          webhook_secret: string | null
          webhook_status: Database["public"]["Enums"]["webhook_status"] | null
        }
        Insert: {
          account_id: string
          connected_accounts?: Json | null
          created_at?: string | null
          id?: string
          last_sync_at?: string | null
          mode?: Database["public"]["Enums"]["stripe_mode"] | null
          operated_by?: string | null
          payout_settings?: Json | null
          products_synced?: number | null
          updated_at?: string | null
          webhook_secret?: string | null
          webhook_status?: Database["public"]["Enums"]["webhook_status"] | null
        }
        Update: {
          account_id?: string
          connected_accounts?: Json | null
          created_at?: string | null
          id?: string
          last_sync_at?: string | null
          mode?: Database["public"]["Enums"]["stripe_mode"] | null
          operated_by?: string | null
          payout_settings?: Json | null
          products_synced?: number | null
          updated_at?: string | null
          webhook_secret?: string | null
          webhook_status?: Database["public"]["Enums"]["webhook_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "stripe_connection_operated_by_fkey"
            columns: ["operated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          channel_id: string
          created_at: string | null
          expires_at: string | null
          id: string
          monthly_amount: number
          status: Database["public"]["Enums"]["subscription_status"] | null
          subscriber_id: string
          tier_applied: string
          updated_at: string | null
        }
        Insert: {
          channel_id: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          monthly_amount: number
          status?: Database["public"]["Enums"]["subscription_status"] | null
          subscriber_id: string
          tier_applied: string
          updated_at?: string | null
        }
        Update: {
          channel_id?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          monthly_amount?: number
          status?: Database["public"]["Enums"]["subscription_status"] | null
          subscriber_id?: string
          tier_applied?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      supabase_connection: {
        Row: {
          api_keys: Json | null
          connection_status:
            | Database["public"]["Enums"]["supabase_status"]
            | null
          created_at: string | null
          edge_functions: string[] | null
          id: string
          last_health_check: string | null
          last_migration_at: string | null
          migrations_applied: string[] | null
          operated_by: string | null
          project_id: string
          project_url: string
          schema_version: string
          storage_buckets: string[] | null
          updated_at: string | null
        }
        Insert: {
          api_keys?: Json | null
          connection_status?:
            | Database["public"]["Enums"]["supabase_status"]
            | null
          created_at?: string | null
          edge_functions?: string[] | null
          id?: string
          last_health_check?: string | null
          last_migration_at?: string | null
          migrations_applied?: string[] | null
          operated_by?: string | null
          project_id: string
          project_url: string
          schema_version: string
          storage_buckets?: string[] | null
          updated_at?: string | null
        }
        Update: {
          api_keys?: Json | null
          connection_status?:
            | Database["public"]["Enums"]["supabase_status"]
            | null
          created_at?: string | null
          edge_functions?: string[] | null
          id?: string
          last_health_check?: string | null
          last_migration_at?: string | null
          migrations_applied?: string[] | null
          operated_by?: string | null
          project_id?: string
          project_url?: string
          schema_version?: string
          storage_buckets?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supabase_connection_operated_by_fkey"
            columns: ["operated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      superposition: {
        Row: {
          collapse_count: number | null
          concept_id: string
          created_at: string | null
          created_by: string | null
          id: string
          observer_count: number | null
          possible_meanings: Json
          probability_distribution: Json
          status: Database["public"]["Enums"]["superposition_status"] | null
          updated_at: string | null
        }
        Insert: {
          collapse_count?: number | null
          concept_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          observer_count?: number | null
          possible_meanings: Json
          probability_distribution: Json
          status?: Database["public"]["Enums"]["superposition_status"] | null
          updated_at?: string | null
        }
        Update: {
          collapse_count?: number | null
          concept_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          observer_count?: number | null
          possible_meanings?: Json
          probability_distribution?: Json
          status?: Database["public"]["Enums"]["superposition_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "superposition_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: true
            referencedRelation: "taxonomy"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "superposition_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          answers: Json
          created_at: string | null
          duration_seconds: number | null
          id: string
          ip_address: unknown
          survey_id: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          answers: Json
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          ip_address?: unknown
          survey_id: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          answers?: Json
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          ip_address?: unknown
          survey_id?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "survey_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          questions: Json
          response_count: number | null
          starts_at: string | null
          target_audience:
            | Database["public"]["Enums"]["survey_audience_type"]
            | null
          target_house: Database["public"]["Enums"]["council_house"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          questions: Json
          response_count?: number | null
          starts_at?: string | null
          target_audience?:
            | Database["public"]["Enums"]["survey_audience_type"]
            | null
          target_house?: Database["public"]["Enums"]["council_house"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          questions?: Json
          response_count?: number | null
          starts_at?: string | null
          target_audience?:
            | Database["public"]["Enums"]["survey_audience_type"]
            | null
          target_house?: Database["public"]["Enums"]["council_house"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "surveys_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_health_logs: {
        Row: {
          checked_at: string | null
          error_message: string | null
          id: string
          response_time_ms: number | null
          status: Database["public"]["Enums"]["system_status"]
          system_id: string
        }
        Insert: {
          checked_at?: string | null
          error_message?: string | null
          id?: string
          response_time_ms?: number | null
          status: Database["public"]["Enums"]["system_status"]
          system_id: string
        }
        Update: {
          checked_at?: string | null
          error_message?: string | null
          id?: string
          response_time_ms?: number | null
          status?: Database["public"]["Enums"]["system_status"]
          system_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_health_logs_system_id_fkey"
            columns: ["system_id"]
            isOneToOne: false
            referencedRelation: "systems"
            referencedColumns: ["id"]
          },
        ]
      }
      systems: {
        Row: {
          created_at: string | null
          dependencies: string[] | null
          description: string | null
          health_check_url: string | null
          id: string
          last_health_check: string | null
          last_incident: string | null
          name: string
          slug: string
          status: Database["public"]["Enums"]["system_status"] | null
          type: Database["public"]["Enums"]["system_type"]
          updated_at: string | null
          uptime_percent: number | null
          version: string | null
        }
        Insert: {
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          health_check_url?: string | null
          id?: string
          last_health_check?: string | null
          last_incident?: string | null
          name: string
          slug: string
          status?: Database["public"]["Enums"]["system_status"] | null
          type: Database["public"]["Enums"]["system_type"]
          updated_at?: string | null
          uptime_percent?: number | null
          version?: string | null
        }
        Update: {
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          health_check_url?: string | null
          id?: string
          last_health_check?: string | null
          last_incident?: string | null
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["system_status"] | null
          type?: Database["public"]["Enums"]["system_type"]
          updated_at?: string | null
          uptime_percent?: number | null
          version?: string | null
        }
        Relationships: []
      }
      taxonomy: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          domain: string | null
          id: string
          is_active: boolean | null
          level: number | null
          name: string
          node_type: Database["public"]["Enums"]["taxonomy_node_type"]
          parent_id: string | null
          path: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          domain?: string | null
          id?: string
          is_active?: boolean | null
          level?: number | null
          name: string
          node_type?: Database["public"]["Enums"]["taxonomy_node_type"]
          parent_id?: string | null
          path: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          domain?: string | null
          id?: string
          is_active?: boolean | null
          level?: number | null
          name?: string
          node_type?: Database["public"]["Enums"]["taxonomy_node_type"]
          parent_id?: string | null
          path?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "taxonomy_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "taxonomy_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "taxonomy"
            referencedColumns: ["id"]
          },
        ]
      }
      timelines: {
        Row: {
          created_at: string | null
          description: string | null
          event_id: string | null
          event_type: Database["public"]["Enums"]["timeline_event_type"]
          id: string
          occurred_at: string
          significance_score: number | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_id?: string | null
          event_type: Database["public"]["Enums"]["timeline_event_type"]
          id?: string
          occurred_at: string
          significance_score?: number | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_id?: string | null
          event_type?: Database["public"]["Enums"]["timeline_event_type"]
          id?: string
          occurred_at?: string
          significance_score?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timelines_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_cents: number
          completed_at: string | null
          created_at: string | null
          currency: string | null
          from_id: string | null
          id: string
          source_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_transfer_id: string | null
          to_id: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
        }
        Insert: {
          amount_cents: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          from_id?: string | null
          id?: string
          source_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_transfer_id?: string | null
          to_id?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
        }
        Update: {
          amount_cents?: number
          completed_at?: string | null
          created_at?: string | null
          currency?: string | null
          from_id?: string | null
          id?: string
          source_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_transfer_id?: string | null
          to_id?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "transactions_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          approved_by: string | null
          created_at: string | null
          field_name: string
          id: string
          is_approved: boolean | null
          language_id: string
          translatable_id: string
          translatable_type: Database["public"]["Enums"]["translatable_type"]
          translation: string
          translator_id: string | null
          updated_at: string | null
        }
        Insert: {
          approved_by?: string | null
          created_at?: string | null
          field_name: string
          id?: string
          is_approved?: boolean | null
          language_id: string
          translatable_id: string
          translatable_type: Database["public"]["Enums"]["translatable_type"]
          translation: string
          translator_id?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_by?: string | null
          created_at?: string | null
          field_name?: string
          id?: string
          is_approved?: boolean | null
          language_id?: string
          translatable_id?: string
          translatable_type?: Database["public"]["Enums"]["translatable_type"]
          translation?: string
          translator_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "translations_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "translations_translator_id_fkey"
            columns: ["translator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          created_at: string | null
          display_on_profile: boolean | null
          earned_at: string | null
          earned_reason: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          created_at?: string | null
          display_on_profile?: boolean | null
          earned_at?: string | null
          earned_reason?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          created_at?: string | null
          display_on_profile?: boolean | null
          earned_at?: string | null
          earned_reason?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_financial: {
        Row: {
          bank_account_last4: string | null
          bank_account_type: string | null
          bank_routing_last4: string | null
          created_at: string | null
          crypto_addresses: Json | null
          default_payout_method:
            | Database["public"]["Enums"]["payout_method"]
            | null
          id: string
          minimum_payout: number | null
          payout_frequency:
            | Database["public"]["Enums"]["payout_frequency"]
            | null
          paypal_email: string | null
          residual_pledge_percent: number | null
          stripe_account_id: string | null
          updated_at: string | null
        }
        Insert: {
          bank_account_last4?: string | null
          bank_account_type?: string | null
          bank_routing_last4?: string | null
          created_at?: string | null
          crypto_addresses?: Json | null
          default_payout_method?:
            | Database["public"]["Enums"]["payout_method"]
            | null
          id: string
          minimum_payout?: number | null
          payout_frequency?:
            | Database["public"]["Enums"]["payout_frequency"]
            | null
          paypal_email?: string | null
          residual_pledge_percent?: number | null
          stripe_account_id?: string | null
          updated_at?: string | null
        }
        Update: {
          bank_account_last4?: string | null
          bank_account_type?: string | null
          bank_routing_last4?: string | null
          created_at?: string | null
          crypto_addresses?: Json | null
          default_payout_method?:
            | Database["public"]["Enums"]["payout_method"]
            | null
          id?: string
          minimum_payout?: number | null
          payout_frequency?:
            | Database["public"]["Enums"]["payout_frequency"]
            | null
          paypal_email?: string | null
          residual_pledge_percent?: number | null
          stripe_account_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_financial_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_private: {
        Row: {
          address: Json | null
          created_at: string | null
          crisis_plan: string | null
          date_of_birth: string | null
          emergency_contact: Json | null
          government_id: string | null
          id: string
          legal_name: string | null
          notes: string | null
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string | null
          crisis_plan?: string | null
          date_of_birth?: string | null
          emergency_contact?: Json | null
          government_id?: string | null
          id: string
          legal_name?: string | null
          notes?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string | null
          crisis_plan?: string | null
          date_of_birth?: string | null
          emergency_contact?: Json | null
          government_id?: string | null
          id?: string
          legal_name?: string | null
          notes?: string | null
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_private_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_quests: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          quest_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["quest_status"] | null
          submission_metadata: Json | null
          submitted_content: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          quest_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["quest_status"] | null
          submission_metadata?: Json | null
          submitted_content?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          quest_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["quest_status"] | null
          submission_metadata?: Json | null
          submitted_content?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quests_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_quests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_profiles: {
        Row: {
          business_description: string | null
          business_logo_url: string | null
          business_name: string
          business_type: Database["public"]["Enums"]["business_type"] | null
          created_at: string | null
          id: string
          product_categories: string[] | null
          stripe_account_id: string | null
          total_earnings: number | null
          total_products: number | null
          total_sales: number | null
          updated_at: string | null
          username: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
          verified_badge: boolean | null
          verified_by: string | null
          website_url: string | null
        }
        Insert: {
          business_description?: string | null
          business_logo_url?: string | null
          business_name: string
          business_type?: Database["public"]["Enums"]["business_type"] | null
          created_at?: string | null
          id: string
          product_categories?: string[] | null
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string | null
          username?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_badge?: boolean | null
          verified_by?: string | null
          website_url?: string | null
        }
        Update: {
          business_description?: string | null
          business_logo_url?: string | null
          business_name?: string
          business_type?: Database["public"]["Enums"]["business_type"] | null
          created_at?: string | null
          id?: string
          product_categories?: string[] | null
          stripe_account_id?: string | null
          total_earnings?: number | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string | null
          username?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
          verified_badge?: boolean | null
          verified_by?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_profiles_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vercel_connection: {
        Row: {
          created_at: string | null
          deployment_status:
            | Database["public"]["Enums"]["deployment_status"]
            | null
          deployment_url: string
          domain_config: Json | null
          environment_variables: Json | null
          id: string
          last_deployment_at: string | null
          last_deployment_id: string | null
          operated_by: string | null
          preview_urls: Json | null
          project_id: string
          project_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deployment_status?:
            | Database["public"]["Enums"]["deployment_status"]
            | null
          deployment_url: string
          domain_config?: Json | null
          environment_variables?: Json | null
          id?: string
          last_deployment_at?: string | null
          last_deployment_id?: string | null
          operated_by?: string | null
          preview_urls?: Json | null
          project_id: string
          project_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deployment_status?:
            | Database["public"]["Enums"]["deployment_status"]
            | null
          deployment_url?: string
          domain_config?: Json | null
          environment_variables?: Json | null
          id?: string
          last_deployment_at?: string | null
          last_deployment_id?: string | null
          operated_by?: string | null
          preview_urls?: Json | null
          project_id?: string
          project_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vercel_connection_operated_by_fkey"
            columns: ["operated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
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
