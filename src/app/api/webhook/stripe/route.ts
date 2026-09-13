// app/api/webhook/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServiceSupabase } from '@/lib/api/supabase';
import { stripe as getStripe } from '@/lib/stripe/server';
import { writeLedgerRowsForExchange } from '@/lib/economics/ledger';
import { heraldAndDeliver } from '@/lib/heralds/dispatch';
import { HERALD_TYPE } from '@/lib/heralds/write';

const PLATFORM_FEE_PERCENT = 10;

type ServiceDb = ReturnType<typeof createServiceSupabase>;

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

  const supabase = createServiceSupabase();
  const eventAtIso = new Date(event.created * 1000).toISOString();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0;
      const netAmount = amountTotal * (1 - PLATFORM_FEE_PERCENT / 100);

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

      if (session.mode === 'subscription') {
        const subscriptionId =
          typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription?.id ?? null;
        if (subscriptionId) await markSubscriptionEnd(subscriptionId);
      }

      const ware = await writeLedgerFor(supabase, exchange, eventAtIso);
      await heraldExchange(supabase, exchange, ware, 'purchase');
      break;
    }

    case 'invoice.paid': {
      const invoice = event.data.object;
      const invoiceId = invoice.id ?? null;
      const details = invoice.parent?.subscription_details ?? null;
      const subscriptionId =
        typeof details?.subscription === 'string'
          ? details.subscription
          : details?.subscription?.id ?? null;

      if (!invoiceId || !subscriptionId) {
        console.log(
          `invoice.paid carries no invoice id or no subscription — nothing written. ` +
          `invoice=${invoiceId ?? 'unknown'} subscription=${subscriptionId ?? 'none'}`,
        );
        break;
      }

      const { data: alreadyRecorded } = await supabase
        .from('exchanges')
        .select('id')
        .eq('stripe_invoice_id', invoiceId)
        .maybeSingle();
      if (alreadyRecorded) {
        console.log(`Invoice ${invoiceId} already stands on exchange ${alreadyRecorded.id} — nothing written twice.`);
        break;
      }

      const origin = await originExchangeOf(supabase, subscriptionId, details?.metadata ?? null);
      if (!origin) {
        console.error(
          `invoice.paid for subscription ${subscriptionId} has no exchange behind it — ` +
          'no row was written and nothing was deleted.',
        );
        break;
      }

      if (invoice.billing_reason === 'subscription_create') {
        const { error: stampError } = await supabase
          .from('exchanges')
          .update({ stripe_invoice_id: invoiceId })
          .eq('id', origin.id);
        if (stampError) {
          console.error(`Failed to stamp invoice ${invoiceId} on exchange ${origin.id}:`, stampError);
        } else {
          console.log(`Invoice ${invoiceId} stamped on the exchange the checkout already wrote.`);
        }
        break;
      }

      const amountPaid = (invoice.amount_paid ?? 0) / 100;
      const { data: renewal, error: renewalError } = await supabase
        .from('exchanges')
        .insert({
          buyer_id: origin.buyer_id,
          ware_id: origin.ware_id,
          work_id: origin.work_id,
          gross_amount: amountPaid,
          net_amount: amountPaid * (1 - PLATFORM_FEE_PERCENT / 100),
          currency: invoice.currency || origin.currency,
          platform_fee_percent: origin.platform_fee_percent ?? PLATFORM_FEE_PERCENT,
          status: 'completed',
          stripe_invoice_id: invoiceId,
          adjustments: { stripe_subscription_id: subscriptionId, renewal_of: origin.id } as never,
        })
        .select()
        .single();

      if (renewalError || !renewal) {
        console.error(`Failed to record the renewal for invoice ${invoiceId}:`, renewalError);
        break;
      }

      console.log(`Renewal recorded: exchange ${renewal.id} for invoice ${invoiceId}, ${amountPaid} ${renewal.currency}.`);
      const renewalWare = await writeLedgerFor(supabase, renewal, eventAtIso);
      await heraldExchange(supabase, renewal, renewalWare, 'renewal');
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as { id?: string };
      console.log(
        `invoice.payment_failed for invoice ${invoice?.id ?? 'unknown'} — no row written, ` +
        'nothing deleted, nothing marked lost.',
      );
      break;
    }

    case 'customer.subscription.deleted': {
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

    case 'account.updated': {
      const account = event.data.object;
      const details = {
        payouts_enabled: Boolean(account.payouts_enabled),
        charges_enabled: Boolean(account.charges_enabled),
        details_submitted: Boolean(account.details_submitted),
        currently_due: account.requirements?.currently_due ?? [],
        updated_at: eventAtIso,
      };
      const { data: holders } = await supabase
        .from('user_financial')
        .select('created_by, payout_details')
        .eq('stripe_account_id', account.id)
        .limit(1);
      const holder = holders?.[0] ?? null;
      const wereLive = payoutsWereLive(holder?.payout_details);

      const { error: accountError } = await supabase
        .from('user_financial')
        .update({
          payout_details: details,
          payout_schedule: account.settings?.payouts?.schedule?.interval ?? null,
        })
        .eq('stripe_account_id', account.id);
      if (accountError) {
        console.error(`Failed to record account.updated for ${account.id}:`, accountError);
        break;
      }
      console.log(`Account ${account.id} updated — payouts_enabled ${details.payouts_enabled}`);

      if (holder?.created_by && details.payouts_enabled && !wereLive) {
        await heraldAndDeliver(
          supabase,
          {
            recipient: holder.created_by,
            type: HERALD_TYPE.PAYOUTS_LIVE,
            title: 'Your payouts are live',
            body: 'Stripe has cleared your account. Earnings can now reach you.',
            referenceTable: 'user_financial',
            referenceId: holder.created_by,
          },
          { lookup: true },
        );
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

/** Sets the subscription's end from the cancelAt its metadata carries, once. */
async function markSubscriptionEnd(subscriptionId: string) {
  try {
    const stripe = getStripe();
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const cancelAt = Number(subscription.metadata?.cancelAt);
    if (!Number.isFinite(cancelAt) || cancelAt <= 0) {
      console.log(`Subscription ${subscriptionId} carries no cancelAt — no end set.`);
      return;
    }
    if (subscription.cancel_at) {
      console.log(`Subscription ${subscriptionId} already ends at ${subscription.cancel_at} — no end set twice.`);
      return;
    }
    await stripe.subscriptions.update(subscriptionId, { cancel_at: cancelAt });
    console.log(`Subscription ${subscriptionId} set to end at ${cancelAt}.`);
  } catch (err) {
    console.error(`Failed to set the end on subscription ${subscriptionId}:`, err);
  }
}

/** The exchange a subscription's first crossing wrote, by its stored id or its metadata. */
async function originExchangeOf(
  supabase: ServiceDb,
  subscriptionId: string,
  metadata: Record<string, string> | null,
) {
  const columns = 'id, buyer_id, ware_id, work_id, currency, platform_fee_percent';

  const { data: bySubscription } = await supabase
    .from('exchanges')
    .select(columns)
    .eq('adjustments->>stripe_subscription_id', subscriptionId)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();
  if (bySubscription) return bySubscription;

  const exchangeId = metadata?.exchangeId;
  if (!exchangeId) return null;

  const { data: byMetadata } = await supabase
    .from('exchanges')
    .select(columns)
    .eq('id', exchangeId)
    .maybeSingle();
  return byMetadata;
}

type CompletedExchange = {
  id: string;
  buyer_id: string;
  ware_id: string | null;
  work_id: string | null;
  gross_amount: number;
  currency: string;
  platform_fee_percent: number;
};

/** True when the stored payout details already said payouts were enabled. */
function payoutsWereLive(details: unknown): boolean {
  if (!details || typeof details !== 'object' || Array.isArray(details)) return false;
  return (details as Record<string, unknown>).payouts_enabled === true;
}

async function wareOf(supabase: ServiceDb, wareId: string | null) {
  if (!wareId) return null;
  const { data } = await supabase
    .from('wares')
    .select('id, name, created_by, residual_pool_percent')
    .eq('id', wareId)
    .maybeSingle();
  return data ?? null;
}

type ExchangeWare = Awaited<ReturnType<typeof wareOf>>;

/** The buyer's receipt and the maker's word that a crossing landed. */
async function heraldExchange(
  supabase: ServiceDb,
  exchange: CompletedExchange,
  ware: ExchangeWare,
  kind: 'purchase' | 'renewal',
) {
  const name = ware?.name ?? 'your order';
  const paid = `${exchange.gross_amount} ${exchange.currency.toUpperCase()}`;
  const renewal = kind === 'renewal';

  await heraldAndDeliver(
    supabase,
    {
      recipient: exchange.buyer_id,
      type: renewal ? HERALD_TYPE.RENEWAL_RECEIPT : HERALD_TYPE.ORDER_RECEIPT,
      title: renewal ? `Renewed: ${name}` : `Receipt: ${name}`,
      body: renewal
        ? `${name} renewed for ${paid}.`
        : `${name} is yours. ${paid} paid.`,
      referenceTable: 'exchanges',
      referenceId: exchange.id,
    },
    { lookup: true },
  );

  if (ware?.created_by && ware.created_by !== exchange.buyer_id) {
    await heraldAndDeliver(
      supabase,
      {
        recipient: ware.created_by,
        type: HERALD_TYPE.SALE_MADE,
        title: renewal ? `${name} renewed` : `${name} sold`,
        body: `${paid} crossed for ${name}.`,
        referenceTable: 'exchanges',
        referenceId: exchange.id,
      },
      { lookup: true },
    );
  }
}

async function writeLedgerFor(
  supabase: ServiceDb,
  exchange: CompletedExchange,
  eventAtIso: string,
) {
  const ware = await wareOf(supabase, exchange.ware_id);

  const outcome = await writeLedgerRowsForExchange(supabase, exchange, ware, eventAtIso);
  if (outcome.skipped === 'already-written') {
    console.log('Ledger rows already stand for exchange', exchange.id, '— nothing written twice.');
  } else if (outcome.skipped === 'no-subject') {
    console.log('Ledger skipped for exchange', exchange.id, '—', outcome.note);
  } else {
    console.log('Ledger rows written for exchange', exchange.id, ':', outcome.wrote, outcome.note ?? '');
  }
  return ware;
}
