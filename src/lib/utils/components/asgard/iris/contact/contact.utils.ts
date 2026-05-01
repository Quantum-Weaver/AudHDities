// src/lib/utils/components/asgard/domains/iris/contact/contact.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTACT UTILITIES                                      ║
// ║                    Validation logic — no hardcoded design values          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { CONTACT_VALIDATION } from '@/lib/constants/components/asgard/domains/iris/contact/contact.constants';
import type {
  ContactFormData,
  ContactFormErrors,
} from '@/types/components/asgard/domains/iris/contact/contact.types';

/**
 * Validate a name field.
 */
export function validateName(name: string): string {
  if (!name.trim()) return CONTACT_VALIDATION.NAME_REQUIRED;
  if (name.length < CONTACT_VALIDATION.NAME_MIN_LENGTH)
    return CONTACT_VALIDATION.NAME_TOO_SHORT;
  return '';
}

/**
 * Validate an email field.
 */
export function validateEmail(email: string): string {
  if (!email.trim()) return CONTACT_VALIDATION.EMAIL_REQUIRED;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return CONTACT_VALIDATION.EMAIL_INVALID;
  return '';
}

/**
 * Validate a subject field.
 */
export function validateSubject(subject: string): string {
  if (!subject.trim()) return CONTACT_VALIDATION.SUBJECT_REQUIRED;
  if (subject.length < CONTACT_VALIDATION.SUBJECT_MIN_LENGTH)
    return CONTACT_VALIDATION.SUBJECT_TOO_SHORT;
  return '';
}

/**
 * Validate a message field.
 */
export function validateMessage(message: string): string {
  if (!message.trim()) return CONTACT_VALIDATION.MESSAGE_REQUIRED;
  if (message.length < CONTACT_VALIDATION.MESSAGE_MIN_LENGTH)
    return CONTACT_VALIDATION.MESSAGE_TOO_SHORT;
  return '';
}

/**
 * Validate the entire form and return errors.
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  return {
    name: validateName(data.name),
    email: validateEmail(data.email),
    subject: validateSubject(data.subject),
    message: validateMessage(data.message),
  };
}

/**
 * Check if a form has any validation errors.
 */
export function hasContactFormErrors(errors: ContactFormErrors): boolean {
  return Object.values(errors).some((error) => error !== '');
}

/**
 * Get the validation error for a specific field.
 */
export function getFieldError(
  field: keyof ContactFormData,
  errors: ContactFormErrors,
  touched: Record<keyof ContactFormData, boolean>
): string | undefined {
  return touched[field] && errors[field] ? errors[field] : undefined;
}