// src/components/asgard/domains/hephaestus/press/LogoDownloads.tsx
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
// Logo Downloads - All logo variations in one place
// ─────────────────────────────────────────────────────────────────────────
// 2026-08-24 — THE TRUTH PASS. Six logo files stood here — primary, white,
// black, icon-only, horizontal and a favicon pack — each with a stated size
// in kilobytes, all pointing into /press/logos/*. There is no public/press/
// directory in this repo: every button 404'd and every file size was
// invented. Removed, with an honest line in their place; the section's frame
// stays for the canvas.
// KEPT, because they are true: the Brand Colors below are the house's real
// tokens, read from src/lib/constants/cosmic/colors.ts, and the copy button
// works. The usage guidelines are kept too — their last line pointed at
// brand@sovereignsanctuary.com, a domain that appears nowhere else in this
// codebase; the house has one public address (root CLAUDE.md ward).

"use client";

import { useState } from "react";
import { Card } from "@/components/runes/Card";
import { Copy, Check, Shapes } from "lucide-react";
import { CONTACT_LABELS } from "@/lib/constants/components/asgard/domains/iris/contact/contact.constants";

const brandColors = [
  { name: "Quantum Purple", value: "#6C5CE7", variable: "--quantum-purple" },
  { name: "Cosmic Blue", value: "#0984E3", variable: "--cosmic-blue" },
  { name: "Fire Base", value: "#E17055", variable: "--fire-base" },
  { name: "Deep Space", value: "#0C0F1D", variable: "--deep-space" },
  { name: "Star Dust", value: "#E0E0E0", variable: "--star-dust" },
  { name: "Neurospark", value: "#22D3EE", variable: "--neurospark" },
];

export function LogoDownloads() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card
      variant="interactive"
      data={{ id: "logo-downloads", type: "value", title: "Logo Downloads", value: "" }}
      radius="lg"
      shadow="md"
      className="p-6 space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-star-dust">Logos &amp; Brand</h2>
        <p className="text-sm text-star-dust/40 mt-1">
          What there is to use, and how to use it
        </p>
      </div>

      <div className="p-4 rounded-lg border border-star-dust/10 bg-star-dust/5">
        <div className="flex items-start gap-3">
          <Shapes className="w-5 h-5 text-star-dust/30 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-star-dust">No logo files are prepared yet</h3>
            <p className="text-sm text-star-dust/50 mt-1">
              There is no pack of logo variants to download. The colours below
              are real and yours to use.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-star-dust/10">
        <h3 className="font-semibold text-star-dust mb-3">Brand Colors</h3>
        <div className="grid grid-cols-2 gap-3">
          {brandColors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleCopyColor(color.value)}
              className="flex items-center gap-3 p-2 rounded-lg bg-star-dust/5 hover:bg-star-dust/10 transition-colors text-left"
            >
              <div
                className="w-8 h-8 rounded-full shrink-0"
                style={{ backgroundColor: color.value }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-star-dust">{color.name}</p>
                <p className="text-xs text-star-dust/40 font-mono">{color.value}</p>
              </div>
              {copied === color.value ? (
                <Check className="w-4 h-4 text-sanctuary-green shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-star-dust/40 shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-star-dust/10">
        <h3 className="font-semibold text-star-dust mb-2">Usage Guidelines</h3>
        <ul className="text-sm text-star-dust/40 space-y-1 list-disc list-inside">
          <li>Do not alter, distort, or change logo colors</li>
          <li>Maintain clear space around the logo (half the logo height)</li>
          <li>Use white logo on dark backgrounds, color logo on light backgrounds</li>
          <li>Minimum size: 32px height for digital, 0.5 inches for print</li>
          <li>For questions, write to {CONTACT_LABELS.EMAIL_ADDRESS}</li>
        </ul>
      </div>
    </Card>
  );
}
