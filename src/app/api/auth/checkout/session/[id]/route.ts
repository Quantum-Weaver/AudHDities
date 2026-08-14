// src/app/api/checkout/session/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe } from '@/lib/stripe/server';
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
    
    // Fetch the exchange record (the sales successor) to verify ownership
    const { data: sale, error: saleError } = await supabase
      .from('exchanges')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .maybeSingle();

    if (saleError) {
      console.error('Error fetching exchange:', saleError);
    }

    // Verify access
    if (sale && !isAdmin && sale.buyer_id !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    // Fetch session from Stripe
    const session = await getStripe().checkout.sessions.retrieve(sessionId)

    // THE KEEPING (the create→decorate loop, 2026-07-31): name what was
    // taken into keeping so the threshold can offer to hang it at home —
    // the exchange completes at the vessel's fire, not at a checkout.
    let kept: { kind: 'ware' | 'work'; id: string; name: string } | null = null;
    if (sale?.ware_id) {
      const { data: ware } = await supabase
        .from('wares')
        .select('id, name')
        .eq('id', sale.ware_id)
        .maybeSingle();
      if (ware) kept = { kind: 'ware', id: ware.id, name: ware.name };
    } else if (sale?.work_id) {
      const { data: work } = await supabase
        .from('works')
        .select('id, name')
        .eq('id', sale.work_id)
        .maybeSingle();
      if (work) kept = { kind: 'work', id: work.id, name: work.name };
    }

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
      kept,
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