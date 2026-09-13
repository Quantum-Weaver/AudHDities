// src/components/asgard/domains/themis/status.ts

import { APPLICATION_STATUS, type ApplicationStatus } from '@/lib/generated/constants/themis-governance/application_status';

export { APPLICATION_STATUS };
export type { ApplicationStatus };

/** The seven words, in the enum's own order. */
export const APPLICATION_STATUSES: readonly ApplicationStatus[] = [
  APPLICATION_STATUS.DRAFT,
  APPLICATION_STATUS.SUBMITTED,
  APPLICATION_STATUS.UNDER_REVIEW,
  APPLICATION_STATUS.APPROVED,
  APPLICATION_STATUS.REJECTED,
  APPLICATION_STATUS.SUSPENDED,
  APPLICATION_STATUS.WITHDRAWN,
] as const;

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under review',
  approved: 'Approved',
  rejected: 'Rejected',
  suspended: 'Suspended',
  withdrawn: 'Withdrawn',
};

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  draft: 'bg-void-light/15 text-void-light border-void-light/30',
  submitted: 'bg-hearth-gold/15 text-hearth-gold border-hearth-gold/30',
  under_review: 'bg-neurospark/15 text-neurospark border-neurospark/30',
  approved: 'bg-sanctuary-green/15 text-sanctuary-green border-sanctuary-green/30',
  rejected: 'bg-fire-base/15 text-fire-base border-fire-base/30',
  suspended: 'bg-hearth-orange/15 text-hearth-orange border-hearth-orange/30',
  withdrawn: 'bg-void-base/15 text-void-base border-void-base/30',
};

/** The statuses still awaiting a decision. */
export const OPEN_STATUSES: readonly ApplicationStatus[] = [
  APPLICATION_STATUS.SUBMITTED,
  APPLICATION_STATUS.UNDER_REVIEW,
] as const;

export function isOpen(status: ApplicationStatus): boolean {
  return OPEN_STATUSES.includes(status);
}

export function statusLabel(status: string): string {
  return STATUS_LABELS[status as ApplicationStatus] ?? status.replace(/_/g, ' ');
}

export function statusColor(status: string): string {
  return STATUS_COLORS[status as ApplicationStatus] ?? STATUS_COLORS.draft;
}

export const APPLICATION_TYPE_LABELS: Record<string, string> = {
  artisan: 'Artisan',
  merchant: 'Merchant',
  curator: 'Curator',
  council: 'Council',
};

/** A url-safe name with a time suffix so two of one name never collide. */
export function slugify(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `${base || 'entry'}-${Date.now().toString(36)}`;
}
