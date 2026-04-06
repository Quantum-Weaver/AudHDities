// src/types/stripe/index.ts
import type { Stripe as StripeSDK } from '@stripe/stripe-js';

/**
 * Stripe product data structure
 */
export interface StripeProduct {
  id: string;
  object: 'product';
  active: boolean;
  created: number;
  description: string | null;
  images: string[];
  livemode: boolean;
  metadata: Record<string, string>;
  name: string;
  statement_descriptor: string | null;
  tax_code: string | null;
  unit_label: string | null;
  updated: number;
  url: string | null;
}

/**
 * Stripe price data structure
 */
export interface StripePrice {
  id: string;
  object: 'price';
  active: boolean;
  billing_scheme: 'per_unit' | 'tiered';
  created: number;
  currency: string;
  custom_unit_amount: null | {
    enabled: boolean;
    maximum: number | null;
    minimum: number | null;
    preset: number | null;
  };
  livemode: boolean;
  lookup_key: string | null;
  metadata: Record<string, string>;
  nickname: string | null;
  product: string | StripeProduct;
  recurring: null | {
    aggregate_usage: null | string;
    interval: 'day' | 'month' | 'week' | 'year';
    interval_count: number;
    meter: string | null;
    trial_period_days: number | null;
    usage_type: 'licensed' | 'metered';
  };
  tax_behavior: 'exclusive' | 'inclusive' | 'unspecified';
  tiers_mode: null | 'graduated' | 'volume';
  transform_quantity: null | {
    divide_by: number;
    round: 'down' | 'up';
  };
  type: 'one_time' | 'recurring';
  unit_amount: number | null;
  unit_amount_decimal: string | null;
}

/**
 * Stripe customer data structure
 */
export interface StripeCustomer {
  id: string;
  object: 'customer';
  address: {
    city: string | null;
    country: string | null;
    line1: string | null;
    line2: string | null;
    postal_code: string | null;
    state: string | null;
  } | null;
  balance: number;
  created: number;
  currency: string | null;
  default_source: string | null;
  delinquent: boolean;
  description: string | null;
  discount: null;
  email: string | null;
  invoice_prefix: string;
  invoice_settings: {
    custom_fields: null;
    default_payment_method: string | null;
    footer: string | null;
    rendering_options: null;
  };
  livemode: boolean;
  metadata: Record<string, string>;
  name: string | null;
  next_invoice_sequence: number;
  phone: string | null;
  preferred_locales: string[];
  shipping: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    };
    name: string | null;
    phone: string | null;
  } | null;
  tax_exempt: 'none' | 'exempt' | 'reverse';
  test_clock: string | null;
}

/**
 * Stripe payment method data structure
 */
export interface StripePaymentMethod {
  id: string;
  object: 'payment_method';
  billing_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    } | null;
    email: string | null;
    name: string | null;
    phone: string | null;
  };
  card: null | {
    brand: string;
    checks: {
      address_line1_check: string | null;
      address_postal_code_check: string | null;
      cvc_check: string | null;
    };
    country: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string | null;
    last4: string;
    networks: {
      available: string[];
      preferred: string | null;
    };
    three_d_secure_usage: {
      supported: boolean;
    };
    wallet: null | {
      type: string;
    };
  };
  created: number;
  customer: string | null;
  livemode: boolean;
  metadata: Record<string, string>;
  type: string;
}

/**
 * Stripe checkout session data structure
 */
export interface StripeCheckoutSession {
  id: string;
  object: 'checkout.session';
  after_expiration: null;
  allow_promotion_codes: boolean | null;
  amount_subtotal: number | null;
  amount_total: number | null;
  automatic_tax: {
    enabled: boolean;
    status: 'complete' | 'failed' | 'requires_location_inputs' | null;
  };
  billing_address_collection: 'auto' | 'required' | null;
  cancel_url: string;
  client_reference_id: string | null;
  consent: {
    promotion_code: string | null;
  } | null;
  consent_collection: null;
  created: number;
  currency: string | null;
  currency_conversion: null;
  custom_fields: unknown[];
  custom_text: {
    after_submit: string | null;
    shipping_address: string | null;
    submit: string | null;
    terms_of_service_acceptance: string | null;
  };
  customer: string | null;
  customer_creation: 'always' | 'if_required' | null;
  customer_details: {
    address: {
      city: string | null;
      country: string | null;
      line1: string | null;
      line2: string | null;
      postal_code: string | null;
      state: string | null;
    } | null;
    email: string | null;
    name: string | null;
    phone: string | null;
    tax_exempt: 'none' | 'exempt' | 'reverse';
    tax_ids: unknown[];
  } | null;
  customer_email: string | null;
  expires_at: number;
  invoice: string | null;
  invoice_creation: null;
  livemode: boolean;
  locale: string | null;
  metadata: Record<string, string>;
  mode: 'payment' | 'setup' | 'subscription';
  payment_intent: string | null;
  payment_link: string | null;
  payment_method_collection: 'always' | 'if_required';
  payment_method_options: unknown;
  payment_method_types: string[];
  payment_status: 'no_payment_required' | 'paid' | 'unpaid';
  phone_number_collection: {
    enabled: boolean;
  };
  recovered_from: string | null;
  setup_intent: string | null;
  shipping_address_collection: null;
  shipping_cost: null;
  shipping_details: null;
  shipping_options: unknown[];
  status: 'complete' | 'expired' | 'open';
  submit_type: 'auto' | 'book' | 'donate' | 'pay';
  subscription: string | null;
  success_url: string;
  total_details: {
    amount_discount: number;
    amount_shipping: number;
    amount_tax: number;
  } | null;
  ui_mode: 'embedded' | 'hosted';
  url: string | null;
}

