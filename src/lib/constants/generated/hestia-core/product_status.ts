// =====================================================
// FILE: constants/generated/hestia-core/product_status.ts
// GENERATED: 2026-04-30T04:17:48.984Z
// SOURCE: Constants.public.Enums.product_status
// VALUES: 7 entries
// =====================================================

export const PRODUCT_STATUS = {
  DRAFT: 'draft',
  PENDING_REVIEW: 'pending_review',
  PUBLISHED: 'published',
  SOLD_OUT: 'sold_out',
  DISCONTINUED: 'discontinued',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;

export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];
