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
  OPENING_DOOR: 'Opening the door…',
  JOIN_SANCTUARY: 'Join the Sanctuary',
  ENTER_SANCTUARY: 'Enter the Sanctuary',
  ENTERING: 'Entering...',
  RETURN_SANCTUARY: 'Return to the Sanctuary',
  COME_IN: 'Come in',
  FORGOT_PASSWORD: 'Forgot your password?',
  SEND_RESET_LINK: 'Send Reset Link',
  SENDING_RESET: 'Sending...',
  SET_NEW_PASSWORD: 'Set New Password',
  SETTING_PASSWORD: 'Setting...',
  BACK_TO_LOGIN: 'Return to login',
  NEW_TO_SANCTUARY: 'New to the Sanctuary?',
  BEEN_HERE_BEFORE: 'Been here before?',
  ACCEPT_TERMS: 'I agree to the',
  TERMS_OF_SERVICE: 'Terms of Service',
  PRIVACY_POLICY: 'Privacy Policy',
  AND: 'and',
  RETURN_TO_SANCTUARY: 'Return to Sanctuary',

  LOGIN_HEADING: 'Return to the Sanctuary',
  LOGIN_SUBHEADING: 'Your email and password. Take your time.',
  OR: 'or',

  MAGIC_LINK: 'Email me a way in',
  MAGIC_LINK_SENDING: 'Sending...',
  MAGIC_LINK_EXPLAINER:
    'No password needed. We send a link to the address above and it opens the door once.',
  MAGIC_LINK_SENT_HEADING: 'A way in is on its way',
  MAGIC_LINK_SENT_BODY:
    'If that address has a home here, a way in is heading to it now. Take your time — the door will wait.',
  PASSWORD_INSTEAD: 'Enter with a password instead',

  DIDNT_ARRIVE:
    'Didn’t arrive? Check the spam folder, then ask again with the same address. Nothing is spent by asking twice.',

  SIGNUP_HEADING: 'Come in',
  SIGNUP_SUBHEADING: 'Join the Sovereign Sanctuary',

  ACID_OFFER_HEADING: 'One more thing, if you want it.',
  ACID_OFFER_BODY:
    'The Acid Test is a short, playful set of questions. It sets what you pay — never what you may reach. Nothing here is gated.',
  ACID_OFFER_TAKE: 'Take the Acid Test',
  ACID_OFFER_NOT_NOW: 'Not now',
  ACID_OFFER_FOOTNOTE:
    'It is offered again whenever you want it — nothing is lost by waiting.',
} as const;

// ─── What the door says when a link does not open it ───────────────────────
export const AUTH_MESSAGES = {
  CALLBACK_FAILED: {
    title: 'That link didn’t open the door.',
    body: 'It may have expired, or it may already have been used. Ask for a new one and it will be sent straight away — nothing on your side is lost.',
    newLink: 'Email me a new way in',
    newPassword: 'Set a new password instead',
  },
  RECOVERY_MISSING: {
    body: 'That recovery link has expired or has already been used. Ask for a new one whenever you are ready — nothing on your side is lost.',
  },
} as const;

// ─── Page Metadata ─────────────────────────────────────────────────────────
export const AUTH_METADATA = {
  LOGIN: {
    title: 'Enter the Sanctuary | AUDHDITIES',
    description: 'Return to the sanctuary',
  },
  SIGNUP: {
    title: 'Join the Sanctuary | AUDHDITIES',
    description: 'Join the sovereign network',
  },
  FORGOT_PASSWORD: {
    title: 'Reset Password | AUDHDITIES',
    description: 'Recover access to your sanctuary',
  },
  RESET_PASSWORD: {
    title: 'Set a New Password | AUDHDITIES',
    description: 'Choose a new password for your vessel',
  },
} as const;

// ─── Placeholders ──────────────────────────────────────────────────────────
export const AUTH_PLACEHOLDERS = {
  EMAIL: 'your@email.com',
  PASSWORD: 'Enter your password',
  CREATE_PASSWORD: 'Create a password (min 6 characters)',
  CONFIRM_PASSWORD: 'Confirm your password',
  NEW_PASSWORD: 'Choose a new password (min 6 characters)',
  USERNAME: 'Choose a username',
} as const;

// ─── Routes ────────────────────────────────────────────────────────────────
export const AUTH_ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  CALLBACK: '/callback',
  DASHBOARD: '/vessel',
  QUESTIONNAIRE: '/questionaire',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  HOME: '/',
  SANCTUARY: '/sanctuary',
  VESSEL_SANCTUM: '/vessel/sanctum',
} as const;

// ─── Error Messages ────────────────────────────────────────────────────────
export const AUTH_ERRORS = {
  CALLBACK_FAILED: 'auth_callback_failed',
  RECOVERY_MISSING: 'recovery_session_missing',
  LOGOUT_FAILED: 'Logout failed',
} as const;

// ─── Error Param ───────────────────────────────────────────────────────────
export const AUTH_ERROR_PARAM = 'error';

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

// ─── The door's weather ────────────────────────────────────────────────────
export const AUTH_ENVIRONMENT = 'gateway' as const;