// src/app/api/checkout/session/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/server';
import { isUserAdmin } from '@/lib/auth/admin';

// =====================================================
// GET /api/checkout/session/[id]
// Get checkout session status and details
// =====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id: sessionId } = await params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Check if user is admin or session owner
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    // Fetch sale record to verify ownership
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .maybeSingle();
    
    if (saleError) {
      console.error('Error fetching sale:', saleError);
    }
    
    // Verify access
    if (sale && !isAdmin && sale.buyer_id !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    // Fetch session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Format response
    const response = {
      id: session.id,
      status: session.status,
      payment_status: session.payment_status,
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      customer_email: session.customer_email,
      metadata: session.metadata,
      created_at: new Date(session.created * 1000).toISOString(),
      expires_at: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : null,
      payment_intent: session.payment_intent,
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Checkout session API error:', error);
    
    // Handle Stripe-specific errors
    if (error instanceof Error && error.message.includes('No such checkout.session')) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}