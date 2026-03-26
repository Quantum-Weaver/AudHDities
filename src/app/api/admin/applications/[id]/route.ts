// src/app/api/admin/applications/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isUserAdmin } from '@/lib/auth/admin';
import { z } from 'zod';

// Validation schema for updating a single application
const applicationUpdateSchema = z.object({
  status: z.enum(['pending', 'verified', 'rejected', 'suspended']),
  review_notes: z.string().optional().nullable(),
  admin_notes: z.string().optional().nullable(),
});

// Helper functions (same as above - could be moved to shared lib)
async function approveCreatorProfile(supabase: any, userId: string): Promise<void> {
  await supabase
    .from('profiles')
    .update({ is_creator: true })
    .eq('id', userId);
  
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

async function approveVendorProfile(supabase: any, userId: string, formData: any): Promise<void> {
  await supabase
    .from('profiles')
    .update({ is_vendor: true })
    .eq('id', userId);
  
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
// GET /api/admin/applications/[id]
// Get a single application with full details
// =====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const { id } = params;
    
    // Fetch application with user details - use explicit foreign keys
    const { data: application, error } = await supabase
      .from('applications')
      .select(`
        *,
        user:profiles!applications_user_id_fkey (
          id,
          username,
          display_name,
          email,
          avatar_url,
          created_at
        ),
        reviewer:profiles!applications_reviewed_by_fkey (
          id,
          username,
          display_name
        )
      `)
      .eq('id', id)
      .maybeSingle();
    
    if (error || !application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    // Parse form_data
    let parsedFormData = application.form_data;
    if (typeof parsedFormData === 'string') {
      try {
        parsedFormData = JSON.parse(parsedFormData);
      } catch {
        parsedFormData = {};
      }
    }
    
    const parsedApplication = {
      ...application,
      form_data: parsedFormData,
      user: application.user || undefined,
      reviewer: application.reviewer || undefined,
    };
    
    return NextResponse.json({ application: parsedApplication });
    
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/admin/applications/[id]
// Update application status (approve/reject)
// =====================================================
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const { id } = params;
    const body = await request.json();
    const validationResult = applicationUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid update data',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }
    
    const { status, review_notes, admin_notes } = validationResult.data;
    
    // Fetch current application
    const { data: application, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (fetchError || !application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }
    
    // Update application
    const { error: updateError } = await supabase
      .from('applications')
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
        review_notes: review_notes || null,
        admin_notes: admin_notes || null,
      })
      .eq('id', id);
    
    if (updateError) {
      console.error('Error updating application:', updateError);
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      );
    }
    
    // If approved, update user profile (check if user_id exists)
    if (status === 'verified' && application.user_id) {
      // Parse form data
      const formData = typeof application.form_data === 'object'
        ? application.form_data
        : JSON.parse(application.form_data as string || '{}');
      
      if (application.application_type === 'creator') {
        await approveCreatorProfile(supabase, application.user_id);
      } else if (application.application_type === 'vendor') {
        await approveVendorProfile(supabase, application.user_id, formData);
      }
    }
    
    // Log admin action
    const actionType = status === 'verified' ? 'approve_application' : 'reject_application';
    await logAdminAction(
      supabase,
      user.id,
      actionType,
      id,
      application.application_type,
      `${status === 'verified' ? 'Approved' : 'Rejected'} ${application.application_type} application`,
      { user_id: application.user_id, notes: review_notes }
    );
    
    return NextResponse.json({
      success: true,
      message: `Application ${status === 'verified' ? 'approved' : 'rejected'} successfully`,
      application: {
        id,
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
        review_notes,
      },
    });
    
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/admin/applications/[id]
// Delete an application (admin only)
// =====================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const { id } = params;
    
    // Fetch application for logging
    const { data: application } = await supabase
      .from('applications')
      .select('application_type, user_id')
      .eq('id', id)
      .maybeSingle();
    
    // Delete application
    const { error: deleteError } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);
    
    if (deleteError) {
      console.error('Error deleting application:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete application' },
        { status: 500 }
      );
    }
    
    // Log admin action
    if (application) {
      await logAdminAction(
        supabase,
        user.id,
        'delete_application',
        id,
        application.application_type,
        `Deleted ${application.application_type} application`,
        { user_id: application.user_id }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Application deleted successfully',
    });
    
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}