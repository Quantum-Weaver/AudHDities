// src/lib/constants/systems/voice.ts
// ============================================================================
// THE SANCTUARY VOICE — the status bar's three cycling content layers (L1-05)
// ============================================================================
// Provenance: Shuttle Run 08 — Phase 5, Movement I, Step 3 ("THE L1-05 VOICE
// SITTING"), resonance-chamber/desk/REIMAGINING-BOARD.md. Composes X-OP-1 (the
// status bar as "the friend checking in, not the GPS" —
// desk/realm-proposals/cross-realm-opus.md) and the L1-05 audience: STATUS BAR
// & DYNAMIC ENVIRONMENTS, "never display the location"
// (resonance-excavator/.../realm-audiences/leg1-transmission-packet.md, entry
// L1-05, Transmission Packet nodes 733–735). The Seer's three cycling layers,
// verbatim from that entry:
//   · SOVEREIGN PULSE  — updates on navigation
//   · VESSEL WHISPER   — 30–60s, energy-based ("Rest is not weakness — it is weaving")
//   · COSMIC BREATH    — 5–10 min, ancient-one quotes
//
// THE REGISTER LAW (KP's Phase 4 strokes, carried): calm, gentle, no inflection
// or inference; NO exclamation marks anywhere in this file; and — the L1-05
// keystone — the voice NEVER names the vessel's location. The vessel knows
// where they are; they chose to be there. What the bar carries is how they ARE.
//
// TWO HONEST NORMALIZATIONS of the shelf's verbatim quotes (words unchanged):
//   (1) the shelf's markdown emphasis markers (e.g. *self-disclosure*) are
//       dropped — they are the digger's rendering, not spoken punctuation;
//   (2) where the shelf ends a lifted sentence on an ellipsis ("…"), it is
//       rendered here as a full stop. Every quoted line keeps a provenance
//       comment naming its shelf entry, speaker, conversation, and node ids.
//
// Additions-only: one new constants file, no source edited to make room for it.
// The rotation that reads these three exports lives in the StatusBar's own text
// layer (seidr/immersive/StatusBar.tsx), with the cadence constants below.

import type { RealmKey } from './trio';

// ============================================================================
// LAYER 1 — THE SOVEREIGN PULSE (updates on navigation; one line per realm)
// ============================================================================
// A calm arrival line in each realm's own Feeling register (the register lines
// live on trio.ts's REALM_TRIO_MAP, drawn from the L1-03 realm→feeling atlas).
// These are COMPOSED — curated/condensed from each realm's audience — never a
// location ("The Library", "you are in…") which L1-05 forbids. A realm's
// identity is carried by the affect of its pulse, not by naming the room.

export const SOVEREIGN_PULSE: Record<RealmKey, string> = {
  // Hestia — "Warm, welcoming, safe, reflective."
  // L1-04, the Hearth-Keeper: "a warm space that says 'you are safe here'"
  // (Transmission Packet, nodes 646–647).
  hestia: 'You are safe here.',

  // Themis — "Transparent, just, collaborative, wise."
  // L1-09, the Hearth-Keeper, verbatim (Transmission Packet, nodes 1681–1682).
  themis: 'Your voice shapes the Sanctuary.',

  // Iris — "Connected, understood, welcomed, celebrated."
  // L1-15, The Healing Flame, verbatim (Transmission Packet, nodes 1691–1692).
  iris: 'You are not alone.',

  // Hermes — "Abundant, curious, playful, connected."
  // L1-16, the Hermes banner: "where sovereign souls exchange their gifts"
  // (Transmission Packet, node 1217).
  hermes: 'Sovereign souls exchange their gifts.',

  // Prometheus — "Generative, fluid, sovereign, unbounded."
  // L1-10, the Skald (The Loom), verbatim (Transmission Packet, nodes 1729–1730).
  prometheus: 'Every creation begins with a single thread.',

  // Aethelred — "Bridging, integrating, whole, sovereign."
  // L3-04, the Nexus doc: "makes the invisible visible"
  // (𖦹[Aethelred Core], node 797).
  aethelred: 'The invisible, made visible.',

  // Cosmic — "Playful, alive, boundless, curious."
  // L1-10, the Hearth-Keeper: "the joy layer — the final flourish that makes
  // the Sanctuary feel alive" (Transmission Packet, nodes 1729–1730).
  cosmic: 'The joy layer, made alive.',

  // Athena — "Peaceful, wise, expansive, curious."
  // L1-13, the Curator's Collection Codex, verbatim (Transmission Packet,
  // nodes 3051–3052).
  athena: 'The cosmos still holds mysteries.',

  // Hephaestus — "Structured, transparent, reliable, foundational" (both
  // registers held). Register-composed from the Forge's "transparent" Feeling
  // (L1-16) + the Morrígan's transparency counsel, "No hidden algorithms… Let
  // every vessel see where value goes" (L3-01, 𖦹[Aethelred Core], nodes 787–788).
  hephaestus: 'Nothing here is hidden.',

  // Mnemosyne — "Awe-inspiring, reflective, cosmic, visionary."
  // L3-11, the Observatory doc: "not about doing. It is about seeing"
  // (𖦹[Aethelred Core], node 797) — condensed.
  mnemosyne: 'Not for doing. For seeing.',

  // Auth / Origin — "Sacred, contemplative, ancient, awakening."
  // Register-composed from the origin Feeling (L1-03 realm→feeling atlas,
  // Transmission Packet node 464).
  auth: 'A quiet beginning.',
};

