// src/types/supabase/applications.ts
import type { Database } from '../database.types';

export type Application = Database['public']['Tables']['applications']['Row'];
export type ApplicationInsert = Database['public']['Tables']['applications']['Insert'];
export type ApplicationUpdate = Database['public']['Tables']['applications']['Update'];
export type ApplicationType = 'creator' | 'vendor' | 'mentor' | 'event' | 'sponsor';
export type VerificationStatus = Database['public']['Enums']['verification_status'];

export interface ApplicationWithUser extends Application {
  user?: {
    id: string;
    username: string | null;
    display_name: string | null;
    email: string;
  };
  reviewer?: {
    id: string;
    username: string | null;
    display_name: string | null;
  };
}

export interface ApplicationWithRelations extends Application {
  user?: Database['public']['Tables']['profiles']['Row'];
  reviewer?: Database['public']['Tables']['profiles']['Row'];
}

// Application form data types
export interface CreatorApplicationData {
  creative_categories: string[];
  portfolio_url?: string;
  creative_description: string;
  experience: string;
  goals: string;
  motivation: string;
  nd_identity?: string[];
}

export interface VendorApplicationData {
  business_name: string;
  business_type?: string;
  business_description: string;
  product_categories: string[];
  service_regions: string[];
  website_url?: string;
  experience: string;
  motivation: string;
  additional_info?: string;
}

export const applicationDefaults = {
  status: 'pending' as const,
  onboarding_version: '1.0',
  form_data: {},
} as const;