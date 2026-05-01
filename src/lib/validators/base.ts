// lib/validators/base.ts
import { z } from 'zod';

// Base ID validation
export const idSchema = z.string().uuid();

// Timestamp validation
export const timestampSchema = z.string().datetime();

// Slug validation (URL-friendly)
export const slugSchema = z.string()
  .min(3, 'Slug must be at least 3 characters')
  .max(100, 'Slug must be less than 100 characters')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens');

// URL validation (with optional protocol)
export const urlSchema = z.string().url().or(z.string().startsWith('/'));

// Email validation
export const emailSchema = z.string().email('Please enter a valid email address');

// Password validation
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Percentage validation (0-100)
export const percentageSchema = z.number()
  .min(0, 'Must be at least 0%')
  .max(100, 'Cannot exceed 100%');

// FIXED: Money validation - do validation BEFORE transformation
// Dollars to cents transformation
export const dollarsToCentsSchema = z.number()
  .min(0, 'Amount cannot be negative')
  .transform(val => Math.round(val * 100));

// Cents validation (for when you already have cents)
export const centsSchema = z.number()
  .int('Amount must be in whole cents')
  .min(0, 'Amount cannot be negative');

// For when you need to validate a dollar amount without transformation
export const dollarsSchema = z.number()
  .min(0, 'Amount cannot be negative');

// Array validation helpers
export const nonEmptyArray = <T extends z.ZodTypeAny>(schema: T) =>
  z.array(schema).min(1, 'At least one item is required');

export const maxArray = <T extends z.ZodTypeAny>(schema: T, max: number) =>
  z.array(schema).max(max, `Cannot exceed ${max} items`);

// Record schemas
export const stringRecordSchema = <V extends z.ZodTypeAny>(valueSchema: V) =>
  z.record(z.string(), valueSchema);

export const numberRecordSchema = <V extends z.ZodTypeAny>(valueSchema: V) =>
  z.record(z.number(), valueSchema);

export const anyStringRecordSchema = z.record(z.string(), z.any());
export const anyNumberRecordSchema = z.record(z.number(), z.any());

export const strictStringRecordSchema = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z.record(z.string().min(1), valueSchema);