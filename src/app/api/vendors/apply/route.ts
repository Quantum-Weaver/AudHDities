// src/app/api/vendors/apply/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';
import type { VendorApplicationData, ApplicationInsert } from '@/types/supabase/tables/applications';
import type { Json } from '@/types/supabase/database.types';

// Validation schema for vendor application
const vendorApplicationSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters").max(100),
  business_type: z.enum(['sole_proprietor', 'llc', 'nonprofit', 'cooperative', 'partnership', 'other']).optional(),
  business_description: z.string().min(50, "Please provide at least 50 characters describing your business").max(2000),
  product_categories: z.array(z.string()).min(1, "Select at least one product category"),
  service_regions: z.array(z.string()).min(1, "Select at least one service region"),
  website_url: z.string().url().optional().nullable(),
  experience: z.string().min(50, "Please share at least 50 characters about your experience").max(2000),
  motivation: z.string().min(50, "Please share at least 50 characters about why you want to join").max(1000),
  additional_info: z.string().optional().nullable(),
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

// Helper to check if user is already a vendor
async function isAlreadyVendor(supabase: any, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('profiles')
    .select('is_vendor')
    .eq('id', userId)
    .single();
  
  return data?.is_vendor === true;
}

// Helper to convert form data to Json type
function toJson<T>(data: T): Json {
  return data as unknown as Json;
}

// Service region options (for reference)
export const SERVICE_REGIONS = [
  'Local (within 50 miles)',
  'Regional (within state)',
  'National (within country)',
  'International',
  'Remote / Digital Only',
] as const;

// =====================================================
// POST /api/vendors/apply
// Submit a vendor application
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
    
    // Check if user is already a vendor
    const alreadyVendor = await isAlreadyVendor(supabase, user.id);
    if (alreadyVendor) {
      return NextResponse.json(
        { error: 'You are already a verified vendor' },
        { status: 400 }
      );
    }
    
    // Check if user already has a pending application
    const hasPending = await hasPendingApplication(supabase, user.id, 'vendor');
    if (hasPending) {
      return NextResponse.json(
        { error: 'You already have a pending application' },
        { status: 400 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validationResult = vendorApplicationSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid application data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const formData = validationResult.data as VendorApplicationData;
    
    // Prepare application data - convert formData to Json
    const applicationData = {
      user_id: user.id,
      application_type: 'vendor',
      form_data: toJson(formData),
      onboarding_doc_path: 'docs/guides/vendor-onboarding.md',
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
      console.error('Error creating vendor application:', error);
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
          subject: `New Vendor Application: ${formData.business_name}`,
          template: 'vendor-application',
          data: {
            businessName: formData.business_name,
            applicant: displayName,
            email: user.email,
            categories: formData.product_categories.join(', '),
            regions: formData.service_regions.join(', '),
            description: formData.business_description.substring(0, 200),
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
    console.error('Vendor application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// GET /api/vendors/apply
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
      .eq('application_type', 'vendor')
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
    console.error('Vendor application status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}