// src/types/components/asgard/auth/auth.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH TYPES                                             ║
// ║                    Pure interfaces — imports from constants               ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type {
  AUTH_BUTTON_VARIANTS,
  AUTH_FORM_VARIANTS,
} from '@/lib/constants/components/asgard/auth/auth.constants';

// ─── Variant types derived from constants ──────────────────────────────────
export type AuthButtonVariant =
  (typeof AUTH_BUTTON_VARIANTS)[keyof typeof AUTH_BUTTON_VARIANTS];

export type AuthFormVariant =
  (typeof AUTH_FORM_VARIANTS)[keyof typeof AUTH_FORM_VARIANTS];

// ─── Auth Button Props ─────────────────────────────────────────────────────
export interface AuthButtonProps {
  className?: string;
}

// ─── Auth Guard Props ──────────────────────────────────────────────────────
export interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

// ─── Protected Route Props ─────────────────────────────────────────────────
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'creator' | 'vendor';
  redirectTo?: string;
}

// ─── Login Form Props ──────────────────────────────────────────────────────
export interface LoginFormProps {
  redirectTo?: string;
}

// ─── Signup Form Props ─────────────────────────────────────────────────────
export interface SignupFormProps {
  redirectTo?: string;
}