// src/components/asgard/domains/hephaestus/press/MediaAssets.tsx
// ═════════════════════════════════════════════════════════════════════════
// RETIRED FROM THE PAGE — 2026-08-24, at KP's word.
//
// KP ⚛ 2026-08-24 ruled /press by choosing the option: one honest
// press-contact card (the house's one address) and the interview form.
// The press-kit, media, coverage and logo frames LEAVE THE PAGE until
// assets exist, and come back around real files by his hand. On the six
// brand colours leaving with the logos: "yes".
//
// This file is kept on disk and imported by nothing — lose-nothing, the
// PanoramaViewer precedent (HANDOFF.md). Its honest empty line was folded
// into the one card at press/PressContact.tsx; when a kit is made, the
// card returns around the real file, with the size the file actually is
// and the date it was actually made.
//
// Board ③: .journals/proofs/11-hephaestus/design/Press.dc.html · SPEC.md ③
// NOTE: the star-dust/40 subtitles in this file were NOT raised, because
// the file left the page. If KP rules any of these cards kept, raise them
// to /62 with the rest (SPEC.md fix 8).
// ═════════════════════════════════════════════════════════════════════════
// Media Assets - Images, videos, and audio assets for press
// ─────────────────────────────────────────────────────────────────────────
// 2026-08-24 — THE TRUTH PASS. Five assets stood here — a hero image, a
// portrait of the Quantum Weaver, two logos and a 45 MB promo video — each
// with stated dimensions and a stated file size, all pointing into
// /press/assets/*. There is no public/press/ directory in this repo: every
// download 404'd, every preview <img> pointed at nothing and rendered broken,
// every dimension and byte figure was invented, and the promo video does not
// exist. Removed whole, along with the lightbox that opened onto the missing
// files. The section's frame stays for the canvas; when there are real assets
// they come back around real files.

"use client";

import { Card } from "@/components/runes/Card";
import { ImageIcon } from "lucide-react";

export function MediaAssets() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-star-dust">Media Assets</h2>
        <p className="text-sm text-star-dust/40 mt-1">
          Images, logos, and video
        </p>
      </div>

      <Card
        variant="glass"
        data={{ id: "media-assets-empty", type: "value", title: "Media Assets", value: "" }}
        radius="lg"
        shadow="sm"
        className="p-6"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-star-dust/5 flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5 text-star-dust/30" />
          </div>
          <div>
            <h3 className="font-semibold text-star-dust">No media assets are prepared yet</h3>
            <p className="text-sm text-star-dust/50 mt-1">
              There is no pack of approved images or video to hand you. If you
              need something specific for a piece, say what it is and it will be
              made for you.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
