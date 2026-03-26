// src/app/api/admin/applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';
import type { ApplicationWithUser } from '@/types/supabase/tables/applications';

// Validation schema for updating application status
const applicationUpdateSchema = z.object({
  status: z.enum(['pending', 'verified', 'rejected', 'suspended']),
  review_notes: z.string().optional().nullable(),
  admin_notes: z.string().optional().nullable(),
});

// Validation schema for filtering applications
const querySchema = z.object({
  status: z.enum(['pending', 'verified', 'rejected', 'suspended', 'all']).optional().default('pending'),
  type: z.enum(['creator', 'vendor', 'mentor', 'event', 'sponsor', 'all']).optional().default('all'),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(20),
  search: z.string().optional(),
});

// Helper to update creator profile when application is approved
async function approveCreatorProfile(supabase: any, userId: string): Promise<void> {
  // Update profile to mark as creator
  await supabase
    .from('profiles')
    .update({ is_creator: true })
    .eq('id', userId);
  
  // Check if creator profile exists, create if not
  const { data: existing } = await supabase
    .from('creator_profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();
  
  if (!existing) {
    await supabase
      .from('creator_profiles')
      .insert({
        id: userId,
        verification_status: 'verified',
        verified_badge: true,
        verified_at: new Date().toISOString(),
      });
  } else {
    await supabase
      .from('creator_profiles')
      .update({
        verification_status: 'verified',
        verified_badge: true,
        verified_at: new Date().toISOString(),
      })
      .eq('id', userId);
  }
}

// Helper to update vendor profile when application is approved
async function approveVendorProfile(supabase: any, userId: string, formData: any): Promise<void> {
  // Update profile to mark as vendor
  await supabase
    .from('profiles')
    .update({ is_vendor: true })
    .eq('id', userId);
  
  // Check if vendor profile exists, create if not
  const { data: existing } = await supabase
    .from('vendor_profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();
  
  const vendorData = {
    id: userId,
    business_name: formData.business_name,
    business_type: formData.business_type || null,
    business_description: formData.business_description,
    product_categories: formData.product_categories || [],
    website_url: formData.website_url || null,
    verification_status: 'verified',
    verified_badge: true,
    verified_at: new Date().toISOString(),
  };
  
  if (!existing) {
    await supabase
      .from('vendor_profiles')
      .insert(vendorData);
  } else {
    await supabase
      .from('vendor_profiles')
      .update(vendorData)
      .eq('id', userId);
  }
}

// Helper to log admin action
async function logAdminAction(
  supabase: any, 
  adminId: string, 
  action: string, 
  targetId: string, 
  targetType: string,
  publicNote: string | null = null,
  metadata: any = null
): Promise<void> {
  await supabase
    .from('admin_logs')
    .insert({
      admin_id: adminId,
      action,
      target_id: targetId,
      target_type: targetType,
      public_note: publicNote,
      metadata,
    });
}

// =====================================================
// GET /api/admin/applications
// List applications (admin only)
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
    
    // Check if user is admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const query = querySchema.parse({
      status: searchParams.get('status') || 'pending',
      type: searchParams.get('type') || 'all',
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      search: searchParams.get('search') || undefined,
    });
    
    const offset = (query.page - 1) * query.limit;
    
    // Build query with explicit foreign key references to avoid ambiguity
    let dbQuery = supabase
      .from('applications')
      .select(`
        *,
        user:profiles!applications_user_id_fkey (
          id,
          username,
          display_name,
          email,
          avatar_url
        ),
        reviewer:profiles!applications_reviewed_by_fkey (
          id,
          username,
          display_name
        )
      `, { count: 'exact' });
    
    // Filter by status
    if (query.status !== 'all') {
      dbQuery = dbQuery.eq('status', query.status);
    }
    
    // Filter by application type
    if (query.type !== 'all') {
      dbQuery = dbQuery.eq('application_type', query.type);
    }
    
    // Search filter
    if (query.search) {
      dbQuery = dbQuery.or(`
        user.display_name.ilike.%${query.search}%,
        user.username.ilike.%${query.search}%,
        user.email.ilike.%${query.search}%,
        form_data->>business_name.ilike.%${query.search}%,
        form_data->>creative_categories.cs.{${query.search}}
      `);
    }
    
    // Order by newest first
    dbQuery = dbQuery.order('created_at', { ascending: false });
    
    // Pagination
    dbQuery = dbQuery.range(offset, offset + query.limit - 1);
    
    const { data, error, count } = await dbQuery;
    
    if (error) {
      console.error('Error fetching applications:', error);
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      );
    }
    
    // Transform data to include form_data parsing and cast safely
    const applications = (data || []).map(app => {
      // Parse form_data if it's a string
      let parsedFormData = app.form_data;
      if (typeof parsedFormData === 'string') {
        try {
          parsedFormData = JSON.parse(parsedFormData);
        } catch {
          parsedFormData = {};
        }
      }
      
      return {
        ...app,
        form_data: parsedFormData,
        user: app.user || undefined,
        reviewer: app.reviewer || undefined,
      };
    }) as ApplicationWithUser[];
    
    return NextResponse.json({
      applications,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / query.limit),
      },
    });
    
  } catch (error) {
    console.error('Admin applications error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// POST /api/admin/applications
// Bulk action on applications (admin only)
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
    
    // Check if user is admin
    const isAdmin = await isUserAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { action, applicationIds, ...data } = body;
    
    if (!action || !applicationIds || !Array.isArray(applicationIds)) {
      return NextResponse.json(
        { error: 'Invalid request: action and applicationIds required' },
        { status: 400 }
      );
    }
    
    const results = [];
    
    for (const id of applicationIds) {
      try {
        // Fetch application details
        const { data: app, error: fetchError } = await supabase
          .from('applications')
          .select('*')
          .eq('id', id)
          .single();
        
        if (fetchError || !app) {
          results.push({ id, success: false, error: 'Application not found' });
          continue;
        }
        
        let result;
        
        switch (action) {
          case 'approve':
            result = await approveApplication(supabase, user.id, app);
            break;
          case 'reject':
            result = await rejectApplication(supabase, user.id, app, data.review_notes);
            break;
          case 'delete':
            result = await deleteApplication(supabase, user.id, app);
            break;
          default:
            result = { success: false, error: 'Unknown action' };
        }
        
        results.push({ id, ...result });
        
      } catch (err) {
        results.push({ id, success: false, error: 'Processing failed' });
      }
    }
    
    return NextResponse.json({
      success: true,
      results,
    });
    
  } catch (error) {
    console.error('Admin bulk action error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions for application actions
async function approveApplication(supabase: any, adminId: string, application: any) {
  // Parse form data
  const formData = typeof application.form_data === 'object' 
    ? application.form_data 
    : JSON.parse(application.form_data as string || '{}');
  
  // Update application status
  const { error: updateError } = await supabase
    .from('applications')
    .update({
      status: 'verified',
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminId,
      review_notes: 'Approved',
    })
    .eq('id', application.id);
  
  if (updateError) throw updateError;
  
  // Update user profile based on application type
  if (application.user_id) {
    if (application.application_type === 'creator') {
      await approveCreatorProfile(supabase, application.user_id);
    } else if (application.application_type === 'vendor') {
      await approveVendorProfile(supabase, application.user_id, formData);
    }
  }
  
  // Log admin action
  await logAdminAction(
    supabase,
    adminId,
    'approve_application',
    application.id,
    application.application_type,
    `Approved ${application.application_type} application`,
    { user_id: application.user_id }
  );
  
  return { success: true };
}

async function rejectApplication(supabase: any, adminId: string, application: any, reviewNotes?: string) {
  const notes = reviewNotes || 'Application rejected';
  
  const { error: updateError } = await supabase
    .from('applications')
    .update({
      status: 'rejected',
      reviewed_at: new Date().toISOString(),
      reviewed_by: adminId,
      review_notes: notes,
    })
    .eq('id', application.id);
  
  if (updateError) throw updateError;
  
  // Log admin action
  await logAdminAction(
    supabase,
    adminId,
    'reject_application',
    application.id,
    application.application_type,
    `Rejected ${application.application_type} application: ${notes}`,
    { user_id: application.user_id }
  );
  
  return { success: true };
}

async function deleteApplication(supabase: any, adminId: string, application: any) {
  const { error: deleteError } = await supabase
    .from('applications')
    .delete()
    .eq('id', application.id);
  
  if (deleteError) throw deleteError;
  
  // Log admin action
  await logAdminAction(
    supabase,
    adminId,
    'delete_application',
    application.id,
    application.application_type,
    `Deleted ${application.application_type} application`,
    { user_id: application.user_id }
  );
  
  return { success: true };
}