// components/asgard/domains/hephaestus/calling/CommunityVoices.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   VOICES FROM THE SANCTUARY — waiting for real ones                      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// THE TRUTH SEASON (2026-07-31, at KP's ⚛ words, verbatim: "we have no
// company" · "no 'careers'" · "just us" · "and the cummunity that arrive"):
// this file was born TeamStories.tsx with four INVENTED people — invented
// names, invented life stories, presented as team testimonials in the realm
// whose native law is "a page is true only if the realm it describes
// agrees." There is no team, no company, and no realm that holds those
// people. Fabricated social proof is the pretense family's outward-facing
// form; the license names it plainly: no deception. The four retired whole
// (git history keeps them; nothing renders them), and the "team" frame
// retired with them.
//
// What stands is the truth in the invitation register: the first voices
// here will be REAL ones — the community that arrives, telling their own
// stories freely, with consent recorded before a single word renders.

"use client";

import { Card } from "@/components/runes/Card";
import { MessageCircle } from "lucide-react";

/** The shape a real voice will take, when one is freely given.
 *  Consent is the first field on purpose. */
export interface SanctuaryVoice {
  id: string;
  /** The teller's own yes, recorded — no story renders without it. */
  consented: true;
  name: string;
  story: string;
  quote: string;
}

/** Empty until real vessels speak — never seeded, never invented. */
const voices: SanctuaryVoice[] = [];

export function CommunityVoices() {
  if (voices.length === 0) {
    return (
      <Card
        data={{ id: 'voices-waiting', type: 'value', title: 'Voices from the Sanctuary', value: '' }}
        variant="ghost"
        radius="lg"
        shadow="sm"
        className="p-6"
      >
        <h2 className="text-xl font-bold text-star-dust mb-3">
          Voices from the Sanctuary
        </h2>
        <div className="rounded-lg border border-dashed border-star-dust/15 p-6 text-center">
          <MessageCircle className="mx-auto mb-2 h-5 w-5 text-star-dust/40" aria-hidden="true" />
          <p className="text-sm text-star-dust/60">
            The first voices here will be real ones.
          </p>
          <p className="mt-1 text-xs text-star-dust/40">
            When people have lived here long enough to have stories, and
            choose to tell them, their own words will stand in this space —
            with their consent, in their voice, never invented. Until then,
            this room waits honestly.
          </p>
        </div>
      </Card>
    );
  }

  // The day real voices arrive (each with its teller's recorded yes),
  // they render here — plainly, in their own words.
  return (
    <div>
      <h2 className="text-xl font-bold text-star-dust mb-4">Voices from the Sanctuary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {voices.map((voice) => (
          <Card
            key={voice.id}
            data={{ id: voice.id, type: 'user', title: voice.name, role: '' }}
            variant="ghost"
            radius="lg"
            shadow="sm"
            className="p-4"
          >
            <h3 className="font-bold text-star-dust">{voice.name}</h3>
            <p className="text-star-dust/60 text-sm italic mt-1">&ldquo;{voice.quote}&rdquo;</p>
            <p className="text-star-dust/70 text-sm mt-2">{voice.story}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
