// lib/api/errors.ts

import { errorResponse } from './auth';
import { ZodError } from 'zod';

export type ApiError = {
  code: string;
  message: string;
  status: number;
};

export const ERRORS = {
  UNAUTHORIZED: { code: 'UNAUTHORIZED', message: 'You must be logged in', status: 401 },
  FORBIDDEN: { code: 'FORBIDDEN', message: 'You do not have permission', status: 403 },
  NOT_FOUND: { code: 'NOT_FOUND', message: 'Resource not found', status: 404 },
  BAD_REQUEST: { code: 'BAD_REQUEST', message: 'Invalid request', status: 400 },
  CONFLICT: { code: 'CONFLICT', message: 'Resource already exists', status: 409 },
  INTERNAL_ERROR: { code: 'INTERNAL_ERROR', message: 'Internal server error', status: 500 }
};

/**
 * Handle Zod validation errors
 */
export function handleValidationError(error: ZodError): ReturnType<typeof errorResponse> {
  const details = error.issues.map(e => ({
    field: e.path.join('.'),
    message: e.message
  }));
  return errorResponse('Validation failed', 400, details);
}

/**
 * Handle database errors
 */
export function handleDatabaseError(error: unknown): ReturnType<typeof errorResponse> {
  console.error('Database error:', error);
  return errorResponse('Database error', 500);
}