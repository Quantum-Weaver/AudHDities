// src/lib/validators/enums.ts
import { z } from 'zod';
import { ENUM_VALUES } from '@/types/supabase/enums';

// Product type enum - values from your ENUM_VALUES.productType
export const productTypeSchema = z.enum(ENUM_VALUES.productType);

// Owner type enum
export const ownerTypeSchema = z.enum(ENUM_VALUES.ownerType);

// Contribution type enum
export const contributionTypeSchema = z.enum(ENUM_VALUES.contributionType);

// Recurring interval (add to ENUM_VALUES if not there, or define here)
export const recurringIntervalSchema = z.enum(['month', 'year']).nullable();

// User tier enum
export const userTierSchema = z.enum(ENUM_VALUES.userTier);

// Council house enum
export const councilHouseSchema = z.enum(ENUM_VALUES.councilHouse);

// Communication style enum
export const communicationStyleSchema = z.enum(ENUM_VALUES.communicationStyle);

// Post visibility enum
export const postVisibilitySchema = z.enum(ENUM_VALUES.postVisibility);

// Quest status enum
export const questStatusSchema = z.enum(ENUM_VALUES.questStatus);

// Payout status enum
export const payoutStatusSchema = z.enum(ENUM_VALUES.payoutStatus);

// Report type enum
export const reportTypeSchema = z.enum(ENUM_VALUES.reportType);

// Report status enum
export const reportStatusSchema = z.enum(ENUM_VALUES.reportStatus);

// Notification type enum
export const notificationTypeSchema = z.enum(ENUM_VALUES.notificationType);