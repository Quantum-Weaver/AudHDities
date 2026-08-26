// src/app/api/checkout/session/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe } from '@/lib/stripe/server';
import { isUserAdmin } from '@/lib/auth/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabase();
    const { id: sessionId } = await params;
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const isAdmin = await isUserAdmin(supabase, user.id);
    
    const { data: sale, error: saleError } = await supabase
      .from('exchanges')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .maybeSingle();

    if (saleError) {
      console.error('Error fetching exchange:', saleError);
    }

    if (!sale) {
      return NextResponse.json(
        { error: 'No exchange session was found.' },
        { status: 404 }
      );
    }
    if (!isAdmin && sale.buyer_id !== user.id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    const session = await getStripe().checkout.sessions.retrieve(sessionId)

    let kept: { kind: 'ware' | 'work'; id: string; name: string } | null = null;
    if (sale.ware_id) {
      const { data: ware } = await supabase
        .from('wares')
        .select('id, name')
        .eq('id', sale.ware_id)
        .maybeSingle();
      if (ware) kept = { kind: 'ware', id: ware.id, name: ware.name };
    } else if (sale.work_id) {
      const { data: work } = await supabase
        .from('works')
        .select('id, name')
        .eq('id', sale.work_id)
        .maybeSingle();
      if (work) kept = { kind: 'work', id: work.id, name: work.name };
    }

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
      bodiesHref: kept?.kind === 'ware' ? `/api/auth/wares/${kept.id}/bodies` : null,
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Checkout session API error:', error);
    
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