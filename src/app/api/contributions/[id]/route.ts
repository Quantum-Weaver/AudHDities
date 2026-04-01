// app/api/contributions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

// Validation schema for updating a contribution
const updateContributionSchema = z.object({
  contribution_type: z.enum(['concept', 'code', 'design', 'content', 'testing', 'promotion', 'infrastructure']).optional(),
  description: z.string().optional(),
  percent_share: z.number().min(0).max(100).optional(),
  is_residual_eligible: z.boolean().optional(),
  is_one_time: z.boolean().optional(),
});

// =====================================================
// GET /api/contributions/[id]
// Fetch a single contribution
// =====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Fetch single contribution
    const { data: contribution, error } = await supabase
      .from('contributions')
      .select(`
        *,
        contributor:contributor_id (
          id,
          username,
          display_name,
          avatar_url
        ),
        product:product_id (
          id,
          title,
          slug,
          creator_id
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Contribution not found' },
          { status: 404 }
        );
      }
      console.error('Fetch contribution error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch contribution' },
        { status: 500 }
      );
    }

    return NextResponse.json({ contribution });

  } catch (error) {
    console.error('Contributions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// PATCH /api/contributions/[id]
// Update a contribution (creator only)
// =====================================================
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Fetch contribution to verify ownership
    const { data: contribution, error: fetchError } = await supabase
      .from('contributions')
      .select('*, product:product_id(creator_id)')
      .eq('id', id)
      .single();

    if (fetchError || !contribution) {
      return NextResponse.json(
        { error: 'Contribution not found' },
        { status: 404 }
      );
    }

    // Verify user is the product creator
    if (contribution.product?.creator_id !== user.id) {
      return NextResponse.json(
        { error: 'Only the product creator can update contributions' },
        { status: 403 }
      );
    }

    // Parse and validate update
    const body = await request.json();
    const validation = updateContributionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid update data', details: validation.error },
        { status: 400 }
      );
    }

    const updates = validation.data;

    // If percent_share is being updated, verify total shares don't exceed 100
    if (updates.percent_share !== undefined) {
      // Add null check
      if (!contribution.product_id) {
        return NextResponse.json(
          { error: 'Contribution has no associated product' },
          { status: 400 }
        );
      }
      
      const { data: existingContributions } = await supabase
        .from('contributions')
        .select('percent_share')
        .eq('product_id', contribution.product_id)
        .eq('is_residual_eligible', true)
        .neq('id', id); // Exclude current contribution

      const currentTotal = existingContributions?.reduce((sum, c) => sum + (c.percent_share || 0), 0) || 0;
      const newShare = updates.percent_share;
      const isResidualEligible = updates.is_residual_eligible !== undefined 
        ? updates.is_residual_eligible 
        : contribution.is_residual_eligible;

      if (isResidualEligible && currentTotal + newShare > 100) {
        return NextResponse.json(
          { error: `Total residual shares would exceed 100% (current: ${currentTotal}%, adding: ${newShare}%)` },
          { status: 400 }
        );
      }
    }

    // Update contribution
    const { data: updatedContribution, error: updateError } = await supabase
      .from('contributions')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Update contribution error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update contribution' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      contribution: updatedContribution,
      message: 'Contribution updated successfully'
    });

  } catch (error) {
    console.error('Update contribution error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE /api/contributions/[id]
// Delete a contribution (creator only)
// =====================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id } = await params;
    
    // Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Fetch contribution to verify ownership
    const { data: contribution, error: fetchError } = await supabase
      .from('contributions')
      .select('*, product:product_id(creator_id)')
      .eq('id', id)
      .single();

    if (fetchError || !contribution) {
      return NextResponse.json(
        { error: 'Contribution not found' },
        { status: 404 }
      );
    }

    // Verify user is the product creator
    if (contribution.product?.creator_id !== user.id) {
      return NextResponse.json(
        { error: 'Only the product creator can delete contributions' },
        { status: 403 }
      );
    }

    // Delete contribution
    const { error: deleteError } = await supabase
      .from('contributions')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Delete contribution error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete contribution' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Contribution deleted successfully'
    });

  } catch (error) {
    console.error('Delete contribution error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}