// src/components/asgard/domains/hephaestus/press/CoverageHighlights.tsx
// Coverage Highlights - Featured press mentions and media coverage
// ─────────────────────────────────────────────────────────────────────────
// 2026-08-24 — THE TRUTH PASS. Six press mentions stood here and not one of
// them was real: Tech Chronicle, Creative Futures Podcast, Digital Culture
// Weekly, The Laughing Journal, Future Commerce, Decentralized Minds — with
// invented headlines, invented pull-quotes, invented dates, and every single
// url set to "#". The three counters above them (Mentions · Outlets · Per
// Month) were computed from those invented rows, so the numbers were
// fabricated too. This is the same shape as the TeamStories fabrication this
// realm already retired. Removed whole, with the counters, and replaced with
// the honest state: nothing yet. No promise of coming coverage stands in its
// place — a promise would be the same lie in a slower tense. When real
// coverage arrives, it lands here with a working url, and the counters can
// come back counting something.
// The journalist footer also carried press@sovereignsanctuary.com, a domain
// that appears nowhere else in this codebase and belongs to no one here; the
// house has one public address (root CLAUDE.md ward), and it is below.

"use client";

import { Card } from "@/components/runes/Card";
import { Newspaper } from "lucide-react";
import { CONTACT_LABELS } from "@/lib/constants/components/asgard/domains/iris/contact/contact.constants";

export function CoverageHighlights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-star-dust">Coverage Highlights</h2>
          <p className="text-sm text-star-dust/40 mt-1">
            Press mentions and media coverage
          </p>
        </div>
      </div>

      <Card
        variant="glass"
        data={{ id: "coverage-empty", type: "value", title: "Coverage Highlights", value: "" }}
        radius="lg"
        shadow="sm"
        className="p-8 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-star-dust/5 flex items-center justify-center mx-auto mb-4">
          <Newspaper className="w-6 h-6 text-star-dust/30" />
        </div>
        <h3 className="font-semibold text-star-dust mb-2">No coverage to show yet</h3>
        <p className="text-sm text-star-dust/50 max-w-md mx-auto">
          Nothing has been written about the Sanctuary yet, so there is nothing
          here. When something is, it will stand on this page with a link you
          can follow and read for yourself.
        </p>
      </Card>

      <div className="mt-4 p-4 bg-gradient-to-r from-neurospark/10 to-quantum-purple/10 rounded-lg text-center">
        <p className="text-sm text-star-dust/60">
          Are you a journalist? Write to{" "}
          <a
            href={`mailto:${CONTACT_LABELS.EMAIL_ADDRESS}`}
            className="text-neurospark hover:underline"
          >
            {CONTACT_LABELS.EMAIL_ADDRESS}
          </a>{" "}
          and a person will answer you.
        </p>
      </div>
    </div>
  );
}