/**
 * Checkout session creation parameters
 */
export interface CreateCheckoutSessionParams {
  productId: string;
  productTitle: string;
  productDescription?: string;
  price: number;
  tier: 'community' | 'ally' | 'corporate';
  userId: string;
  quantity?: number;
  imageUrl?: string;
  successUrl?: string;
  cancelUrl?: string;
}

/**
 * Checkout session response
 */
export interface CheckoutSessionResponse {
  sessionId: string;
  url?: string;
}

/**
 * Payment intent status
 */
export type PaymentIntentStatus =
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'processing'
  | 'requires_capture'
  | 'canceled'
  | 'succeeded';

/**
 * Payment intent data structure
 */
export interface StripePaymentIntent {
  id: string;
  object: 'payment_intent';
  amount: number;
  amount_capturable: number;
  amount_details: {
    tip: {
      amount: number | null;
    };
  };
  amount_received: number;
  application: string | null;
  application_fee_amount: number | null;
  automatic_payment_methods: {
    allow_redirects: 'always' | 'never';
    enabled: boolean;
  } | null;
  canceled_at: number | null;
  cancellation_reason: string | null;
  capture_method: 'automatic' | 'automatic_async' | 'manual';
  client_secret: string;
  confirmation_method: 'automatic' | 'manual';
  created: number;
  currency: string;
  customer: string | null;
  description: string | null;
  invoice: string | null;
  last_payment_error: {
    code: string;
    doc_url: string;
    message: string;
    param: string;
    payment_method: unknown;
    type: string;
  } | null;
  livemode: boolean;
  metadata: Record<string, string>;
  next_action: {
    type: string;
    redirect_to_url?: {
      return_url: string;
      url: string;
    };
    use_stripe_sdk?: Record<string, unknown>;
  } | null;
  on_behalf_of: string | null;
  payment_method: string | null;
  payment_method_configuration_details: {
    id: string;
    parent: string | null;
  } | null;
  payment_method_options: unknown;
  payment_method_types: string[];
  processing: unknown | null;
  receipt_email: string | null;
  review: string | null;
  setup_future_usage: 'off_session' | 'on_session' | null;
  shipping: unknown | null;
  source: string | null;
  statement_descriptor: string | null;
  statement_descriptor_suffix: string | null;
  status: PaymentIntentStatus;
  transfer_data: unknown | null;
  transfer_group: string | null;
}

/**
 * Webhook event types
 */
export type WebhookEventType =
  | 'checkout.session.completed'
  | 'checkout.session.async_payment_failed'
  | 'checkout.session.async_payment_succeeded'
  | 'checkout.session.expired'
  | 'payment_intent.succeeded'
  | 'payment_intent.payment_failed'
  | 'payment_intent.canceled'
  | 'payment_intent.processing'
  | 'payment_intent.requires_action'
  | 'charge.succeeded'
  | 'charge.failed'
  | 'charge.refunded'
  | 'customer.created'
  | 'customer.updated'
  | 'customer.deleted'
  | 'product.created'
  | 'product.updated'
  | 'product.deleted'
  | 'price.created'
  | 'price.updated'
  | 'price.deleted';

/**
 * Webhook event data structure
 */
export interface WebhookEvent {
  id: string;
  object: 'event';
  account: string | null;
  api_version: string | null;
  created: number;
  data: {
    object: Record<string, unknown>;
    previous_attributes?: Record<string, unknown>;
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  type: WebhookEventType;
}


/**
 * Price formatting options
 */
export interface FormatPriceOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Price breakdown data
 */
export interface PriceBreakdown {
  subtotal: number;
  platformFee: number;
  platformFeePercent: number;
  creatorEarnings: number;
  creatorEarningsPercent: number;
  residualPool: number;
  residualPoolPercent: number;
  infrastructure: number;
  infrastructurePercent: number;
}

/**
 * Checkout error types
 */
export type CheckoutErrorType =
  | 'product_not_found'
  | 'product_unavailable'
  | 'price_invalid'
  | 'checkout_session_failed'
  | 'stripe_load_failed'
  | 'user_not_authenticated';

/**
 * Checkout error
 */
export interface CheckoutError {
  type: CheckoutErrorType;
  message: string;
  originalError?: unknown;
}