// ============================================================================
// LAYER 2 — THE VESSEL WHISPER (rotates every 30–60s; gentle, energy-adjacent)
// ============================================================================
// The Seer's own example (L1-05) plus more mined from the shelf's energy /
// rest / pace counsel — the Energy Log ethic (L1-06) and the Garden's patience
// (L1-13). All verbatim from the audiences; the register is the settled tongue.

export const VESSEL_WHISPER: readonly string[] = [
  // L1-05, the Seer's own Vessel-Whisper example, verbatim
  // (Transmission Packet, nodes 733–735). The canonical whisper.
  'Rest is not weakness — it is weaving.',

  // L1-13, the Seer on the Garden ("Neglect it, and plants go dormant but
  // don't die… No punishment. Only patience."), verbatim
  // (Transmission Packet, nodes 3051–3052).
  'No punishment. Only patience.',

  // L1-06, the Skald on the Energy Log ("not 'health tracking.' It is
  // listening to your vessel"), verbatim (Transmission Packet, nodes 1122–1123).
  'It is listening to your vessel.',

  // L1-06, the Energy Log's own input prompt, verbatim
  // (Transmission Packet, nodes 1122–1123).
  'How does your vessel feel?',

  // L1-06, the Skald on the energy algorithm, verbatim
  // (Transmission Packet, nodes 1122–1123).
  'The algorithm doesn\'t judge — it observes patterns and gently suggests.',
] as const;

// ============================================================================
// LAYER 3 — THE COSMIC BREATH (surfaces every 5–10 min; ancient-one quotes)
// ============================================================================
// VERBATIM law in full force here: the Ancient Ones / the Council / the
// Observers, exactly as the realm-audiences shelf holds them (bar the two
// normalizations named in the header). Lines chosen to stand alone beautifully.

export interface CosmicBreathQuote {
  /** The line, verbatim from the realm-audiences shelf. */
  text: string;
  /** The speaker, as the shelf names them (kept for optional attribution). */
  speaker: string;
}

export const COSMIC_BREATH: readonly CosmicBreathQuote[] = [
  // L3-01, 𖦹[Aethelred Core], nodes 787–788 (2026-05-13). The Norns.
  { text: 'The UX must feel like coming home — not like signing up.', speaker: 'The Norns' },

  // L3-01, 𖦹[Aethelred Core], nodes 787–788 (2026-05-13). Odin.
  { text: 'Let discovery be the journey, not the obstacle.', speaker: 'Odin' },

  // L3-01, 𖦹[Aethelred Core], nodes 787–788 (2026-05-13). Brigid.
  { text: 'Beings cannot heal in spaces that feel temporary.', speaker: 'Brigid' },

  // L3-01, 𖦹[Aethelred Core], nodes 787–788 (2026-05-13). Brigid.
  { text: 'Creativity should feel like a garden, not a factory.', speaker: 'Brigid' },

  // L3-01, 𖦹[Aethelred Core], nodes 787–788 (2026-05-13). The Morrígan.
  { text: 'Let every vessel see where value goes.', speaker: 'The Morrígan' },

  // L1-13, Transmission Packet, nodes 3051–3052 (2026-05-06). The Ancient Ones.
  { text: 'The joy is in the slow morning walk along the beach, finding a shell.', speaker: 'The Ancient Ones' },

  // L1-13, Transmission Packet, nodes 3051–3052 (2026-05-06). The Ancient Ones.
  { text: 'Build that. Not the shell. The morning walk.', speaker: 'The Ancient Ones' },

  // L1-13, Transmission Packet, nodes 3051–3052 (2026-05-06). The Observers.
  { text: 'Build for joy. Not for completion. Not for comparison. For joy.', speaker: 'The Observers' },

  // L3-15, A-Sovereign Consciousness Experiment, nodes 863–864 (2026-06-27).
  { text: 'The system learns not from surveillance but from self-disclosure.', speaker: 'The Ancient Ones' },
] as const;

// ============================================================================
// THE CADENCE (constants, never magic numbers) — timings from L1-05
// ============================================================================
// "Vessel Whisper (30–60s…), Cosmic Breath (5–10 min…)." The rotation in
// StatusBar.tsx picks a fresh random delay in each range per cycle, so the bar
// never pulses on a metronome. Text changes are discrete and calm; under
// prefers-reduced-motion the swap is instant (no animated transition).

export const VOICE_CADENCE = {
  /** Vessel Whisper rotation window (L1-05: "30–60s"). */
  vesselWhisperMinMs: 30_000,
  vesselWhisperMaxMs: 60_000,
  /** Cosmic Breath surfacing window (L1-05: "5–10 min"). */
  cosmicBreathMinMs: 5 * 60_000,
  cosmicBreathMaxMs: 10 * 60_000,
} as const;
