// types/supabase/profiles.ts
import type { Database } from './database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

export type SocialLinks = {
  twitter?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  youtube?: string | null;
  github?: string | null;
  linkedin?: string | null;
  mastodon?: string | null;
  bluesky?: string | null;
  other?: Record<string, string> | null;
};

export type Preferences = {
  accessibility?: {
    reduced_motion?: boolean;
    high_contrast?: boolean;
    dyslexia_mode?: boolean;
    font_size?: 'small' | 'medium' | 'large';
    reduce_transparency?: boolean;
  };
  sensory?: {
    mode?: 'hearth' | 'quantum' | 'void';
    light_sensitive?: boolean;
    sound_sensitive?: boolean;
    crowd_sensitive?: boolean;
    animation_intensity?: 'low' | 'medium' | 'high';
  };
  focus?: {
    focus_mode?: boolean;
    visual_timers?: boolean;
    body_doubling?: boolean;
    tl_dr_enabled?: boolean;
    auto_summarize?: boolean;
  };
  notifications?: {
    email?: boolean;
    push?: boolean;
    sound?: boolean;
    digest_frequency?: 'daily' | 'weekly' | 'never';
  };
  privacy?: {
    profile_public?: boolean;
    show_activity?: boolean;
    show_email?: boolean;
    show_location?: boolean;
  };
  display?: {
    theme?: 'system' | 'light' | 'dark';
    compact_mode?: boolean;
    color_scheme?: 'default' | 'high-contrast';
  };
};

export type ProfileWithSocial = Profile & {
  social_links?: SocialLinks;
  preferences?: Preferences;
};