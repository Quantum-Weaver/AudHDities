// src/lib/constants/components/asgard/auth/auth.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH CONSTANTS                                         ║
// ║                    Raw values — no CVA, no logic                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  SPACING_SCALE,
  BORDER_RADII,
} from '@/lib/constants/cosmic/dimensions';

import { durations, easing } from '@/lib/constants/cosmic/motion';
import { GRADIENTS } from '@/lib/constants/cosmic/effects';

// ─── Variant Keys ──────────────────────────────────────────────────────────
export const AUTH_BUTTON_VARIANTS = {
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
} as const;

export const AUTH_FORM_VARIANTS = {
  LOGIN: 'login',
  SIGNUP: 'signup',
} as const;

// ─── Labels ────────────────────────────────────────────────────────────────
export const AUTH_LABELS = {
  ENTER: 'Enter',
  EXIT: 'Exit',
  LOADING: 'Loading sanctuary...',
  CREATING_ACCOUNT: 'Creating Account...',
  JOIN_SANCTUARY: 'Join the Sanctuary',
  ENTER_SANCTUARY: 'Enter the Sanctuary',
  ENTERING: 'Entering...',
  RETURN_SANCTUARY: 'Return to the Sanctuary',
  INITIALIZE_CONSCIOUSNESS: 'Initialize Consciousness',
  FORGOT_PASSWORD: 'Forgot your password?',
  NEW_TO_SANCTUARY: 'New to the Sanctuary?',
  ALREADY_MANIFESTED: 'Already manifested?',
  ALREADY_HAVE_ACCOUNT: 'Already have an account?',
  ACCEPT_TERMS: 'I agree to the',
  TERMS_OF_SERVICE: 'Terms of Service',
  PRIVACY_POLICY: 'Privacy Policy',
  AND: 'and',
  RETURN_TO_SANCTUARY: 'Return to Sanctuary',
} as const;

// ─── Page Metadata ─────────────────────────────────────────────────────────
export const AUTH_METADATA = {
  LOGIN: {
    title: 'Login | AUDHDITIES',
    description: 'Return to the sanctuary',
  },
  SIGNUP: {
    title: 'Sign Up | AUDHDITIES',
    description: 'Join the sovereign network',
  },
} as const;

// ─── Placeholders ──────────────────────────────────────────────────────────
export const AUTH_PLACEHOLDERS = {
  EMAIL: 'your@email.com',
  PASSWORD: 'Enter your password',
  CREATE_PASSWORD: 'Create a password (min 6 characters)',
  CONFIRM_PASSWORD: 'Confirm your password',
  USERNAME: 'Choose a username',
} as const;

// ─── Routes ────────────────────────────────────────────────────────────────
export const AUTH_ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/vessel',
  QUESTIONNAIRE: '/questionaire',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  HOME: '/',
  VESSEL_SANCTUM: '/vessel/sanctum',
} as const;

// ─── Error Messages ────────────────────────────────────────────────────────
export const AUTH_ERRORS = {
  CALLBACK_FAILED: 'auth_callback_failed',
  LOGOUT_FAILED: 'Logout failed',
} as const;

// ─── Cookie Names ──────────────────────────────────────────────────────────
export const AUTH_COOKIES = {
  ACCESS_TOKEN: 'sb-access-token',
  REFRESH_TOKEN: 'sb-refresh-token',
} as const;

// ─── Page Background ───────────────────────────────────────────────────────
export const AUTH_PAGE_GRADIENT = GRADIENTS['cosmicDomain'];

// ─── Dimensions ────────────────────────────────────────────────────────────
export const AUTH_BUTTON_PADDING = {
  X: SPACING_SCALE['4'],  // 16px
  Y: SPACING_SCALE['2'],  // 8px
} as const;

export const AUTH_BUTTON_RADIUS = BORDER_RADII.lg;

export const AUTH_ICON_SIZE = 18;

export const AUTH_SPINNER_SIZE = 'h-8 w-8';

export const AUTH_FORM_MAX_WIDTH = 'max-w-md';

export const AUTH_PAGE_PADDING = SPACING_SCALE['6'];

// ─── Transition ─────────────────────────────────────────────────────────────
export const AUTH_TRANSITION_DURATION = durations.fast;
export const AUTH_TRANSITION_EASING = easing.quantum;

// ─── Redirect Param ────────────────────────────────────────────────────────
export const AUTH_REDIRECT_PARAM = 'redirect';