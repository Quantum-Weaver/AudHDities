// src/app/api/auth/update-profile/route.ts
// Rewritten 2026-07-18 for the evolved schema. The profiles table dissolved:
// public identity edits go to community_profiles (by created_by), and
// accessibility/display preferences go to vessel_config. Fields the schema
// retired (username, pronouns, user_tier, communication_style,
// preferred_environment, primary_house, the crisis_contact_* columns —
// crisis data now lives in user_private under its own protections) are no
// longer accepted here.
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

// community_profiles — the vessel's public identity
const identityUpdateSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  slug: z.string().min(3).max(40).regex(/^[a-z0-9-]+$/).optional(),
  bio: z.string().max(500).optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
  banner_url: z.string().url().optional().nullable(),
  website_url: z.string().url().optional().nullable(),
  icon_emoji: z.string().max(16).optional().nullable(),
  sensory_hints: z.string().max(500).optional().nullable(),
  social_links: z.any().optional().nullable(),
});

// vessel_config — how the Sanctuary presents itself to this vessel
const configUpdateSchema = z.object({
  theme: z.enum(['cosmic_dark', 'cosmic_light', 'quantum', 'sanctuary', 'high_contrast']).optional(),
  dyslexia_font: z.boolean().optional(),
  reduce_motion: z.boolean().optional(),
  reduce_transparency: z.boolean().optional(),
  high_contrast: z.boolean().optional(),
  font_scale: z.number().min(0.5).max(3).optional(),
  autoplay_audio: z.boolean().optional(),
  autoplay_video: z.boolean().optional(),
  content_warnings: z.string().optional(),
  density: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  heralds_enabled: z.boolean().optional(),
  herald_sounds: z.boolean().optional(),
  // THE CEREMONY SWITCHBOARD (Movement IV, 2026-07-29) — both opt-in,
  // default false in the schema (migrations/20260729_ceremony_choices.sql,
  // KP's hand). Absence of choice means OFF, per THE OPT-IN LAW.
  ceremony_arrival: z.boolean().optional(),
  ceremony_farewell: z.boolean().optional(),
  // THE RETURNS (2026-07-31, KP's commissions, docs/sql/013): the bubble
  // caps come home from device-localStorage, and the environment picker
  // gets its schema home back ('env:variant', the selector's own dialect).
  bubble_daily_max: z.number().int().min(0).max(9999).optional(),
  bubble_hourly_max: z.number().int().min(0).max(999).optional(),
  environment_preference: z.string().regex(/^[a-z_]+:[1-4]$/).optional(),
});

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { config, community, ...identityData } = body;
    // `community` accepted as a legacy alias for identity fields
    const identityInput = { ...identityData, ...(community || {}) };

    const validatedIdentity = identityUpdateSchema.safeParse(identityInput);
    if (!validatedIdentity.success) {
      return NextResponse.json(
        { error: 'Invalid profile data', details: validatedIdentity.error.issues },
        { status: 400 }
      );
    }

    if (Object.keys(validatedIdentity.data).length > 0) {
      const { error: updateError } = await supabase
        .from('community_profiles')
        .update({ ...validatedIdentity.data, updated_at: new Date().toISOString() })
        .eq('created_by', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
      }
    }

    if (config) {
      const validatedConfig = configUpdateSchema.safeParse(config);
      if (!validatedConfig.success) {
        return NextResponse.json(
          { error: 'Invalid config data', details: validatedConfig.error.issues },
          { status: 400 }
        );
      }
      if (Object.keys(validatedConfig.data).length > 0) {
        const { error: configError } = await supabase
          .from('vessel_config')
          .update({
            ...validatedConfig.data,
            updated_at: new Date().toISOString(),
          })
          .eq('created_by', user.id);

        if (configError) {
          console.error('Vessel config update error:', configError);
        }
      }
    }

    const [profileRes, configRes] = await Promise.all([
      supabase.from('community_profiles').select('*').eq('created_by', user.id).maybeSingle(),
      supabase.from('vessel_config').select('*').eq('created_by', user.id).maybeSingle(),
    ]);

    return NextResponse.json({
      success: true,
      profile: profileRes.data ?? null,
      config: configRes.data ?? null,
      message: 'Profile updated successfully',
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
