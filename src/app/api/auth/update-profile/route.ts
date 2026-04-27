// src/app/api/auth/update-profile/route.ts
// src/app/api/auth/update-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';
import { ENUM_VALUES } from '@/types/supabase/enums';

// Validation schema for profile updates — aligned with validators/profiles.ts
const profileUpdateSchema = z.object({
  display_name: z.string().min(1).max(100).optional().nullable(),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  banner_url: z.string().url().optional().nullable(),
  full_name: z.string().max(200).optional().nullable(),
  user_tier: z.enum(ENUM_VALUES.userTier).optional(),
  communication_style: z.enum(ENUM_VALUES.communicationStyle).optional().nullable(),
  preferred_environment: z.string().optional().nullable(),
  pronouns: z.string().optional().nullable(),
  dyslexia_mode: z.boolean().optional().nullable(),
  sensory_mode: z.enum(ENUM_VALUES.sensoryMode).optional().nullable(),
  primary_house: z.enum(ENUM_VALUES.councilHouse).optional().nullable(),
  nd_preferences: z.any().optional().nullable(),
  sensory_preferences: z.any().optional().nullable(),
  algorithm_preferences: z.any().optional().nullable(),
  last_active: z.string().datetime().optional().nullable(),
});

// Community profile update schema — aligned with validators/community_profiles.ts
const communityProfileUpdateSchema = z.object({
  nd_identity: z.array(z.string()).optional().nullable(),
  sensory_accommodations: z.array(z.string()).optional().nullable(),
  support_needs: z.array(z.string()).optional().nullable(),
  is_mentor: z.boolean().optional().nullable(),
  mentee_count: z.number().int().min(0).optional().nullable(),
  crisis_contact_name: z.string().optional().nullable(),
  crisis_contact_phone: z.string().optional().nullable(),
  crisis_contact_email: z.string().email().optional().nullable(),
  crisis_instructions: z.string().optional().nullable(),
  joined_house: z.enum(ENUM_VALUES.councilHouse).optional().nullable(),
});

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { community, ...profileData } = body;
    
    const validatedProfile = profileUpdateSchema.safeParse(profileData);
    if (!validatedProfile.success) {
      return NextResponse.json(
        { error: 'Invalid profile data', details: validatedProfile.error.issues },
        { status: 400 }
      );
    }

    if (Object.keys(validatedProfile.data).length > 0) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ ...validatedProfile.data, updated_at: new Date().toISOString() } as any)
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
      }
    }

    if (community) {
      const validatedCommunity = communityProfileUpdateSchema.safeParse(community);
      if (validatedCommunity.success && Object.keys(validatedCommunity.data).length > 0) {
        const { error: communityError } = await supabase
          .from('community_profiles')
          .update({ ...validatedCommunity.data, updated_at: new Date().toISOString() })
          .eq('profile_id', user.id);

        if (communityError) {
          console.error('Community profile update error:', communityError);
        }
      }
    }

    const { data: updatedProfile, error: fetchError } = await supabase
      .from('profiles')
      .select(`*, community_profiles!fk_community_profiles_profile_id (*), creator_profiles!fk_creator_profile_id (*), vendor_profiles!fk_vendor_profiles_profile_id (*)`)
      .eq('id', user.id)
      .single();

    if (fetchError) {
      console.error('Fetch updated profile error:', fetchError);
    }

    return NextResponse.json({ success: true, profile: updatedProfile, message: 'Profile updated successfully' });
    
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}