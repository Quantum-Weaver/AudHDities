// src/app/api/auth/update-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

// Validation schema for profile updates
const profileUpdateSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).optional(),
  bio: z.string().max(5000).optional(),
  avatar_url: z.string().url().optional().nullable(),
  banner_url: z.string().url().optional().nullable(),
  user_tier: z.enum(['community', 'ally', 'corporate', 'council']).optional(),
  communication_style: z.enum(['direct', 'gentle', 'detailed', 'concise']).optional(),
  notification_frequency: z.enum(['instant', 'daily', 'weekly', 'never']).optional(),
  email_notifications: z.boolean().optional(),
  push_notifications: z.boolean().optional(),
  nd_preferences: z.object({
    reduced_motion: z.boolean().optional(),
    high_contrast: z.boolean().optional(),
    focus_mode: z.boolean().optional(),
    sound_notifications: z.boolean().optional(),
    visual_timers: z.boolean().optional(),
    tl_dr_enabled: z.boolean().optional(),
    dyslexia_friendly: z.boolean().optional(),
    adhd_friendly: z.boolean().optional(),
    autism_friendly: z.boolean().optional(),
  }).optional(),
  sensory_preferences: z.object({
    light_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).optional(),
    sound_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).optional(),
    crowd_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).optional(),
    touch_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).optional(),
    vestibular_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).optional(),
    olfactory_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).optional(),
  }).optional(),
});

// Community profile update schema
const communityProfileUpdateSchema = z.object({
  nd_identity: z.array(z.string()).optional(),
  sensory_accommodations: z.array(z.string()).optional(),
  support_needs: z.array(z.string()).optional(),
  communication_notes: z.string().optional(),
  is_mentor: z.boolean().optional(),
  crisis_contact_name: z.string().optional(),
  crisis_contact_phone: z.string().optional(),
  crisis_contact_email: z.string().email().optional(),
  crisis_instructions: z.string().optional(),
});

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Separate profile and community updates
    const { community, ...profileData } = body;
    
    // Validate profile data
    const validatedProfile = profileUpdateSchema.safeParse(profileData);
    if (!validatedProfile.success) {
      return NextResponse.json(
        { error: 'Invalid profile data', details: validatedProfile.error },
        { status: 400 }
      );
    }

    // Update profile
    if (Object.keys(validatedProfile.data).length > 0) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          ...validatedProfile.data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        return NextResponse.json(
          { error: 'Failed to update profile' },
          { status: 500 }
        );
      }
    }

    // Update community profile if provided
    if (community) {
      const validatedCommunity = communityProfileUpdateSchema.safeParse(community);
      if (validatedCommunity.success && Object.keys(validatedCommunity.data).length > 0) {
        const { error: communityError } = await supabase
          .from('community_profiles')
          .update({
            ...validatedCommunity.data,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (communityError) {
          console.error('Community profile update error:', communityError);
          // Don't fail the whole request, just log
        }
      }
    }

    // Fetch updated profile with relations
    const { data: updatedProfile, error: fetchError } = await supabase
      .from('profiles')
      .select(`
        *,
        community_profiles (*),
        creator_profiles (*),
        vendor_profiles (*)
      `)
      .eq('id', user.id)
      .single();

    if (fetchError) {
      console.error('Fetch updated profile error:', fetchError);
    }

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
      message: 'Profile updated successfully',
    });
    
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}