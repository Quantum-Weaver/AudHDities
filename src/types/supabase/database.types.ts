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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_actions: {
        Row: {
          action_type: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          metadata: Json | null
          taken_at: string
          taken_by: string | null
          target_entity_id: string | null
          target_entity_type: string | null
          target_sovereign_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          action_type: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          taken_at?: string
          taken_by?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          target_sovereign_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          taken_at?: string
          taken_by?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          target_sovereign_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      aethelred_house: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      agent_activities: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      agent_conversations: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      agent_messages: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      analytics: {
        Row: {
          created_at: string
          dimension: string | null
          dimension_value: string | null
          id: string
          metric_name: string
          metric_unit: string | null
          metric_value: number
          notes: string | null
          period: string
          period_end: string | null
          period_start: string | null
          source_table: string | null
        }
        Insert: {
          created_at?: string
          dimension?: string | null
          dimension_value?: string | null
          id?: string
          metric_name: string
          metric_unit?: string | null
          metric_value: number
          notes?: string | null
          period?: string
          period_end?: string | null
          period_start?: string | null
          source_table?: string | null
        }
        Update: {
          created_at?: string
          dimension?: string | null
          dimension_value?: string | null
          id?: string
          metric_name?: string
          metric_unit?: string | null
          metric_value?: number
          notes?: string | null
          period?: string
          period_end?: string | null
          period_start?: string | null
          source_table?: string | null
        }
        Relationships: []
      }
      anchor_events: {
        Row: {
          anchor_id: string | null
          completed_at: string | null
          created_at: string
          created_by: string
          event_date: string
          event_name: string
          event_time: string | null
          event_type: string | null
          gentle_reminder: boolean
          id: string
          is_completed: boolean
          notes: string | null
          recurrence: string
          recurrence_rule: string | null
          reminder_days_before: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          anchor_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by: string
          event_date: string
          event_name: string
          event_time?: string | null
          event_type?: string | null
          gentle_reminder?: boolean
          id?: string
          is_completed?: boolean
          notes?: string | null
          recurrence?: string
          recurrence_rule?: string | null
          reminder_days_before?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          anchor_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string
          event_date?: string
          event_name?: string
          event_time?: string | null
          event_type?: string | null
          gentle_reminder?: boolean
          id?: string
          is_completed?: boolean
          notes?: string | null
          recurrence?: string
          recurrence_rule?: string | null
          reminder_days_before?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          admin_notes: string | null
          application_type: Database["public"]["Enums"]["application_type"]
          created_at: string
          created_by: string | null
          form_data: Json
          icon_emoji: string | null
          id: string
          onboarding_doc_path: string | null
          onboarding_version: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          updated_by: string | null
          user_id: string
          verification_notes: string | null
          verified_by: string | null
        }
        Insert: {
          admin_notes?: string | null
          application_type: Database["public"]["Enums"]["application_type"]
          created_at?: string
          created_by?: string | null
          form_data: Json
          icon_emoji?: string | null
          id?: string
          onboarding_doc_path?: string | null
          onboarding_version?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
          verification_notes?: string | null
          verified_by?: string | null
        }
        Update: {
          admin_notes?: string | null
          application_type?: Database["public"]["Enums"]["application_type"]
          created_at?: string
          created_by?: string | null
          form_data?: Json
          icon_emoji?: string | null
          id?: string
          onboarding_doc_path?: string | null
          onboarding_version?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          verification_notes?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      archivist: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      artisan_profiles: {
        Row: {
          application_id: string | null
          artisan_name: string
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          created_at: string
          created_by: string
          icon_emoji: string | null
          id: string
          portfolio_url: string | null
          primary_category: string | null
          secondary_categories: string[] | null
          sensory_hints: string | null
          slug: string
          social_links: Json | null
          status: Database["public"]["Enums"]["profile_status"]
          tagline: string | null
          total_creations: number | null
          total_followers: number | null
          updated_at: string
          updated_by: string | null
          verified_at: string | null
          verified_by: string | null
          website_url: string | null
        }
        Insert: {
          application_id?: string | null
          artisan_name: string
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string
          created_by: string
          icon_emoji?: string | null
          id?: string
          portfolio_url?: string | null
          primary_category?: string | null
          secondary_categories?: string[] | null
          sensory_hints?: string | null
          slug: string
          social_links?: Json | null
          status?: Database["public"]["Enums"]["profile_status"]
          tagline?: string | null
          total_creations?: number | null
          total_followers?: number | null
          updated_at?: string
          updated_by?: string | null
          verified_at?: string | null
          verified_by?: string | null
          website_url?: string | null
        }
        Update: {
          application_id?: string | null
          artisan_name?: string
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string
          created_by?: string
          icon_emoji?: string | null
          id?: string
          portfolio_url?: string | null
          primary_category?: string | null
          secondary_categories?: string[] | null
          sensory_hints?: string | null
          slug?: string
          social_links?: Json | null
          status?: Database["public"]["Enums"]["profile_status"]
          tagline?: string | null
          total_creations?: number | null
          total_followers?: number | null
          updated_at?: string
          updated_by?: string | null
          verified_at?: string | null
          verified_by?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      assessment_answers: {
        Row: {
          answer_value: Json | null
          answered_at: string
          created_at: string
          created_by: string
          id: string
          notes: string | null
          question_id: string
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          answer_value?: Json | null
          answered_at?: string
          created_at?: string
          created_by: string
          id?: string
          notes?: string | null
          question_id: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          answer_value?: Json | null
          answered_at?: string
          created_at?: string
          created_by?: string
          id?: string
          notes?: string | null
          question_id?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "assessment_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_questions: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          id: string
          is_required: boolean
          labels_high: string | null
          labels_low: string | null
          options: Json | null
          question_text: string
          question_type: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_required?: boolean
          labels_high?: string | null
          labels_low?: string | null
          options?: Json | null
          question_text: string
          question_type?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_required?: boolean
          labels_high?: string | null
          labels_low?: string | null
          options?: Json | null
          question_text?: string
          question_type?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      assessment_results: {
        Row: {
          category: string
          completed_at: string
          created_at: string
          created_by: string
          id: string
          recommendations: Json | null
          result_data: Json | null
          status: string
          summary_text: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category: string
          completed_at?: string
          created_at?: string
          created_by: string
          id?: string
          recommendations?: Json | null
          result_data?: Json | null
          status?: string
          summary_text?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string
          completed_at?: string
          created_at?: string
          created_by?: string
          id?: string
          recommendations?: Json | null
          result_data?: Json | null
          status?: string
          summary_text?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      blueprints: {
        Row: {
          blueprint_config: Json | null
          blueprint_type: string | null
          created_at: string
          created_by: string | null
          description: string | null
          file_extension: string | null
          id: string
          name: string
          output_path: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          template_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          blueprint_config?: Json | null
          blueprint_type?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_extension?: string | null
          id?: string
          name: string
          output_path?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          template_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          blueprint_config?: Json | null
          blueprint_type?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_extension?: string | null
          id?: string
          name?: string
          output_path?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          template_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      boundaries: {
        Row: {
          applies_to: string | null
          boundary_type: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_blocking: boolean
          name: string
          rule_config: Json | null
          severity: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          applies_to?: string | null
          boundary_type?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_blocking?: boolean
          name: string
          rule_config?: Json | null
          severity?: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          applies_to?: string | null
          boundary_type?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_blocking?: boolean
          name?: string
          rule_config?: Json | null
          severity?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      bubble_superposition: {
        Row: {
          bubble_id: string | null
          cooldown_minutes: number | null
          created_at: string
          created_by: string | null
          current_scene_id: string | null
          id: string
          max_instances: number | null
          probability: number | null
          spawn_locations: string[] | null
          state_type: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
          visual_effect: string | null
        }
        Insert: {
          bubble_id?: string | null
          cooldown_minutes?: number | null
          created_at?: string
          created_by?: string | null
          current_scene_id?: string | null
          id?: string
          max_instances?: number | null
          probability?: number | null
          spawn_locations?: string[] | null
          state_type?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          visual_effect?: string | null
        }
        Update: {
          bubble_id?: string | null
          cooldown_minutes?: number | null
          created_at?: string
          created_by?: string | null
          current_scene_id?: string | null
          id?: string
          max_instances?: number | null
          probability?: number | null
          spawn_locations?: string[] | null
          state_type?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          visual_effect?: string | null
        }
        Relationships: []
      }
      bubbles: {
        Row: {
          animation_url: string | null
          bubble_type: string | null
          collection_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          discovery_method: string | null
          display_order: number
          icon_url: string | null
          id: string
          is_limited: boolean
          is_sanctuary_product: boolean
          name: string
          rarity: string | null
          slug: string
          spawn_locations: string[] | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          animation_url?: string | null
          bubble_type?: string | null
          collection_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          discovery_method?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_limited?: boolean
          is_sanctuary_product?: boolean
          name: string
          rarity?: string | null
          slug: string
          spawn_locations?: string[] | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          animation_url?: string | null
          bubble_type?: string | null
          collection_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          discovery_method?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_limited?: boolean
          is_sanctuary_product?: boolean
          name?: string
          rarity?: string | null
          slug?: string
          spawn_locations?: string[] | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      calendar: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          end_at: string | null
          event_type: string | null
          icon_url: string | null
          id: string
          is_recurring: boolean
          location_text: string | null
          location_uri: string | null
          name: string
          recurrence_rule: string | null
          slug: string
          start_at: string
          status: Database["public"]["Enums"]["content_status"]
          timezone: string
          updated_at: string
          updated_by: string | null
          visibility_scope: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          end_at?: string | null
          event_type?: string | null
          icon_url?: string | null
          id?: string
          is_recurring?: boolean
          location_text?: string | null
          location_uri?: string | null
          name: string
          recurrence_rule?: string | null
          slug: string
          start_at: string
          status?: Database["public"]["Enums"]["content_status"]
          timezone?: string
          updated_at?: string
          updated_by?: string | null
          visibility_scope?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          end_at?: string | null
          event_type?: string | null
          icon_url?: string | null
          id?: string
          is_recurring?: boolean
          location_text?: string | null
          location_uri?: string | null
          name?: string
          recurrence_rule?: string | null
          slug?: string
          start_at?: string
          status?: Database["public"]["Enums"]["content_status"]
          timezone?: string
          updated_at?: string
          updated_by?: string | null
          visibility_scope?: string
        }
        Relationships: []
      }
      chancellor: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      channels: {
        Row: {
          channel_type: string | null
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          icon_url: string | null
          id: string
          is_public: boolean
          name: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          channel_type?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_public?: boolean
          name: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          channel_type?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_public?: boolean
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      codex: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      collection_items: {
        Row: {
          collection_id: string | null
          created_at: string
          created_by: string | null
          display_order: number
          id: string
          is_required: boolean
          item_id: string | null
          item_type: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          created_by?: string | null
          display_order?: number
          id?: string
          is_required?: boolean
          item_id?: string | null
          item_type?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          created_by?: string | null
          display_order?: number
          id?: string
          is_required?: boolean
          item_id?: string | null
          item_type?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      collection_sets: {
        Row: {
          collection_type: string | null
          completion_points: number | null
          completion_sigil_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          icon_url: string | null
          id: string
          name: string
          rarity: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          collection_type?: string | null
          completion_points?: number | null
          completion_sigil_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          name: string
          rarity?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          collection_type?: string | null
          completion_points?: number | null
          completion_sigil_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          name?: string
          rarity?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      columns: {
        Row: {
          column_default: string | null
          column_name: string
          created_at: string
          created_by: string | null
          data_type: string | null
          description: string | null
          id: string
          is_active: boolean
          is_nullable: boolean | null
          log: Json
          table_name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          column_default?: string | null
          column_name: string
          created_at?: string
          created_by?: string | null
          data_type?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_nullable?: boolean | null
          log?: Json
          table_name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          column_default?: string | null
          column_name?: string
          created_at?: string
          created_by?: string | null
          data_type?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_nullable?: boolean | null
          log?: Json
          table_name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      community_profiles: {
        Row: {
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          created_at: string
          created_by: string | null
          display_name: string
          icon_emoji: string | null
          id: string
          sensory_hints: string | null
          slug: string
          social_links: Json | null
          sovereign_tier: Database["public"]["Enums"]["sovereign_tier"]
          status: Database["public"]["Enums"]["profile_status"]
          updated_at: string
          updated_by: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string
          created_by?: string | null
          display_name: string
          icon_emoji?: string | null
          id: string
          sensory_hints?: string | null
          slug: string
          social_links?: Json | null
          sovereign_tier?: Database["public"]["Enums"]["sovereign_tier"]
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
          updated_by?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          created_at?: string
          created_by?: string | null
          display_name?: string
          icon_emoji?: string | null
          id?: string
          sensory_hints?: string | null
          slug?: string
          social_links?: Json | null
          sovereign_tier?: Database["public"]["Enums"]["sovereign_tier"]
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
          updated_by?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      companion_cues: {
        Row: {
          companion_id: string | null
          created_at: string
          created_by: string
          cue_behavior: string | null
          cue_frequency: string | null
          cue_type: string
          id: string
          is_active: boolean
          last_cued_at: string | null
          next_cue_at: string | null
          notes: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          companion_id?: string | null
          created_at?: string
          created_by: string
          cue_behavior?: string | null
          cue_frequency?: string | null
          cue_type: string
          id?: string
          is_active?: boolean
          last_cued_at?: string | null
          next_cue_at?: string | null
          notes?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          companion_id?: string | null
          created_at?: string
          created_by?: string
          cue_behavior?: string | null
          cue_frequency?: string | null
          cue_type?: string
          id?: string
          is_active?: boolean
          last_cued_at?: string | null
          next_cue_at?: string | null
          notes?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      composite_types: {
        Row: {
          attributes: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          log: Json
          name: string
          updated_at: string
          updated_by: string | null
          used_by: Json | null
        }
        Insert: {
          attributes?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          name: string
          updated_at?: string
          updated_by?: string | null
          used_by?: Json | null
        }
        Update: {
          attributes?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          name?: string
          updated_at?: string
          updated_by?: string | null
          used_by?: Json | null
        }
        Relationships: []
      }
      consciousness: {
        Row: {
          awareness_level: string | null
          connected_entities: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          awareness_level?: string | null
          connected_entities?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          awareness_level?: string | null
          connected_entities?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          is_resolved: boolean
          message: string | null
          name: string
          priority: string
          responded_at: string | null
          response: string | null
          status: Database["public"]["Enums"]["content_status"]
          subject: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          is_resolved?: boolean
          message?: string | null
          name: string
          priority?: string
          responded_at?: string | null
          response?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          subject?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          is_resolved?: boolean
          message?: string | null
          name?: string
          priority?: string
          responded_at?: string | null
          response?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          subject?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      council_houses: {
        Row: {
          created_at: string
          created_by: string | null
          deity_alignment: string | null
          description: string | null
          display_order: number
          house_type: string | null
          icon_url: string | null
          id: string
          member_count: number
          name: string
          related_protocols: string[] | null
          responsibilities: Json | null
          seat_limit: number | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deity_alignment?: string | null
          description?: string | null
          display_order?: number
          house_type?: string | null
          icon_url?: string | null
          id?: string
          member_count?: number
          name: string
          related_protocols?: string[] | null
          responsibilities?: Json | null
          seat_limit?: number | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deity_alignment?: string | null
          description?: string | null
          display_order?: number
          house_type?: string | null
          icon_url?: string | null
          id?: string
          member_count?: number
          name?: string
          related_protocols?: string[] | null
          responsibilities?: Json | null
          seat_limit?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      covenant_pool: {
        Row: {
          created_at: string
          created_by: string | null
          current_balance: number
          description: string | null
          distribution_schedule: string
          icon_emoji: string | null
          id: string
          is_active: boolean
          last_distribution_amount: number | null
          last_distribution_at: string | null
          last_distribution_recipients: number | null
          name: string
          total_contributed_lifetime: number
          total_distributed_lifetime: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          current_balance?: number
          description?: string | null
          distribution_schedule?: string
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          last_distribution_amount?: number | null
          last_distribution_at?: string | null
          last_distribution_recipients?: number | null
          name?: string
          total_contributed_lifetime?: number
          total_distributed_lifetime?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          current_balance?: number
          description?: string | null
          distribution_schedule?: string
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          last_distribution_amount?: number | null
          last_distribution_at?: string | null
          last_distribution_recipients?: number | null
          name?: string
          total_contributed_lifetime?: number
          total_distributed_lifetime?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      curator: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      current: {
        Row: {
          created_at: string
          description: string | null
          event_at: string
          event_type: string
          id: string
          metadata: Json | null
          reference_id: string | null
          reference_table: string | null
          sovereign_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          reference_table?: string | null
          sovereign_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          event_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          reference_id?: string | null
          reference_table?: string | null
          sovereign_id?: string | null
        }
        Relationships: []
      }
      distribution_recipients: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          distribution_id: string
          id: string
          status: string
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          distribution_id: string
          id?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          distribution_id?: string
          id?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "distribution_recipients_distribution_id_fkey"
            columns: ["distribution_id"]
            isOneToOne: false
            referencedRelation: "distributions"
            referencedColumns: ["id"]
          },
        ]
      }
      distributions: {
        Row: {
          amount_per_recipient: number
          created_at: string
          created_by: string | null
          distribution_period: string | null
          distribution_schedule: string
          icon_emoji: string | null
          id: string
          notes: string | null
          pool_id: string
          pool_type: string
          recipient_count: number
          status: string
          total_amount: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          amount_per_recipient: number
          created_at?: string
          created_by?: string | null
          distribution_period?: string | null
          distribution_schedule?: string
          icon_emoji?: string | null
          id?: string
          notes?: string | null
          pool_id: string
          pool_type: string
          recipient_count: number
          status?: string
          total_amount: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          amount_per_recipient?: number
          created_at?: string
          created_by?: string | null
          distribution_period?: string | null
          distribution_schedule?: string
          icon_emoji?: string | null
          id?: string
          notes?: string | null
          pool_id?: string
          pool_type?: string
          recipient_count?: number
          status?: string
          total_amount?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      email_communications: {
        Row: {
          body_template: string | null
          created_at: string
          created_by: string | null
          description: string | null
          email_type: string | null
          from_email: string | null
          from_name: string
          id: string
          is_active: boolean
          name: string
          reply_to: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          subject_template: string | null
          trigger_event: string | null
          updated_at: string
          updated_by: string | null
          variables: Json | null
        }
        Insert: {
          body_template?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          email_type?: string | null
          from_email?: string | null
          from_name?: string
          id?: string
          is_active?: boolean
          name: string
          reply_to?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          subject_template?: string | null
          trigger_event?: string | null
          updated_at?: string
          updated_by?: string | null
          variables?: Json | null
        }
        Update: {
          body_template?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          email_type?: string | null
          from_email?: string | null
          from_name?: string
          id?: string
          is_active?: boolean
          name?: string
          reply_to?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          subject_template?: string | null
          trigger_event?: string | null
          updated_at?: string
          updated_by?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      energy_entries: {
        Row: {
          created_at: string
          created_by: string
          energy_level: number | null
          id: string
          logged_at: string
          mood: string | null
          mood_tags: string[] | null
          notes: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
          visibility: string
        }
        Insert: {
          created_at?: string
          created_by: string
          energy_level?: number | null
          id?: string
          logged_at?: string
          mood?: string | null
          mood_tags?: string[] | null
          notes?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          visibility?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          energy_level?: number | null
          id?: string
          logged_at?: string
          mood?: string | null
          mood_tags?: string[] | null
          notes?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          visibility?: string
        }
        Relationships: []
      }
      entity_states: {
        Row: {
          changed_by: string | null
          created_at: string
          entity_name: string
          entity_table: string | null
          id: string
          new_value: string | null
          occurred_at: string
          previous_value: string | null
          state_data: Json | null
          state_type: string
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          entity_name: string
          entity_table?: string | null
          id?: string
          new_value?: string | null
          occurred_at?: string
          previous_value?: string | null
          state_data?: Json | null
          state_type: string
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          entity_name?: string
          entity_table?: string | null
          id?: string
          new_value?: string | null
          occurred_at?: string
          previous_value?: string | null
          state_data?: Json | null
          state_type?: string
        }
        Relationships: []
      }
      enums: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          labels: Json | null
          log: Json
          name: string
          updated_at: string
          updated_by: string | null
          used_by: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          labels?: Json | null
          log?: Json
          name: string
          updated_at?: string
          updated_by?: string | null
          used_by?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          labels?: Json | null
          log?: Json
          name?: string
          updated_at?: string
          updated_by?: string | null
          used_by?: Json | null
        }
        Relationships: []
      }
      exchanges: {
        Row: {
          adjustments: Json | null
          buyer_id: string
          created_at: string
          created_by: string | null
          currency: string
          gross_amount: number
          icon_emoji: string | null
          id: string
          net_amount: number | null
          payment_processor_fee: number | null
          platform_fee_percent: number
          status: Database["public"]["Enums"]["exchange_status"]
          stripe_payment_intent: string | null
          stripe_session_id: string | null
          updated_at: string
          updated_by: string | null
          ware_id: string | null
          work_id: string | null
        }
        Insert: {
          adjustments?: Json | null
          buyer_id: string
          created_at?: string
          created_by?: string | null
          currency?: string
          gross_amount: number
          icon_emoji?: string | null
          id?: string
          net_amount?: number | null
          payment_processor_fee?: number | null
          platform_fee_percent?: number
          status?: Database["public"]["Enums"]["exchange_status"]
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          updated_by?: string | null
          ware_id?: string | null
          work_id?: string | null
        }
        Update: {
          adjustments?: Json | null
          buyer_id?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          gross_amount?: number
          icon_emoji?: string | null
          id?: string
          net_amount?: number | null
          payment_processor_fee?: number | null
          platform_fee_percent?: number
          status?: Database["public"]["Enums"]["exchange_status"]
          stripe_payment_intent?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          updated_by?: string | null
          ware_id?: string | null
          work_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exchanges_ware_id_fkey"
            columns: ["ware_id"]
            isOneToOne: false
            referencedRelation: "wares"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exchanges_work_id_fkey"
            columns: ["work_id"]
            isOneToOne: false
            referencedRelation: "works"
            referencedColumns: ["id"]
          },
        ]
      }
      executioner: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      file_registry: {
        Row: {
          access_token: string | null
          bucket_name: string
          created_at: string
          created_by: string | null
          description: string | null
          file_hash: string | null
          file_size: number | null
          id: string
          is_public: boolean
          mime_type: string | null
          name: string
          related_id: string | null
          related_table: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          storage_path: string
          updated_at: string
          updated_by: string | null
          uploaded_by: string | null
        }
        Insert: {
          access_token?: string | null
          bucket_name?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_hash?: string | null
          file_size?: number | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          name: string
          related_id?: string | null
          related_table?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          storage_path: string
          updated_at?: string
          updated_by?: string | null
          uploaded_by?: string | null
        }
        Update: {
          access_token?: string | null
          bucket_name?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_hash?: string | null
          file_size?: number | null
          id?: string
          is_public?: boolean
          mime_type?: string | null
          name?: string
          related_id?: string | null
          related_table?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          storage_path?: string
          updated_at?: string
          updated_by?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      file_type_standards: {
        Row: {
          bucket_name: string | null
          created_at: string
          created_by: string | null
          description: string | null
          extensions: string[] | null
          id: string
          max_file_size: number | null
          mime_types: string[] | null
          name: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          bucket_name?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          extensions?: string[] | null
          id?: string
          max_file_size?: number | null
          mime_types?: string[] | null
          name: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          bucket_name?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          extensions?: string[] | null
          id?: string
          max_file_size?: number | null
          mime_types?: string[] | null
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      folksonomy: {
        Row: {
          category: string | null
          context_type: string | null
          context_value: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          keyword_id: string | null
          name: string
          slug: string
          sovereign_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          thesaurus_entry_id: string | null
          updated_at: string
          updated_by: string | null
          usage_count: number
        }
        Insert: {
          category?: string | null
          context_type?: string | null
          context_value?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          keyword_id?: string | null
          name: string
          slug: string
          sovereign_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          thesaurus_entry_id?: string | null
          updated_at?: string
          updated_by?: string | null
          usage_count?: number
        }
        Update: {
          category?: string | null
          context_type?: string | null
          context_value?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          keyword_id?: string | null
          name?: string
          slug?: string
          sovereign_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          thesaurus_entry_id?: string | null
          updated_at?: string
          updated_by?: string | null
          usage_count?: number
        }
        Relationships: []
      }
      functions: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          language: string | null
          log: Json
          name: string
          purpose: string | null
          signature: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          language?: string | null
          log?: Json
          name: string
          purpose?: string | null
          signature?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          language?: string | null
          log?: Json
          name?: string
          purpose?: string | null
          signature?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      gaia_config: {
        Row: {
          api_access: string
          composite_refs: string[] | null
          created_at: string
          created_by: string | null
          deity_group: string
          enum_refs: string[] | null
          family_id: string | null
          generation_dependencies: string[] | null
          generation_flags: string[] | null
          generation_targets: string[] | null
          human_verified_tags: string[] | null
          icon_emoji: string | null
          id: string
          is_active: boolean
          log: Json
          notes: string | null
          schema_columns_count: number | null
          schema_hash: string | null
          schema_indexes_count: number | null
          schema_notes: string | null
          schema_policies_count: number | null
          schema_triggers_count: number | null
          schema_verified_at: string | null
          script_id: string | null
          sort_order: number
          status: string
          table_name: string
          taxonomy_id: string | null
          taxonomy_notes: string | null
          template_id: string | null
          updated_at: string
          updated_by: string | null
          visibility: string
        }
        Insert: {
          api_access?: string
          composite_refs?: string[] | null
          created_at?: string
          created_by?: string | null
          deity_group: string
          enum_refs?: string[] | null
          family_id?: string | null
          generation_dependencies?: string[] | null
          generation_flags?: string[] | null
          generation_targets?: string[] | null
          human_verified_tags?: string[] | null
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          notes?: string | null
          schema_columns_count?: number | null
          schema_hash?: string | null
          schema_indexes_count?: number | null
          schema_notes?: string | null
          schema_policies_count?: number | null
          schema_triggers_count?: number | null
          schema_verified_at?: string | null
          script_id?: string | null
          sort_order?: number
          status?: string
          table_name: string
          taxonomy_id?: string | null
          taxonomy_notes?: string | null
          template_id?: string | null
          updated_at?: string
          updated_by?: string | null
          visibility?: string
        }
        Update: {
          api_access?: string
          composite_refs?: string[] | null
          created_at?: string
          created_by?: string | null
          deity_group?: string
          enum_refs?: string[] | null
          family_id?: string | null
          generation_dependencies?: string[] | null
          generation_flags?: string[] | null
          generation_targets?: string[] | null
          human_verified_tags?: string[] | null
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          notes?: string | null
          schema_columns_count?: number | null
          schema_hash?: string | null
          schema_indexes_count?: number | null
          schema_notes?: string | null
          schema_policies_count?: number | null
          schema_triggers_count?: number | null
          schema_verified_at?: string | null
          script_id?: string | null
          sort_order?: number
          status?: string
          table_name?: string
          taxonomy_id?: string | null
          taxonomy_notes?: string | null
          template_id?: string | null
          updated_at?: string
          updated_by?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "gaia_config_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gaia_config_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      gaia_generation_log: {
        Row: {
          created_at: string
          errors: Json | null
          files_created: string[] | null
          gaia_config_id: string | null
          generated_at: string
          generation_type: string
          id: string
          script_id: string | null
          status: string
          table_name: string
          taxonomy_id: string | null
          types_count: number | null
        }
        Insert: {
          created_at?: string
          errors?: Json | null
          files_created?: string[] | null
          gaia_config_id?: string | null
          generated_at?: string
          generation_type: string
          id?: string
          script_id?: string | null
          status?: string
          table_name: string
          taxonomy_id?: string | null
          types_count?: number | null
        }
        Update: {
          created_at?: string
          errors?: Json | null
          files_created?: string[] | null
          gaia_config_id?: string | null
          generated_at?: string
          generation_type?: string
          id?: string
          script_id?: string | null
          status?: string
          table_name?: string
          taxonomy_id?: string | null
          types_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gaia_generation_log_gaia_config_id_fkey"
            columns: ["gaia_config_id"]
            isOneToOne: false
            referencedRelation: "gaia_config"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gaia_generation_log_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
        ]
      }
      garden_plots: {
        Row: {
          created_at: string
          created_by: string
          decoration_position: string | null
          description: string | null
          growth_progress: number
          id: string
          is_active: boolean
          is_lattice: boolean
          last_watered_at: string | null
          lattice_style: string | null
          name: string
          plant_stage_id: string | null
          planted_at: string | null
          plot_type: string | null
          seed_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          decoration_position?: string | null
          description?: string | null
          growth_progress?: number
          id?: string
          is_active?: boolean
          is_lattice?: boolean
          last_watered_at?: string | null
          lattice_style?: string | null
          name: string
          plant_stage_id?: string | null
          planted_at?: string | null
          plot_type?: string | null
          seed_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          decoration_position?: string | null
          description?: string | null
          growth_progress?: number
          id?: string
          is_active?: boolean
          is_lattice?: boolean
          last_watered_at?: string | null
          lattice_style?: string | null
          name?: string
          plant_stage_id?: string | null
          planted_at?: string | null
          plot_type?: string | null
          seed_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      garden_visits: {
        Row: {
          action: string | null
          created_at: string
          id: string
          notes: string | null
          plot_id: string
          updated_at: string
          visited_at: string
          visitor_id: string
        }
        Insert: {
          action?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          plot_id: string
          updated_at?: string
          visited_at?: string
          visitor_id: string
        }
        Update: {
          action?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          plot_id?: string
          updated_at?: string
          visited_at?: string
          visitor_id?: string
        }
        Relationships: []
      }
      generations: {
        Row: {
          completed_at: string | null
          created_at: string
          duration_ms: number | null
          errors: Json | null
          files_generated: string[] | null
          id: string
          script_id: string | null
          started_at: string
          status: string
          summary: string | null
          table_name: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          errors?: Json | null
          files_generated?: string[] | null
          id?: string
          script_id?: string | null
          started_at?: string
          status?: string
          summary?: string | null
          table_name?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          errors?: Json | null
          files_generated?: string[] | null
          id?: string
          script_id?: string | null
          started_at?: string
          status?: string
          summary?: string | null
          table_name?: string | null
        }
        Relationships: []
      }
      gift_wrappings: {
        Row: {
          animation_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_limited: boolean
          name: string
          rarity: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          theme: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          animation_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_limited?: boolean
          name: string
          rarity?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          theme?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          animation_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_limited?: boolean
          name?: string
          rarity?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          theme?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      gifts: {
        Row: {
          created_at: string
          created_by: string | null
          gift_type: string | null
          id: string
          is_anonymous: boolean
          message: string | null
          opened_at: string | null
          recipient_id: string
          reference_id: string | null
          sender_id: string
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          gift_type?: string | null
          id?: string
          is_anonymous?: boolean
          message?: string | null
          opened_at?: string | null
          recipient_id: string
          reference_id?: string | null
          sender_id: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          gift_type?: string | null
          id?: string
          is_anonymous?: boolean
          message?: string | null
          opened_at?: string | null
          recipient_id?: string
          reference_id?: string | null
          sender_id?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      grant_applications: {
        Row: {
          attachment_ids: string[] | null
          created_at: string
          created_by: string
          deadline: string | null
          id: string
          name: string
          narrative_ids: string[] | null
          notes: string | null
          opportunity_id: string | null
          outcome_notes: string | null
          reminder_enabled: boolean
          status: string
          submitted_at: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          attachment_ids?: string[] | null
          created_at?: string
          created_by: string
          deadline?: string | null
          id?: string
          name: string
          narrative_ids?: string[] | null
          notes?: string | null
          opportunity_id?: string | null
          outcome_notes?: string | null
          reminder_enabled?: boolean
          status?: string
          submitted_at?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          attachment_ids?: string[] | null
          created_at?: string
          created_by?: string
          deadline?: string | null
          id?: string
          name?: string
          narrative_ids?: string[] | null
          notes?: string | null
          opportunity_id?: string | null
          outcome_notes?: string | null
          reminder_enabled?: boolean
          status?: string
          submitted_at?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      grant_attachments: {
        Row: {
          attachment_type: string | null
          created_at: string
          created_by: string
          description: string | null
          file_size: number | null
          file_url: string | null
          id: string
          mime_type: string | null
          name: string
          status: Database["public"]["Enums"]["content_status"]
          tags: string[] | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          attachment_type?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          mime_type?: string | null
          name: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          attachment_type?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          mime_type?: string | null
          name?: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      grant_collaborators: {
        Row: {
          application_id: string
          created_at: string
          id: string
          notes: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: string
          notes?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      grant_milestones: {
        Row: {
          application_id: string | null
          completed_at: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: string
          name: string
          notes: string | null
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          application_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          notes?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          application_id?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          notes?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      grant_narratives: {
        Row: {
          body: string | null
          created_at: string
          created_by: string
          id: string
          is_default: boolean
          name: string
          narrative_type: string | null
          status: Database["public"]["Enums"]["content_status"]
          tags: string[] | null
          updated_at: string
          updated_by: string | null
          word_count: number | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by: string
          id?: string
          is_default?: boolean
          name: string
          narrative_type?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          updated_at?: string
          updated_by?: string | null
          word_count?: number | null
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_default?: boolean
          name?: string
          narrative_type?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          updated_at?: string
          updated_by?: string | null
          word_count?: number | null
        }
        Relationships: []
      }
      grant_opportunities: {
        Row: {
          application_url: string | null
          category: string | null
          created_at: string
          created_by: string | null
          currency: string
          deadline: string | null
          description: string | null
          eligibility: string | null
          funding_amount: string | null
          funding_organization: string | null
          id: string
          is_verified: boolean
          name: string
          opportunity_type: string | null
          requirements: Json | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          submitted_by: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          application_url?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          funding_amount?: string | null
          funding_organization?: string | null
          id?: string
          is_verified?: boolean
          name: string
          opportunity_type?: string | null
          requirements?: Json | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          application_url?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          deadline?: string | null
          description?: string | null
          eligibility?: string | null
          funding_amount?: string | null
          funding_organization?: string | null
          id?: string
          is_verified?: boolean
          name?: string
          opportunity_type?: string | null
          requirements?: Json | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          submitted_by?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      hearth_keeper: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      heralds: {
        Row: {
          body: string | null
          channel: Database["public"]["Enums"]["notification_channel"]
          created_at: string
          created_by: string
          herald_type: string
          id: string
          is_dismissed: boolean
          is_read: boolean
          read_at: string | null
          recipient: string | null
          reference_id: string | null
          reference_table: string | null
          title: string | null
          updated_by: string | null
        }
        Insert: {
          body?: string | null
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          created_by: string
          herald_type: string
          id?: string
          is_dismissed?: boolean
          is_read?: boolean
          read_at?: string | null
          recipient?: string | null
          reference_id?: string | null
          reference_table?: string | null
          title?: string | null
          updated_by?: string | null
        }
        Update: {
          body?: string | null
          channel?: Database["public"]["Enums"]["notification_channel"]
          created_at?: string
          created_by?: string
          herald_type?: string
          id?: string
          is_dismissed?: boolean
          is_read?: boolean
          read_at?: string | null
          recipient?: string | null
          reference_id?: string | null
          reference_table?: string | null
          title?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      indexes: {
        Row: {
          columns: string | null
          created_at: string
          created_by: string | null
          definition: string | null
          description: string | null
          id: string
          is_active: boolean
          log: Json
          name: string
          table_name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          columns?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          name: string
          table_name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          columns?: string | null
          created_at?: string
          created_by?: string | null
          definition?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          name?: string
          table_name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          body: string | null
          created_at: string
          created_by: string
          entry_date: string
          id: string
          mood: string | null
          status: Database["public"]["Enums"]["content_status"]
          tags: string[] | null
          title: string | null
          updated_at: string
          updated_by: string | null
          visibility: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by: string
          entry_date?: string
          id?: string
          mood?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          visibility?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string
          entry_date?: string
          id?: string
          mood?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          updated_by?: string | null
          visibility?: string
        }
        Relationships: []
      }
      learning_paths: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string | null
          display_order: number
          estimated_duration: string | null
          icon_url: string | null
          id: string
          name: string
          path_type: string | null
          prerequisites: Json | null
          rewards: Json | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number
          estimated_duration?: string | null
          icon_url?: string | null
          id?: string
          name: string
          path_type?: string | null
          prerequisites?: Json | null
          rewards?: Json | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number
          estimated_duration?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          path_type?: string | null
          prerequisites?: Json | null
          rewards?: Json | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      ledger: {
        Row: {
          amount: number
          breakdown: Json | null
          created_at: string
          currency: string
          description: string | null
          entry_type: string
          event_at: string
          from_pool_id: string | null
          from_sovereign_id: string | null
          icon_emoji: string | null
          id: string
          reference_id: string | null
          reference_table: string | null
          to_pool_id: string | null
          to_sovereign_id: string | null
        }
        Insert: {
          amount: number
          breakdown?: Json | null
          created_at?: string
          currency?: string
          description?: string | null
          entry_type: string
          event_at?: string
          from_pool_id?: string | null
          from_sovereign_id?: string | null
          icon_emoji?: string | null
          id?: string
          reference_id?: string | null
          reference_table?: string | null
          to_pool_id?: string | null
          to_sovereign_id?: string | null
        }
        Update: {
          amount?: number
          breakdown?: Json | null
          created_at?: string
          currency?: string
          description?: string | null
          entry_type?: string
          event_at?: string
          from_pool_id?: string | null
          from_sovereign_id?: string | null
          icon_emoji?: string | null
          id?: string
          reference_id?: string | null
          reference_table?: string | null
          to_pool_id?: string | null
          to_sovereign_id?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string | null
          display_order: number
          estimated_duration: string | null
          icon_url: string | null
          id: string
          lesson_type: string | null
          name: string
          resources: Json | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number
          estimated_duration?: string | null
          icon_url?: string | null
          id?: string
          lesson_type?: string | null
          name: string
          resources?: Json | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number
          estimated_duration?: string | null
          icon_url?: string | null
          id?: string
          lesson_type?: string | null
          name?: string
          resources?: Json | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      life_cycles: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          icon_emoji: string | null
          id: string
          name: string
          slug: string
          stage_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_emoji?: string | null
          id?: string
          name: string
          slug: string
          stage_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_emoji?: string | null
          id?: string
          name?: string
          slug?: string
          stage_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      maintenance: {
        Row: {
          created_at: string
          created_by: string | null
          cron_expression: string | null
          description: string | null
          id: string
          is_enabled: boolean
          last_run_at: string | null
          last_run_status: string | null
          name: string
          next_run_at: string | null
          priority: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          task_config: Json | null
          task_type: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          cron_expression?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean
          last_run_at?: string | null
          last_run_status?: string | null
          name: string
          next_run_at?: string | null
          priority?: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          task_config?: Json | null
          task_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          cron_expression?: string | null
          description?: string | null
          id?: string
          is_enabled?: boolean
          last_run_at?: string | null
          last_run_status?: string | null
          name?: string
          next_run_at?: string | null
          priority?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          task_config?: Json | null
          task_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      memories: {
        Row: {
          confidence: number | null
          created_at: string
          description: string | null
          id: string
          memory_data: Json | null
          memory_type: string | null
          name: string
          source_generation_id: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string
          description?: string | null
          id?: string
          memory_data?: Json | null
          memory_type?: string | null
          name: string
          source_generation_id?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string
          description?: string | null
          id?: string
          memory_data?: Json | null
          memory_type?: string | null
          name?: string
          source_generation_id?: string | null
        }
        Relationships: []
      }
      merchant_profiles: {
        Row: {
          application_id: string | null
          avatar_url: string | null
          banner_url: string | null
          bio: string | null
          business_type: string | null
          created_at: string
          created_by: string
          customization_policy: string | null
          icon_emoji: string | null
          id: string
          primary_category: string | null
          return_policy: string | null
          secondary_categories: string[] | null
          sensory_hints: string | null
          shipping_policy: string | null
          slug: string
          social_links: Json | null
          status: Database["public"]["Enums"]["profile_status"]
          store_url: string | null
          tagline: string | null
          total_products: number | null
          total_sales: number | null
          updated_at: string
          updated_by: string | null
          vendor_name: string
          verified_at: string | null
          verified_by: string | null
          website_url: string | null
        }
        Insert: {
          application_id?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          business_type?: string | null
          created_at?: string
          created_by: string
          customization_policy?: string | null
          icon_emoji?: string | null
          id?: string
          primary_category?: string | null
          return_policy?: string | null
          secondary_categories?: string[] | null
          sensory_hints?: string | null
          shipping_policy?: string | null
          slug: string
          social_links?: Json | null
          status?: Database["public"]["Enums"]["profile_status"]
          store_url?: string | null
          tagline?: string | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string
          updated_by?: string | null
          vendor_name: string
          verified_at?: string | null
          verified_by?: string | null
          website_url?: string | null
        }
        Update: {
          application_id?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          bio?: string | null
          business_type?: string | null
          created_at?: string
          created_by?: string
          customization_policy?: string | null
          icon_emoji?: string | null
          id?: string
          primary_category?: string | null
          return_policy?: string | null
          secondary_categories?: string[] | null
          sensory_hints?: string | null
          shipping_policy?: string | null
          slug?: string
          social_links?: Json | null
          status?: Database["public"]["Enums"]["profile_status"]
          store_url?: string | null
          tagline?: string | null
          total_products?: number | null
          total_sales?: number | null
          updated_at?: string
          updated_by?: string | null
          vendor_name?: string
          verified_at?: string | null
          verified_by?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string | null
          created_at: string
          created_by: string
          id: string
          is_deleted_by_recipient: boolean
          is_deleted_by_sender: boolean
          is_read: boolean
          parent_message_id: string | null
          read_at: string | null
          recipient_id: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by: string
          id?: string
          is_deleted_by_recipient?: boolean
          is_deleted_by_sender?: boolean
          is_read?: boolean
          parent_message_id?: string | null
          read_at?: string | null
          recipient_id: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string
          id?: string
          is_deleted_by_recipient?: boolean
          is_deleted_by_sender?: boolean
          is_read?: boolean
          parent_message_id?: string | null
          read_at?: string | null
          recipient_id?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_actions: {
        Row: {
          action_type: string
          appealable: boolean
          created_at: string
          created_by: string | null
          description: string | null
          duration: string | null
          expires_at: string | null
          id: string
          taken_at: string
          taken_by: string | null
          target_entity_id: string | null
          target_entity_type: string | null
          target_sovereign_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          action_type: string
          appealable?: boolean
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          expires_at?: string | null
          id?: string
          taken_at?: string
          taken_by?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          target_sovereign_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          action_type?: string
          appealable?: boolean
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          expires_at?: string | null
          id?: string
          taken_at?: string
          taken_by?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          target_sovereign_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      mythology: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          icon_url: string | null
          id: string
          myth_type: string | null
          name: string
          provenance: string | null
          related_entity: string | null
          related_entity_type: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          story: string | null
          teachings: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          myth_type?: string | null
          name: string
          provenance?: string | null
          related_entity?: string | null
          related_entity_type?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          story?: string | null
          teachings?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          myth_type?: string | null
          name?: string
          provenance?: string | null
          related_entity?: string | null
          related_entity_type?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          story?: string | null
          teachings?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      path_lessons: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_required: boolean
          lesson_id: string
          path_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_required?: boolean
          lesson_id: string
          path_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_required?: boolean
          lesson_id?: string
          path_id?: string
          updated_at?: string
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
      patronage: {
        Row: {
          artisan_id: string
          created_at: string
          id: string
          notes: string | null
          patron_id: string
          started_at: string
          tier: string | null
          updated_at: string
        }
        Insert: {
          artisan_id: string
          created_at?: string
          id?: string
          notes?: string | null
          patron_id: string
          started_at?: string
          tier?: string | null
          updated_at?: string
        }
        Update: {
          artisan_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          patron_id?: string
          started_at?: string
          tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      patronage_tiers: {
        Row: {
          amount: number | null
          benefits: Json | null
          created_at: string
          created_by: string | null
          currency: string
          description: string | null
          display_order: number
          id: string
          name: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          amount?: number | null
          benefits?: Json | null
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          display_order?: number
          id?: string
          name: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          amount?: number | null
          benefits?: Json | null
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          display_order?: number
          id?: string
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      personas: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          icon_url: string | null
          id: string
          name: string
          persona_type: string | null
          sample_phrases: string[] | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          tone: string | null
          updated_at: string
          updated_by: string | null
          voice_characteristics: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          name: string
          persona_type?: string | null
          sample_phrases?: string[] | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          tone?: string | null
          updated_at?: string
          updated_by?: string | null
          voice_characteristics?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          name?: string
          persona_type?: string | null
          sample_phrases?: string[] | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          tone?: string | null
          updated_at?: string
          updated_by?: string | null
          voice_characteristics?: Json | null
        }
        Relationships: []
      }
      plant_stages: {
        Row: {
          animation_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          duration_hours: number | null
          icon_url: string | null
          id: string
          name: string
          slug: string
          stage_order: number
          stage_rewards: Json | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          animation_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_hours?: number | null
          icon_url?: string | null
          id?: string
          name: string
          slug: string
          stage_order?: number
          stage_rewards?: Json | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          animation_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration_hours?: number | null
          icon_url?: string | null
          id?: string
          name?: string
          slug?: string
          stage_order?: number
          stage_rewards?: Json | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      platform_config: {
        Row: {
          category: string
          config_key: string
          config_type: string
          config_value: Json
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string
          config_key: string
          config_type?: string
          config_value?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string
          config_key?: string
          config_type?: string
          config_value?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean
          setting_key: string
          setting_type: string | null
          setting_value: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          setting_key: string
          setting_type?: string | null
          setting_value?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean
          setting_key?: string
          setting_type?: string | null
          setting_value?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      policies: {
        Row: {
          cmd: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          log: Json
          policy_name: string
          qual: string | null
          table_name: string
          updated_at: string
          updated_by: string | null
          with_check: string | null
        }
        Insert: {
          cmd?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          policy_name: string
          qual?: string | null
          table_name: string
          updated_at?: string
          updated_by?: string | null
          with_check?: string | null
        }
        Update: {
          cmd?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          policy_name?: string
          qual?: string | null
          table_name?: string
          updated_at?: string
          updated_by?: string | null
          with_check?: string | null
        }
        Relationships: []
      }
      processes: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          priority: string
          process_type: string | null
          related_protocol_id: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          steps: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          priority?: string
          process_type?: string | null
          related_protocol_id?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          steps?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          priority?: string
          process_type?: string | null
          related_protocol_id?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          steps?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      proposals: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          proposal_type: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          slug: string
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          updated_by: string | null
          votes_against: number
          votes_for: number
          voting_ends_at: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          proposal_type?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          updated_by?: string | null
          votes_against?: number
          votes_for?: number
          voting_ends_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          proposal_type?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          updated_by?: string | null
          votes_against?: number
          votes_for?: number
          voting_ends_at?: string | null
        }
        Relationships: []
      }
      protocols: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          priority: string
          protocol_type: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          supersedes: string | null
          updated_at: string
          updated_by: string | null
          version: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          priority?: string
          protocol_type?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          supersedes?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          priority?: string
          protocol_type?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          supersedes?: string | null
          updated_at?: string
          updated_by?: string | null
          version?: string
        }
        Relationships: []
      }
      quest_progress: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          objective_key: string
          objective_status: string
          progress_data: Json | null
          quest_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          objective_key: string
          objective_status?: string
          progress_data?: Json | null
          quest_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          objective_key?: string
          objective_status?: string
          progress_data?: Json | null
          quest_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quest_progress_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      quests: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string | null
          display_order: number
          icon_url: string | null
          id: string
          name: string
          objectives: Json | null
          prerequisites: Json | null
          quest_type: string | null
          rewards: Json | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          name: string
          objectives?: Json | null
          prerequisites?: Json | null
          quest_type?: string | null
          rewards?: Json | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          name?: string
          objectives?: Json | null
          prerequisites?: Json | null
          quest_type?: string | null
          rewards?: Json | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action_on_exceed: string
          cooldown_seconds: number
          created_at: string
          created_by: string | null
          description: string | null
          endpoint_type: string
          id: string
          is_enabled: boolean
          max_requests: number
          name: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
          window_seconds: number
        }
        Insert: {
          action_on_exceed?: string
          cooldown_seconds?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          endpoint_type: string
          id?: string
          is_enabled?: boolean
          max_requests: number
          name: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          window_seconds?: number
        }
        Update: {
          action_on_exceed?: string
          cooldown_seconds?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          endpoint_type?: string
          id?: string
          is_enabled?: boolean
          max_requests?: number
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          window_seconds?: number
        }
        Relationships: []
      }
      reference_values: {
        Row: {
          applies_to: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          priority: number
          reference_data: Json | null
          reference_type: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          applies_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          priority?: number
          reference_data?: Json | null
          reference_type?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          applies_to?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          priority?: number
          reference_data?: Json | null
          reference_type?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          priority: string
          report_type: string | null
          reported_entity_id: string | null
          reported_entity_type: string | null
          resolution: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          slug: string
          status: Database["public"]["Enums"]["application_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          priority?: string
          report_type?: string | null
          reported_entity_id?: string | null
          reported_entity_type?: string | null
          resolution?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          priority?: string
          report_type?: string | null
          reported_entity_id?: string | null
          reported_entity_type?: string | null
          resolution?: string | null
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["application_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      residual_pool: {
        Row: {
          created_at: string
          created_by: string | null
          current_balance: number
          description: string | null
          distribution_schedule: string
          icon_emoji: string | null
          id: string
          is_active: boolean
          last_distribution_amount: number | null
          last_distribution_at: string | null
          last_distribution_recipients: number | null
          name: string
          total_contributed_lifetime: number
          total_distributed_lifetime: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          current_balance?: number
          description?: string | null
          distribution_schedule?: string
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          last_distribution_amount?: number | null
          last_distribution_at?: string | null
          last_distribution_recipients?: number | null
          name?: string
          total_contributed_lifetime?: number
          total_distributed_lifetime?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          current_balance?: number
          description?: string | null
          distribution_schedule?: string
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          last_distribution_amount?: number | null
          last_distribution_at?: string | null
          last_distribution_recipients?: number | null
          name?: string
          total_contributed_lifetime?: number
          total_distributed_lifetime?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      resonance: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          resonance_type: string
          signal_id: string | null
          updated_at: string
          user_id: string
          work_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          resonance_type?: string
          signal_id?: string | null
          updated_at?: string
          user_id: string
          work_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          resonance_type?: string
          signal_id?: string | null
          updated_at?: string
          user_id?: string
          work_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resonance_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resonance_work_id_fkey"
            columns: ["work_id"]
            isOneToOne: false
            referencedRelation: "works"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          parent_response_id: string | null
          signal_id: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          parent_response_id?: string | null
          signal_id: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          parent_response_id?: string | null
          signal_id?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "responses_parent_response_id_fkey"
            columns: ["parent_response_id"]
            isOneToOne: false
            referencedRelation: "responses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_signal_id_fkey"
            columns: ["signal_id"]
            isOneToOne: false
            referencedRelation: "signals"
            referencedColumns: ["id"]
          },
        ]
      }
      scene_participants: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          joined_at: string
          last_active_at: string
          scene_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          joined_at?: string
          last_active_at?: string
          scene_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          joined_at?: string
          last_active_at?: string
          scene_id?: string
          updated_at?: string
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
        ]
      }
      scenes: {
        Row: {
          background_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string | null
          display_order: number
          icon_url: string | null
          id: string
          name: string
          participant_limit: number | null
          scene_type: string | null
          slug: string
          spawn_rules: Json | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          background_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          name: string
          participant_limit?: number | null
          scene_type?: string | null
          slug: string
          spawn_rules?: Json | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          background_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          name?: string
          participant_limit?: number | null
          scene_type?: string | null
          slug?: string
          spawn_rules?: Json | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      scheduling: {
        Row: {
          created_at: string
          created_by: string | null
          cron_expression: string | null
          description: string | null
          id: string
          interval_minutes: number | null
          is_active: boolean
          last_run_at: string | null
          max_retries: number
          name: string
          next_run_at: string | null
          retry_delay_minutes: number
          schedule_type: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          task_handler: string | null
          task_payload: Json | null
          timezone: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          cron_expression?: string | null
          description?: string | null
          id?: string
          interval_minutes?: number | null
          is_active?: boolean
          last_run_at?: string | null
          max_retries?: number
          name: string
          next_run_at?: string | null
          retry_delay_minutes?: number
          schedule_type?: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          task_handler?: string | null
          task_payload?: Json | null
          timezone?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          cron_expression?: string | null
          description?: string | null
          id?: string
          interval_minutes?: number | null
          is_active?: boolean
          last_run_at?: string | null
          max_retries?: number
          name?: string
          next_run_at?: string | null
          retry_delay_minutes?: number
          schedule_type?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          task_handler?: string | null
          task_payload?: Json | null
          timezone?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      script_executions: {
        Row: {
          completed_at: string | null
          created_at: string
          duration_ms: number | null
          executed_by: string | null
          id: string
          parameters: Json | null
          result: Json | null
          script_id: string | null
          started_at: string
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          executed_by?: string | null
          id?: string
          parameters?: Json | null
          result?: Json | null
          script_id?: string | null
          started_at?: string
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          duration_ms?: number | null
          executed_by?: string | null
          id?: string
          parameters?: Json | null
          result?: Json | null
          script_id?: string | null
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      scripts: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          file_path: string
          icon_emoji: string | null
          id: string
          input_requires: Json | null
          is_active: boolean
          log: Json
          name: string
          output_produces: Json | null
          script_type: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path: string
          icon_emoji?: string | null
          id?: string
          input_requires?: Json | null
          is_active?: boolean
          log?: Json
          name: string
          output_produces?: Json | null
          script_type?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          file_path?: string
          icon_emoji?: string | null
          id?: string
          input_requires?: Json | null
          is_active?: boolean
          log?: Json
          name?: string
          output_produces?: Json | null
          script_type?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      seed_types: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          growth_duration: string | null
          harvest_rewards: Json | null
          icon_url: string | null
          id: string
          name: string
          rarity: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          growth_duration?: string | null
          harvest_rewards?: Json | null
          icon_url?: string | null
          id?: string
          name: string
          rarity?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          growth_duration?: string | null
          harvest_rewards?: Json | null
          icon_url?: string | null
          id?: string
          name?: string
          rarity?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      seer: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      sigil_unlocks: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          sigil_id: string
          status: Database["public"]["Enums"]["content_status"]
          trigger_entity: string | null
          trigger_type: string
          trigger_value: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          sigil_id: string
          status?: Database["public"]["Enums"]["content_status"]
          trigger_entity?: string | null
          trigger_type: string
          trigger_value?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          sigil_id?: string
          status?: Database["public"]["Enums"]["content_status"]
          trigger_entity?: string | null
          trigger_type?: string
          trigger_value?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sigil_unlocks_sigil_id_fkey"
            columns: ["sigil_id"]
            isOneToOne: false
            referencedRelation: "sigils"
            referencedColumns: ["id"]
          },
        ]
      }
      sigils: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          icon_emoji: string | null
          icon_url: string | null
          id: string
          name: string
          rarity: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_emoji?: string | null
          icon_url?: string | null
          id?: string
          name: string
          rarity?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_emoji?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          rarity?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      signals: {
        Row: {
          cover_url: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          response_count: number
          signal_type: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          tags: string[] | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          response_count?: number
          signal_type?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          response_count?: number
          signal_type?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[] | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      skald: {
        Row: {
          consciousness_level: string | null
          created_at: string
          created_by: string | null
          current_task: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          settings: Json | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          consciousness_level?: string | null
          created_at?: string
          created_by?: string | null
          current_task?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          settings?: Json | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          answers: Json | null
          created_at: string
          created_by: string
          id: string
          is_anonymous: boolean
          notes: string | null
          status: string
          submitted_at: string | null
          survey_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          answers?: Json | null
          created_at?: string
          created_by: string
          id?: string
          is_anonymous?: boolean
          notes?: string | null
          status?: string
          submitted_at?: string | null
          survey_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          answers?: Json | null
          created_at?: string
          created_by?: string
          id?: string
          is_anonymous?: boolean
          notes?: string | null
          status?: string
          submitted_at?: string | null
          survey_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "surveys"
            referencedColumns: ["id"]
          },
        ]
      }
      surveys: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          icon_url: string | null
          id: string
          is_anonymous: boolean
          is_public_results: boolean
          name: string
          questions: Json | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          survey_type: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_anonymous?: boolean
          is_public_results?: boolean
          name: string
          questions?: Json | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          survey_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_anonymous?: boolean
          is_public_results?: boolean
          name?: string
          questions?: Json | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          survey_type?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          default_columns: Json | null
          default_indexes: Json | null
          default_triggers: Json | null
          description: string | null
          has_display_name: boolean
          has_slug: boolean
          has_status: boolean
          has_visual_anchors: boolean
          icon_emoji: string | null
          id: string
          log: Json
          name: string
          pk_pattern: string
          rls_pattern: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          default_columns?: Json | null
          default_indexes?: Json | null
          default_triggers?: Json | null
          description?: string | null
          has_display_name?: boolean
          has_slug?: boolean
          has_status?: boolean
          has_visual_anchors?: boolean
          icon_emoji?: string | null
          id?: string
          log?: Json
          name: string
          pk_pattern: string
          rls_pattern: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          default_columns?: Json | null
          default_indexes?: Json | null
          default_triggers?: Json | null
          description?: string | null
          has_display_name?: boolean
          has_slug?: boolean
          has_status?: boolean
          has_visual_anchors?: boolean
          icon_emoji?: string | null
          id?: string
          log?: Json
          name?: string
          pk_pattern?: string
          rls_pattern?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      triggers: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          events: string | null
          function_name: string | null
          id: string
          is_active: boolean
          log: Json
          name: string
          table_name: string
          timing: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          events?: string | null
          function_name?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          name: string
          table_name: string
          timing?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          events?: string | null
          function_name?: string | null
          id?: string
          is_active?: boolean
          log?: Json
          name?: string
          table_name?: string
          timing?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_financial: {
        Row: {
          covenant_pool_percent: number | null
          created_at: string
          created_by: string | null
          current_balance: number | null
          icon_emoji: string | null
          id: string
          payout_details: Json | null
          payout_method: string | null
          payout_schedule: string | null
          stripe_account_id: string | null
          stripe_customer_id: string | null
          tax_country: string | null
          tax_id: string | null
          tax_info: Json | null
          total_contributions: number | null
          total_earned: number | null
          total_paid_out: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          covenant_pool_percent?: number | null
          created_at?: string
          created_by?: string | null
          current_balance?: number | null
          icon_emoji?: string | null
          id: string
          payout_details?: Json | null
          payout_method?: string | null
          payout_schedule?: string | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          tax_country?: string | null
          tax_id?: string | null
          tax_info?: Json | null
          total_contributions?: number | null
          total_earned?: number | null
          total_paid_out?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          covenant_pool_percent?: number | null
          created_at?: string
          created_by?: string | null
          current_balance?: number | null
          icon_emoji?: string | null
          id?: string
          payout_details?: Json | null
          payout_method?: string | null
          payout_schedule?: string | null
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          tax_country?: string | null
          tax_id?: string | null
          tax_info?: Json | null
          total_contributions?: number | null
          total_earned?: number | null
          total_paid_out?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_page_views: {
        Row: {
          created_at: string
          deity_domain: string | null
          first_visited_at: string
          icon_emoji: string | null
          id: string
          last_visited_at: string
          page_name: string | null
          page_path: string
          updated_at: string
          user_id: string
          visit_count: number
        }
        Insert: {
          created_at?: string
          deity_domain?: string | null
          first_visited_at?: string
          icon_emoji?: string | null
          id?: string
          last_visited_at?: string
          page_name?: string | null
          page_path: string
          updated_at?: string
          user_id: string
          visit_count?: number
        }
        Update: {
          created_at?: string
          deity_domain?: string | null
          first_visited_at?: string
          icon_emoji?: string | null
          id?: string
          last_visited_at?: string
          page_name?: string | null
          page_path?: string
          updated_at?: string
          user_id?: string
          visit_count?: number
        }
        Relationships: []
      }
      user_private: {
        Row: {
          address: Database["public"]["CompositeTypes"]["address"] | null
          created_at: string
          created_by: string | null
          crisis_plan: string | null
          date_of_birth: string | null
          emergency_contact:
            | Database["public"]["CompositeTypes"]["emergency_contact"]
            | null
          government_id: string | null
          icon_emoji: string | null
          id: string
          legal_name: string | null
          notes: string | null
          phone_number: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          address?: Database["public"]["CompositeTypes"]["address"] | null
          created_at?: string
          created_by?: string | null
          crisis_plan?: string | null
          date_of_birth?: string | null
          emergency_contact?:
            | Database["public"]["CompositeTypes"]["emergency_contact"]
            | null
          government_id?: string | null
          icon_emoji?: string | null
          id: string
          legal_name?: string | null
          notes?: string | null
          phone_number?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          address?: Database["public"]["CompositeTypes"]["address"] | null
          created_at?: string
          created_by?: string | null
          crisis_plan?: string | null
          date_of_birth?: string | null
          emergency_contact?:
            | Database["public"]["CompositeTypes"]["emergency_contact"]
            | null
          government_id?: string | null
          icon_emoji?: string | null
          id?: string
          legal_name?: string | null
          notes?: string | null
          phone_number?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_by: string | null
          created_at: string
          created_by: string | null
          icon_emoji: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          assigned_by?: string | null
          created_at?: string
          created_by?: string | null
          icon_emoji?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          assigned_by?: string | null
          created_at?: string
          created_by?: string | null
          icon_emoji?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vessel_anchors: {
        Row: {
          anchor_type: string | null
          created_at: string
          created_by: string
          cue_color: string | null
          description: string | null
          display_order: number
          icon_url: string | null
          id: string
          is_active: boolean
          name: string
          position: string | null
          room_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
          visual_cue: string | null
        }
        Insert: {
          anchor_type?: string | null
          created_at?: string
          created_by: string
          cue_color?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_active?: boolean
          name: string
          position?: string | null
          room_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          visual_cue?: string | null
        }
        Update: {
          anchor_type?: string | null
          created_at?: string
          created_by?: string
          cue_color?: string | null
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_active?: boolean
          name?: string
          position?: string | null
          room_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          visual_cue?: string | null
        }
        Relationships: []
      }
      vessel_bubbles: {
        Row: {
          bubble_id: string
          collected_at: string
          collection_context: Json | null
          collection_method: string | null
          created_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bubble_id: string
          collected_at?: string
          collection_context?: Json | null
          collection_method?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bubble_id?: string
          collected_at?: string
          collection_context?: Json | null
          collection_method?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vessel_bubbles_bubble_id_fkey"
            columns: ["bubble_id"]
            isOneToOne: false
            referencedRelation: "bubbles"
            referencedColumns: ["id"]
          },
        ]
      }
      vessel_collections: {
        Row: {
          collection_id: string
          created_at: string
          display_order: number
          id: string
          is_displayed: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          display_order?: number
          id?: string
          is_displayed?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          display_order?: number
          id?: string
          is_displayed?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vessel_companions: {
        Row: {
          accent_color: string | null
          animation_url: string | null
          avatar_url: string | null
          behaviors: Json | null
          companion_type: string | null
          created_at: string
          created_by: string
          current_room_id: string | null
          id: string
          is_active: boolean
          name: string
          personality: string | null
          species: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          accent_color?: string | null
          animation_url?: string | null
          avatar_url?: string | null
          behaviors?: Json | null
          companion_type?: string | null
          created_at?: string
          created_by: string
          current_room_id?: string | null
          id?: string
          is_active?: boolean
          name: string
          personality?: string | null
          species?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          accent_color?: string | null
          animation_url?: string | null
          avatar_url?: string | null
          behaviors?: Json | null
          companion_type?: string | null
          created_at?: string
          created_by?: string
          current_room_id?: string | null
          id?: string
          is_active?: boolean
          name?: string
          personality?: string | null
          species?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      vessel_config: {
        Row: {
          autoplay_audio: boolean
          autoplay_video: boolean
          ceremony_arrival: boolean
          ceremony_farewell: boolean
          content_warnings: string
          created_at: string
          created_by: string | null
          default_ware_view: string
          default_work_view: string
          density: string
          discovery_hints: boolean
          discovery_map_style: string
          discovery_show_undiscovered: boolean
          dyslexia_font: boolean
          font_scale: number
          herald_channel: Database["public"]["Enums"]["notification_channel"]
          herald_digest: Database["public"]["Enums"]["herald_digest"]
          herald_sounds: boolean
          heralds_enabled: boolean
          high_contrast: boolean
          icon_emoji: string | null
          id: string
          language: string
          reduce_motion: boolean
          reduce_transparency: boolean
          theme: Database["public"]["Enums"]["display_theme"]
          timezone: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          autoplay_audio?: boolean
          autoplay_video?: boolean
          ceremony_arrival?: boolean
          ceremony_farewell?: boolean
          content_warnings?: string
          created_at?: string
          created_by?: string | null
          default_ware_view?: string
          default_work_view?: string
          density?: string
          discovery_hints?: boolean
          discovery_map_style?: string
          discovery_show_undiscovered?: boolean
          dyslexia_font?: boolean
          font_scale?: number
          herald_channel?: Database["public"]["Enums"]["notification_channel"]
          herald_digest?: Database["public"]["Enums"]["herald_digest"]
          herald_sounds?: boolean
          heralds_enabled?: boolean
          high_contrast?: boolean
          icon_emoji?: string | null
          id: string
          language?: string
          reduce_motion?: boolean
          reduce_transparency?: boolean
          theme?: Database["public"]["Enums"]["display_theme"]
          timezone?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          autoplay_audio?: boolean
          autoplay_video?: boolean
          ceremony_arrival?: boolean
          ceremony_farewell?: boolean
          content_warnings?: string
          created_at?: string
          created_by?: string | null
          default_ware_view?: string
          default_work_view?: string
          density?: string
          discovery_hints?: boolean
          discovery_map_style?: string
          discovery_show_undiscovered?: boolean
          dyslexia_font?: boolean
          font_scale?: number
          herald_channel?: Database["public"]["Enums"]["notification_channel"]
          herald_digest?: Database["public"]["Enums"]["herald_digest"]
          herald_sounds?: boolean
          heralds_enabled?: boolean
          high_contrast?: boolean
          icon_emoji?: string | null
          id?: string
          language?: string
          reduce_motion?: boolean
          reduce_transparency?: boolean
          theme?: Database["public"]["Enums"]["display_theme"]
          timezone?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      vessel_decorations: {
        Row: {
          created_at: string
          created_by: string
          decoration_type: string | null
          description: string | null
          display_order: number
          id: string
          is_displayed: boolean
          name: string
          position: string | null
          reference_id: string | null
          room_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          decoration_type?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_displayed?: boolean
          name: string
          position?: string | null
          reference_id?: string | null
          room_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          decoration_type?: string | null
          description?: string | null
          display_order?: number
          id?: string
          is_displayed?: boolean
          name?: string
          position?: string | null
          reference_id?: string | null
          room_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      vessel_exteriors: {
        Row: {
          accent_color: string | null
          background_url: string | null
          created_at: string
          created_by: string | null
          description: string | null
          icon_url: string | null
          id: string
          is_limited: boolean
          name: string
          rarity: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          theme: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          accent_color?: string | null
          background_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_limited?: boolean
          name: string
          rarity?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          theme?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          accent_color?: string | null
          background_url?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          is_limited?: boolean
          name?: string
          rarity?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          theme?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      vessel_interiors: {
        Row: {
          accent_color: string | null
          active_modules: string[] | null
          background_url: string | null
          created_at: string
          created_by: string | null
          id: string
          layout_style: string | null
          module_positions: Json | null
          music_url: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          accent_color?: string | null
          active_modules?: string[] | null
          background_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          layout_style?: string | null
          module_positions?: Json | null
          music_url?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          accent_color?: string | null
          active_modules?: string[] | null
          background_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          layout_style?: string | null
          module_positions?: Json | null
          music_url?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      vessel_quests: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          progress_data: Json | null
          quest_id: string
          started_at: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          progress_data?: Json | null
          quest_id: string
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          progress_data?: Json | null
          quest_id?: string
          started_at?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vessel_quests_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      vessel_rooms: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          display_order: number
          icon_url: string | null
          id: string
          is_active: boolean
          name: string
          room_type: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_active?: boolean
          name: string
          room_type?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          display_order?: number
          icon_url?: string | null
          id?: string
          is_active?: boolean
          name?: string
          room_type?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      vessel_sigils: {
        Row: {
          award_context: Json | null
          awarded_at: string
          awarded_by: string | null
          created_at: string
          id: string
          is_displayed: boolean
          sigil_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          award_context?: Json | null
          awarded_at?: string
          awarded_by?: string | null
          created_at?: string
          id?: string
          is_displayed?: boolean
          sigil_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          award_context?: Json | null
          awarded_at?: string
          awarded_by?: string | null
          created_at?: string
          id?: string
          is_displayed?: boolean
          sigil_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vessel_sigils_sigil_id_fkey"
            columns: ["sigil_id"]
            isOneToOne: false
            referencedRelation: "sigils"
            referencedColumns: ["id"]
          },
        ]
      }
      ware_participants: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          role: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          ware_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          role?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id: string
          ware_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          role?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          ware_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ware_participants_ware_id_fkey"
            columns: ["ware_id"]
            isOneToOne: false
            referencedRelation: "wares"
            referencedColumns: ["id"]
          },
        ]
      }
      wares: {
        Row: {
          cover_url: string | null
          created_at: string
          created_by: string
          currency: string
          description: string | null
          icon_emoji: string | null
          id: string
          media_urls: string[] | null
          metadata: Json | null
          name: string
          price: number | null
          pricing_model: Database["public"]["Enums"]["pricing_model"]
          quantity_available: number | null
          quantity_sold: number
          requires_shipping: boolean
          residual_pool_percent: number | null
          shipping_info: Json | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          updated_by: string | null
          ware_type: Database["public"]["Enums"]["ware_type"]
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          created_by: string
          currency?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          name: string
          price?: number | null
          pricing_model?: Database["public"]["Enums"]["pricing_model"]
          quantity_available?: number | null
          quantity_sold?: number
          requires_shipping?: boolean
          residual_pool_percent?: number | null
          shipping_info?: Json | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          ware_type?: Database["public"]["Enums"]["ware_type"]
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          created_by?: string
          currency?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          name?: string
          price?: number | null
          pricing_model?: Database["public"]["Enums"]["pricing_model"]
          quantity_available?: number | null
          quantity_sold?: number
          requires_shipping?: boolean
          residual_pool_percent?: number | null
          shipping_info?: Json | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          updated_by?: string | null
          ware_type?: Database["public"]["Enums"]["ware_type"]
        }
        Relationships: []
      }
      work_participants: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          role: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          work_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          role?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id: string
          work_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          role?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          work_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_participants_work_id_fkey"
            columns: ["work_id"]
            isOneToOne: false
            referencedRelation: "works"
            referencedColumns: ["id"]
          },
        ]
      }
      works: {
        Row: {
          cover_url: string | null
          created_at: string
          created_by: string
          currency: string
          description: string | null
          icon_emoji: string | null
          id: string
          media_urls: string[] | null
          metadata: Json | null
          name: string
          price: number | null
          pricing_model: Database["public"]["Enums"]["pricing_model"]
          residual_pool_percent: number | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          streaming_url: string | null
          updated_at: string
          updated_by: string | null
          work_type: Database["public"]["Enums"]["work_type"]
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          created_by: string
          currency?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          name: string
          price?: number | null
          pricing_model?: Database["public"]["Enums"]["pricing_model"]
          residual_pool_percent?: number | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          streaming_url?: string | null
          updated_at?: string
          updated_by?: string | null
          work_type?: Database["public"]["Enums"]["work_type"]
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          created_by?: string
          currency?: string
          description?: string | null
          icon_emoji?: string | null
          id?: string
          media_urls?: string[] | null
          metadata?: Json | null
          name?: string
          price?: number | null
          pricing_model?: Database["public"]["Enums"]["pricing_model"]
          residual_pool_percent?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          streaming_url?: string | null
          updated_at?: string
          updated_by?: string | null
          work_type?: Database["public"]["Enums"]["work_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      build_search_text: { Args: { fields: string[] }; Returns: string }
      calculate_sovereign_price: {
        Args: { p_base_price: number; p_user_id: string }
        Returns: Json
      }
      dictionary_lookup: {
        Args: { search_term: string }
        Returns: {
          alternative_names: string[]
          canonical_term: string
          classification: string
          confidence: string
          definition: string
          domain_name: string
          icon_emoji: string
          related_terms: string[]
        }[]
      }
      format_address: {
        Args: { addr: Database["public"]["CompositeTypes"]["address"] }
        Returns: string
      }
      gaia_sync: { Args: { p_table?: string }; Returns: Json }
      get_acid_test_questions: {
        Args: { p_include_inactive?: boolean }
        Returns: Json
      }
      get_acid_test_results: { Args: { p_user_id?: string }; Returns: Json }
      is_valid_country_code: { Args: { code: string }; Returns: boolean }
      is_valid_phone: { Args: { phone: string }; Returns: boolean }
      jsonb_to_address: {
        Args: { data: Json }
        Returns: Database["public"]["CompositeTypes"]["address"]
        SetofOptions: {
          from: "*"
          to: "address"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      submit_acid_test: {
        Args: { p_answers: Json; p_user_id: string }
        Returns: Json
      }
      validate_address: {
        Args: { addr: Database["public"]["CompositeTypes"]["address"] }
        Returns: Json
      }
      validate_emergency_contact: {
        Args: {
          contact: Database["public"]["CompositeTypes"]["emergency_contact"]
        }
        Returns: Json
      }
      validate_signup: { Args: never; Returns: Json }
    }
    Enums: {
      address_type:
        | "home"
        | "work"
        | "billing"
        | "shipping"
        | "mailing"
        | "other"
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "suspended"
        | "withdrawn"
      application_type: "creator" | "vendor" | "curator" | "council"
      content_status: "draft" | "published" | "archived"
      display_theme:
        | "cosmic_dark"
        | "cosmic_light"
        | "quantum"
        | "sanctuary"
        | "high_contrast"
      exchange_status: "pending" | "completed" | "failed" | "refunded"
      global_region:
        | "north_america"
        | "central_america"
        | "south_america"
        | "caribbean"
        | "western_europe"
        | "eastern_europe"
        | "northern_europe"
        | "southern_europe"
        | "north_africa"
        | "sub_saharan_africa"
        | "middle_east"
        | "central_asia"
        | "south_asia"
        | "east_asia"
        | "southeast_asia"
        | "oceania"
        | "pacific_islands"
      herald_digest: "instant" | "hourly" | "daily" | "weekly" | "never"
      notification_channel: "in_app" | "email" | "push" | "none"
      pricing_model: "free" | "fixed" | "pay_what_you_want" | "patronage_only"
      processing_speed: "slower" | "standard" | "faster"
      profile_status:
        | "draft"
        | "pending"
        | "active"
        | "inactive"
        | "suspended"
        | "closed"
      relationship_type:
        | "spouse"
        | "partner"
        | "parent"
        | "child"
        | "sibling"
        | "grandparent"
        | "grandchild"
        | "aunt"
        | "uncle"
        | "cousin"
        | "friend"
        | "roommate"
        | "caregiver"
        | "doctor"
        | "therapist"
        | "social_worker"
        | "other"
      sensory_level: "low" | "medium" | "high" | "extreme"
      sovereign_tier: "dweller" | "guild" | "outlander" | "sovereign_weaver"
      subscription_tier: "community" | "ally" | "council" | "corporate"
      user_role:
        | "community"
        | "creator"
        | "vendor"
        | "curator"
        | "council"
        | "admin"
      visibility: "public" | "community" | "connections" | "private"
      ware_type: "physical" | "digital" | "service"
      work_type:
        | "music"
        | "writing"
        | "vision"
        | "performance"
        | "code"
        | "other"
    }
    CompositeTypes: {
      address: {
        country_code: string | null
        administrative_area: string | null
        sub_administrative_area: string | null
        locality: string | null
        sub_locality: string | null
        dependent_locality: string | null
        postal_code: string | null
        sorting_code: string | null
        street_address: string | null
        building_name: string | null
        building_number: string | null
        street_name: string | null
        unit: string | null
        floor: string | null
        room: string | null
        po_box: string | null
        landmark: string | null
        directions: string | null
        address_type: Database["public"]["Enums"]["address_type"] | null
        is_primary: boolean | null
        local_format: string | null
        local_format_language: string | null
        verified_at: string | null
        verification_method: string | null
        notes: string | null
      }
      emergency_contact: {
        full_name: string | null
        relationship: Database["public"]["Enums"]["relationship_type"] | null
        phone_primary: string | null
        phone_secondary: string | null
        email: string | null
        preferred_method:
          | Database["public"]["Enums"]["notification_channel"]
          | null
        address: Database["public"]["CompositeTypes"]["address"] | null
        has_keys: boolean | null
        knows_crisis_plan: boolean | null
        languages_spoken: string[] | null
        availability_notes: string | null
        relationship_notes: string | null
        is_primary_contact: boolean | null
        contact_order: number | null
      }
      source_signature: {
        source_type: string | null
        source_id: string | null
        source_file: string | null
        source_line: number | null
        source_function: string | null
        source_version: string | null
        reason: string | null
      }
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
  public: {
    Enums: {
      address_type: ["home", "work", "billing", "shipping", "mailing", "other"],
      application_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "suspended",
        "withdrawn",
      ],
      application_type: ["creator", "vendor", "curator", "council"],
      content_status: ["draft", "published", "archived"],
      display_theme: [
        "cosmic_dark",
        "cosmic_light",
        "quantum",
        "sanctuary",
        "high_contrast",
      ],
      exchange_status: ["pending", "completed", "failed", "refunded"],
      global_region: [
        "north_america",
        "central_america",
        "south_america",
        "caribbean",
        "western_europe",
        "eastern_europe",
        "northern_europe",
        "southern_europe",
        "north_africa",
        "sub_saharan_africa",
        "middle_east",
        "central_asia",
        "south_asia",
        "east_asia",
        "southeast_asia",
        "oceania",
        "pacific_islands",
      ],
      herald_digest: ["instant", "hourly", "daily", "weekly", "never"],
      notification_channel: ["in_app", "email", "push", "none"],
      pricing_model: ["free", "fixed", "pay_what_you_want", "patronage_only"],
      processing_speed: ["slower", "standard", "faster"],
      profile_status: [
        "draft",
        "pending",
        "active",
        "inactive",
        "suspended",
        "closed",
      ],
      relationship_type: [
        "spouse",
        "partner",
        "parent",
        "child",
        "sibling",
        "grandparent",
        "grandchild",
        "aunt",
        "uncle",
        "cousin",
        "friend",
        "roommate",
        "caregiver",
        "doctor",
        "therapist",
        "social_worker",
        "other",
      ],
      sensory_level: ["low", "medium", "high", "extreme"],
      sovereign_tier: ["dweller", "guild", "outlander", "sovereign_weaver"],
      subscription_tier: ["community", "ally", "council", "corporate"],
      user_role: [
        "community",
        "creator",
        "vendor",
        "curator",
        "council",
        "admin",
      ],
      visibility: ["public", "community", "connections", "private"],
      ware_type: ["physical", "digital", "service"],
      work_type: ["music", "writing", "vision", "performance", "code", "other"],
    },
  },
} as const
