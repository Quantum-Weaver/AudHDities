// app/api/webhook/stripe/route.ts
// Rewritten 2026-07-18 for the evolved commerce schema. The checkout route
// inserts ONE pending exchange; this webhook COMPLETES that same row by
// stripe_session_id (the old flow inserted a second sales record here,
// duplicating every purchase).
//
// 2026-08-25 (SPEC §5, §6): the ledger rows are written DOWNSTREAM of the
// completed exchange, keyed reference_table='exchanges' + reference_id, read
// before written, so a re-fired event writes nothing twice. Renewals arrive as
// invoice.paid and are REFUSED until exchanges.stripe_invoice_id exists,
// because a renewal that can be written twice is a payment counted twice —
// which is the one thing "checkout captures nothing twice" forbids.
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { stripe as getStripe } from '@/lib/stripe/server';
import { writeLedgerRowsForExchange } from '@/lib/economics/ledger';

const PLATFORM_FEE_PERCENT = 10;

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('No stripe-signature header');
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createServerSupabase();
  const eventAtIso = new Date(event.created * 1000).toISOString();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
      const netAmount = amountTotal * (1 - PLATFORM_FEE_PERCENT / 100);

      // FIX 30 · the guard. Without .eq('status','pending') a replayed event
      // rewrites a completed row — and with a delivery and renewals hanging
      // off that status, idempotency stops being tidiness.
      const { data: exchange, error: updateError } = await supabase
        .from('exchanges')
        .update({
          status: 'completed',
          gross_amount: amountTotal,
          net_amount: netAmount,
          stripe_payment_intent: (session.payment_intent as string) ?? null,
        })
        .eq('stripe_session_id', session.id)
        .eq('status', 'pending')
        .select()
        .maybeSingle();

      if (updateError) {
        console.error('Failed to complete exchange:', session.id, updateError);
        break;
      }
      if (!exchange) {
        // Either there was never a pending row, or this event has already been
        // honoured. Neither is an error and neither writes anything.
        console.log('No PENDING exchange for session:', session.id, '— nothing was written.');
        break;
      }

      console.log('Exchange completed:', {
        exchangeId: exchange.id,
        wareId: exchange.ware_id,
        buyerId: exchange.buyer_id,
        grossAmount: amountTotal,
        netAmount,
      });

      // A subscription session carries a subscription id. Where it belongs is
      // unwritten — his to rule; exchanges has no column for it, so it is kept
      // on adjustments beside the price provenance rather than invented.
      if (session.subscription) {
        const { data: current } = await supabase
          .from('exchanges')
          .select('adjustments')
          .eq('id', exchange.id)
          .maybeSingle();
        const existing =
          current?.adjustments && typeof current.adjustments === 'object' && !Array.isArray(current.adjustments)
            ? (current.adjustments as Record<string, unknown>)
            : {};
        await supabase
          .from('exchanges')
          .update({
            adjustments: {
              ...existing,
              stripe_subscription_id: session.subscription as string,
            } as never,
          })
          .eq('id', exchange.id);
        console.log(
          'Subscription id stored on exchanges.adjustments — there is no typed column for it yet ' +
          '(DRAFT 023, step 1/3). Where it belongs is KP\'s to rule.',
        );
      }

      await writeLedgerFor(supabase, exchange, eventAtIso);
      break;
    }

    case 'invoice.paid': {
      // A RENEWAL. Each renewal is a sale, so each renewal is one exchanges row
      // and its own ledger rows — keyed on stripe_invoice_id, UNIQUE, which is
      // what makes a re-fired event write nothing twice.
      //
      // CHECK T-8: that column does not exist yet. Nothing honest ships without
      // it, so this handler REFUSES TO INSERT and says so plainly rather than
      // writing an unprovable row. It deletes nothing and marks nothing lost.
      const invoice = event.data.object as { id?: string; amount_paid?: number };
      console.error(
        'invoice.paid received and REFUSED: exchanges.stripe_invoice_id does not exist, so a ' +
        're-fired event would write a second row for one payment. No row was written and nothing ' +
        'was deleted. Run docs/sql/023-the-bazaar-refined-DRAFT.sql step 2 to open this road. ' +
        `invoice=${invoice?.id ?? 'unknown'} amount_paid=${invoice?.amount_paid ?? 'unknown'}`,
      );
      break;
    }

    case 'invoice.payment_failed': {
      // THE REFUSED RENEWAL. No exchange row, no ledger row. The vessel keeps
      // everything already held. Nothing is marked lost.
      const invoice = event.data.object as { id?: string };
      console.log(
        `invoice.payment_failed for invoice ${invoice?.id ?? 'unknown'} — no row written, ` +
        'nothing deleted, nothing marked lost.',
      );
      break;
    }

    case 'customer.subscription.deleted': {
      // THE ENDING. No row is deleted and no row is altered retroactively. The
      // standing-with view simply stops showing a next date, read from Stripe
      // at render time — where the "this has ended" fact is stored is
      // unwritten — his to rule.
      const subscription = event.data.object as { id?: string };
      console.log(
        `customer.subscription.deleted for ${subscription?.id ?? 'unknown'} — no row written, ` +
        'no row deleted, no row altered.',
      );
      break;
    }

    case 'checkout.session.expired':
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;
      const { error: failError } = await supabase
        .from('exchanges')
        .update({ status: 'failed' })
        .eq('stripe_session_id', session.id)
        .eq('status', 'pending');
      if (failError) {
        console.error(`Failed to mark exchange failed for session ${session.id}:`, failError);
      } else {
        console.log(`Session ${session.id} ${event.type} — pending exchange marked failed`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

type CompletedExchange = {
  id: string;
  buyer_id: string;
  ware_id: string | null;
  gross_amount: number;
  currency: string;
  platform_fee_percent: number;
};

async function writeLedgerFor(
  supabase: Awaited<ReturnType<typeof createServerSupabase>>,
  exchange: CompletedExchange,
  eventAtIso: string,
) {
  let ware = null;
  if (exchange.ware_id) {
    const { data } = await supabase
      .from('wares')
      .select('id, name, created_by, residual_pool_percent')
      .eq('id', exchange.ware_id)
      .maybeSingle();
    ware = data ?? null;
  }

  const outcome = await writeLedgerRowsForExchange(supabase, exchange, ware, eventAtIso);
  if (outcome.skipped === 'already-written') {
    console.log('Ledger rows already stand for exchange', exchange.id, '— nothing written twice.');
  } else if (outcome.skipped === 'no-ware') {
    console.log('Ledger skipped for exchange', exchange.id, '—', outcome.note);
  } else {
    console.log('Ledger rows written for exchange', exchange.id, ':', outcome.wrote, outcome.note ?? '');
  }
}
