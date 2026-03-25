// src/types/supabase/profiles.ts
import type { Database } from '../database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type CommunityProfile = Database['public']['Tables']['community_profiles']['Row'];
export type CommunityProfileInsert = Database['public']['Tables']['community_profiles']['Insert'];
export type CommunityProfileUpdate = Database['public']['Tables']['community_profiles']['Update'];

export type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
export type CreatorProfileInsert = Database['public']['Tables']['creator_profiles']['Insert'];
export type CreatorProfileUpdate = Database['public']['Tables']['creator_profiles']['Update'];

export type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];
export type VendorProfileInsert = Database['public']['Tables']['vendor_profiles']['Insert'];
export type VendorProfileUpdate = Database['public']['Tables']['vendor_profiles']['Update'];

// Extended types with relations
export interface ProfileWithRelations extends Profile {
  community_profile?: CommunityProfile | null;
  creator_profile?: CreatorProfile | null;
  vendor_profile?: VendorProfile | null;
}

export type UserTier = 'community' | 'ally' | 'corporate' | 'council';
export type CommunicationStyle = 'direct' | 'gentle' | 'detailed' | 'concise';
export type NotificationFrequency = 'instant' | 'daily' | 'weekly' | 'never';

export interface NDPreferences {
  reduced_motion: boolean;
  high_contrast: boolean;
  focus_mode: boolean;
  sound_notifications: boolean;
  visual_timers: boolean;
  tl_dr_enabled: boolean;
  dyslexia_friendly: boolean;
  adhd_friendly: boolean;
  autism_friendly: boolean;
}

export interface SensoryPreferences {
  light_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  sound_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  crowd_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  touch_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  vestibular_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
  olfactory_sensitivity: 'low' | 'medium' | 'high' | 'avoidant';
}

export const profileDefaults = {
  status: 'active' as const,
  user_tier: 'community' as const,
  sovereignty_score: 0,
  residual_pledge_percent: 0,
  email_notifications: true,
  push_notifications: true,
  notification_frequency: 'instant' as const,
  communication_style: 'direct' as const,
  badges: [],
} as const;

export const defaultNDPreferences: NDPreferences = {
  reduced_motion: false,
  high_contrast: false,
  focus_mode: false,
  sound_notifications: true,
  visual_timers: true,
  tl_dr_enabled: true,
  dyslexia_friendly: false,
  adhd_friendly: false,
  autism_friendly: false,
};

export const defaultSensoryPreferences: SensoryPreferences = {
  light_sensitivity: 'medium',
  sound_sensitivity: 'medium',
  crowd_sensitivity: 'medium',
  touch_sensitivity: 'low',
  vestibular_sensitivity: 'low',
  olfactory_sensitivity: 'low',
};