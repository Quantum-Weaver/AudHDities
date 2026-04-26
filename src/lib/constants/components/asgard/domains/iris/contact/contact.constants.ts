// src/lib/constants/components/asgard/domains/iris/contact/contact.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTACT PAGE CONSTANTS                                 ║
// ║                    Raw values — no CVA, no logic                          ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import {
  SPACING_SCALE,
  BORDER_RADII,
} from '@/lib/constants/cosmic/dimensions';

import { durations, easing } from '@/lib/constants/cosmic/motion';

// ─── Page Metadata ─────────────────────────────────────────────────────────
export const CONTACT_METADATA = {
  TITLE: 'Contact Us | Sovereign Sanctuary',
  DESCRIPTION: 'Get in touch with the sanctuary stewards',
} as const;

// ─── Labels ────────────────────────────────────────────────────────────────
export const CONTACT_LABELS = {
  BADGE: 'Reach Out',
  HEADING: 'Contact the Sanctuary',
  SUBTITLE: 'Questions? Feedback? We\'re here to help.',
  SUBTITLE_SECOND: 'Every message is received by real humans who care.',
  EMAIL_HEADING: 'Email',
  EMAIL_ADDRESS: 'support@audhdities.com',
  EMAIL_RESPONSE_TIME: 'We reply within 48 hours',
  RESPONSE_TIME_HEADING: 'Response Time',
  RESPONSE_TIME_BODY: 'Usually within 24-48 hours',
  RESPONSE_TIME_HOURS: 'Weekdays: 9am-5pm CST',
  PRIVACY_HEADING: 'Privacy',
  PRIVACY_BODY: 'Your information is never shared',
  PRIVACY_LINK_TEXT: 'Read our privacy policy →',
  APPLICATION_NOTE_TITLE: 'For creator/vendor applications:',
  APPLICATION_NOTE_BODY: 'Please use the dedicated application forms in your dashboard for faster processing.',
  ALTERNATIVE_CONTACT: 'Or reach us directly at',
  FORM_HEADING: 'Send us a message',
  SUCCESS_HEADING: 'Message Sent!',
  SUCCESS_BODY: 'Thank you for reaching out. We\'ll respond within 24-48 hours.',
  SEND_ANOTHER: 'Send Another Message',
  SEND_MESSAGE: 'Send Message',
  SENDING: 'Sending...',
  NAME_LABEL: 'Name',
  EMAIL_LABEL: 'Email',
  SUBJECT_LABEL: 'Subject',
  MESSAGE_LABEL: 'Message',
} as const;

// ─── Placeholders ──────────────────────────────────────────────────────────
export const CONTACT_PLACEHOLDERS = {
  NAME: 'Your name',
  EMAIL: 'your@email.com',
  SUBJECT: 'What is this regarding?',
  MESSAGE: 'Your message...',
} as const;

// ─── Validation ────────────────────────────────────────────────────────────
export const CONTACT_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  SUBJECT_MIN_LENGTH: 3,
  MESSAGE_MIN_LENGTH: 10,
  NAME_REQUIRED: 'Name is required',
  NAME_TOO_SHORT: 'Name must be at least 2 characters',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  SUBJECT_REQUIRED: 'Subject is required',
  SUBJECT_TOO_SHORT: 'Subject must be at least 3 characters',
  MESSAGE_REQUIRED: 'Message is required',
  MESSAGE_TOO_SHORT: 'Message must be at least 10 characters',
  GENERIC_ERROR: 'Failed to send message. Please try again.',
} as const;

// ─── Routes ────────────────────────────────────────────────────────────────
export const CONTACT_ROUTES = {
  PRIVACY: '/privacy',
} as const;

// ─── API ───────────────────────────────────────────────────────────────────
export const CONTACT_API = {
  ENDPOINT: '/api/generated/iris-communications/contact_submissions',
  REDIRECT_DELAY_MS: 2000,
} as const;

// ─── Dimensions ────────────────────────────────────────────────────────────
export const CONTACT_DIMENSIONS = {
  HERO_PADDING_Y: SPACING_SCALE['20'],     // 80px
  SECTION_PADDING_X: SPACING_SCALE['6'],   // 24px
  SECTION_PADDING_BOTTOM: SPACING_SCALE['20'], // 80px
  CARD_PADDING: SPACING_SCALE['6'],        // 24px
  CARD_PADDING_LG: SPACING_SCALE['8'],     // 32px
  ICON_CONTAINER_SIZE: 'w-12 h-12',
  GRID_GAP: SPACING_SCALE['8'],            // 32px
  INFO_STACK_GAP: SPACING_SCALE['6'],      // 24px
  FORM_SPACING: SPACING_SCALE['5'],        // 20px
  ORB_SIZE_SM: 'w-72 h-72',
  ORB_SIZE_LG: 'w-96 h-96',
} as const;

export const CONTACT_BORDER_RADIUS = {
  ICON_CONTAINER: BORDER_RADII.xl,
  BADGE: BORDER_RADII.full,
  CARD: BORDER_RADII.xl,
} as const;

// ─── Transition ─────────────────────────────────────────────────────────────
export const CONTACT_TRANSITION = {
  DURATION: durations.normal,
  EASING: easing.quantum,
} as const;

// ─── Success State ─────────────────────────────────────────────────────────
export const CONTACT_SUCCESS_DIMENSIONS = {
  ICON_SIZE: 32,
  ICON_CONTAINER: 'w-16 h-16',
  PADDING_Y: SPACING_SCALE['8'], // 32px
} as const;

// ─── Error State ───────────────────────────────────────────────────────────
export const CONTACT_ERROR_DIMENSIONS = {
  ICON_SIZE: 16,
  PADDING: SPACING_SCALE['3'], // 12px
} as const;