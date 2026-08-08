// src/lib/types/components/asgard/domains/iris/contact/contact.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTACT TYPES                                          ║
// ║                    Pure interfaces                                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ContactInfoCardAccent } from '@/lib/constants/components/asgard/domains/iris/contact/contact.variants';

// ─── Contact Form Props ────────────────────────────────────────────────────
export interface ContactFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

// ─── Form Data ─────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Form Errors ───────────────────────────────────────────────────────────
export type ContactFormErrors = Record<keyof ContactFormData, string>;

// ─── Form Touched ──────────────────────────────────────────────────────────
export type ContactFormTouched = Record<keyof ContactFormData, boolean>;

// ─── Submit Status ─────────────────────────────────────────────────────────
export type ContactSubmitStatus = 'idle' | 'success' | 'error';

// ─── Info Card ─────────────────────────────────────────────────────────────
export interface ContactInfoCard {
  accent: ContactInfoCardAccent;
  icon: React.ReactNode;
  heading: string;
  body: string;
  caption?: string;
  link?: {
    href: string;
    text: string;
  };
}