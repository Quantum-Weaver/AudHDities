// src/app/api/creators/apply/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';
import type { CreatorApplicationData, ApplicationInsert } from '@/types/supabase/tables/applications';
import type { Json } from '@/types/supabase/database.types';

// Validation schema for creator application
const creatorApplicationSchema = z.object({
  creative_categories: z.array(z.string()).min(1, "Select at least one creative category"),
  portfolio_url: z.string().url().optional().nullable(),
  creative_description: z.string().min(50, "Please provide at least 50 characters describing your creative practice").max(2000),
  experience: z.string().min(50, "Please share at least 50 characters about your experience").max(2000),
  goals: z.string().min(50, "Please share at least 50 characters about your goals").max(1000),
  motivation: z.string().min(50, "Please share at least 50 characters about why you want to join").max(1000),
  nd_identity: z.array(z.string()).optional().default([]),
});

// Helper to check if user already has a pending application
async function hasPendingApplication(supabase: any, userId: string, type: string): Promise<boolean> {
  const { data } = await supabase
    .from('applications')
    .select('id')
    .eq('user_id', userId)
    .eq('application_type', type)
    .eq('status', 'pending')
    .maybeSingle();
  
  return !!data;
}

// Helper to check if user is already a creator
async function isAlreadyCreator(supabase: any, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('profiles')
    .select('is_creator')
    .eq('id', userId)
    .single();
  
  return data?.is_creator === true;
}

// Helper to convert form data to Json type
function toJson<T>(data: T): Json {
  return data as unknown as Json;
}

// =====================================================
// POST /api/creators/apply
// Submit a creator application
// =====================================================
export async function POST(request: NextRequest) {
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
    
    // Check if user is already a creator
    const alreadyCreator = await isAlreadyCreator(supabase, user.id);
    if (alreadyCreator) {
      return NextResponse.json(
        { error: 'You are already a verified creator' },
        { status: 400 }
      );
    }
    
    // Check if user already has a pending application
    const hasPending = await hasPendingApplication(supabase, user.id, 'creator');
    if (hasPending) {
      return NextResponse.json(
        { error: 'You already have a pending application' },
        { status: 400 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = creatorApplicationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid application data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const formData = validationResult.data as CreatorApplicationData;
    
    // Prepare application data - convert formData to Json
    const applicationData = {
      user_id: user.id,
      application_type: 'creator',
      form_data: toJson(formData),
      onboarding_doc_path: 'docs/guides/creator-onboarding.md',
      onboarding_version: '1.0',
      status: 'pending' as const,
    };
    
    // Insert application
    const { data, error } = await supabase
      .from('applications')
      .insert(applicationData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating application:', error);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }
    
    // Optional: Send notification email via Resend
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, username')
        .eq('id', user.id)
        .single();
      
      const displayName = profile?.display_name || profile?.username || user.email;
      
      // Fire and forget - don't wait for email
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: process.env.ADMIN_EMAIL || 'admin@audhdities.com',
          subject: `New Creator Application: ${displayName}`,
          template: 'creator-application',
          data: {
            name: displayName,
            email: user.email,
            categories: formData.creative_categories.join(', '),
            description: formData.creative_description.substring(0, 200),
          }
        })
      }).catch(e => console.error('Email notification failed:', e));
    } catch (emailError) {
      // Log but don't fail the request
      console.error('Failed to send notification email:', emailError);
    }
    
    return NextResponse.json({
      success: true,
      application: data,
      message: 'Application submitted successfully. We will review it within 5-7 business days.'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Creator application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// GET /api/creators/apply
// Check application status for current user
// =====================================================
export async function GET(request: NextRequest) {
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
    
    // Fetch user's applications
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
      .eq('application_type', 'creator')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) {
      console.error('Error fetching application status:', error);
      return NextResponse.json(
        { error: 'Failed to fetch application status' },
        { status: 500 }
      );
    }
    
    const application = data?.[0] || null;
    
    return NextResponse.json({
      hasApplication: !!application,
      application: application ? {
        id: application.id,
        status: application.status,
        created_at: application.created_at,
        reviewed_at: application.reviewed_at,
        review_notes: application.review_notes,
      } : null,
    });
    
  } catch (error) {
    console.error('Creator application status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}