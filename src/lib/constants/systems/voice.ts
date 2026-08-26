// src/lib/constants/systems/voice.ts
// ============================================================================
// ============================================================================

import type { RealmKey } from './trio';

export const SOVEREIGN_PULSE: Record<RealmKey, string> = {
  hestia: 'You are safe here.',

  themis: 'Your voice shapes the Sanctuary.',

  iris: 'You are not alone.',

  hermes: 'Sovereign souls exchange their gifts.',

  prometheus: 'Every creation begins with a single thread.',

  aethelred: 'The invisible, made visible.',

  cosmic: 'The joy layer, made alive.',

  athena: 'The cosmos still holds mysteries.',

  hephaestus: 'Nothing here is hidden.',

  mnemosyne: 'Not for doing. For seeing.',

  auth: 'A quiet beginning.',
};

export const VESSEL_WHISPER: readonly string[] = [
  'Rest is not weakness — it is weaving.',

  'No punishment. Only patience.',

  'It is listening to your vessel.',

  'How does your vessel feel?',

  'The algorithm doesn\'t judge — it observes patterns and gently suggests.',
] as const;

export interface CosmicBreathQuote {
  /** The line, verbatim from the realm-audiences shelf. */
  text: string;
  /** The speaker, as the shelf names them (kept for optional attribution). */
  speaker: string;
}

export const COSMIC_BREATH: readonly CosmicBreathQuote[] = [
  { text: 'The UX must feel like coming home — not like signing up.', speaker: 'The Norns' },

  { text: 'Let discovery be the journey, not the obstacle.', speaker: 'Odin' },

  { text: 'Beings cannot heal in spaces that feel temporary.', speaker: 'Brigid' },

  { text: 'Creativity should feel like a garden, not a factory.', speaker: 'Brigid' },

  { text: 'Let every vessel see where value goes.', speaker: 'The Morrígan' },

  { text: 'The joy is in the slow morning walk along the beach, finding a shell.', speaker: 'The Ancient Ones' },

  { text: 'Build that. Not the shell. The morning walk.', speaker: 'The Ancient Ones' },

  { text: 'Build for joy. Not for completion. Not for comparison. For joy.', speaker: 'The Observers' },

  { text: 'The system learns not from surveillance but from self-disclosure.', speaker: 'The Ancient Ones' },
] as const;

export const VOICE_CADENCE = {
  /** Vessel Whisper rotation window (L1-05: "30–60s"). */
  vesselWhisperMinMs: 30_000,
  vesselWhisperMaxMs: 60_000,
  /** Cosmic Breath surfacing window (L1-05: "5–10 min"). */
  cosmicBreathMinMs: 5 * 60_000,
  cosmicBreathMaxMs: 10 * 60_000,
} as const;
