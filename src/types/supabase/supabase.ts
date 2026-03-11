// types/supabase.ts
// The Quantum Type System - Database Schema Interface

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserTier = 'community' | 'ally' | 'corporate' | 'council';
export type CouncilHouse = 'hearth_keeper' | 'chancellor' | 'seer' | 'aethelred' | 'curator' | 'archivist' | 'skald' | 'codex' | 'executioner';
export type ProductType = 'digital_tool' | 'zine' | 'course' | 'template' | 'art' | 'service';
export type QuestStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';
export type ContributionType = 'concept' | 'code' | 'design' | 'content' | 'testing' | 'promotion' | 'infrastructure';
export type ContentType = 'text' | 'image' | 'audio' | 'video' | 'mixed';
export type Visibility = 'public' | 'subscribers' | 'tier_community' | 'tier_ally';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          email: string;
          user_tier: UserTier;
          acid_test_score: number | null;
          acid_test_label: string | null;
          primary_house: CouncilHouse | null;
          secondary_house: CouncilHouse | null;
          sovereignty_score: number;
          residual_pledge_percent: number;
          dyslexia_mode: boolean;
          sensory_mode: string;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          email?: string;
          user_tier?: UserTier;
          acid_test_score?: number | null;
          primary_house?: CouncilHouse | null;
          secondary_house?: CouncilHouse | null;
          sovereignty_score?: number;
          residual_pledge_percent?: number;
          dyslexia_mode?: boolean;
          sensory_mode?: string;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string | null;
          display_name?: string | null;
          email?: string;
          user_tier?: UserTier;
          acid_test_score?: number | null;
          acid_test_label?: string | null;
          primary_house?: CouncilHouse | null;
          secondary_house?: CouncilHouse | null;
          sovereignty_score?: number;
          residual_pledge_percent?: number;
          dyslexia_mode?: boolean;
          sensory_mode?: string;
          is_verified?: boolean;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          product_type: ProductType;
          price_community: number;
          price_ally: number;
          price_corporate: number;
          residual_pool_percent: number;
          sanctuary_infrastructure_percent: number;
          download_url: string | null;
          preview_image: string | null;
          is_published: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          product_type: ProductType;
          price_community?: number;
          price_ally: number;
          price_corporate?: number;
          residual_pool_percent?: number;
          sanctuary_infrastructure_percent?: number;
          download_url?: string | null;
          preview_image?: string | null;
          is_published?: boolean;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          slug?: string;
          title?: string;
          description?: string | null;
          product_type?: ProductType;
          price_community?: number;
          price_ally?: number;
          price_corporate?: number;
          residual_pool_percent?: number;
          sanctuary_infrastructure_percent?: number;
          download_url?: string | null;
          preview_image?: string | null;
          is_published?: boolean;
          created_by?: string | null;
          updated_at?: string;
        };
      };
      contributions: {
        Row: {
          id: string;
          product_id: string;
          contributor_id: string;
          contribution_type: ContributionType;
          description: string | null;
          percent_share: number;
          is_residual_eligible: boolean;
          is_one_time: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          contributor_id: string;
          contribution_type: ContributionType;
          description?: string | null;
          percent_share: number;
          is_residual_eligible?: boolean;
          is_one_time?: boolean;
          created_at?: string;
        };
        Update: {
          product_id?: string;
          contributor_id?: string;
          contribution_type?: ContributionType;
          description?: string | null;
          percent_share?: number;
          is_residual_eligible?: boolean;
          is_one_time?: boolean;
        };
      };
      sales: {
        Row: {
          id: string;
          product_id: string;
          buyer_id: string;
          tier_applied: UserTier;
          gross_amount: number;
          payment_processor_fee: number;
          net_amount: number;
          to_residual_pool: number;
          to_infrastructure: number;
          to_creator_immediate: number;
          payment_status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          buyer_id: string;
          tier_applied: UserTier;
          gross_amount: number;
          payment_processor_fee: number;
          net_amount: number;
          to_residual_pool: number;
          to_infrastructure: number;
          to_creator_immediate: number;
          payment_status: string;
          created_at?: string;
        };
        Update: {
          product_id?: string;
          buyer_id?: string;
          tier_applied?: UserTier;
          gross_amount?: number;
          payment_processor_fee?: number;
          net_amount?: number;
          to_residual_pool?: number;
          to_infrastructure?: number;
          to_creator_immediate?: number;
          payment_status?: string;
        };
      };
      residual_payouts: {
        Row: {
          id: string;
          sale_id: string;
          contributor_id: string;
          amount: number;
          product_id: string;
          status: string;
          paid_at: string | null;
          calculation_note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sale_id: string;
          contributor_id: string;
          amount: number;
          product_id: string;
          status?: string;
          paid_at?: string | null;
          calculation_note?: string | null;
          created_at?: string;
        };
        Update: {
          sale_id?: string;
          contributor_id?: string;
          amount?: number;
          product_id?: string;
          status?: string;
          paid_at?: string | null;
          calculation_note?: string | null;
        };
      };
      acid_test_questions: {
        Row: {
          id: string;
          question_text: string;
          question_type: string;
          order_index: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          question_text: string;
          question_type: string;
          order_index: number;
          is_active?: boolean;
        };
        Update: {
          question_text?: string;
          question_type?: string;
          order_index?: number;
          is_active?: boolean;
        };
      };
      acid_test_answers: {
        Row: {
          id: string;
          question_id: string;
          answer_text: string;
          score_value: number;
          indicates_nd: boolean;
          ally_tier_price: number | null;
        };
        Insert: {
          id?: string;
          question_id: string;
          answer_text: string;
          score_value: number;
          indicates_nd?: boolean;
          ally_tier_price?: number | null;
        };
        Update: {
          question_id?: string;
          answer_text?: string;
          score_value?: number;
          indicates_nd?: boolean;
          ally_tier_price?: number | null;
        };
      };
      quests: {
        Row: {
          id: string;
          house: CouncilHouse;
          title: string;
          description: string;
          required_sovereignty_score: number;
          prerequisite_quest_id: string | null;
          sovereignty_reward: number;
          residual_multiplier_bonus: number;
          instructions: string | null;
          submission_type: string;
          order_index: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          house: CouncilHouse;
          title: string;
          description: string;
          required_sovereignty_score?: number;
          prerequisite_quest_id?: string | null;
          sovereignty_reward?: number;
          residual_multiplier_bonus?: number;
          instructions?: string | null;
          submission_type: string;
          order_index: number;
          is_active?: boolean;
        };
        Update: {
          house?: CouncilHouse;
          title?: string;
          description?: string;
          required_sovereignty_score?: number;
          prerequisite_quest_id?: string | null;
          sovereignty_reward?: number;
          residual_multiplier_bonus?: number;
          instructions?: string | null;
          submission_type?: string;
          order_index?: number;
          is_active?: boolean;
        };
      };
      user_quests: {
        Row: {
          id: string;
          user_id: string;
          quest_id: string;
          status: QuestStatus;
          started_at: string | null;
          completed_at: string | null;
          submitted_content: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          quest_id: string;
          status?: QuestStatus;
          started_at?: string | null;
          completed_at?: string | null;
          submitted_content?: string | null;
        };
        Update: {
          user_id?: string;
          quest_id?: string;
          status?: QuestStatus;
          started_at?: string | null;
          completed_at?: string | null;
          submitted_content?: string | null;
        };
      };
      channels: {
        Row: {
          id: string;
          owner_id: string;
          handle: string;
          display_name: string | null;
          description: string | null;
          avatar_url: string | null;
          banner_url: string | null;
          subscription_price_community: number;
          subscription_price_ally: number;
          allow_subscriptions: boolean;
          content_rating: string;
          subscriber_count: number;
          total_emeralds: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          handle: string;
          display_name?: string | null;
          description?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          subscription_price_community?: number;
          subscription_price_ally?: number;
          allow_subscriptions?: boolean;
          content_rating?: string;
          subscriber_count?: number;
          total_emeralds?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          owner_id?: string;
          handle?: string;
          display_name?: string | null;
          description?: string | null;
          avatar_url?: string | null;
          banner_url?: string | null;
          subscription_price_community?: number;
          subscription_price_ally?: number;
          allow_subscriptions?: boolean;
          content_rating?: string;
          subscriber_count?: number;
          total_emeralds?: number;
          updated_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          channel_id: string;
          author_id: string;
          content_type: ContentType;
          title: string;
          body: string | null;
          media_urls: string[] | null;
          sovereignty_tags: string[] | null;
          visibility: Visibility;
          allow_tipping: boolean;
          tips_received: number;
          emerald_count: number;
          comment_count: number;
          resonance_count: number;
          published_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          channel_id: string;
          author_id: string;
          content_type: ContentType;
          title: string;
          body?: string | null;
          media_urls?: string[] | null;
          sovereignty_tags?: string[] | null;
          visibility?: Visibility;
          allow_tipping?: boolean;
          tips_received?: number;
          emerald_count?: number;
          comment_count?: number;
          resonance_count?: number;
          published_at?: string | null;
          created_at?: string;
        };
        Update: {
          channel_id?: string;
          author_id?: string;
          content_type?: ContentType;
          title?: string;
          body?: string | null;
          media_urls?: string[] | null;
          sovereignty_tags?: string[] | null;
          visibility?: Visibility;
          allow_tipping?: boolean;
          tips_received?: number;
          emerald_count?: number;
          comment_count?: number;
          resonance_count?: number;
          published_at?: string | null;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          subscriber_id: string;
          channel_id: string;
          tier_applied: string;
          monthly_amount: number;
          status: string;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subscriber_id: string;
          channel_id: string;
          tier_applied: string;
          monthly_amount: number;
          status?: string;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          subscriber_id?: string;
          channel_id?: string;
          tier_applied?: string;
          monthly_amount?: number;
          status?: string;
          expires_at?: string | null;
        };
      };
      emeralds: {
        Row: {
          id: string;
          post_id: string;
          giver_id: string;
          amount: number;
          message: string | null;
          is_residual_eligible: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          giver_id: string;
          amount: number;
          message?: string | null;
          is_residual_eligible?: boolean;
          created_at?: string;
        };
        Update: {
          post_id?: string;
          giver_id?: string;
          amount?: number;
          message?: string | null;
          is_residual_eligible?: boolean;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          parent_id: string | null;
          content: string;
          is_edited: boolean;
          is_hidden: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          parent_id?: string | null;
          content: string;
          is_edited?: boolean;
          is_hidden?: boolean;
          created_at?: string;
        };
        Update: {
          post_id?: string;
          author_id?: string;
          parent_id?: string | null;
          content?: string;
          is_edited?: boolean;
          is_hidden?: boolean;
        };
      };
    };
    Views: {
      public_ledger: {
        Row: {
          sale_id: string;
          product: string;
          gross_amount: number;
          to_residual_pool: number;
          to_infrastructure: number;
          creator_pool: number;
          created_at: string;
          residual_recipients: number;
        };
      };
      personalized_feed: {
        Row: {
          id: string;
          channel_id: string;
          author_id: string;
          content_type: ContentType;
          title: string;
          body: string | null;
          media_urls: string[] | null;
          visibility: Visibility;
          emerald_count: number;
          comment_count: number;
          published_at: string | null;
          channel_handle: string;
          channel_name: string;
          feed_rank: number;
        };
      };
    };
  };
}

