// src/lib/utils/components/asgard/auth/auth.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH UTILITIES                                         ║
// ║                    Pure logic — no hardcoded design values                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { AUTH_REDIRECT_PARAM } from '@/lib/constants/components/asgard/auth/auth.constants';

/**
 * Build a redirect URL with the current path preserved.
 */
export function buildRedirectUrl(
  baseUrl: string,
  currentPath: string
): string {
  const encoded = encodeURIComponent(currentPath);
  return `${baseUrl}?${AUTH_REDIRECT_PARAM}=${encoded}`;
}

/**
 * Extract the redirect target from search params, falling back to default.
 */
export function getRedirectTarget(
  searchParams: URLSearchParams,
  defaultRedirect: string
): string {
  return searchParams.get(AUTH_REDIRECT_PARAM) || defaultRedirect;
}

/**
 * Validate password strength.
 * Returns array of failure messages, empty if valid.
 */
export function validatePasswordStrength(password: string): string[] {
  const failures: string[] = [];

  if (password.length < 6) {
    failures.push('Password must be at least 6 characters');
  }
  if (password.length > 128) {
    failures.push('Password must be less than 128 characters');
  }

  return failures;
}

/**
 * Validate that two passwords match.
 */
export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): boolean {
  return password === confirmPassword;
}

/**
 * Check if terms have been accepted.
 */
export function validateTermsAccepted(value: unknown): boolean {
  return value === 'on' || value === true;
}

// ─── Hover Handlers — NEW ──────────────────────────────────────────────────

export interface AuthButtonHoverHandlers {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

/**
 * Builds hover event handlers for the auth button.
 * Same pattern as header and navigation hover handlers.
 *
 * Usage:
 *   const [isHovered, setIsHovered] = useState(false);
 *   const handlers = buildAuthButtonHoverHandlers(setIsHovered);
 *   <button {...handlers} className={authButtonVariants({ variant, isHovered })}>
 */
export function buildAuthButtonHoverHandlers(
  setHovered: (value: boolean) => void
): AuthButtonHoverHandlers {
  return {
    handleMouseEnter: () => setHovered(true),
    handleMouseLeave: () => setHovered(false),
    handleFocus: () => setHovered(true),
    handleBlur: () => setHovered(false),
  };
}