// src/types/stripe/events.ts
import type { StripeCheckoutSession, StripePaymentIntent, WebhookEvent, WebhookEventType } from './index';

/**
 * Base webhook handler interface
 */
export interface WebhookHandler {
  eventType: WebhookEventType;
  handle: (event: WebhookEvent) => Promise<WebhookResult>;
}

/**
 * Webhook processing result
 */
export interface WebhookResult {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  error?: string;
}

/**
 * Checkout session completed handler
 */
export interface CheckoutSessionCompletedHandler {
  eventType: 'checkout.session.completed';
  handle: (session: StripeCheckoutSession) => Promise<WebhookResult>;
}

/**
 * Payment intent succeeded handler
 */
export interface PaymentIntentSucceededHandler {
  eventType: 'payment_intent.succeeded';
  handle: (paymentIntent: StripePaymentIntent) => Promise<WebhookResult>;
}

/**
 * Payment intent failed handler
 */
export interface PaymentIntentFailedHandler {
  eventType: 'payment_intent.payment_failed';
  handle: (paymentIntent: StripePaymentIntent, error: unknown) => Promise<WebhookResult>;
}

/**
 * Charge succeeded handler
 */
export interface ChargeSucceededHandler {
  eventType: 'charge.succeeded';
  handle: (charge: unknown) => Promise<WebhookResult>;
}

/**
 * All webhook handlers union
 */
export type WebhookHandlers = 
  | CheckoutSessionCompletedHandler
  | PaymentIntentSucceededHandler
  | PaymentIntentFailedHandler
  | ChargeSucceededHandler;

/**
 * Webhook processing options
 */
export interface WebhookProcessingOptions {
  verifySignature?: boolean;
  signatureHeader?: string;
  webhookSecret?: string;
  retryOnFailure?: boolean;
  maxRetries?: number;
}

/**
 * Webhook event metadata for logging
 */
export interface WebhookEventMetadata {
  eventId: string;
  eventType: WebhookEventType;
  createdAt: number;
  livemode: boolean;
  processedAt: number;
  processingTime: number;
  success: boolean;
}

/**
 * Sale record from webhook
 */
export interface WebhookSaleRecord {
  id: string;
  productId: string;
  productTitle: string;
  buyerId: string;
  amount: number;
  currency: string;
  tier: 'community' | 'ally' | 'corporate';
  stripeSessionId: string;
  stripePaymentIntentId: string;
  createdAt: string;
}

/**
 * Webhook error types
 */
export type WebhookErrorType =
  | 'invalid_signature'
  | 'missing_signature'
  | 'invalid_payload'
  | 'processing_failed'
  | 'database_error'
  | 'product_not_found'
  | 'user_not_found';

/**
 * Webhook error
 */
export interface WebhookError {
  type: WebhookErrorType;
  message: string;
  eventId?: string;
  originalError?: unknown;
}

/**
 * Event type to handler mapping
 */
export type EventHandlerMap = {
  [K in WebhookEventType]?: (event: Extract<WebhookEvent, { type: K }>) => Promise<WebhookResult>;
};

/**
 * Webhook event queue item
 */
export interface WebhookQueueItem {
  id: string;
  event: WebhookEvent;
  attempts: number;
  maxAttempts: number;
  nextAttemptAt: number;
  lastError?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: number;
}

/**
 * Webhook processing statistics
 */
export interface WebhookStats {
  totalEvents: number;
  successfulEvents: number;
  failedEvents: number;
  pendingEvents: number;
  averageProcessingTime: number;
  lastProcessedAt: number | null;
}

/**
 * Event type category
 */
export type EventCategory = 'payment' | 'checkout' | 'customer' | 'product' | 'other';

/**
 * Event categorization
 */
export interface EventCategoryMap {
  eventType: WebhookEventType;
  category: EventCategory;
  requiresDatabaseUpdate: boolean;
  requiresNotification: boolean;
  priority: 'high' | 'medium' | 'low';
}