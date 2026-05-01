// app/api/contributions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

// Validation schema for creating a contribution
const createContributionSchema = z.object({
  product_id: z.string().uuid(),
  contributor_id: z.string().uuid(),
  contribution_type: z.enum(['concept', 'code', 'design', 'content', 'testing', 'promotion', 'infrastructure']),
  description: z.string().optional(),
  percent_share: z.number().min(0).max(100),
  is_residual_eligible: z.boolean().default(true),
  is_one_time: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    
    // Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const productId = searchParams.get('productId');
    const contributorId = searchParams.get('contributorId');

    // Build query
    let query = supabase
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
      `);

    if (productId) {
      query = query.eq('product_id', productId);
    }

    if (contributorId) {
      query = query.eq('contributor_id', contributorId);
    }

    const { data: contributions, error } = await query
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Contributions fetch error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ contributions: contributions || [] });

  } catch (error) {
    console.error('Contributions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse and validate request
    const body = await request.json();
    const validation = createContributionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid contribution data', details: validation.error },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Verify that the user is the product creator (only creators can add contributions)
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('creator_id')
      .eq('id', data.product_id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (product.creator_id !== user.id) {
      return NextResponse.json(
        { error: 'Only the product creator can add contributions' },
        { status: 403 }
      );
    }

    // Check if contribution already exists
    const { data: existing } = await supabase
      .from('contributions')
      .select('id')
      .eq('product_id', data.product_id)
      .eq('contributor_id', data.contributor_id)
      .eq('contribution_type', data.contribution_type)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'Contribution already exists for this contributor and type' },
        { status: 409 }
      );
    }

    // Verify total shares don't exceed 100
    const { data: existingContributions } = await supabase
      .from('contributions')
      .select('percent_share')
      .eq('product_id', data.product_id)
      .eq('is_residual_eligible', true);

    const currentTotal = existingContributions?.reduce((sum, c) => sum + (c.percent_share || 0), 0) || 0;
    
    if (data.is_residual_eligible && currentTotal + data.percent_share > 100) {
      return NextResponse.json(
        { error: `Total residual shares would exceed 100% (current: ${currentTotal}%, adding: ${data.percent_share}%)` },
        { status: 400 }
      );
    }

    // Create contribution
    const { data: contribution, error: insertError } = await supabase
      .from('contributions')
      .insert({
        product_id: data.product_id,
        contributor_id: data.contributor_id,
        contribution_type: data.contribution_type,
        description: data.description || null,
        percent_share: data.percent_share,
        is_residual_eligible: data.is_residual_eligible,
        is_one_time: data.is_one_time,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Create contribution error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create contribution' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { contribution, message: 'Contribution created successfully' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create contribution error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    const contributionId = searchParams.get('id');

    if (!contributionId) {
      return NextResponse.json(
        { error: 'Contribution ID required' },
        { status: 400 }
      );
    }

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
      .eq('id', contributionId)
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
      .eq('id', contributionId);

    if (deleteError) {
      console.error('Delete contribution error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete contribution' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Contribution deleted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete contribution error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}