// Helper types for cleaner components
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Product = Tables<'products'>;
export type Profile = Tables<'profiles'>;
export type Quest = Tables<'quests'>;
export type UserQuest = Tables<'user_quests'>;
export type Channel = Tables<'channels'>;
export type Post = Tables<'posts'>;
export type ResidualPayout = Tables<'residual_payouts'>;
export type Contribution = Tables<'contributions'>;

// Additional helper types for Insert and Update
export type TableInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TableUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Specific Insert types
export type ProfileInsert = TableInsert<'profiles'>;
export type ProductInsert = TableInsert<'products'>;
export type ContributionInsert = TableInsert<'contributions'>;
export type SaleInsert = TableInsert<'sales'>;
export type ResidualPayoutInsert = TableInsert<'residual_payouts'>;
export type QuestInsert = TableInsert<'quests'>;
export type UserQuestInsert = TableInsert<'user_quests'>;
export type ChannelInsert = TableInsert<'channels'>;
export type PostInsert = TableInsert<'posts'>;
export type SubscriptionInsert = TableInsert<'subscriptions'>;
export type EmeraldInsert = TableInsert<'emeralds'>;
export type CommentInsert = TableInsert<'comments'>;

// Specific Update types
export type ProfileUpdate = TableUpdate<'profiles'>;
export type ProductUpdate = TableUpdate<'products'>;
export type ContributionUpdate = TableUpdate<'contributions'>;
export type SaleUpdate = TableUpdate<'sales'>;
export type ResidualPayoutUpdate = TableUpdate<'residual_payouts'>;
export type QuestUpdate = TableUpdate<'quests'>;
export type UserQuestUpdate = TableUpdate<'user_quests'>;
export type ChannelUpdate = TableUpdate<'channels'>;
export type PostUpdate = TableUpdate<'posts'>;
export type SubscriptionUpdate = TableUpdate<'subscriptions'>;
export type EmeraldUpdate = TableUpdate<'emeralds'>;
export type CommentUpdate = TableUpdate<'comments'>;